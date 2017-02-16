using System;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class Distance : ValueObject<Distance>, IMaybeNull
    {
        private decimal? _value;

        public decimal Value => _value.Value;
        public bool HasValue => _value.HasValue;

        public Distance(decimal? value = null)
        {
            _value = value;
        }

        protected override bool EqualsCore(Distance other)
        {
            if (other.HasValue && HasValue)
                return Value == other.Value;

            return other.HasValue == HasValue;
        }
    }
}