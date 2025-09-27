using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Domain.Entities
{
    public class JobPosition
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Salary { get; set; }

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
