using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public static class CollectonExtenctions
    {
        public static void EachPair<T>(this ReadOnlyCollection<T> list, 
            Action<T, T> forEachPair)
        {
            var trackCount = list.Count;
            for (var i = 0; i < trackCount - 1; ++i)
            {
                forEachPair.Invoke(list[i], list[i + 1]);
            }
        }

        public static void EachPair<T>(this List<T> list,
            Action<T, T> forEachPair)
        {
            new ReadOnlyCollection<T>(list).EachPair(forEachPair);
        }
    }
}
