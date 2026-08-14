using Resume_Portofile_app.Dto.MessageDto;

namespace Resume_Portofile_app.Services.IService
{
    public interface IMessageService
    {
        Task<MessageResponseDto> AddMessageAsync(MessageDto dto);


        Task<List<MessageResponseDto>> GetAllMessagesAsync();

        Task<MessageResponseDto> GetMessageByIdsAsync(int messageId);


        Task<MessageResponseDto> UpdateMessage(int meesageId,MessageDto messageDto);

        Task<bool> DeleteMessage(int messageId);
    }
}
