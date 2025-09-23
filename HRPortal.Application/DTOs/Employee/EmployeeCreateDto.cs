namespace HRPortal.API.DTOs.Employee
{
    public class EmployeeCreateDto
    {
        public string EmployeeNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid JobPositionId { get; set; }
    }
}
