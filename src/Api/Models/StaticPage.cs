using System.Text;
using System.Text.RegularExpressions;

namespace Api.Models
{
    public class StaticPage
    {
        public int Id { get; set; }

        public string Slug {get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public StaticPage()
        {

        }

        public StaticPage(string title, string description)
        {
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
