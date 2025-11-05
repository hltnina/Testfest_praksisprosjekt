//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using TestfestAPI.DatabaseContext;

//namespace TestfestAPI.Controllers
//{

// inject githubservice into issuescontroller and pass the JWT you got from OAuthService
//    [ApiController]
//    [Route("api/[controller]")]
//    public class IssuesController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public IssuesController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAllIssues()
//        {
//            var list = await _context.Issues
//                .Include(i => i.Status)
//                .Select(i => new
//                {
//                    id = i.IssueID,
//                    title = (i.Beskrivelse ?? "").Substring(0, Math.Min((i.Beskrivelse ?? "").Length, 80)), // første 80 tegn
//                    company = "Testfest",          // hard-kodet inntil felt kommer
//                    type = "Ukjent",            // hard-kodet inntil felt kommer
//                    status = i.Status.Beskrivelse, // string
//                    createdAt = i.Created_at,
//                    highlighted = false
//                })
//                .ToListAsync();

//            return Ok(list);
//        }
//    }
//}