using System;
using System.Collections.Generic;
using Api.Models;
using Domain.WorkoutMerge;
using Domain.WorkoutMerge.Utils;
using System.Linq;

namespace Api.ApplicationServices
{
    public class MergeOperation
    {
        Person _personalInfo;
        List<Priority> _priorityInfo;
        List<Workout> _workouts;

        public MergeOperation(Person personalInfo, List<Priority> priorityInfo, List<Workout> workouts)
        {
            _personalInfo = personalInfo;
            _priorityInfo = priorityInfo;
            _workouts = workouts;
        }

        public MergeResult<Workout> Execute(int workoutInputIndex)
        {
            PreventIndexTooLow(workoutInputIndex);

            var firstWorkout = GetWorkoutWithPriority(workoutInputIndex - 1);
            var secoendWorkout = GetWorkoutWithPriority(workoutInputIndex);
            var mergeResult = firstWorkout.Merge(secoendWorkout, _personalInfo);
            return mergeResult;
        }

        private Workout GetWorkoutWithPriority(int index)
        {
            var workout = _workouts[index];
            var priority = _priorityInfo.Single(n => n.FileIndex == index);
            var mergePriority = MergePriorityBuilder.Create().AddProperties(priority.PriorityInfo).Build();
            workout.DefinePriority(mergePriority);
            return workout;
        }

        private static void PreventIndexTooLow(int workoutInputIndex)
        {
            if (workoutInputIndex < 1)
            {
                throw new ArgumentException("workoutInputIndex must be greater then 1");
            }
        }
    }
}
