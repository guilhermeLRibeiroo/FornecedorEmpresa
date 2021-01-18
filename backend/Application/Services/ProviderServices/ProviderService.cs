using Application.ExtensionMethods;
using Application.Models.ProviderModels;
using Castle.Core.Internal;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services.ProviderServices
{
    public class ProviderService
        : IProviderService
    {
        protected IProviderRepository _providerRepository;
        protected ICompanyRepository _companyRepository;
        protected IPhoneNumberRepository _phoneNumberRepository;

        public ProviderService(IProviderRepository providerRepository, ICompanyRepository companyRepository, IPhoneNumberRepository phoneNumberRepository)
        {
            _providerRepository = providerRepository;
            _companyRepository = companyRepository;
            _phoneNumberRepository = phoneNumberRepository;
        }

        public async Task Create(ProviderRequestModel request)
        {
            if (request.CPF.IsNullOrEmpty() && request.CNPJ.IsNullOrEmpty())
                throw new Exception("To create a supplier you must fill in the CNPJ or CPF field.");
            var company = await _companyRepository.GetById(request.CompanyId);
            if (company == null)
                throw new Exception("No companies with the given Id were found.");
            if (!request.CNPJ.IsNullOrEmpty())
            {

                if (company.CNPJ != request.CNPJ)
                    throw new Exception("A legal entity must have the same CNPJ as the Company.");

                if (request.CNPJ.IsValidCNPJ())
                {
                    var provider = new Provider(request.Name, companyId: request.CompanyId, cnpj: request.CNPJ);
                    await _providerRepository.Create(provider);

                    var phoneEntities = request.PhoneNumbers.Where(d => d.IsValidPhoneNumber()).Select(d => new PhoneNumber(provider.Id, d)).ToList();
                    await _phoneNumberRepository.BulkInsert(phoneEntities);
                }
                else
                    throw new Exception("Must be a valid CNPJ");

            }
            else if (!request.CPF.IsNullOrEmpty())
            {
                if (!request.CPF.IsValidCPF())
                    throw new Exception("Invalid CPF.");

                if (request.BirthDate.IsNullOrEmpty())
                    throw new Exception("Invalid BirthDate.");

                var culture = CultureInfo.CreateSpecificCulture("es-ES");
                DateTime entityBirthDate;

                try
                {
                    entityBirthDate = DateTime.Parse(request.BirthDate, culture);
                }
                catch
                {
                    throw new Exception("Invalid date, try dd/MM/yyyy");
                }

                if (company.UF.Equals("PR"))
                {
                    if (entityBirthDate.AddYears(18) >= DateTime.Now)
                    {
                        throw new Exception("Provider must be over 18 years old.");
                    }
                }

                if (request.RG.IsNullOrEmpty())
                    throw new Exception("Invalid RG.");

                if (!request.RG.IsValidRG())
                    throw new Exception("Must be a valid RG.");
                        
                        
                var provider = new Provider(request.Name, request.CompanyId, cpf: request.CPF, rg: request.RG, birthDate: entityBirthDate);
                await _providerRepository.Create(provider);

                var phoneEntities = request.PhoneNumbers.Where(d => d.IsValidPhoneNumber()).Select(d => new PhoneNumber(provider.Id, d)).ToList();
                await _phoneNumberRepository.BulkInsert(phoneEntities);
            }
        }

        public async Task Delete(Guid id)
        {
            var provider = await _providerRepository.GetById(id);
            if (provider == null)
                throw new Exception("Provider not found.");
            await _phoneNumberRepository.DeleteAllByProviderId(id);
            provider.Disable();
            await _providerRepository.Update(id, provider);
        }

        public IList<ProviderResponseModel> GetAll()
        {
            var providers = _providerRepository.GetAll();

            IList<Provider> tempProviders = new List<Provider>();

            foreach (var provider in providers)
            {
                provider.PhoneNumbers = _phoneNumberRepository.GetByProviderId(provider.Id).Select(d => d.Number).ToList();
                tempProviders.Add(provider);
            }

            var culture = CultureInfo.CreateSpecificCulture("es-ES");
            return tempProviders.Select(d => new ProviderResponseModel
            {
                Id = d.Id,
                CompanyId = d.CompanyId,
                Name = d.Name,
                CPF = d.CPF,
                CNPJ = d.CNPJ,
                RG = d.RG,
                BirthDate = d.BirthDate == null ? "null" : d.BirthDate.Value.ToString("d", culture),
                RegistrationDate = d.RegistrationDate == null ? "null" : d.RegistrationDate.ToString("d", culture),
                PhoneNumbers = d.PhoneNumbers
            }).ToList();
        }

        public IList<ProviderResponseModel> GetAllWithFilter(string filter)
        {
            var providers = _providerRepository.GetAll(filter);

            IList<Provider> tempProviders = new List<Provider>();

            foreach (var provider in providers)
            {
                provider.PhoneNumbers = _phoneNumberRepository.GetByProviderId(provider.Id).Select(d => d.Number).ToList();
                tempProviders.Add(provider);
            }

            var culture = CultureInfo.CreateSpecificCulture("es-ES");

            return tempProviders.Select(d => new ProviderResponseModel
            {
                Id = d.Id,
                CompanyId = d.CompanyId,
                Name = d.Name,
                CPF = d.CPF,
                CNPJ = d.CNPJ,
                RG = d.RG,
                BirthDate = d.BirthDate == null ? "null" : d.BirthDate.Value.ToString("d", culture),
                RegistrationDate = d.RegistrationDate == null ? "null" : d.RegistrationDate.ToString("d", culture),
                PhoneNumbers = d.PhoneNumbers
            }).ToList();
        }

        public async Task Update(Guid id, ProviderRequestModel request)
        {
            if (request.CPF.IsNullOrEmpty() && request.CNPJ.IsNullOrEmpty())
                throw new Exception("To update a supplier you must fill in the CNPJ or CPF field.");
            if (!request.CNPJ.IsNullOrEmpty())
            {
                var company = await _companyRepository.GetById(request.CompanyId);
                if (company == null)
                    throw new Exception("No companies with the given Id were found.");

                if (company.CNPJ != request.CNPJ)
                    throw new Exception("A legal entity must have the same CNPJ as the Company.");

                if (request.CNPJ.IsValidCNPJ())
                {
                    var provider = await _providerRepository.GetById(id);
                    provider.Update(request.Name, companyId: request.CompanyId, cnpj: request.CNPJ);
                    await _providerRepository.Update(id, provider);

                    await _phoneNumberRepository.DeleteAllByProviderId(id);

                    var phoneEntities = request.PhoneNumbers.Where(d => d.IsValidPhoneNumber()).Select(d => new PhoneNumber(provider.Id, d)).ToList();
                    await _phoneNumberRepository.BulkInsert(phoneEntities);
                }
            }
            else if (!request.CPF.IsNullOrEmpty())
            {
                if (!request.CPF.IsValidCPF())
                    throw new Exception("Invalid CPF.");

                if (request.BirthDate.IsNullOrEmpty())
                    throw new Exception("Invalid BirthDate.");

                var culture = CultureInfo.CreateSpecificCulture("es-ES");
                DateTime entityBirthDate;

                try
                {
                    entityBirthDate = DateTime.Parse(request.BirthDate, culture);
                }
                catch
                {
                    throw new Exception("Invalid date, try dd/MM/yyyy");
                }

                if (request.RG.IsNullOrEmpty())
                    throw new Exception("Invalid RG.");

                var provider = await _providerRepository.GetById(id);
                provider.Update(request.Name, request.CompanyId, cpf: request.CPF, rg: request.RG, birthDate: entityBirthDate);
                await _providerRepository.Update(id, provider);

                await _phoneNumberRepository.DeleteAllByProviderId(id);

                var phoneEntities = request.PhoneNumbers.Where(d => d.IsValidPhoneNumber()).Select(d => new PhoneNumber(provider.Id, d)).ToList();
                await _phoneNumberRepository.BulkInsert(phoneEntities);
            }
        }
    }
}
