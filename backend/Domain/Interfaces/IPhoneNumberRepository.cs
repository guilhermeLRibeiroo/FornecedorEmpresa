using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IPhoneNumberRepository : IGenericRepository<PhoneNumber>
    {
        Task BulkInsert(List<PhoneNumber> numbers);
        IQueryable<PhoneNumber> GetByProviderId(Guid providerId);
        Task DeleteAllByProviderId(Guid providerId);
    }
}
