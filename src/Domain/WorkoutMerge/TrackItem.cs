using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class TrackItem : ValueObject<TrackItem>
    {
        public DateTime Time { get; }

        public Coordiantes Coordiantes { get; }

        public Cadence Cadence { get; }

        public Pulse Pulse { get; }

        public Altitude Altitude { get; }

        public Distance Distance { get; }

        private MergePriority MergePriority { get; set; }

        public TrackItem(DateTime time, Coordiantes coordiantes,
            Cadence cadence, Pulse pulse,
            Altitude altitude, Distance distance)
        {
            Time = time;
            Coordiantes = coordiantes;
            Cadence = cadence;
            Pulse = pulse;
            Altitude = altitude;
            Distance = distance;
            MergePriority = MergePriority.Empty;
        }

        private TrackItem(TrackItem trackItem, MergePriority mergePriority)
            :this(trackItem.Time, trackItem.Coordiantes, trackItem.Cadence,
                 trackItem.Pulse, trackItem.Altitude, trackItem.Distance)
        {
            MergePriority = mergePriority;
        }

        protected override bool EqualsCore(TrackItem other)
        {
            if (Time != other.Time)
                return false;

            if (Cadence != other.Cadence)
                return false;

            if (Pulse != other.Pulse)
                return false;

            if (Altitude != other.Altitude)
                return false;

            if (Distance != other.Distance)
                return false;

            return true;
        }

        public virtual bool IsMatchingTo(TrackItem trackItem)
        {
            var diffInMiliseconds = Math.Abs((Time - trackItem.Time).TotalMilliseconds);

            if (diffInMiliseconds <= 5000)
                return true;
            return false;
        }

        public virtual MergeResult<TrackItem> Merge(TrackItem other)
        {
            List<ConflictInfo> conflicts = FindConflicts(other);
            if (conflicts.Count > 0)
                return MergeResult<TrackItem>.Conflict(conflicts);

            var trackItem = CreateTrackItem(other);
            return MergeResult<TrackItem>.Success(trackItem);
        }

        public bool HasPropertyDefined(string propertyName)
        {
            var value = this.GetType().GetProperty(propertyName).GetValue(this) as IMaybeNull;
            return value.HasValue;
        }

        public TrackItem SetPriority(MergePriority mergePriority)
        {
            return new TrackItem(this, mergePriority);
        }

        private List<ConflictInfo> FindConflicts(TrackItem other)
        {
            List<ConflictInfo> conflicts = new List<ConflictInfo>();
            conflicts = IsConflicted(other, n => n.Coordiantes, conflicts);
            conflicts = IsConflicted(other, n => n.Pulse, conflicts);
            conflicts = IsConflicted(other, n => n.Distance, conflicts);
            conflicts = IsConflicted(other, n => n.Altitude, conflicts);
            conflicts = IsConflicted(other, n => n.Cadence, conflicts);
            return conflicts;
        }

        private TrackItem CreateTrackItem(TrackItem other)
        {
            var coordinates = GetPropertyValue(other, n => n.Coordiantes);
            var cadence = GetPropertyValue(other, n => n.Cadence);
            var pulse = GetPropertyValue(other, n => n.Pulse);
            var altitude = GetPropertyValue(other, n => n.Altitude);
            var distance = GetPropertyValue(other, n => n.Distance);
            return new TrackItem(Time, coordinates, cadence, pulse, altitude, distance);
        }

        protected virtual T GetPropertyValue<T>(TrackItem other,
            Expression<Func<TrackItem, T>> propertyExpression)
            where T : IMaybeNull
        {
            var valuePicker = propertyExpression.Compile();
            var thisPropertyValue = valuePicker.Invoke(this);
            var otherPropertyValue = valuePicker.Invoke(other);

            if (MergePriority.HasPriority(propertyExpression))
                return thisPropertyValue;
            if (other.MergePriority.HasPriority(propertyExpression))
                return otherPropertyValue;

            if (thisPropertyValue.HasValue)
                return thisPropertyValue;
            else
                return otherPropertyValue;
        }

        protected virtual List<ConflictInfo> IsConflicted<T>(TrackItem other,
            Expression<Func<TrackItem, T>> propertyExpression,
            List<ConflictInfo> conflictsList)
            where T : IMaybeNull
        {
            var valuePicker = propertyExpression.Compile();
            var thisPropertyValue = valuePicker.Invoke(other);
            var otherPropertyValue = valuePicker.Invoke(this);

            bool isPriorityDefined = MergePriority.HasPriority(propertyExpression) ||
                    other.MergePriority.HasPriority(propertyExpression);

            if (thisPropertyValue.HasValue && otherPropertyValue.HasValue && !isPriorityDefined)
                conflictsList.Add(ConflictInfo.Create(propertyExpression));

            return conflictsList;
        }
    }
}
