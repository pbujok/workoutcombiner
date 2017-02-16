using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class ComputedSegmentProperties
    {
        Segment CreateSegment(
            DateTime dateTime, List<TrackItem> track, int calories = 11)
        {
            return new Segment("Bike", dateTime, track, new Calories(calories), 
                IntensityValues.Active, TriggerMethodValue.Manual);
        }

        [Fact]
        public void TotalTimeComputed_InputWithoutBreaks_TotalTile()
        {
            var dateTime = new DateTime(2016, 11, 11, 12, 0, 0);
            var track = GetTrackPoints(10, dateTime);

            var segment = CreateSegment(dateTime, track);

            segment.TotalTimeSeconds.Value.Should().Be(45m);
            segment.Calories.Value.Should().Be(11);
        }

        [Fact]
        public void TotalTimeComputed_InputWithTwoBreaks_TotalTile()
        {
            var dateTime = new DateTime(2016, 11, 11, 12, 0, 0);
            var track = GetTrackPoints(10, dateTime);
            track.AddRange(GetTrackPoints(10, dateTime.AddSeconds(155)));

            var segment = CreateSegment(dateTime, track);

            segment.TotalTimeSeconds.Value.Should().Be(90m);
        }

        [Fact]
        public void TotalComputed_InputWithoutBreaks_TotalDistance()
        {
            var dateTime = new DateTime(2016, 11, 11, 12, 0, 0);
            var track = GetTrackPoints(10, dateTime);

            var segment = CreateSegment(dateTime, track);

            segment.DistanceMeters.Should().Be(45);
        }

        [Fact]
        public void CaloriesComputed_Input_TotalCalories()
        {
            var dateTime = new DateTime(2016, 11, 11, 12, 0, 0);
            var track = GetTrackPoints(10, dateTime);

            var segment = CreateSegment(dateTime, track, 22);

            segment.Calories.Value.Should().Be(22);
        }

        private List<TrackItem> GetTrackPoints(int count, DateTime startDate)
        {
            var trackItem = new List<TrackItem>();
            for (var i = 0; i < count; ++i)
            {
                trackItem.Add(new TrackItem(startDate.AddSeconds(5 * i),
                                new Coordiantes(), new Cadence(),
                                new Pulse(), new Altitude(), new Distance(i)));
            }
            return trackItem;
        }
    }
}
