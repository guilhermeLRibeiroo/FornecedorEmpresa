namespace Domain.Entities
{
    public class Company
        : BaseEntity
    {
        protected Company() { }
        
        public Company(string uf, string cnpj, string name)
        {
            UF = uf;
            CNPJ = cnpj;
            Name = name;
            Active = true;
        }

        public void Update(string uf, string cnpj, string name)
        {
            UF = uf;
            CNPJ = cnpj;
            Name = name;
        }

        public void Disable()
        {
            Active = false;
        }

        public string UF { get; protected set; }
        public string CNPJ { get; protected set; }
        public string Name { get; protected set; }
    }
}
