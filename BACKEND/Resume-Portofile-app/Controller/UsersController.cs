using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Resume_Portofile_app.Dto.UsersDto;
using Resume_Portofile_app.Services.IService;

namespace Resume_Portofile_app.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(
           LoginDto loginDto)
        {
            try
            {
                var result = await _userService.LoginAsync(loginDto);

                if (!result.Success)
                {
                    return Unauthorized(new
                    {
                        Success = false,
                        Message = result.Message
                    });
                }

                return Ok(new
                {
                    Success = true,
                    Message = result.Message,
                    Token = result.Token,
                    User = result.User
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new
                    {
                        Success = false,
                        Message = "Login failed.",
                        Error = ex.Message
                    }
                );
            }
            
        }
      
        
    }
}
