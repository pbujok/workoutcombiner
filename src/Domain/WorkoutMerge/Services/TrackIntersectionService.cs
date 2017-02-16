using System;
using System.Collections.Generic;
using System.Linq;

namespace Domain.WorkoutMerge
{
    public class TrackIntersectionService
    {
        readonly IEnumerable<TrackItem> _first;
        readonly IEnumerable<TrackItem> _second;

        public TrackIntersectionService(IEnumerable<TrackItem> first,
            IEnumerable<TrackItem> secend)
        {
            _second = secend;
            _first = first;
        }

        public TracksPair FindTrackIntersection()
        {
            DateTime maxCommonTime = (new DateTime[] {
                _first.Max(n => n.Time),
                _second.Max(n => n.Time)
            }).Min();

            DateTime minCommonTime = (new DateTime[] {
                _first.Min(n => n.Time),
                _second.Min(n => n.Time)
            }).Max();

            var firstFiltered = _first
                .Where(n => n.Time >= minCommonTime && n.Time <= maxCommonTime).ToList();
            var secendFiltered = _second
                .Where(n => n.Time >= minCommonTime && n.Time <= maxCommonTime).ToList();

            List<TrackItem> primaryCollection;
            List<TrackItem> secondaryCollection;

            if (firstFiltered.Count() <= secendFiltered.Count())
            {
                primaryCollection = firstFiltered.ToList();
                secondaryCollection = secendFiltered.ToList();
            }
            else
            {
                primaryCollection = secendFiltered.ToList();
                secondaryCollection = firstFiltered.ToList();
            }

            return new TracksPair(primaryCollection, secondaryCollection);
        }
    }
}