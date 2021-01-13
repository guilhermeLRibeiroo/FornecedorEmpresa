using System;

namespace Domain.Entities
{
    public class PhoneNumber
        : BaseEntity
    {
        protected PhoneNumber() { }

        public PhoneNumber(Guid providerId, string number)
        {
            ProviderId = providerId;
            Number = number;
            Active = true;
        }

        public void Update(Guid providerId, string number)
        {
            ProviderId = providerId;
            Number = number;
        }

        public void Disable()
        {
            Active = false;
        }

        public Guid ProviderId { get; protected set; }
        public Provider Provider { get; protected set; }
        public string Number { get; protected set; }
    }
}
