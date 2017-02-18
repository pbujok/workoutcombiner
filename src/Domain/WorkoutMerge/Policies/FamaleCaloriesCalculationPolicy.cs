using System;

namespace Domain.WorkoutMerge
{

    public class FamaleCaloriesCalculationPolicy : CaloriesCalculationPolicy
    {
        public FamaleCaloriesCalculationPolicy(Person person) : base(person) { }

        public override int Calculate(decimal hoursTime)
        {
            var result = ((-20.4022m
                + (0.4472m * Person.AvgHeartRate) 
                - (0.1263m * Person.KilogramsWeight) 
                + (0.074m * Person.Age)) / 4.184m) * 60 * hoursTime;
            return (int)Math.Floor(result);
        }
    }
}