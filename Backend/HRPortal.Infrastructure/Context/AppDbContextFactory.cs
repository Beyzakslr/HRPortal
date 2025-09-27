using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Infrastructure.Context
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<HRContext>
    {
        public HRContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<HRContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=HRPortalDb;Username=postgres;Password=123456");

            return new HRContext(optionsBuilder.Options);
        }
    
    }
}
