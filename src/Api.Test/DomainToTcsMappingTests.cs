using System;
using System.Collections.Generic;
using System.Linq;
using Domain.DataFormats;
using Domain.Mappers;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Api.Test
{
    public class DomainToTcsMappingTests
    {
        [Fact]
        public void DomainToTcxMapping_SimpleCorrectInput_CorrectOutput()
        {
            var time = new DateTime(2016, 12, 22, 22, 22, 22);
            var list = new List<Segment>()
            {
                new Segment("Bike", time, BaseSegments(time), new Calories(22),
                    IntensityValues.Active, TriggerMethodValue.Manual),
            };
            var sut = new Workout(list);

            var mapping = new TcxMapper();
            var result = mapping.ToTcx(sut);

            result.Activities[0].Laps.Count.Should().Be(1);
            result.Activities[0].Laps[0].Track.Count.Should().Be(9);
            result.Activities[0].Laps[0].Intensity.Should()
                .Be(Enum.Parse(typeof(Intensity), IntensityValues.Active));
            result.Activities[0].Laps[0].TriggerMethod.Should()
                .Be(Enum.Parse(typeof(TriggerMethod), TriggerMethodValue.Manual));
            var track = result.Activities[0].Laps[0].Track[0];
            track.AltitudeMeters.Should().Be(1);
            track.Cadence.Should().Be(90);
            track.DistanceMeters.Should().Be(2);
            track.Position.LatitudeDegrees.Should().Be(1);
            track.Position.LongitudeDegrees.Should().Be(3);
            track.HeartRateBpm.Value.Should().Be(130);
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
                                new Coordiantes(1, 3), new Cadence(90),
                                new Pulse(130), new Altitude(1), new Distance(2)));
            }
            return trackItem;
        }
    }
}
