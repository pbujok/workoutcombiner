using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Domain.WorkoutMerge.Utils
{
    public class MergePriorityBuilder
    {
        private List<Expression<Func<TrackItem, object>>> _properties;

        private MergePriorityBuilder()
        {
            _properties = new List<Expression<Func<TrackItem, object>>>();
        }

        public static MergePriorityBuilder Create()
        {
            return new MergePriorityBuilder();
        }

        public MergePriorityBuilder AddProperty(string propertyName)
        {
            switch (propertyName.ToLower())
            {
                case "altitude":
                    _properties.Add(n => n.Altitude);
                    break;
                case "cadence":
                    _properties.Add(n => n.Cadence);
                    break;
                case "coordiantes":
                    _properties.Add(n => n.Coordiantes);
                    break;
                case "distance":
                    _properties.Add(n => n.Distance);
                    break;
                case "pulse":
                    _properties.Add(n => n.Pulse);
                    break;
                default:
                    throw new ArgumentException("Not existing property");
            }

            return this;
        }

        public MergePriority Build()
        {
            return MergePriority.Create(_properties);
        }
    }
}
