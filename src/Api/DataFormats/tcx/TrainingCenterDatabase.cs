using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Domain.DataFormats
{
    [XmlType(
         Namespace =
             "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2"),
     XmlRoot("TrainingCenterDatabase",
         Namespace =
             "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2",
         IsNullable = false)]
    public class TrainingCenterDatabase
    {
        public List<Activity> Activities { get; set; }
    }
}
