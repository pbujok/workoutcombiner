using System;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class Altitude : ValueObject<Altitude>, IMaybeNull
    {
        private decimal? _value;

        public decimal Value => _value.Value;
        public bool HasValue => _value.HasValue;
        
        public Altitude(decimal? value = null)
        {
            _value = value;
        }

        protected override bool EqualsCore(Altitude other)
        {
            if (other.HasValue && HasValue)
                return Value == other.Value;

            return other.HasValue == HasValue;
        }

        public bool IsMatchingTo(Altitude other)
        {
            throw new NotImplementedException();
        }
    }
}