using Domain.WorkoutMerge.Utils;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class MergePriorityTests
    {
        [Fact]
        public void CreatePriority_ExistingProperty_PropertyHasPriority()
        {
            var builder = MergePriorityBuilder.Create().AddProperty("pulse")
                .AddProperty("Cadence");

            var sut = builder.Build();

            sut.HasPriority(n => n.Cadence).Should().BeTrue();
            sut.HasPriority(n => n.Pulse).Should().BeTrue();
            sut.HasPriority(n => n.Altitude).Should().BeFalse();
        }

    }
}