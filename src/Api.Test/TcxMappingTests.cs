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
    public class TcxMappingTests
    {
        [Fact]
        public void TcxToDomainMapping_SimpleCorrectInput_CorrectOutput()
        {
            List<Lap> laps = CreateLaps();

            TrainingCenterDatabase tcxObject = CreateTCXRootObject(laps);

            var mapping = new TcxMapper();
            var person = new Person(Sex.Male, 70, 22, 145);
            var result = mapping.MapToDomain(tcxObject);

            var segmentToAssert = result.Segments.SingleOrDefault();
            segmentToAssert.Should().NotBeNull();
            segmentToAssert.Sport.Should().Be("Bike");
            segmentToAssert.Intensity.Should().Be(IntensityValues.Active);
            segmentToAssert.TriggerMethod.Should().Be(TriggerMethodValue.Manual);
            segmentToAssert.Track.Count.Should().Be(1);
            var trackItemToAssert = segmentToAssert.Track[0];
            trackItemToAssert.Pulse.HasValue.Should().BeFalse();
            trackItemToAssert.Altitude.Value.Should().Be(22);
            trackItemToAssert.Cadence.Value.Should().Be(90);
            trackItemToAssert.Coordiantes.Latitude.Should().Be(22);
            trackItemToAssert.Coordiantes.Longtitude.Should().Be(21);
        }

        private List<Lap> CreateLaps()
        {
            return new List<Lap>
            {
                new Lap
                {
                    Calories = 222,
                    DistanceMeters = 3232,
                    Intensity = Intensity.Active,
                    StartTime = new DateTime(2016, 10,10,10,10,10),
                    TotalTimeSeconds = 12345,
                    TriggerMethod = TriggerMethod.Manual,
                    Track = new List<Trackpoint>
                    {
                        new Trackpoint
                        {
                            AltitudeMeters = 22,
                            Cadence = 90,
                            Position = new Position()
                            {
                                LatitudeDegrees = 22,
                                LongitudeDegrees = 21
                            },
                            DistanceMeters = 2
                        }
                    }
                }
            };
        }

        private TrainingCenterDatabase CreateTCXRootObject(List<Lap> laps)
        {
            return new TrainingCenterDatabase()
            {
                Activities = new List<Activity>
                {
                    new Activity()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Sport = "Bike",
                        Laps = laps
                    }
                }
            };
        }
    }
}
