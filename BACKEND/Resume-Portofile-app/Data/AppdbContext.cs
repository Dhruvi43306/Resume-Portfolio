using Microsoft.EntityFrameworkCore;
using Resume_Portofile_app.Models;

namespace Resume_Portofile_app.Data
{
    public class AppdbContext:DbContext
    {
        public AppdbContext(DbContextOptions<AppdbContext> options):base(options)
        { }

        public DbSet<UserRoles> UserRoles { get; set; }

        public DbSet<Users> Users { get; set; }

        public DbSet<Messages> Messages { get; set; }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Users>()
                .HasOne(u => u.UserRoles)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);



        }
    }
}
