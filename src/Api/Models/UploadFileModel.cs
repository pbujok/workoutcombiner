﻿using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;

namespace Api.Models
{
    public class UploadFileModel
    {
        public decimal KilogramsWeight { get; set; }
        public int Age { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public string Priority { get; set; }

        public IEnumerable<Priority> GetPriority()
        {
            return JsonConvert.DeserializeObject<IEnumerable<Priority>>(Priority);
        }
    }

    public class Priority
    {
        public int FileIndex { get; set; }
        public IEnumerable<string> PriorityInfo { get; set; }
    }
}
