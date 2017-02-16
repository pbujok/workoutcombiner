using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;
using Domain.DataFormats;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Domain.Mappers;
using AutoMapper;
using Domain.WorkoutMerge;
using System.Threading.Tasks;
using Api.Mappers;
using System.Text;

namespace Domain.Controllers
{
    [Route("api/[controller]")]
    public class MergeController : Controller
    {
        // POST api/Merge
        [HttpPost]
        public IActionResult Post(UploadFileModel model)
        {
            var fileStreamReaders =
                Request.Form.Files.Select(
                    file => new StreamReader(file.OpenReadStream()));

            XmlSerializer serializer =
                new XmlSerializer(typeof(TrainingCenterDatabase));

            var input =
                fileStreamReaders.Select(n => (TrainingCenterDatabase)serializer.Deserialize(n))
                    .ToList<TrainingCenterDatabase>();

            TcxMapper mapper = new TcxMapper();
            var result = input.Select(n => mapper.MapToDomain(n)).ToList();

            MergePriority mergePriority = MergePriority.Create(n => n.Altitude, n => n.Distance);
            result[1].DefinePriority(mergePriority);
            var person = model.ToPersonDomain();
            var res = result[0].Merge(result[1], person);

            if (!res.IsConflicted)
            {
                return CreateResultFile(serializer, mapper, res);
            }

            return null;
        }

        private IActionResult CreateResultFile(XmlSerializer serializer, TcxMapper mapper, MergeResult<Workout> res)
        {
            MemoryStream stream = new MemoryStream();
            var tcxExport = mapper.ToTcx(res.Value);
            serializer.Serialize(stream, tcxExport);
            var fileString = Encoding.UTF8.GetString(stream.ToArray());
            var bytes = Encoding.UTF8.GetBytes(fileString);
            return File(bytes, "text/xml");
        }
    }
}