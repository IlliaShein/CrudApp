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

            builder.Services.AddScoped(provider =>
            {
                var next = provider.GetRequiredService<RequestDelegate>();
                return new ErrorHandlingMiddleware(next);
            });

            var app = builder.Build();

            app.UseMiddleware<ErrorHandlingMiddleware>();

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
