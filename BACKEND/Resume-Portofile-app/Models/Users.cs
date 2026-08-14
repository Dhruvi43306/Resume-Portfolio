using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Resume_Portofile_app.Models
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }

        public int RoleId { get; set; }

        [ForeignKey(nameof(RoleId))]
        public UserRoles UserRoles { get; set; }


    }
}
