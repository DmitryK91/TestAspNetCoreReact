using System;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using NLog.Web;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;

namespace AdminTest
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLogBuilder.ConfigureNLog("NLog.config").GetCurrentClassLogger();

            try
            {
                logger.Debug("INIT");

                var host = BuildWebHost(args);

                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json");
                var config = builder.Build();

                using (var scope = host.Services.CreateScope())
                {
                    var services = scope.ServiceProvider;

                    var factory = services.GetRequiredService<IRepositoryContextFactory>();

                    factory.CreateDbContext(config.GetConnectionString("DefaultConnection")).Database.Migrate();
                }

                AppContext.SetSwitch("System.Net.Http.UseSocketsHttpHandler", false);

                host.Run();
            }
            catch (Exception exception)
            {
                logger.Error(exception, "Stopped program because of exception");
                throw;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>()
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
            })
            .UseNLog()
            .UseUrls("http://localhost:3001/")
            .Build();
    }
}
