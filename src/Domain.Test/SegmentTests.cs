using System;
using System.Collections.Generic;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class SegmentTests
    {
        Segment CreateSegments(string sport, DateTime datetime, List<TrackItem> track, Calories calories)
        {
            return new Segment(sport, datetime, track, calories, IntensityValues.Active, TriggerMethodValue.Manual);
        }

        [Fact]
        public void SegmentEquals_EqualObject_True()
        {
            var dateTime = new DateTime(2016, 10, 10, 10, 10, 10);

            var tracks1 = new List<TrackItem>()
            {
                new TrackItem(dateTime, new Coordiantes(), new Cadence(22),
                    new Pulse(22), new Altitude(), new Distance())
            };
            var segment1 = CreateSegments("Bike", dateTime, tracks1, new Calories(22));

            var tracks2 = new List<TrackItem>()
            {
                new TrackItem(dateTime, new Coordiantes(), new Cadence(22),
                    new Pulse(22), new Altitude(), new Distance())
            };
            var segment2 = CreateSegments("Bike", dateTime, tracks2, new Calories(22));
            segment1.Equals(segment2).Should().BeTrue();
        }

        [Fact]
        public void SegmentEquals_DifferentSport_False()
        {
            var dateTime = new DateTime(2016, 10, 10, 10, 10, 10);
            var segment1 = CreateSegments("Bike", dateTime, new List<TrackItem>(), new Calories(22));
            var segment2 = CreateSegments("MTB", dateTime, new List<TrackItem>(), new Calories(22));

            segment1.Equals(segment2).Should().BeFalse();
        }

        [Fact]
        public void SegmentEquals_DifferentDates_False()
        {
            var dateTime = new DateTime(2016, 10, 10, 10, 10, 10);
            var segment1 = CreateSegments("Bike", dateTime, new List<TrackItem>(), new Calories(22));
            var segment2 = CreateSegments("Bike", dateTime.AddSeconds(222), 
                                        new List<TrackItem>(), new Calories(22));

            segment1.Equals(segment2).Should().BeFalse();
        }
    }
}
