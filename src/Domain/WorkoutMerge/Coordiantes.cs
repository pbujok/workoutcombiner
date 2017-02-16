using System;
using Domain.Common;

namespace Domain.WorkoutMerge
{
    public class Coordiantes : ValueObject<Coordiantes>, IMaybeNull
    {
        private decimal? _latitude;
        private decimal? _longtitude;

        public decimal Latitude => _latitude.Value;
        public decimal Longtitude => _longtitude.Value;

        public bool HasValue => _longtitude.HasValue && _latitude.HasValue;

        public Coordiantes(decimal? latitude = null, decimal? longtitude = null)
        {
            _latitude = latitude;
            _longtitude = longtitude;
        }

        protected override bool EqualsCore(Coordiantes other)
        {
            if (other.HasValue && HasValue)
            {
                if (Latitude != other.Latitude)
                    return false;

                if (Longtitude != other.Longtitude)
                    return false;
            }

            return other.HasValue == HasValue;
        }

        public bool IsMatchingTo(Coordiantes other)
        {
            throw new NotImplementedException();
        }
    }
}
