namespace Domain.WorkoutMerge
{

    public static class CaloriesCalculationPolicyFactory
    {
        public static CaloriesCalculationPolicy CreateCalories(Person person)
        {
            if (person.Sex == Sex.Famale)
                return new FamaleCaloriesCalculationPolicy(person);
            else
                return new MaleCaloriesCalculationPolicy(person);
        }
    }
}