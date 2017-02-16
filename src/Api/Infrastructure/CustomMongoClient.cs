using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Api.Infrastructure
{
    public class CustomMongoClient : MongoClient
    {
        public CustomMongoClient() : base("mongodb://localhost:27017")
        {

        }
    }
}
