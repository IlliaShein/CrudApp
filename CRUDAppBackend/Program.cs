using DbLib.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CRUDAppBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            const string corsPolicyName = "Cors";
            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(
                option => option
                .AddPolicy(corsPolicyName,
                    corsPolicy => corsPolicy
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()));
            string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<MyDbContext>(options =>
                options.UseSqlServer(connectionString));
            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                var logger = serviceProvider.GetRequiredService<ILogger<Program>>();

                try
                {
                    using var dbContext = serviceProvider.GetRequiredService<MyDbContext>();
                    dbContext.Database.OpenConnection();
                    dbContext.Database.CloseConnection();
                    logger.LogInformation("Database connected");
                }
                catch (Exception ex)
                {
                    logger.LogError("Database connection error: " + ex.Message);
                }
            }

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(corsPolicyName);
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

            app.MapControllers();

            app.Run();
        }
    }
}