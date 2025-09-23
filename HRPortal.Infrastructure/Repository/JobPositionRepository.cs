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
    public class JobPositionRepository : GenericRepository<JobPosition>, IJobPositionRepository
    {
        public JobPositionRepository(HRContext context) : base(context)
        {
        }

        public async Task<JobPosition?> GetByTitleAsync(string title)
        {
            return await _dbSet.FirstOrDefaultAsync(j => j.Title == title);
        }
    
    }
}
