using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class Workout : AggregateRoot
    {
        public List<Segment> Segments { get; }
        private MergePriority MergePriority;

        public string Id { get; }

        public Workout(List<Segment> segments, string id)
        {
            Segments = segments;
            Id = id;
            MergePriority = MergePriority.Empty;
        }

        public Workout(List<Segment> segments)
            : this(segments, Guid.NewGuid().ToString())
        {
        }

        public Workout DefinePriority(MergePriority mergePriority)
        {
            MergePriority = mergePriority;
            return this;
        }

        public bool HasPropertyDefined(string propertyName)
        {
            return Segments.Any(n => n.HasPropertyDefined(propertyName));
        }

        public MergeResult<Workout> Merge(Workout other, Person person)
        {
            var trackIntersectionService = new TrackIntersectionService(
                Segments.SelectMany(n => n.Track), other.Segments.SelectMany(n => n.Track));

            TracksPair trackPair = trackIntersectionService.FindTrackIntersection();
            var mergeResult = trackPair
                .SetPriority(this.MergePriority, other.MergePriority).Merge();

            if (mergeResult.IsConflicted)
                return MergeResult<Workout>.Conflict(mergeResult.Conflicts);

            var splitParameters = GetSplitParameters();
            var segments = Segment.SplitToSegments(mergeResult.Value, splitParameters, person);
            return MergeResult<Workout>.Success(new Workout(segments, Guid.NewGuid().ToString()));
        }

        private List<SplitSegmentParameter> GetSplitParameters()
        {
            var splitSegmentParameter = Segments.Select(n =>
            {
                var minTimeInSegment = n.Track.Min(x => x.Time);
                var maxTimeInSegment = n.Track.Max(x => x.Time);
                return new SplitSegmentParameter(
                    minTimeInSegment, maxTimeInSegment, 
                    n.Sport, n.Intensity, n.TriggerMethod);
            }).ToList();

            return splitSegmentParameter;
        }
    }
}
