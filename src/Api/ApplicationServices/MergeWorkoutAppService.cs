using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Api.Mappers;
using Api.Models;
using Domain.DataFormats;
using Domain.Mappers;
using Domain.WorkoutMerge;

namespace Api.ApplicationServices
{
    public class MergeWorkoutAppService
    {
        private TcxMapper _tcxMapper;

        public MergeWorkoutAppService(TcxMapper tcxMapper)
        {
            _tcxMapper = tcxMapper;
        }

        public TcxMergeResult Merge(ReadOnlyCollection<TrainingCenterDatabase> inputsToMerge, UploadFileModel uploadModel)
        {
            if (inputsToMerge.Count < 2)
                throw new ArgumentException("there must be atleast two inputsToMerge");

            var separatedWorkouts = inputsToMerge.Select(n => _tcxMapper.MapToDomain(n)).ToList<Workout>();

            var person = uploadModel.GetPersonDomain();
            var priority = uploadModel.GetMergePriority();

            List<ConflictedProperty> conflicts = new List<ConflictedProperty>();
            TrainingCenterDatabase result = null;

            for (var i = 1; i < separatedWorkouts.Count; ++i)
            {
                var mergeResult = separatedWorkouts[0].Merge(separatedWorkouts[1], person);
                if (!mergeResult.IsConflicted)
                {
                    result = _tcxMapper.ToTcx(mergeResult.Value);
                }
                else
                {
                    var conflictInfo = mergeResult.Conflicts.Select(n =>
                        new ConflictedProperty(n.ConflictedProperty,
                            GetIndexesWithDefinedProperty(n.ConflictedProperty, separatedWorkouts)));
                    conflicts.AddRange(conflictInfo);
                }
            }

            if (conflicts.Any())
                return new TcxMergeResult(conflicts);
            else
                return new TcxMergeResult(result);
        }

        private List<int> GetIndexesWithDefinedProperty(string propertyName, List<Workout> workouts)
        {
            List<int> indexes = new List<int>();
            for (var j = 0; j < workouts.Count; ++j)
            {
                if (workouts[j].HasPropertyDefined(propertyName))
                    indexes.Add(j);
            }
            return indexes;
        }
    }
}
