using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using Resume_Portofile_app.Data;
using Resume_Portofile_app.Dto.UsersDto;
using Resume_Portofile_app.Models;
using Resume_Portofile_app.Services.IService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BC = BCrypt.Net.BCrypt;

namespace Resume_Portofile_app.Services.Service
{
    public class UserService : IUserService
    {
       
        private readonly AppdbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(AppdbContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
             
           
        }
      


        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
            {
                return new LoginResponseDto
                {
                    Success = false,
                    Message = "Invalid email or password.",
                    Token = string.Empty

                };

            }
            bool passwordValid = BC.Verify(loginDto.Password, user.Password);
            if (!passwordValid)
            {
                return new LoginResponseDto
                {
                    Success = false,
                    Message = "Invalid password.",
                    Token = string.Empty
                };
            }
            var role = await _context.UserRoles.FirstOrDefaultAsync(x => x.RoleId == user.RoleId);
            if (role == null)
            {
                return new LoginResponseDto
                {
                    Success = false,
                    Message = "User role not found.",
                    Token = string.Empty
                };
            }

            var token = GenerateJwtToken(user, role.RoleName);




            return new LoginResponseDto
            {
                Success = true,
                Message = "User Login successfully.",
                Token = token,

                User = new getuserDto
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    RoleId = 1,
                    RoleName = role.RoleName
                }
               
            };
        }

        private string GenerateJwtToken(Users user,string RoleName)
        {
            var jwtsettings = _configuration.GetSection("Jwt");
            var key = jwtsettings["Key"];
            if (string.IsNullOrEmpty(key))
            {
                throw new Exception("JWT Key is missing in appsettings.json");
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.UserId.ToString()
                ),

              

                new Claim(
                    ClaimTypes.Email,
                    user.Email
                ),

                new Claim(
                    ClaimTypes.Role,
                    RoleName
                ),

                new Claim(
                    "RoleId",
                    user.RoleId.ToString()
                )
            };
            var token = new JwtSecurityToken(
                issuer: jwtsettings["Issuer"],
                audience: jwtsettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
     
    }
}
