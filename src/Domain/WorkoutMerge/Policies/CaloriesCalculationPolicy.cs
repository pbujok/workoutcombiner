namespace Domain.WorkoutMerge
{

    public abstract class CaloriesCalculationPolicy
    {
        protected Person Person { get; set; }
        public CaloriesCalculationPolicy(Person person)
        {
            Person = person;
        }

        public abstract int Calculate(decimal hoursTime);
    }
}