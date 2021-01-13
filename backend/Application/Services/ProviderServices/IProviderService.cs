using Application.Models.ProviderModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services.ProviderServices
{
    public interface IProviderService
    {
        Task Update(Guid id, ProviderRequestModel request);
        Task Create(ProviderRequestModel request);
        Task Delete(Guid id);
        IList<ProviderResponseModel> GetAll();
        IList<ProviderResponseModel> GetAllWithFilter(string filter);
    }
}
