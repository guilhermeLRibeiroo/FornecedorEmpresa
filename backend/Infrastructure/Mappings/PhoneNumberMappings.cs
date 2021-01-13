using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Mappings
{
    public class PhoneNumberMappings
        : IEntityTypeConfiguration<PhoneNumber>
    {
        public void Configure(EntityTypeBuilder<PhoneNumber> builder)
        {
            builder.HasOne(d => d.Provider).WithMany().HasForeignKey(nameof(PhoneNumber.ProviderId)).OnDelete(DeleteBehavior.Restrict);
            builder.Property(d => d.Number).HasColumnName(nameof(PhoneNumber.Number)).IsRequired();
            builder.Property(d => d.Active).HasColumnName(nameof(PhoneNumber.Active)).IsRequired();
        }
    }
}
