using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Servers;

namespace Domain.Statics
{
    public class StaticPageRepository
    {
        private IMongoCollection<StaticPage> _collection;

        public StaticPageRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<StaticPage>("staticPages");
        }

        public StaticPage GetStaticPageByName(string name)
        {
            var page = new StaticPage(name, name);
            return page;
        }

        public void Add(StaticPage staticPage)
        {
            _collection.InsertOne(staticPage);
        }
    }
}
