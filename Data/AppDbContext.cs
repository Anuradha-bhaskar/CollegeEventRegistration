using Microsoft.EntityFrameworkCore;
using CollegeEventRegistration.Models;

namespace CollegeEventRegistration.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; } = null!;
        public DbSet<Registration> Registrations { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }
}