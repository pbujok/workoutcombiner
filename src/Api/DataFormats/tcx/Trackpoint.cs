using System;

namespace Domain.DataFormats
{

    public class Trackpoint
    {
        public DateTime Time { get; set; }

        public Position Position { get; set; }

        public float? AltitudeMeters { get; set; }

        public float? DistanceMeters { get; set; }

        public HeartRateBpm HeartRateBpm { get; set; }

        public int? Cadence { get; set; }
    }
}