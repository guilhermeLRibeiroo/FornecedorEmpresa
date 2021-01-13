using Domain.Interfaces;
using Infrastructure.Context;
using Infrastructure.Repositories.GenericRepository;

namespace Infrastructure.Repositories.Company
{
    public class CompanyRepository
        : GenericRepository<Domain.Entities.Company>, ICompanyRepository
    {
        public CompanyRepository(MainContext dbContext) : base(dbContext)
        {
        }
    }
}
