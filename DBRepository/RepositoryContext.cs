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

        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var rand = new Random((int)DateTime.Now.Ticks);

            List<Student> students = new List<Student>();
            for (int i = 0; i < 500000; i++)
                students.Add(new Student
                {
                    ID = Guid.NewGuid(),
                    Sex = (byte)Math.Round((double)rand.Next(0, 1000) / 1000),
                    FirstName = "FirstName_" + i.ToString(),
                    LastName = "LastName_" + i.ToString()
                });

            builder.Entity<Student>().HasIndex(s => s.UniqID).IsUnique();
            builder.Entity<Student>().HasData(students);
        }
    }
}