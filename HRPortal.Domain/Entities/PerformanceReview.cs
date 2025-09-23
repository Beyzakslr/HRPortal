using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Domain.Entities
{
    public class PerformanceReview
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime ReviewDate { get; set; }
        public string Comments { get; set; } = string.Empty;
        public int Score { get; set; } // 1-5 arası

        public Employee? Employee { get; set; }
    }
}
