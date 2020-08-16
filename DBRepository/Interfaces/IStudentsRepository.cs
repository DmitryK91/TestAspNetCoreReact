using System;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IStudentsRepository
    {
        Task<Student> AddAsync(Student student);

        Task<Result> GetAsync(int Page, Response response);

        Task<bool> EditAsync(Student student);

        Task<bool> DeleteAsync(Guid StudentID);
    }
}