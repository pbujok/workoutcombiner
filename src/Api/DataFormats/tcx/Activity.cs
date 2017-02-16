using System.Collections.Generic;
using System.Xml.Serialization;

namespace Domain.DataFormats
{
    public class Activity
    {
        [XmlAttribute("Sport")]
        public string Sport { get; set; }

        public string Id { get; set; }

        [XmlElement("Lap")]
        public List<Lap> Laps { get; set; }
    }
}