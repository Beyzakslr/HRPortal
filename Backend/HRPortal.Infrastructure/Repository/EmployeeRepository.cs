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
    public class EmployeeRepository : GenericRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(HRContext context) : base(context) { }

        public async Task<Employee> GetByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task<int> GetOnLeaveEmployeeCountAsync()
        {
            var today = DateTime.UtcNow.Date;

            // Aktif izinli çalışanları bul: İzin başlangıcı geçmiş, bitişi henüz gelmemiş
            var onLeaveEmployees = await _context.Employees
                .Where(e => e.LeaveRequests
                    .Any(lr => lr.StartDate <= today && lr.EndDate >= today && lr.Status == Domain.Enums.LeaveStatus.Approved))
                .CountAsync();

            return onLeaveEmployees;
        }

        public async Task<int> GetTotalEmployeeCountAsync()
        {
            return await _context.Employees.CountAsync();
        }
    }
}
