using API_TASK2.Migrations;
using API_TASK2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_TASK2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _userContext;
        public UserController(UserContext userContext)
        {
            _userContext = userContext;
        }
        [HttpPost("[action]")]

        public async Task<ActionResult<User_Registration>> RegisterUser(User_Registration registration)
        {
            string message = string.Empty;
            var users = _userContext.register.Where(m => m.Email == registration.Email).FirstOrDefault();

            if (users == null)
            {
                try
                {
                    var user = _userContext.register.Add(registration);
                    var result = await _userContext.SaveChangesAsync();
                    if (result != 0)
                    {
                        message = "Reistered Successful";
                        return Ok(new { result, message });
                    }
                }
                catch (Exception ex)
                {
                    message = ex.Message;
                    return BadRequest(ex);
                }
            }
            else
            {
                message = "Provided Email_ID is already Registered!";
                return BadRequest(message);
            }
            return Ok();
        }


        [HttpPost("[action]")]
        public async Task<ActionResult<User_Login>> PostUser(User_Login loginuser)
        {
            string message = string.Empty;
            if (loginuser == null)
            {
                return BadRequest();
            }
            var users = _userContext.register.Where(m => m.Email == loginuser.Email).FirstOrDefault();
            if (users != null)
            {
                try
                {
                    var user = _userContext.login.Add(loginuser);
                    var result = await _userContext.SaveChangesAsync();
                    if (result != 0)
                    {
                        message = "Login Successful";
                        return Ok(new { users, message });
                    }

                }

                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            else
            {
                message = "User Not Found";
                return BadRequest(message);
            }
            return Ok();

        }

        [HttpPut("[action]")]
        public async Task<ActionResult<User_Registration>> UpdatePassword(User_Registration userupdate)
        {
            string message = string.Empty;
            if (userupdate == null)
            {
                return BadRequest();
            }
            var users = _userContext.register.Where(m => m.Email == userupdate.Email).FirstOrDefault();
            if (users != null)
            {
                try
                { 
                    users.Name = userupdate.Name;
                    users.Age = Convert.ToInt32(userupdate.Age);
                    users.Email = userupdate.Email;
                    users.Password= userupdate.Password;
                    _userContext.Entry(users).State= EntityState.Modified;
                    _userContext.SaveChanges();
                    message = "Update Profile Successful";
                    return Ok(new { message });
                }
                catch(Exception ex) 
                {
                    return BadRequest(ex);
                }
            }
            else
            {
                message = "Provided Email Not Found";
                return BadRequest(message);
            }
            return Ok();
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            if (_userContext.register == null)
            {
                return NotFound();
            }
            var user = await _userContext.register.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _userContext.register.Remove(user);
            await _userContext.SaveChangesAsync();
            return Ok();
        }
    }
}