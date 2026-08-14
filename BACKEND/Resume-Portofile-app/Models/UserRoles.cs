using System.ComponentModel.DataAnnotations;

namespace Resume_Portofile_app.Models
{
    public class UserRoles
    {
        [Key]
        public int RoleId { get; set; }

        public string RoleName { get; set; }

        public ICollection<Users> Users { get; set; } = new List<Users>();
    }
}
