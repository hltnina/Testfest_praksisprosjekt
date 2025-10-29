using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestfestAPI.Models
{
    public class Fix
    {
        [Key]
        public Guid FixID { get; set; }
        public string Tittel { get; set; } 
        public string Instruksjon { get; set; }
        public string Opprettet_av { get; set; }
        public DateTime OpprettetDato { get; set; } = DateTime.UtcNow;


        // each fix belongs to one issue
        public Guid IssueID { get; set; }
        [ForeignKey("IssueID")]
        public Issue Issue { get; set; } = null!;
    }
}
