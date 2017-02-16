using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace Domain.DataFormats
{
    public enum Intensity
    {
        Active
    }

    public enum TriggerMethod
    {
        Manual
    }

    public class Lap
    {
        [XmlAttribute]
        public DateTime StartTime { get; set; }

        public float TotalTimeSeconds { get; set; }

        public float DistanceMeters { get; set; }

        public int Calories { get; set; }

        public Intensity Intensity { get; set; }

        public TriggerMethod TriggerMethod { get; set; }

        public List<Trackpoint> Track { get; set; }
    }
}