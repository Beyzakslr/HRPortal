using HRPortal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.Repository
{
    public interface IEmployeeRepository: IGenericRepository<Employee>
    {
        Task<Employee> GetByEmailAsync(string email);
        Task<int> GetTotalEmployeeCountAsync();
        Task<int> GetOnLeaveEmployeeCountAsync();
    }
}
