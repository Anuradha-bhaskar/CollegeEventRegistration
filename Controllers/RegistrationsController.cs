using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CollegeEventRegistration.Data;
using CollegeEventRegistration.Models;

namespace CollegeEventRegistration.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RegistrationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegistrationsController(AppDbContext context)
        {
            _context = context;
        }

        // POST api/registrations  — User registers for an event
        [HttpPost]
        [Authorize(Roles = "User")]
        public IActionResult Register(RegistrationRequest req)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            if (_context.Registrations.Any(r => r.EventId == req.EventId && r.UserId == userId))
                return BadRequest(new { message = "You are already registered for this event." });

            var ev = _context.Events.Find(req.EventId);
            if (ev == null) return NotFound(new { message = "Event not found." });
            if (ev.Seats <= 0) return BadRequest(new { message = "No seats available." });

            ev.Seats--;
            _context.Registrations.Add(new Registration { UserId = userId, EventId = req.EventId });
            _context.SaveChanges();
            return Ok(new { message = "Registered successfully." });
        }

        // GET api/registrations/my-events  — List of event IDs user is registered for
        [HttpGet("my-events")]
        public IActionResult GetMyEventIds()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var eventIds = _context.Registrations
                .Where(r => r.UserId == userId)
                .Select(r => r.EventId)
                .ToList();
            return Ok(eventIds);
        }

        // GET api/registrations/my  — logged-in user sees their own registrations
        [HttpGet("my")]
        public IActionResult GetMyRegistrations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var result = _context.Registrations
                .Where(r => r.UserId == userId)
                .Join(_context.Events, r => r.EventId, e => e.EventId,
                    (r, e) => new { r.Id, r.EventId, e.EventName, e.Date, e.Seats })
                .ToList();
            return Ok(result);
        }

        // GET api/registrations  — Admin sees all registrations
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllRegistrations()
        {
            var result = _context.Registrations
                .Join(_context.Users, r => r.UserId, u => u.Id, (r, u) => new { r, u })
                .Join(_context.Events, ru => ru.r.EventId, e => e.EventId,
                    (ru, e) => new
                    {
                        ru.r.Id,
                        ru.u.Username,
                        ru.r.EventId,
                        e.EventName,
                        e.Date
                    })
                .ToList();
            return Ok(result);
        }

        // GET api/registrations/event/{eventId}  — Admin sees participants of a specific event
        [HttpGet("event/{eventId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetParticipants(int eventId)
        {
            var result = _context.Registrations
                .Where(r => r.EventId == eventId)
                .Join(_context.Users, r => r.UserId, u => u.Id,
                    (r, u) => new { r.Id, u.Username, r.EventId })
                .ToList();
            return Ok(result);
        }
    }
}