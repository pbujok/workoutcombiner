using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class HasPropertyDefinedTests
    {
        [Fact]
        public void TrackItemHasDefinedProperty_HasDefined_True()
        {
            var sut = new TrackItem(new DateTime(2017, 4, 14), new Coordiantes(1, 2), new Cadence(86), new Pulse(), new Altitude(), new Distance());
            sut.HasPropertyDefined("Cadence").Should().BeTrue();
        }

        [Fact]
        public void TrackItemHasDefinedProperty_NotDefined_False()
        {
            var sut = new TrackItem(new DateTime(2017, 4, 14), new Coordiantes(1, 2), new Cadence(86), new Pulse(), new Altitude(), new Distance());
            sut.HasPropertyDefined("Pulse").Should().BeFalse();
        }

        [Fact]
        public void SegmentHasDefinedProperty_Defined_True()
        {
            var item = new TrackItem(new DateTime(2017, 4, 14), new Coordiantes(1, 2), new Cadence(86), new Pulse(), new Altitude(), new Distance());
            var sut = new Segment("Sport", new DateTime(2017, 4, 14), new List<TrackItem> { item }, new Calories(123), "High", TriggerMethodValue.Manual);
            sut.HasPropertyDefined("Pulse").Should().BeFalse();
        }

        [Fact]
        public void WorkoutHasDefinedProperty_Defined_True()
        {
            var item = new TrackItem(new DateTime(2017, 4, 14), new Coordiantes(1, 2), new Cadence(86), new Pulse(), new Altitude(), new Distance());
            var segment = new Segment("Sport", new DateTime(2017, 4, 14), new List<TrackItem> { item }, new Calories(123), "High", TriggerMethodValue.Manual);
            var sut = new Workout(new List<Segment>() { segment });
            sut.HasPropertyDefined("Pulse").Should().BeFalse();
        }
    }
}
