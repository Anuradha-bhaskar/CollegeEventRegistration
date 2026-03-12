namespace CollegeEventRegistration.Models
{
    public class LoginRequest
    {
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class RegistrationRequest
    {
        public int EventId { get; set; }
    }
}
