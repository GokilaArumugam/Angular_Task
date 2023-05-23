using API_TASK2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_TASK2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly UserContext _dbContext;

        public TaskController(UserContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks(string? searchText)
        {
            
                if (searchText != "null" && searchText != null)
                {
                    return await _dbContext.tasks.Where(m => m.Description.ToLower() == searchText.ToLower()
                   || m.Date.ToString() == searchText || m.Status.ToLower() == searchText.ToLower()).ToListAsync();
                }
            return await _dbContext.tasks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTask(int id)
        {
            if(_dbContext.tasks==null) 
            {
                return NotFound();
            }
            var user=await _dbContext.tasks.FindAsync(id);
            if(user==null) 
            {
                return NotFound();
            }
            return await _dbContext.tasks.ToListAsync();
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<TaskModel>> PostTask(TaskModel task)
        {
          string message = string.Empty;
          var user=  _dbContext.tasks.Add(task);
           var result= await _dbContext.SaveChangesAsync();
           
            if (result != 0)
            {
                message = "Task Added Successful";
                return Ok(new { result, message });
            }
            else
            {
                message = "Error";
            }
            return Ok(task);
        }
        [HttpPut]
        public async Task<IActionResult>UpdateTask(int id, TaskModel task)
        {
           
            try
            {
                if (task == null)
                {
                    return BadRequest();
                }
                var retrivedTask = await _dbContext.tasks.FindAsync(id);
                if (retrivedTask == null)
                {
                    return BadRequest();
                }
                retrivedTask = task;
                _dbContext.Entry(retrivedTask).State = EntityState.Modified;
                 _dbContext.tasks.Update(retrivedTask);
                _dbContext.SaveChanges();
                return Ok(retrivedTask);
            }

            catch(Exception e) 
            {
                return BadRequest(e.Message);
            }
            
        }

        


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            if (_dbContext.tasks == null)
            {
                return NotFound();
            }
            var user = await _dbContext.tasks.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _dbContext.tasks.Remove(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
