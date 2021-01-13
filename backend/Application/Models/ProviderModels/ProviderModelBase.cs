using System;
using System.Collections.Generic;

namespace Application.Models.ProviderModels
{
    public class ProviderModelBase
    {
        public Guid CompanyId { get; set; }
        public string CNPJ { get; set; }
        public string Name { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public string BirthDate { get; set; }
        public List<string> PhoneNumbers { get; set; }
    }
}
