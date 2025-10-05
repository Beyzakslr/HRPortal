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
    public class PayrollRepository : GenericRepository<Payroll>, IPayrollRepository
    {
        private readonly HRContext _context;
        public PayrollRepository(HRContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Payroll>> GetAllWithEmployee()
        {
            return await _context.Payrolls
        .Include(p => p.Employee)
        .ToListAsync();
        }

        public async Task<IEnumerable<Payroll>> GetByEmployeeIdAsync(Guid employeeId)
        {
            return await _context.Payrolls
                .Where(p => p.EmployeeId == employeeId)
                .ToListAsync();
        }
    }
}
