using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using HRPortal.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Infrastructure.Repository
{
    public class DepartmentRepository : GenericRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(HRContext context) : base(context)
        {
        }

        public async Task<Department?> GetByNameAsync(string name)
        {
            return await _dbSet.FirstOrDefaultAsync(d => d.Name == name);
        }
    }
}
