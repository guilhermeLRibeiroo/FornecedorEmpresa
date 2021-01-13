using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Mappings
{
    public class ProviderMappings
        : IEntityTypeConfiguration<Provider>
    {
        public void Configure(EntityTypeBuilder<Provider> builder)
        {
            builder.Property(d => d.Name).HasColumnName(nameof(Provider.Name)).IsRequired();
            builder.HasOne(d => d.Company).WithMany().HasForeignKey(nameof(Provider.CompanyId)).OnDelete(DeleteBehavior.Restrict);
            builder.Property(d => d.Active).HasColumnName(nameof(Provider.Active)).IsRequired();
            builder.Property(d => d.CNPJ).HasColumnName(nameof(Provider.CNPJ));
            builder.Property(d => d.CPF).HasColumnName(nameof(Provider.CPF));
            builder.Property(d => d.RG).HasColumnName(nameof(Provider.RG));
            builder.Property(d => d.BirthDate).HasColumnName(nameof(Provider.BirthDate));
            builder.Property(d => d.RegistrationDateForSearch).HasColumnName(nameof(Provider.RegistrationDateForSearch));
        }
    }
}
