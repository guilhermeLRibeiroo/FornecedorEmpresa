using Domain.Interfaces;
using Infrastructure.Context;
using Infrastructure.Repositories.GenericRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Infrastructure.Repositories.Provider
{
    public class ProviderRepository
        : GenericRepository<Domain.Entities.Provider>, IProviderRepository
    {
        public ProviderRepository(MainContext dbContext) : base(dbContext)
        {
        }

        public IQueryable<Domain.Entities.Provider> GetAll(string searchTerm)
        {
            if (searchTerm == null)
                throw new System.Exception("Search term not found.");
            return _dbContext.Set<Domain.Entities.Provider>()
                .Where(e => e.Active &&
                (e.Name.ToLower().Contains(searchTerm.ToLower()) ||
                 e.CPF.Contains(searchTerm.ToLower()) ||
                 e.CNPJ.Contains(searchTerm.ToLower()) ||
                 e.RegistrationDateForSearch.Contains(searchTerm.ToLower())))
                .AsNoTracking();
        }
    }
}
