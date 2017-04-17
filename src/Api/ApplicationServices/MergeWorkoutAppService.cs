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
            EnsureInputAmmountEnough(inputsToMerge);

            var personInfo = uploadModel.GetPersonDomain();
            var priorityInfo = uploadModel.GetPriority();
            List<Workout> workouts = MapInputToWorkouts(inputsToMerge);
            var mergeOperation = new MergeOperation(personInfo, priorityInfo, workouts);

            var conflicts = new List<ConflictedProperty>();
            TrainingCenterDatabase result = null;

            for (var i = 1; i < workouts.Count; ++i)
            {
                MergeResult<Workout> mergeResult = mergeOperation.Execute(i);
                if (!mergeResult.IsConflicted)
                {
                    result = _tcxMapper.ToTcx(mergeResult.Value);
                }
                else
                {
                    conflicts.AddRange(CreateConflictInfo(workouts, mergeResult));
                }
            }

            if (conflicts.Any())
                return new TcxMergeResult(conflicts);
            else
                return new TcxMergeResult(result);
        }

        private static void EnsureInputAmmountEnough(ReadOnlyCollection<TrainingCenterDatabase> inputsToMerge)
        {
            if (inputsToMerge.Count < 2)
                throw new ArgumentException("there must be atleast two inputsToMerge");
        }

        private List<Workout> MapInputToWorkouts(ReadOnlyCollection<TrainingCenterDatabase> inputsToMerge)
        {
            return inputsToMerge.Select(n => _tcxMapper.MapToDomain(n)).ToList();
        }

        private IEnumerable<ConflictedProperty> CreateConflictInfo(List<Workout> workouts, MergeResult<Workout> mergeResult)
        {
            return mergeResult.Conflicts.Select(n =>
                                    new ConflictedProperty(n.ConflictedProperty,
                                        GetIndexesWithDefinedProperty(n.ConflictedProperty, workouts)));
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
