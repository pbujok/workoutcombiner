using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class TrackIntersectionServiceTest
    {
        [Fact]
        public void FindIntersection_SetsWithIntersection_2ItemsIntersection()
        {
            var firstSet = GetTrackItems(4);
            var secondSet = GetTrackItems(4, offset : 2);

            var sut = new TrackIntersectionService(firstSet, secondSet);

            var result = sut.FindTrackIntersection();
            result.Primary.Count.Should().Be(2);
            result.Secondary.Count.Should().Be(2);
        }

        [Fact]
        public void FindIntersection_SetsWithoutIntersection_NoIntersection()
        {
            var firstSet = GetTrackItems(2);
            var secondSet = GetTrackItems(2, offset : 2);

            var sut = new TrackIntersectionService(firstSet, secondSet);

            var result = sut.FindTrackIntersection();
            result.Primary.Count.Should().Be(0);
            result.Secondary.Count.Should().Be(0);
        }

        [Fact]
        public void FindIntersection_SetConteinedIn_3CommonItems()
        {
            var firstSet = GetTrackItems(5);
            var secondSet = GetTrackItems(3, offset : 2);

            var sut = new TrackIntersectionService(firstSet, secondSet);

            var result = sut.FindTrackIntersection();
            result.Primary.Count.Should().Be(3);
            result.Secondary.Count.Should().Be(3);
        }

        private IEnumerable<TrackItem> GetTrackItems(int count, int offset = 0)
        {
            var startDate = new DateTime(2017, 3, 1, 3, 3, 3);
            for (var i = 0; i < count; ++i)
            {
                yield return new TrackItem(startDate.AddSeconds(10 * (i + offset)),
                                new Coordiantes(1, i), new Cadence(90),
                                new Pulse(130), new Altitude(), new Distance());
            }
        }
    }
}
