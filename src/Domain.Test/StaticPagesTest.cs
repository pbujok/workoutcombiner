using Domain.Statics;
using FluentAssertions;
using Xunit;

namespace Domain.Test
{
    public class StaticPagesTest
    {
        [Fact]
        public void StaticPageSlug_CorrectTitle_CorrectOutput()
        {
            var staticPage = new StaticPage("Test page' with; un,expected chars", "test");

            staticPage.Slug.Should().Be("test-page-with-unexpected-chars");
        }
    }
}
