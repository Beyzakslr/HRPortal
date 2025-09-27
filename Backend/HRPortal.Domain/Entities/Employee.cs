using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Domain.Entities
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string EmployeeNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        public DateTime HireDate { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid JobPositionId { get; set; }

        public Department? Department { get; set; }
        public JobPosition? JobPosition { get; set; }
    }
}
