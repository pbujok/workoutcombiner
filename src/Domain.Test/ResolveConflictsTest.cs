using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class ResolveWorkoutConflicts
    {
        [Fact]
        public void WorkoutMerge_ConflictedWorkoutsWithInteresection_OneSegment()
        {
            var time = new DateTime(2016, 12, 22, 22, 22, 22);
            var baseWorkout =
                CrateWorkout(time, BaseSegments(time));
            var secondaryWorkout =
                CrateWorkout(time.AddSeconds(2), SecendSegments(time.AddSeconds(2)));
            var person = new Person(Sex.Male, 70, 22, 144);

            var secondaryPriority = MergePriority.Create(n => n.Pulse);

            secondaryWorkout.DefinePriority(secondaryPriority);
            var result = baseWorkout.Merge(secondaryWorkout, person);

            result.IsConflicted.Should().BeFalse();
            result.Value.Segments[0].Track.Count.Should().Be(8);
            result.Value.Segments.Count.Should().Be(1);
        }

        private Workout CrateWorkout(DateTime startDate, List<TrackItem> track)
        {
            var list = new List<Segment>()
            {
                new Segment("bike", startDate, track, new Calories(22),
                IntensityValues.Active, TriggerMethodValue.Manual)
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
                                new Pulse(55), new Altitude(55), new Distance(323)));
            }
            return trackItem;
        }
    }

    public class ResolveTrackItemConflictsTest
    {
        [Fact]
        public void MergeTrackItem_SinglePrioritySource_Merged()
        {
            var baseDate = new DateTime(2016, 06, 22, 12, 30, 30);
            var sut = new TrackItem(baseDate, new Coordiantes(1, 2), new Cadence(60),
                new Pulse(100), new Altitude(356.55m), new Distance(434.43m));
            var sut2 = new TrackItem(baseDate, new Coordiantes(), new Cadence(90),
                new Pulse(130), new Altitude(), new Distance());

            var sut2MergePriority = MergePriority.Create(i => i.Cadence, i => i.Pulse);

            var result = sut.Merge(sut2.SetPriority(sut2MergePriority));

            result.IsConflicted.Should().BeFalse();
            result.Value.Pulse.Value.Should().Be(130);
            result.Value.Cadence.Value.Should().Be(90);
        }

        [Fact]
        public void MergeTrackItem_DifferentPrioritySource_Merged()
        {
            var baseDate = new DateTime(2016, 06, 22, 12, 30, 30);
            var sut = new TrackItem(baseDate, new Coordiantes(1, 2), new Cadence(60),
                new Pulse(100), new Altitude(356.55m), new Distance(434.43m));
            var sut2 = new TrackItem(baseDate, new Coordiantes(), new Cadence(90),
                new Pulse(130), new Altitude(), new Distance());

            var sut1MergePriority = MergePriority.Create(i => i.Cadence);
            var sut2MergePriority = MergePriority.Create(i => i.Pulse);

            var result = sut.SetPriority(sut1MergePriority).Merge(sut2.SetPriority(sut2MergePriority));

            result.IsConflicted.Should().BeFalse();
            result.Value.Cadence.Value.Should().Be(60);
            result.Value.Pulse.Value.Should().Be(130);
        }


    }
}
