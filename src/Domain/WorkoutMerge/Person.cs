using System;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public enum Sex
    {
        Male,
        Famale
    }

    public class Person : ValueObject<Person>
    {
        public decimal KilogramsWeight { get; }
        public int Age { get; }
        public int AvgHeartRate { get; }
        public Sex Sex { get; }

        public Person(Sex sex, decimal kilogramsWeight, int age, int avgHeartRate)
        {
            Sex = sex;
            KilogramsWeight = kilogramsWeight;
            Age = age;
            AvgHeartRate = avgHeartRate;
        }

        public Person SetAvgHeartRate(int avgHeartRate)
        {
            return new Person(Sex, KilogramsWeight, Age, avgHeartRate);
        }

        protected override bool EqualsCore(Person other)
        {
            if (KilogramsWeight == other.KilogramsWeight)
                return false;

            if (Age != other.Age)
                return false;

            return AvgHeartRate == other.AvgHeartRate;
        }
    }
}
