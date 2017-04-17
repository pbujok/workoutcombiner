using System.IO;
using System.Xml.Serialization;
using Domain.DataFormats;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Domain.Mappers;
using Domain.WorkoutMerge;
using Api.Mappers;
using System.Text;
using Api.Models;
using Api.ApplicationServices;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Domain.Controllers
{
    [Route("api/[controller]")]
    public class MergeController : Controller
    {
        private MergeWorkoutAppService _mergeWorkoutService;
        private XmlSerializer _serializer;

        public MergeController(MergeWorkoutAppService mergeWorkoutService)
        {
            _mergeWorkoutService = mergeWorkoutService;
            _serializer = new XmlSerializer(typeof(TrainingCenterDatabase));
        }

        // POST api/Merge
        [HttpPost]
        public IActionResult Post(UploadFileModel model)
        {
            var priority = JsonConvert.DeserializeObject<ICollection<Priority>>(model.Priority);
            var fileStreamReaders =
                Request.Form.Files.Select(
                    file => new StreamReader(file.OpenReadStream()));
            
            var input =
                fileStreamReaders.Select(n => (TrainingCenterDatabase)_serializer.Deserialize(n))
                    .ToList<TrainingCenterDatabase>().AsReadOnly();

            var result = _mergeWorkoutService.Merge(input, model);

            if (result.IsSuccess)
                return CreateResultFile(result.Value);
            else
                return StatusCode(500, result.ConflicatedProperties);
            
        }

        private IActionResult CreateResultFile(TrainingCenterDatabase tcxExport)
        {
            MemoryStream stream = new MemoryStream();
            _serializer.Serialize(stream, tcxExport);
            var fileString = Encoding.UTF8.GetString(stream.ToArray());
            var bytes = Encoding.UTF8.GetBytes(fileString);
            return File(bytes, "text/xml");
        }
    }
}