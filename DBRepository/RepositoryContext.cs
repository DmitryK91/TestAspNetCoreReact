using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var rand = new Random((int)DateTime.Now.Ticks);
            List<User> users = new List<User>();
            for (int i = 0; i < 500000; i++)
                users.Add(new User
                {
                    ID = i + 1,
                    Name = "test user " + i.ToString(),
                    BirthDate = DateTime.Now.AddDays(-rand.Next(365 * 20, 365 * 50)).Date,
                    Sex = (byte)Math.Round((double)rand.Next(0, 1000) / 1000),
                    RequestCount = rand.Next(0, 100)
                });

            builder.Entity<User>().HasData(users);
        }
    }
}