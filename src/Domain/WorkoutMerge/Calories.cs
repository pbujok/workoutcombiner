using System;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class MaleCalories : Calories
    {
        public MaleCalories(int value) : base(value)
        {
        }

        public MaleCalories(Person person, decimal hoursTime)
            : base(person, hoursTime) { }

        protected override int Calculate(Person person, decimal hoursTime)
        {
            var result = ((-55.0969m 
                + (0.6309m * person.AvgHeartRate) 
                + (0.1988m * person.KilogramsWeight) 
                + (0.2017m * person.Age)) / 4.184m) * 60 * hoursTime;
            return (int)Math.Floor(result);
        }
    }

    public class FamaleCalories : Calories
    {
        public FamaleCalories(int value) : base(value)
        {
        }

        public FamaleCalories(Person person, decimal hoursTime)
            : base(person, hoursTime) { }

        protected override int Calculate(Person person, decimal hoursTime)
        {
            var result = ((-20.4022m
                + (0.4472m * person.AvgHeartRate) 
                - (0.1263m * person.KilogramsWeight) 
                + (0.074m * person.Age)) / 4.184m) * 60 * hoursTime;
            return (int)Math.Floor(result);
        }
    }

    public static class CaloriesFactory
    {
        public static Calories CreateCalories(Person person, decimal hoursTime)
        {
            if (person.Sex == Sex.Famale)
                return new FamaleCalories(person, hoursTime);
            else
                return new MaleCalories(person, hoursTime);
        }
    }

    public class Calories : ValueObject<Calories>
    {
        public int Value { get; }
        protected Person Person { get; }

        public Calories(int value)
        {
            Value = value;
        }

        protected Calories(Person person, decimal hoursTime)
        {
            if(person.AvgHeartRate > 0)
                Value = Calculate(person, hoursTime);
        }

        protected virtual int Calculate(Person person, decimal hoursTime)
        {
            return Value;
        }

        protected override bool EqualsCore(Calories other)
        {
            if (other == null)
                return false;

            return Value == other.Value;
        }
    }
}
