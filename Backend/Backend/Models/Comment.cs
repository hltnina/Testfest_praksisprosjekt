//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace TestfestAPI.Models
//{
//    public class Comment
//    {
//        [Key]
//        public Guid CommentID { get; set; }
//        public string Content { get; set; }
//        public DateTime Created_at { get; set; } = DateTime.UtcNow;


//        // each comment belongs to one issue
//        public Guid IssueID { get; set; }
//        [ForeignKey("IssueID")]
//        public Issue Issue { get; set; }
//    }
//}
