using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Provider
        : BaseEntity
    {
        protected Provider() { }

        public Provider(string name, Guid companyId, string cpf = null, string cnpj = null, string rg = null, DateTime? birthDate = null)
        {
            Name = name;
            CompanyId = companyId;
            CPF = cpf;
            CNPJ = cnpj;
            RG = rg;
            BirthDate = birthDate;
            RegistrationDate = DateTime.Now;
            RegistrationDateForSearch = RegistrationDate.ToString("dd/MM/yyyy");
            Active = true;
        }

        public void Update(string name, Guid companyId, string cpf = null, string cnpj = null, string rg = null, DateTime? birthDate = null)
        {
            Name = name;
            CompanyId = companyId;
            CPF = cpf;
            CNPJ = cnpj;
            RG = rg;
            BirthDate = birthDate;
        }

        public void Disable()
        {
            Active = false;
        }

        public Guid CompanyId { get; protected set; }
        public Company Company { get; protected set; }
        public string Name { get; protected set; }
        public string CPF { get; protected set; }
        public string CNPJ { get; protected set; }
        public string RG { get; protected set; }
        public DateTime? BirthDate { get; protected set; }
        public DateTime RegistrationDate { get; set; }
        public string RegistrationDateForSearch { get; set; }

        [System.ComponentModel.DataAnnotations.Schema.NotMapped]
        public List<string> PhoneNumbers { get; set; }
    }
}
