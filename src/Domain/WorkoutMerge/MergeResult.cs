using System.Collections.Generic;

namespace Domain.WorkoutMerge
{
    public class MergeResult<T> where T : class
    {
        public static MergeResult<T> Conflict(IReadOnlyList<ConflictInfo> conflicts)
        {
            return new MergeResult<T>(conflicts);
        }

        public static MergeResult<T> Success(T value)
        {
            return new MergeResult<T>(value);
        }

        public T Value { get; }

        public IReadOnlyList<ConflictInfo> Conflicts { get; }

        public bool IsConflicted => 
            Value == null 
            && Conflicts != null
            && Conflicts.Count > 0;

        private MergeResult(IReadOnlyList<ConflictInfo> conflicts)
        {
            Conflicts = conflicts;
        }

        private MergeResult(T value)
        {
            Value = value;
            
        }
    }
}