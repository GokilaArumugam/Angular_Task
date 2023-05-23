using System.ComponentModel.DataAnnotations;

namespace API_TASK2.Models
{
    public class User_Registration
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
