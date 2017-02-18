using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class Calories : ValueObject<Calories>
    {
        public int Value { get; }
        protected Person Person { get; }

        public Calories(int value)
        {
            Value = value;
        }

        public Calories(Person person, decimal hoursTime)
        {
            if (person.AvgHeartRate > 0)
            {
                var caloryCalculationPolicy = CaloriesCalculationPolicyFactory.CreateCalories(person);
                Value = caloryCalculationPolicy.Calculate(hoursTime);
            }
        }

        protected override bool EqualsCore(Calories other)
        {
            if (other == null)
                return false;

            return Value == other.Value;
        }
    }
}
