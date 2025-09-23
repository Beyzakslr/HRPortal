using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.DTOs.Payroll
{
    public class PayrollDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime PayDate { get; set; }
        public decimal BaseSalary { get; set; }
        public decimal Bonus { get; set; }
        public decimal Deductions { get; set; }
        public decimal NetSalary => BaseSalary + Bonus - Deductions;
    }
}
