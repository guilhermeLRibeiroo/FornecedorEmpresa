using Application.Models.CompanyModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services.CompanyServices
{
    public interface ICompanyService
    {
        Task Update(Guid id, CompanyRequestModel request);
        Task Create(CompanyRequestModel request);
        Task Delete(Guid id);
        IList<CompanyResponseModel> GetAll();
    }
}