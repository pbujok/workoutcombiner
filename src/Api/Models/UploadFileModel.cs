using FluentValidation;
using Newtonsoft.Json;
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

        public List<Priority> GetPriority()
        {
            return JsonConvert.DeserializeObject<List<Priority>>(Priority);
        }
    }

    public class UploadFileModelValidator : AbstractValidator<UploadFileModel>
    {
        public UploadFileModelValidator()
        {
            RuleFor(n => n.Name).Must(n => n.Length > 3);
        }
    }
}
