using HRPortal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.DTOs.LeaveRequest
{
    public class LeaveRequestUpdateDto
    {
        public DateTime? StartDate { get; set; }  
        public DateTime? EndDate { get; set; }   
        public string? Reason { get; set; }
        public LeaveStatus? Status { get; set; }  
    }
}
