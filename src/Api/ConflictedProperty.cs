using System.Collections.Generic;

namespace Api.ApplicationServices
{
    public class ConflictedProperty
    {
        public string PropertyName { get; set; }
        public List<int> ContainingFile { get; set; }

        public ConflictedProperty(string propertyName, List<int> containingFile)
        {
            PropertyName = propertyName;
            ContainingFile = containingFile;
        }
    }
}