using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using TestfestAPI.Enums;

namespace TestfestAPI.Models
{
    public class User
    {
        [Key]
        public Guid UserID { get; set; } = Guid.NewGuid();

        [Required]
        public UserRole Rolle { get; set; } // Enum (bruker, tjenesteeier, admin)

        public string? Email { get; set; }

        //only tjenesteeiere and admins should have this
        public string? GithubID { get; set; }
        public DateTime Created_at { get; set; } = DateTime.UtcNow;

        //relation: one user can submit many issues
       // public ICollection<Issue>? Issues { get; set; }

    }
}
