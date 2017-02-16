using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class MergeController : Controller
    {
        private readonly IHostingEnvironment _environment;

        public MergeController(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Upload model)
        {
            try
            {
                var uploads = Path.Combine(_environment.WebRootPath, "uploads");
                //foreach (var file in new)
                //{
                //    if (file.Length > 0)
                //    {
                //        using (var fileStream = new FileStream(Path.Combine(uploads, file.FileName), FileMode.Create))
                //        {
                //            await file.CopyToAsync(fileStream);
                //        }
                //    }
                //}
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
