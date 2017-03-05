using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Domain.Common;
using System.Linq;

namespace Domain.WorkoutMerge
{
    public class Segment : ValueObject<Segment>
    {
        public string Sport { get; }

        public DateTime StartTime { get; }

        public TotalTrackTimeSeconds TotalTimeSeconds { get; }

        public string Intensity { get; }

        public string TriggerMethod { get; }

        public float DistanceMeters
        {
            get
            {
                return Track.Max(n => n.Distance.HasValue ? (float)n.Distance.Value : 0);
            }
        }

        public Calories Calories { get; }

        public ReadOnlyCollection<TrackItem> Track { get; }
        
        public static List<Segment> SplitToSegments(List<TrackItem> toSplit,
            List<SplitSegmentParameter> splitParameters, Person person)
        {
            var result = new List<Segment>();
            foreach (var splitParameter in splitParameters)
            {
                var mathingToSegments =
                    toSplit.Where(
                            n => n.Time >= splitParameter.Begin && n.Time <= splitParameter.End)
                        .ToList();

                if (mathingToSegments.Count > 0)
                {
                    var totalTime = new TotalTrackTimeSeconds(mathingToSegments);
                    //TODO check if pulse set
                    var personInSegment = person.SetAvgHeartRate((int)mathingToSegments.Average(n => n.Pulse.Value));
                    var calories = new Calories(personInSegment, totalTime.Value / 3600);
                    var segment = new Segment(
                        splitParameter.Sport,
                        splitParameter.Begin,
                        mathingToSegments,
                        calories,
                        splitParameter.Intensity,
                        splitParameter.TriggerMethod);
                    result.Add(segment);
                }
            }
            return result;
        }

        public Segment(string sport, DateTime startTime, List<TrackItem> tracks, Calories calories, string intensity, string triggerMethod)
        {
            Sport = sport;
            StartTime = startTime;
            Track = new ReadOnlyCollection<TrackItem>(tracks);
            Calories = calories;
            TotalTimeSeconds = new TotalTrackTimeSeconds(Track);
            TriggerMethod = triggerMethod;
            Intensity = intensity;
        }

        protected override bool EqualsCore(Segment other)
        {
            if (Sport != other.Sport)
                return false;

            if (StartTime != other.StartTime)
                return false;

            if (Track.Count != other.Track.Count)
                return false;

            int index = 0;
            foreach (var item in other.Track)
            {
                if (!item.Equals(other.Track[index++]))
                    return false;
            }

            return true;
        }
    }
}
