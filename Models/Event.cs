namespace CollegeEventRegistration.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public string? EventName { get; set; }
        public DateTime Date { get; set; }
        public int Seats { get; set; }
    }
}