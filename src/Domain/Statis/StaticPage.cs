using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Domain.Common;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Statics
{
    public class StaticPage : Entity
    {
        [BsonElement("slug")]
        public string Slug {get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        public StaticPage(string title, string description)
        {
            Id = Guid.NewGuid().ToString();
            Title = title;
            Description = description;
            Slug = GetTitleSlug(Title);
        }

        private static string GetTitleSlug(string value)
        {
            //First to lower case 
            value = value.ToLowerInvariant();
            //Remove all accents
            var bytes = Encoding.GetEncoding("UTF-8").GetBytes(value);
            value = Encoding.ASCII.GetString(bytes);
            //Replace spaces 
            value = Regex.Replace(value, @"\s", "-", RegexOptions.Compiled);
            //Remove invalid chars 
            value = Regex.Replace(value, @"[^\w\s\p{Pd}]", "", RegexOptions.Compiled);
            //Trim dashes from end 
            value = value.Trim('-', '_');
            //Replace double occurences of - or \_ 
            value = Regex.Replace(value, @"([-_]){2,}", "$1", RegexOptions.Compiled);

            return value;
        }
    }
}
