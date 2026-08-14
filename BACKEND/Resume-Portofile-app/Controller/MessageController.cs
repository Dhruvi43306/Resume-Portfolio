using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Resume_Portofile_app.Dto.MessageDto;
using Resume_Portofile_app.Services.IService;
using Resume_Portofile_app.Services.Service;
using System.Security.Claims;

namespace Resume_Portofile_app.Controllers
{
    [ApiController]
    [Route("api/messages")]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessagesController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost]
        public async Task<IActionResult> AddMessage(
            [FromBody] MessageDto dto)
        {


            var result = await _messageService.AddMessageAsync(dto);

            return Ok(new
            {
                message = "Message sent successfully",
                data = result
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllMessages()
        {
            var result = await _messageService.GetAllMessagesAsync();

            return Ok(result);
        }

        [HttpGet("{messageId}")]
        public async Task<IActionResult> GetMessageById(int messageId)
        {
            var result = await _messageService.GetMessageByIdsAsync(messageId);

            if (result == null)
            {
                return NotFound(new
                {
                    message = "Message Not Found",
                    success = false
                });
            }

            return Ok(new
            {
                message = "Message Found Successfully",
                success = true,
                data = result
            });
        }


        [HttpPut("{messageId:int}")]
        public async Task<IActionResult> UpdateMessage(int messageId,MessageDto dto)
        {
            var result = await _messageService.UpdateMessage(messageId, dto);

            if (result == null)
            {
                return NotFound(new
                {
                    message = "Message Not Found",
                    success = false
                });
            }

            return Ok(new
            {
                message = "Message Updated Successfully",
                success = true,
                data = result
            });
        }
        [HttpDelete("{messageId:int}")]
        public async Task<IActionResult> DeleteMessage(int messageId)
        {
            var result = await _messageService.DeleteMessage(messageId);

            if (!result)
            {
                return NotFound(new
                {
                    message = "Message Not Found",
                    success = false
                });
            }

            return Ok(new
            {
                message = "Message Deleted Successfully",
                success = true
            });
        }
    }
}