using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class TaskStatusDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TaskStatusDetailID { get; set; }
        public int TaskID { get; set; }
        public int TaskStatusID { get; set; }
        public int UserID { get; set; }
        public string Description { get; set; }
        public DateTime StatusUpdationDateTime { get; set; }
        [NotMapped]
        public string StatusUpdationDateTimeString { get; set; }

        [ForeignKey("TaskStatusID")]
        public virtual TaskStatus TaskStatus { get; set; }

        [ForeignKey("UserID")]
        public virtual AppUser User { get; set; }

    }
}