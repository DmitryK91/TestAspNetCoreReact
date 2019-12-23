using DBRepository.Interfaces;


namespace DBRepository.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly string ConnectionString;
        protected readonly IRepositoryContextFactory ContextFactory;

        public BaseRepository(string connectionString, IRepositoryContextFactory contextFactory)
        {
            ConnectionString = connectionString;
            ContextFactory = contextFactory;
        }
    }
}