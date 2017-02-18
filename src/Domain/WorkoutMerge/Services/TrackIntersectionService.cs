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
            DateTime maxCommonTime = FindMaxCommonTime();
            DateTime minCommonTime = FindMinCommonTime();

            var intersectionFilter = new Func<TrackItem, bool>(n => n.Time >= minCommonTime && n.Time <= maxCommonTime);
            var firstFiltered = _first.Where(intersectionFilter).ToList();
            var secendFiltered = _second.Where(intersectionFilter).ToList();

            return CreateIntersectionTrackPair(firstFiltered, secendFiltered);
        }

        private TracksPair CreateIntersectionTrackPair(List<TrackItem> firstFiltered, List<TrackItem> secendFiltered)
        {
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

        private DateTime FindMinCommonTime()
        {
            return (new DateTime[] {
                _first.Min(n => n.Time),
                _second.Min(n => n.Time)
            }).Max();
        }

        private DateTime FindMaxCommonTime()
        {
            return (new DateTime[] {
                _first.Max(n => n.Time),
                _second.Max(n => n.Time)
            }).Min();
        }
    }
}