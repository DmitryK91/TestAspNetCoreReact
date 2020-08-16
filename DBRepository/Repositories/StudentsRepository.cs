using System;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class StudentsRepository : BaseRepository, IStudentsRepository
    {
        public StudentsRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<Student> AddAsync(Student user)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var result = await context.Students.AddAsync(user);
            await context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<bool> DeleteAsync(Guid StudentID)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            context.Students.Remove(new Student { ID = StudentID });
            var result = await context.SaveChangesAsync();

            return result == 1;
        }

        public async Task<bool> EditAsync(Student student)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            context.Students.Update(student);
            var result = await context.SaveChangesAsync();

            return result == 1;
        }

        public async Task<Result> GetAsync(int page, Response response)
        {
            using var context = ContextFactory.CreateDbContext(ConnectionString);

            string orderBy = response.orderBy == null ? "id" : response.orderBy;
            string orderDirect = response.sortDirection == sort.DESC ? "DESC" : "";
            string order = $"{orderBy} {orderDirect}";

            string filters = response.filters == null ? "1=1" :
                string.Join(" AND ", response.filters.Select(filter => $"lower({filter.Field}) LIKE '%{filter.Val.ToLower()}%'"));

            int skip = response.visibleCount * (page - 1);

            string sql = $@"SELECT 
                            ID as id,
                            Sex as sex,
                            FirstName as firstName,
                            LastName as lastName,
                            Patronymic as patronymic,
                            UniqID as uniqID
                        FROM Students
                        WHERE {filters}";
            string pageSql = $@"
                        {sql}
                        ORDER BY {order}
                        LIMIT {response.visibleCount.ToString()}
                        OFFSET {skip.ToString()}";

            int count = await context.Students.FromSqlRaw(sql).CountAsync();
            Student[] students = await context.Students.FromSqlRaw(pageSql).ToArrayAsync();

            return new Result(students, page, (int)Math.Ceiling((decimal)count / response.visibleCount), count);
        }
    }
}