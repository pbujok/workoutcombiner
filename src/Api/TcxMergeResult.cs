using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Domain.DataFormats;

namespace Api.ApplicationServices
{
    public class TcxMergeResult
    {
        public TrainingCenterDatabase Value { get; private set; }
        public ReadOnlyCollection<string> ConflicatedProperties { get; private set; }

        public bool IsSuccess
        {
            get
            {
                return Value != null && !ConflicatedProperties.Any();
            }
        }

        public TcxMergeResult(TrainingCenterDatabase value)
        {
            Value = value;
            ConflicatedProperties = new ReadOnlyCollection<string>(new List<string>());
        }

        public TcxMergeResult(List<string> conflictedProperties)
        {
            if (conflictedProperties == null || !conflictedProperties.Any())
            {
                throw new ArgumentException("conflicts list has to have at least one item");
            }
            Value = null;
            ConflicatedProperties = new ReadOnlyCollection<string>(conflictedProperties);
        }
    }
}