using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Application.DTOs.User
{
    public class UpdateUserDto
    {
        public string Username { get; set; } = string.Empty;
        public Guid RoleId { get; set; }
    }
}
