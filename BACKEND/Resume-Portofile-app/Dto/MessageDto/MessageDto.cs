using System.ComponentModel.DataAnnotations;

namespace Resume_Portofile_app.Dto.MessageDto
{
    public class MessageDto
    {
        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;


    }
}
