using Microsoft.EntityFrameworkCore;
using Resume_Portofile_app.Data;
using Resume_Portofile_app.Dto.MessageDto;
using Resume_Portofile_app.Models;
using Resume_Portofile_app.Services.IService;

namespace Resume_Portofile_app.Services.Service
{
    public class MessagesService : IMessageService
    {
        private readonly AppdbContext _context;

        public MessagesService(AppdbContext context)
        {
            _context = context;
        }
        public async Task<MessageResponseDto> AddMessageAsync(
            MessageDto dto)
        {
            var message = new Messages
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Subject = dto.Subject,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow
            };

            _context.Messages.Add(message);

            await _context.SaveChangesAsync();

            var result = await _context.Messages

                .Select(x => new MessageResponseDto
                {
                    MessageId = x.MessageId,
                    FullName = x.FullName,
                    Email = x.Email,
                    Subject = x.Subject,
                    Message = x.Message,
                    CreatedAt = x.CreatedAt
                })
                .FirstAsync();

            return result;
        }


        public async Task<List<MessageResponseDto>> GetAllMessagesAsync()
        {
            var result = await _context.Messages

                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new MessageResponseDto
                {
                    MessageId = x.MessageId,
                    FullName = x.FullName,

                    Email = x.Email,

                    Subject = x.Subject,
                    Message = x.Message,
                    CreatedAt = x.CreatedAt
                })
                .ToListAsync();

            return result;
        }
    

       public async Task<MessageResponseDto> UpdateMessage(int MessageId, MessageDto messageDto)
        {
                var message = await _context.Messages
               .FirstOrDefaultAsync(x => x.MessageId == MessageId);

                if (message == null)
                {
                    return null;
                }

                message.FullName = messageDto.FullName;
                message.Email = messageDto.Email;
                message.Subject = messageDto.Subject;
                message.Message = messageDto.Message;

                await _context.SaveChangesAsync();

                return new MessageResponseDto
                {
                    MessageId = message.MessageId,
                    FullName = message.FullName,
                    Email = message.Email,
                    Subject = message.Subject,
                    Message = message.Message,
                    CreatedAt = message.CreatedAt
                };
            }
          
        

    
     public async Task<bool> DeleteMessage(int MessageId)
        {
           
                var message = await _context.Messages.FirstOrDefaultAsync(x => x.MessageId == MessageId);
                if (message == null)
                {
                    return false;
                }
                _context.Remove(message);

                await _context.SaveChangesAsync();
            
           
            return true;
        }

        public async Task<MessageResponseDto?> GetMessageByIdsAsync(int messageId)
        {
            var message = await _context.Messages
                .Where(x => x.MessageId == messageId)
                .Select(x => new MessageResponseDto
                {
                    MessageId = x.MessageId,
                    FullName = x.FullName,
                    Email = x.Email,
                    Subject = x.Subject,
                    Message = x.Message,
                    CreatedAt = x.CreatedAt
                })
                .FirstOrDefaultAsync();

            return message;
        }

    }
}