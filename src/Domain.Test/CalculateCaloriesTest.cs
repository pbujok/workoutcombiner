using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.WorkoutMerge;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class CalculateCaloriesTest
    {
        [Fact]
        public void CalcualteCalories_NoHeartRate_0Calories()
        {
            var person = new Person(Sex.Male, 70, 22, 0);
            var sut = CaloriesFactory.CreateCalories(person, 1.5m);

            sut.Value.Should().Be(0);
        }

        [Fact]
        public void CalcualteCalories_MaleInput_ValidCalories()
        {
            var person = new Person(Sex.Male, 70, 22, 150);
            var sut = CaloriesFactory.CreateCalories(person, 1.5m);

            sut.Value.Should().Be(1245);
        }

        [Fact]
        public void CalcualteCalories_FamaleInput_ValidCalories()
        {
            var person = new Person(Sex.Famale, 70, 22, 150);
            var sut = CaloriesFactory.CreateCalories(person, 1.5m);

            sut.Value.Should().Be(848);
        }
    }
}
