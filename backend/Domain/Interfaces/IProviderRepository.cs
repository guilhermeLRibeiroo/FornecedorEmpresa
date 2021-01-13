using Domain.Entities;
using System.Linq;

namespace Domain.Interfaces
{
    public interface IProviderRepository : IGenericRepository<Provider>
    {
        IQueryable<Provider> GetAll(string searchTerm);
    }
}
