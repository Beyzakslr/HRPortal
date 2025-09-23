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
    public class AttendanceRepository : GenericRepository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(HRContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Attendance>> GetByDateAsync(DateTime date)
        {
            return await _dbSet.Where(a => a.Date.Date == date.Date).ToListAsync();
        }

        public async Task<IEnumerable<Attendance>> GetByEmployeeIdAsync(Guid employeeId)
        {
            return await _dbSet.Where(a => a.EmployeeId == employeeId).ToListAsync();
        }
    }
}
