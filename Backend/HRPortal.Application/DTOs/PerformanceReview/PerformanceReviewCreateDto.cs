using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.DTOs.PerformanceReview
{
    public class PerformanceReviewCreateDto
    {
        public Guid EmployeeId { get; set; }
        public DateTime ReviewDate { get; set; }
        public string Comments { get; set; } = string.Empty;
        public int Score { get; set; }
    }
}
