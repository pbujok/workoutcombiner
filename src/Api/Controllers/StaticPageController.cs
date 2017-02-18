using Api.ApplicationServices;
using Microsoft.AspNetCore.Mvc;

namespace Domain.Controllers
{
    [Route("api/[controller]")]
    public class StaticPageController : Controller
    {
        private StaticPageAppService staticPageService;

        public StaticPageController(StaticPageAppService staticPageService)
        {
            this.staticPageService = staticPageService;
        }

        // GET api/values/5
        [HttpGet("{name}")]
        public IActionResult Get(string name)
        {
            return Json(staticPageService.GetStaticPageByName(name));
        }
    }
}
