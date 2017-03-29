using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class MergePriority : ValueObject<MergePriority>
    {
        public static MergePriority Empty = new MergePriority(new List<Expression<Func<TrackItem, object>>>());
        public static MergePriority Create(
            params Expression<Func<TrackItem, object>>[] propertiesWithPriority)
        {
            return new MergePriority(propertiesWithPriority.ToList());
        }

        public static MergePriority Create(
            List<Expression<Func<TrackItem, object>>> propertiesWithPriority)
        {
            return new MergePriority(propertiesWithPriority);
        }

        List<Expression<Func<TrackItem, object>>> _priorityCollection;

        private MergePriority(
            List<Expression<Func<TrackItem, object>>> propertiesWithPriority)
        {
            this._priorityCollection = propertiesWithPriority.ToList();
        }

        public bool HasPriority<T>(Expression<Func<TrackItem, T>> property)
        {
            var propertyName = GetPropertyName(property);
            return _priorityCollection.Any(n => GetPropertyName(n) == propertyName);
        }
        private string GetPropertyName<T>(Expression<Func<TrackItem, T>> property)
        {
            return ((MemberExpression)property.Body).Member.Name;
        }

        protected override bool EqualsCore(MergePriority other)
        {
            if (other._priorityCollection != _priorityCollection)
                return false;

            foreach(var property in _priorityCollection)
            {
                if (!other._priorityCollection.Any(n => n.Body == property.Body))
                    return false;
            }

            return true;
        }
    }
}
