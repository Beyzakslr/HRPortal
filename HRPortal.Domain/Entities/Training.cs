using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Domain.Entities
{
    public class Training
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Instructor { get; set; } = string.Empty;

        public ICollection<Employee> Participants { get; set; } = new List<Employee>();
    }
}
