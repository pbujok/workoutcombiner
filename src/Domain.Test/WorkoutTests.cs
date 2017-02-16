using System;
using System.Collections.Generic;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class WorkoutTests
    {
        private Segment CreteSegment(string sport, DateTime time, List<TrackItem> tracks, Calories calories)
        {
            return new Segment(sport, time, tracks, calories, IntensityValues.Active, TriggerMethodValue.Manual);
        }
        [Fact]
        public void WorkoutMerge_InteresectedWorkouts_OneSegment()
        {
            var time = new DateTime(2016, 12, 22, 22, 22, 22);
            var baseWorkout = 
                CrateWorkout(time, BaseSegments(time));
            var secondaryWorkout = 
                CrateWorkout(time.AddSeconds(2), SecendSegments(time.AddSeconds(2)));

            var result = baseWorkout.Merge(secondaryWorkout, new Person(Sex.Male, 70, 22, 144));

            result.IsConflicted.Should().BeFalse();
            result.Value.Segments[0].Track.Count.Should().Be(8);
            result.Value.Segments.Count.Should().Be(1);
        }

        [Fact]
        public void WorkoutMerge_NoIntersection_ZeroSegments()
        {
            var time = new DateTime(2016, 12, 22, 22, 22, 22);
            var baseWorkout = 
                CrateWorkout(time, BaseSegments(time));
            var secondaryWorkout = 
                CrateWorkout(time.AddSeconds(80), SecendSegments(time.AddSeconds(80)));

            var result = baseWorkout.Merge(secondaryWorkout, new Person(Sex.Male, 70, 22, 144));

            result.IsConflicted.Should().BeFalse();
            result.Value.Segments.Count.Should().Be(0);
        }

        [Fact]
        public void WorkoutMergeManySegments_intersecion_3Segments()
        {
            var time = new DateTime(2016, 12, 22, 22,22, 22);
            var list = new List<Segment>()
            {
                CreteSegment("Bike", time, BaseSegments(time), new Calories(22)),
                CreteSegment("Bike", time.AddSeconds(80), BaseSegments(time.AddSeconds(80)), new Calories(22)),
                CreteSegment("Bike", time.AddSeconds(160), BaseSegments(time.AddSeconds(160)), new Calories(22)),
            };
            var list2 = new List<Segment>()
            {
                CreteSegment("Bike", time, SecendSegments(time), new Calories(22)),
                CreteSegment("Bike", time.AddSeconds(80), SecendSegments(time.AddSeconds(80)), new Calories(22)),
                CreteSegment("Bike", time.AddSeconds(160), SecendSegments(time.AddSeconds(160)), new Calories(22)),
            };
            var sut = new Workout(list, "a");
            var sut2 = new Workout(list2, "b");

            var result = sut.Merge(sut2, new Person(Sex.Male, 70, 22, 144)).Value;

            result.Segments.Count.Should().Be(3);
            result.Segments[0].StartTime.Should().Be(time);
            result.Segments[1].StartTime.Should().Be(time.AddSeconds(80));
            result.Segments[2].StartTime.Should().Be(time.AddSeconds(160));
        }

        [Fact]
        public void WorkoutMergeDifferentSegmentsCount_intersecion_3Segments()
        {
            var time = new DateTime(2016, 12, 22, 22, 22, 22);
            var list = new List<Segment>()
            {
                CreteSegment("Bike", time, BaseSegments(time), new Calories(22)),
                CreteSegment("Bike", time.AddSeconds(80),
                        BaseSegments(time.AddSeconds(80)), new Calories(22))
            };
            var list2 = new List<Segment>()
            {
                CreteSegment("Bike", time.AddSeconds(80),
                        SecendSegments(time.AddSeconds(80)), new Calories(22)),
            };
            var sut = new Workout(list);
            var sut2 = new Workout(list2);

            var result = sut.Merge(sut2, new Person(Sex.Male, 70, 22, 144)).Value;

            result.Segments.Count.Should().Be(1);
            result.Segments[0].StartTime.Should().Be(time.AddSeconds(80));
        }

        private Workout CrateWorkout(DateTime startDate, List<TrackItem> track)
        {
            var list = new List<Segment>()
            {
                CreteSegment("bike", startDate, track, new Calories(22))
            };

            return new Workout(list);
        }

        private List<TrackItem> BaseSegments(DateTime startDate)
        {
            var trackItem = new List<TrackItem>();
            for (var i = 0; i < 9; ++i)
            {
                trackItem.Add(new TrackItem(startDate.AddSeconds(5 * i),
                                new Coordiantes(1, i), new Cadence(90),
                                new Pulse(130), new Altitude(), new Distance()));
            }
            return trackItem;
        }

        private List<TrackItem> SecendSegments(DateTime startDate)
        {
            var trackItem = new List<TrackItem>();
            for (var i = 0; i < 9; ++i)
            {
                trackItem.Add(new TrackItem(startDate.AddSeconds(5 * i),
                                new Coordiantes(), new Cadence(),
                                new Pulse(), new Altitude(55), new Distance(323)));
            }
            return trackItem;
        }
    }
}
