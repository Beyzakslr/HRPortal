namespace HRPortal.API.DTOs.Employee
{
    public class EmployeeUpdateDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public string JobPositionName { get; set; } = string.Empty;
    }
}
