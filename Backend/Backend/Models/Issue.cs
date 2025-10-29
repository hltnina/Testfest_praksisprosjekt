using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestfestAPI.Models
{
    public class Issue
    {
        [Key]
        public Guid IssueID { get; set; }
        public string Beskrivelse { get; set; }
        public DateTime Created_at { get; set; } = DateTime.UtcNow;
        public DateTime? FerdigBehandletDato { get; set; }
        public bool KanReteste { get; set; }

        // foreign key to User (who reported the issue)
        public Guid? UserID { get; set; }
        [ForeignKey("UserID")]
        public User? User { get; set; }

        // Foreign key to Status
        public Guid StatusID { get; set; }
        [ForeignKey("StatusID")]
        public Status Status { get; set; } 

        // one issue can have multiple comments
        public ICollection<Comment>? Comments { get; set; }


        // one issue can have one fix
        public Fix? Fix { get; set; }
    }
}
