using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.DTOs.JobPosition
{
    public class JobPositionUpdateDto
    {

        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Salary { get; set; }
    }
}
