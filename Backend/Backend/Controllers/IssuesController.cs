using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class IssuesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
