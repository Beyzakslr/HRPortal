using HRPortal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.Repository
{
    public interface IAttendanceRepository:IGenericRepository<Attendance>
    {
        Task<IEnumerable<Attendance>> GetByEmployeeIdAsync(Guid employeeId);
        Task<IEnumerable<Attendance>> GetByDateAsync(DateTime date);
    }
}
