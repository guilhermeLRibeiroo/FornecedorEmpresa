using System;

namespace Application.Models.ProviderModels
{
    public class ProviderResponseModel
        : ProviderModelBase
    {
        public Guid Id { get; set; }
        public string RegistrationDate { get; set; }
    }
}
