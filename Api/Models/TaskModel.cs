using System.ComponentModel.DataAnnotations;

namespace API_TASK2.Models
{
    public class TaskModel
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }
}
 