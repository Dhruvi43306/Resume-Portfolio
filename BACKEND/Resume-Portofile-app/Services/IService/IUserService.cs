using Resume_Portofile_app.Dto.UsersDto;

namespace Resume_Portofile_app.Services.IService
{
    public interface IUserService
    {
        //public Task<List<getuserDto>> GetAllUsers();

     

        Task<LoginResponseDto> LoginAsync(LoginDto loginDto);

    }
}
