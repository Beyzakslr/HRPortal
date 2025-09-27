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
    public class PerformanceReviewRepository : GenericRepository<PerformanceReview>, IPerformanceReviewRepository
    {
        public PerformanceReviewRepository(HRContext context) : base(context)
        {
        }

        public async Task<double> GetAverageScoreByEmployeeIdAsync(Guid employeeId)
        {
            var reviews = await _dbSet
        .Where(r => r.EmployeeId == employeeId)
        .ToListAsync();

            if (!reviews.Any())
                return 0; // hiç değerlendirme yoksa 0 dönelim

            return reviews.Average(r => r.Score);
        }

        public async Task<IEnumerable<PerformanceReview>> GetByEmployeeIdAsync(Guid employeeId)
        {
            return await _dbSet
                .Where(r => r.EmployeeId == employeeId)
                .ToListAsync();
        }
    }
}
