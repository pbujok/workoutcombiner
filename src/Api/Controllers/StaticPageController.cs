using Domain.Statics;
using Microsoft.AspNetCore.Mvc;

namespace Domain.Controllers
{
    [Route("api/[controller]")]
    public class StaticPageController : Controller
    {
        private StaticPageRepository staticPageRepository;

        public StaticPageController(StaticPageRepository staticPageRepository)
        {
            this.staticPageRepository = staticPageRepository;
        }

        // GET api/values/5
        [HttpGet("{name}")]
        public IActionResult Get(string name)
        {
            return Json(staticPageRepository.GetStaticPageByName(name));
        }
    }
}
