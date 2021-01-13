using Domain.Interfaces;
using Infrastructure.Context;
using Infrastructure.Repositories.GenericRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.PhoneNumber
{
    public class PhoneNumberRepository
        : GenericRepository<Domain.Entities.PhoneNumber>, IPhoneNumberRepository
    {
        public PhoneNumberRepository(MainContext dbContext) : base(dbContext)
        {
        }

        public async Task BulkInsert(List<Domain.Entities.PhoneNumber> numbers)
        {
            await _dbContext.Set<Domain.Entities.PhoneNumber>().AddRangeAsync(numbers);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAllByProviderId(Guid providerId)
        {
            var numbers = _dbContext.Set<Domain.Entities.PhoneNumber>()
                .Where(d => d.Active && d.ProviderId == providerId);

            foreach (var number in numbers)
            {
                number.Disable();
            }

            _dbContext.Set<Domain.Entities.PhoneNumber>().UpdateRange(numbers);
            await _dbContext.SaveChangesAsync();
        }

        public IQueryable<Domain.Entities.PhoneNumber> GetByProviderId(Guid providerId)
            => _dbContext.Set<Domain.Entities.PhoneNumber>()
                .Where(d => d.Active && d.ProviderId == providerId).AsNoTracking();
    }
}
