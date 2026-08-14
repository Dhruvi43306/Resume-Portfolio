using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Resume_Portofile_app.Data
{
    public class AppdbContextFactory : IDesignTimeDbContextFactory<AppdbContext>
    {
        public AppdbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false)
                .AddUserSecrets<AppdbContextFactory>(optional: true)
                .Build();

            var connectionString =
                configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new Exception("DefaultConnection was NOT found.");
            }

            // TEMPORARY diagnostic
            var builder = new MySqlConnector.MySqlConnectionStringBuilder(
                connectionString);

            Console.WriteLine("===== EF DESIGN TIME CONNECTION =====");
            Console.WriteLine($"Server   : {builder.Server}");
            Console.WriteLine($"Port     : {builder.Port}");
            Console.WriteLine($"Database : {builder.Database}");
            Console.WriteLine($"User     : {builder.UserID}");
            Console.WriteLine($"SSL Mode : {builder.SslMode}");
            Console.WriteLine($"SSL CA   : {builder.SslCa}");
            Console.WriteLine("Password : [HIDDEN]");
            Console.WriteLine("====================================");

            var optionsBuilder =
                new DbContextOptionsBuilder<AppdbContext>();

            optionsBuilder.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString));

            return new AppdbContext(optionsBuilder.Options);
        }
    }
}