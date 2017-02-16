using System;

namespace Domain.WorkoutMerge
{
    public class SplitSegmentParameter
    {
        public DateTime Begin { get; }

        public DateTime End { get; }

        public string Sport { get; }

        public string Intensity { get; }

        public string TriggerMethod { get; }

        public SplitSegmentParameter(DateTime begin, DateTime end, 
            string sport, string intensity, string triggerMethod)
        {
            Begin = begin;
            End = end;
            Sport = sport;
            Intensity = intensity;
            TriggerMethod = triggerMethod;
        }
    }
}