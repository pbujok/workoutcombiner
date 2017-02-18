using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Common;
using Domain.WorkoutMerge;

namespace Domain.WorkoutMerge
{
    public class TracksPair : ValueObject<TracksPair>
    {
        readonly MergePriority primaryPriority = MergePriority.Empty;
        readonly MergePriority secondaryPriority = MergePriority.Empty;

        private TracksPair(TracksPair tracksPair,
            MergePriority primaryPriority,
            MergePriority secondaryPriority)
            : this(tracksPair.Primary, tracksPair.Secondary)
        {
            this.secondaryPriority = secondaryPriority;
            this.primaryPriority = primaryPriority;
        }

        public TracksPair(List<TrackItem> primaryCollection,
            List<TrackItem> secondaryCollection)
        {
            Primary = primaryCollection;
            Secondary = secondaryCollection;
        }

        protected override bool EqualsCore(TracksPair other)
        {
            if (HasBoth == other.HasBoth)
                return true;

            return ReferenceEquals(other, this);
        }

        public List<TrackItem> Primary { get; }
        public List<TrackItem> Secondary { get; }

        private bool HasBoth => Primary.Count > 0 && Secondary.Count > 0;

        public TracksPair SetPriority(MergePriority primaryPriority,
                MergePriority secondaryPriority)
        {
            return new TracksPair(this, primaryPriority, secondaryPriority);
        }

        public MergeResult<List<TrackItem>> Merge()
        {
            if (!HasBoth)
                return MergeResult<List<TrackItem>>.Success(new List<TrackItem>());

            List<TrackItem> primaryTrack = Primary.Select(n => n).ToList();
            List<TrackItem> secondaryTrack = Secondary.Select(n => n).ToList();

            var itemsList = new List<TrackItem>();

            var primaryLastIndex = primaryTrack.Count - 1;
            for (var i = primaryLastIndex; i >= 0; --i)
            {
                var mergeResult = MergeMatchingSecondary(secondaryTrack, primaryTrack[i]);

                if (mergeResult != null)
                {
                    if (mergeResult.IsConflicted)
                        return MergeResult<List<TrackItem>>.Conflict(mergeResult.Conflicts);
                    else
                        itemsList.Add(mergeResult.Value);
                }
            }

            itemsList.Reverse();
            return MergeResult<List<TrackItem>>.Success(itemsList);
        }

        private MergeResult<TrackItem> MergeMatchingSecondary(List<TrackItem> secondaryTrack, TrackItem primaryItem)
        {
            MergeResult<TrackItem> mergeResult = null;
            var primaryItemMatchedOnce = false;
            var secondaryLastIndex = secondaryTrack.Count - 1;
            for (var i = secondaryLastIndex; i >= 0; --i)
            {
                var secondaryItem = secondaryTrack[i];
                if (primaryItem.IsMatchingTo(secondaryItem))
                {
                    if (!primaryItemMatchedOnce)
                    {
                        mergeResult = primaryItem
                            .SetPriority(primaryPriority)
                            .Merge(secondaryItem.SetPriority(secondaryPriority));
                        primaryItemMatchedOnce = true;
                    }
                    secondaryTrack.Remove(secondaryItem);
                }
                else if (primaryItemMatchedOnce)
                    break;
            }
            return mergeResult;
        }
    }
}