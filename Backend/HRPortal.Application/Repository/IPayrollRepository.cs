using HRPortal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.Repository
{
    public interface IPayrollRepository:IGenericRepository<Payroll>
    {
        Task<IEnumerable<Payroll>> GetByEmployeeIdAsync(Guid employeeId);
        Task<IEnumerable<Payroll>> GetAllWithEmployee();
    }
}
