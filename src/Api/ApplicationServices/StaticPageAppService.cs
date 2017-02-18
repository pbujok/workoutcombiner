using System;
using Api.Models;

namespace Api.ApplicationServices
{
    public class StaticPageAppService
    {
        public StaticPage GetStaticPageByName(string name)
        {
            var page = new StaticPage(name, name);
            return page;
        }

        public void Add(StaticPage staticPage)
        {
            throw new NotImplementedException();
        }
    }
}
