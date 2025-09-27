using HRPortal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.Repository
{
    public interface IPerformanceReviewRepository:IGenericRepository<PerformanceReview>
    {
        Task<IEnumerable<PerformanceReview>> GetByEmployeeIdAsync(Guid employeeId);
        Task<double> GetAverageScoreByEmployeeIdAsync(Guid employeeId);
    }
}
