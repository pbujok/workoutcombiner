using Api.Infrastructure;
using Domain.Statics;
using FluentAssertions;
using Xunit;

namespace Api.Test.Integration
{
    public class StaticPageRepositoryTest
    {
        [Fact]
        public void InsertStaticPageByName_IntegrationTest_NoOutput()
        {
            var mongoDbClient = new CustomMongoClient();
            var repo = new StaticPageRepository(mongoDbClient.GetDatabase("statics"));

            repo.Add(new StaticPage("test123", "test12345"));
        }

        [Fact]
        public void GetStaticPageByName_IntegrationTest_CorrectOutput()
        {
            var mongoDbClient = new CustomMongoClient();
            var repo = new StaticPageRepository(mongoDbClient.GetDatabase("statics"));

            var result = repo.GetStaticPageByName("test123");

            result.Slug.Should().Be("test123");
        }       
    }
}
