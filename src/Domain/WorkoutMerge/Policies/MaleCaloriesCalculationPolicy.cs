using System;

namespace Domain.WorkoutMerge
{
    public class MaleCaloriesCalculationPolicy : CaloriesCalculationPolicy
    {
        public MaleCaloriesCalculationPolicy(Person person) : base(person) { }

        public override int Calculate(decimal hoursTime)
        {
            var result = ((-55.0969m 
                + (0.6309m * Person.AvgHeartRate) 
                + (0.1988m * Person.KilogramsWeight) 
                + (0.2017m * Person.Age)) / 4.184m) * 60 * hoursTime;
            return (int)Math.Floor(result);
        }
    }
}