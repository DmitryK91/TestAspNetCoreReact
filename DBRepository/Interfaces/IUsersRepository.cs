using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IUsersRepository
    {
        Task<bool> AddAsync(User user);

        Task<Result> GetUsersAsync(int Page, Response response);
    }
}