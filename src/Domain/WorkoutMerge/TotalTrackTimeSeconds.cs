using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class TotalTrackTimeSeconds : ValueObject<TotalTrackTimeSeconds>
    {
        private ReadOnlyCollection<TrackItem> _track;

        public decimal Value { get; }

        public TotalTrackTimeSeconds(List<TrackItem> track)
            : this(new ReadOnlyCollection<TrackItem>(track))
        {

        }
        public TotalTrackTimeSeconds(ReadOnlyCollection<TrackItem> track)
        {
            _track = track;
            Value = Calculate();
        }

        private decimal Calculate()
        {
            decimal secondsCount = 0;
            _track.EachPair((i, j) =>
            {
                var difference = Math.Abs((i.Time - j.Time).TotalSeconds);
                if (difference < 60)
                    secondsCount += Convert.ToDecimal(difference);
            });

            return secondsCount;
        }

        protected override bool EqualsCore(TotalTrackTimeSeconds other)
        {
            return Value == other.Value;
        }
    }
}