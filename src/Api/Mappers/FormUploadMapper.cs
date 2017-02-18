using System;
using Api.Models;
using Domain.WorkoutMerge;

namespace Api.Mappers
{
    public static class FormUploadMapper
    {
        public static Person ToPersonDomain(this UploadFileModel model)
        {
            Sex sex;
            if (model.Sex == "MALE")
                sex = Sex.Male;
            else if (model.Sex == "FAMALE")
                sex = Sex.Famale;
            else
                throw new ArgumentException("invalid model");

            return new Person(sex, model.KilogramsWeight, model.Age, 0);
        }
    }
}
