using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CollegeEventRegistration.Data;
using CollegeEventRegistration.Models;

namespace CollegeEventRegistration.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/events  — any logged-in user
        [HttpGet]
        public IActionResult GetEvents()
        {
            return Ok(_context.Events.ToList());
        }

        // POST api/events  — Admin only
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult AddEvent(Event ev)
        {
            _context.Events.Add(ev);
            _context.SaveChanges();
            return Ok(ev);
        }
    }
}