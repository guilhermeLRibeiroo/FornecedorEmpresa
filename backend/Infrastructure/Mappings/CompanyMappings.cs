using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Mappings
{
    public class CompanyMappings
        : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.Property(d => d.CNPJ).HasColumnName(nameof(Company.CNPJ)).IsRequired();
            builder.Property(d => d.Name).HasColumnName(nameof(Company.Name)).IsRequired();
            builder.Property(d => d.UF).HasColumnName(nameof(Company.UF)).IsRequired();
            builder.Property(d => d.Active).HasColumnName(nameof(Company.Active)).IsRequired();
        }
    }
}
