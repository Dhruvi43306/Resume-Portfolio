namespace Resume_Portofile_app.Dto.UsersDto
{
    public class LoginResponseDto
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public string Token { get; set; }

        public getuserDto User { get; set; } = new getuserDto();
    }
}
