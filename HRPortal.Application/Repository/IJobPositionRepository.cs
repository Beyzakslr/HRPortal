using HRPortal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.Repository
{
    public interface IJobPositionRepository:IGenericRepository<JobPosition>
    {
        Task<JobPosition?> GetByTitleAsync(string title);
    }
}
