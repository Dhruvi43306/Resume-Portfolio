namespace Resume_Portofile_app.Dto.MessageDto
{
    public class MessageResponseDto
    {
        public int MessageId { get; set; }


        public string? FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}
