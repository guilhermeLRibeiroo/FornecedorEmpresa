using Application.ExtensionMethods;
using Application.Models.CompanyModels;
using Castle.Core.Internal;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Source;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services.CompanyServices
{
    public class CompanyService
        : ICompanyService
    {
        protected ICompanyRepository _companyRepository;

        public CompanyService(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        public async Task Create(CompanyRequestModel request)
        {
            ValidateUF(request.UF);
            if (!request.CNPJ.IsValidCNPJ())
            {
                throw new Exception("Invalid CNPJ.");
            }

            var company = new Company(request.UF.ToUpper(), request.CNPJ, request.Name);
            await _companyRepository.Create(company);
        }

        public async Task Delete(Guid id)
        {
            var company = await _companyRepository.GetById(id);
            company.Disable();
            await _companyRepository.Update(id, company);
        }

        public IList<CompanyResponseModel> GetAll()
        {
            var companies = _companyRepository.GetAll().ToList();
            return companies.Select(d => new CompanyResponseModel
            {
                Id = d.Id,
                Name = d.Name,
                CNPJ = d.CNPJ,
                UF = d.UF
            }).ToList();
        }

        public async Task Update(Guid id, CompanyRequestModel request)
        {
            var company = await _companyRepository.GetById(id);
            ValidateUF(request.UF);
            if (!request.CNPJ.IsValidCNPJ())
            {
                throw new Exception("Invalid CNPJ.");
            }
            company.Update(request.UF, request.CNPJ, request.Name);
            await _companyRepository.Update(id, company);
        }

        private void ValidateUF(string uf)
        {
            if (uf.IsNullOrEmpty())
                throw new Exception("UF not found.");
            string value;
            try
            {
                bool ignoreCase = true;
                value = Enum.Parse(typeof(UF), uf, ignoreCase).ToString();
                if(!Enum.IsDefined(typeof(UF), value))
                    throw new Exception("UF not found.");
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found"))
                {
                    throw new Exception("UF not found.");
                }
            }
        }
    }
}
