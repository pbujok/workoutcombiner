using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers

{
    [Route("api/[controller]")]
    public class StaticPageController : Controller
    {
        [HttpGet("{name}", Name = "GetStaticPage")]
        public IActionResult GetByName(string name)
        {
            return new ObjectResult(new Page(name));
        }
    }
}
