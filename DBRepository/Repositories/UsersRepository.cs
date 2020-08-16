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

        public Task<User> AddAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(Guid userID)
        {
            throw new NotImplementedException();
        }

        public Task<bool> EditAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetAsync(Guid userID)
        {
            throw new NotImplementedException();
        }
    }
}