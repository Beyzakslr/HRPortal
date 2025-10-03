using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.DTOs.Login
{
    public class UpdatePasswordRequest
    {
        public string UserName { get; set; }   
        public string NewPassword { get; set; }
    }
}
