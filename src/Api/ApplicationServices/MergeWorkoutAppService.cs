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
            var result = inputsToMerge.Select(n => _tcxMapper.MapToDomain(n)).ToList();

            var person = uploadModel.GetPersonDomain();
            var priority = uploadModel.GetMergePriority();

            //todo resolve priorty issues
            MergePriority mergePriority = MergePriority.Create(n => n.Altitude, n => n.Distance);
            result[1].DefinePriority(mergePriority);

            var mergeResult = result[0].Merge(result[1], person);

            if (!mergeResult.IsConflicted)
            {
                var tcxResult = _tcxMapper.ToTcx(mergeResult.Value);
                return new TcxMergeResult(tcxResult);
            }
            else
            {
                var conflictsList = mergeResult.Conflicts.Select(n => n.ConflictedProperty).ToList();
                return new TcxMergeResult(conflictsList);
            }
        }
    }
}
