using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.DTOs.Attendance
{
    public class AttendanceUpdateDto
    {
        public DateTime Date { get; set; }
        public bool IsPresent { get; set; }
    }
}
