using System;
using Domain.Common;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class TrackItemTests
    {
        [Fact]
        public void TrackItemMatch_5SecDifference_IsMatching()
        {
            var baseDate = new DateTime(2016, 06, 22, 12, 30, 30);
            var secDate = baseDate.AddSeconds(5);

            var sut = new TrackItem(baseDate, new Coordiantes(), new Cadence(),
                new Pulse(), new Altitude(), new Distance());

            var sut2 = new TrackItem(secDate, new Coordiantes(), new Cadence(),
                new Pulse(), new Altitude(), new Distance());

            sut.IsMatchingTo(sut2).Should().BeTrue();
        }

        [Fact]
        public void TrackItemMatch_6SecDifference_IsMatching()
        {
            var baseDate = new DateTime(2016, 06, 22, 12, 30, 30);
            var secDate = baseDate.AddMilliseconds(5555);

            var sut = new TrackItem(baseDate, new Coordiantes(), new Cadence(),
                new Pulse(), new Altitude(), new Distance());

            var sut2 = new TrackItem(secDate, new Coordiantes(), new Cadence(),
                new Pulse(), new Altitude(), new Distance());

            sut.IsMatchingTo(sut2).Should().BeFalse();
        }

        [Fact]
        public void TrackItemMerge_NoConflicts_Merged()
        {
            var baseDate = new DateTime(2016, 06, 22, 12, 30, 30);
            var sut = new TrackItem(baseDate, new Coordiantes(1, 2), new Cadence(),
                new Pulse(), new Altitude(356.55m), new Distance(434.43m));

            var sut2 = new TrackItem(baseDate, new Coordiantes(), new Cadence(90),
                new Pulse(130), new Altitude(), new Distance());
            var result = (sut.Merge(sut2)).Value;

            result.Time.Should().Be(baseDate);
            result.Coordiantes.Latitude.Should().Be(1);
            result.Coordiantes.Longtitude.Should().Be(2);
            result.Cadence.Value.Should().Be(90);
            result.Pulse.Value.Should().Be(130);
            result.Altitude.Value.Should().Be(356.55m);
            result.Distance.Value.Should().Be(434.43m);
        }

        [Fact]
        public void TrackItemMerge_Conflicts_NotMerged()
        {
            var baseDate = new DateTime(2016, 06, 22, 12, 30, 30);
            var sut = new TrackItem(baseDate, new Coordiantes(1, 2), new Cadence(60),
                new Pulse(100), new Altitude(356.55m), new Distance(434.43m));

            var sut2 = new TrackItem(baseDate, new Coordiantes(), new Cadence(90),
                new Pulse(130), new Altitude(), new Distance());

            
            var result = sut.Merge(sut2);

            result.IsConflicted.Should().BeTrue();
            result.Conflicts.Count.Should().Be(2);
        }
    }
}