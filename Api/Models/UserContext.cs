using Microsoft.EntityFrameworkCore;

namespace API_TASK2.Models
{
    public class UserContext:DbContext
    {
        public UserContext(DbContextOptions<UserContext>options):base(options) 
        { 
        
        }
        public DbSet<User_Registration>register{ get; set; }
        public DbSet<User_Login> login { get; set; }
        public DbSet<TaskModel> tasks { get ; set; }
        
    }
}
