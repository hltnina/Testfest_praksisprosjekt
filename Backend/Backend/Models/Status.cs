using System.ComponentModel.DataAnnotations;

namespace TestfestAPI.Models
{
    public class Status
    {
        [Key]
        public Guid StatusID { get; set; }
        public string Beskrivelse { get; set; }


        // one status can be assigned to many issues
        public ICollection<Issue>? Issues { get; set; }
    }
}
