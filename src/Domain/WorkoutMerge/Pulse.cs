using System;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class Test
    {

    }
    public class Pulse : ValueObject<Pulse>, IMaybeNull
    {
        private int? _value;

        public int Value => _value.Value;
        public bool HasValue => _value.HasValue;

        public Pulse(int? value = null)
        {
            _value = value;
        }

        protected override bool EqualsCore(Pulse other)
        {
            if (other.HasValue && HasValue)
                return Value == other.Value;

            return other.HasValue == HasValue;
        }
    }
}