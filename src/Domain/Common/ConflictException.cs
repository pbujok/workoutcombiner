using System;

namespace Domain.Common
{
    public class ConflictException : Exception
    {
        public string ConflictedProperty { get; }

        public ConflictException(string conflictedProperty)
        {
            ConflictedProperty = conflictedProperty;
        }
    }
}
