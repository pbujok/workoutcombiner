using System.Collections.Generic;

namespace Api.Models
{
    public class Priority
    {
        public int FileIndex { get; set; }
        public IEnumerable<string> PriorityInfo { get; set; }
    }
}
