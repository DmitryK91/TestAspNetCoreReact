using System;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IUsersRepository
    {
        Task<User> AddAsync(User user);

        Task<User> GetAsync(Guid userID);

        Task<bool> EditAsync(User user);

        Task<bool> DeleteAsync(Guid userID);
    }
}