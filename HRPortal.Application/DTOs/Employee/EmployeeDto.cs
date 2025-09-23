namespace HRPortal.API.DTOs.Employee
{
    public class EmployeeDto
    {
        public Guid Id { get; set; }
        public string EmployeeNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid JobPositionId { get; set; }

        // Opsiyonel: Department ve JobPosition detayları
        public string? DepartmentName { get; set; }
        public string? JobPositionName { get; set; }
    }
}
