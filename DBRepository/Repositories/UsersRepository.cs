using System;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class UsersRepository : BaseRepository, IUsersRepository
    {
        public UsersRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<bool> AddAsync(User user)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                await context.Users.AddAsync(user);
                var result = await context.SaveChangesAsync();

                return result > 0;
            }
        }

        public async Task<Result> GetUsersAsync(int page, Response response)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                string orderBy = response.orderBy == null ? "id" : response.orderBy.ToLower();
                string orderDirect = response.sortDirection == sort.DESC ? "DESC" : "";
                string order = $"{orderBy} {orderDirect}";

                string filters = response.filters == null ? "1=1" :
                    string.Join(" AND ", response.filters.Select(filter => $"lower({filter.Field.ToLower()}) LIKE '%{filter.Val.ToLower()}%'"));

                int skip = response.itemsCount * (page - 1);

                FormattableString sql = $@"SELECT 
                                ID as id, 
                                Name as name, 
                                BirthDate as birthdate, 
                                Sex as sex, 
                                RequestCount as requestcount
                            FROM Users
                            WHERE {filters}";
                FormattableString pageSql = $@"
                            {sql}
                            ORDER BY {order}
                            OFFSET {skip} ROWS
                            FETCH NEXT {response.itemsCount} ROWS ONLY";

                int usersCount = await context.Users.FromSqlInterpolated(sql).CountAsync();
                User[] users = await context.Users.FromSqlInterpolated(pageSql).ToArrayAsync();

                return new Result(users, page, usersCount / response.itemsCount);
            }
        }
    }
}