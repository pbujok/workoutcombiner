using System;
using System.Linq.Expressions;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class ConflictInfo : ValueObject<ConflictInfo>
    {
        public string ConflictedProperty { get; }
        public static ConflictInfo Create<T>(Expression<Func<TrackItem, T>> property)
        {
            return new ConflictInfo(((MemberExpression)property.Body).Member.Name);
        }

        private ConflictInfo(string propertyName)
        {
            ConflictedProperty = propertyName;
        }

        protected override bool EqualsCore(ConflictInfo other)
        {
            return ConflictedProperty == other.ConflictedProperty;
        }
    }
}