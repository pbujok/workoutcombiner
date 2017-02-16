using System;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class Cadence : ValueObject<Cadence>, IMaybeNull
    {
        private int? _value;

        public int Value => _value.Value;
        public bool HasValue => _value.HasValue;

        public Cadence(int? value = null)
        {
            _value = value;
        }

        protected override bool EqualsCore(Cadence other)
        {
            if (other.HasValue && HasValue)
                return Value == other.Value;

            return other.HasValue == HasValue;
        }
    }
}