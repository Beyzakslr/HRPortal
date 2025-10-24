using AutoMapper;
using HRPortal.API.DTOs.Employee;
using HRPortal.Application.DTOs.Attendance;
using HRPortal.Application.DTOs.Department;
using HRPortal.Application.DTOs.JobPosition;
using HRPortal.Application.DTOs.LeaveRequest;
using HRPortal.Application.DTOs.Payroll;
using HRPortal.Application.DTOs.PerformanceReview;
using HRPortal.Application.DTOs.User;
using HRPortal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Infrastructure.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Entity -> DTO
            CreateMap<Employee, EmployeeDto>()
            .ForMember(dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : null))
            .ForMember(dest => dest.JobPositionName,
                opt => opt.MapFrom(src => src.JobPosition != null ? src.JobPosition.Title : null));

            // Create DTO -> Entity
            CreateMap<EmployeeCreateDto, Employee>()
          .ForMember(
        dest => dest.DepartmentId, 
        opt => opt.Ignore()        
    )
    .ForMember(
        dest => dest.JobPositionId, 
        opt => opt.Ignore()         
    )
    .ForMember(dest => dest.Department, opt => opt.Ignore())
    .ForMember(dest => dest.JobPosition, opt => opt.Ignore());

            // Update DTO -> Entity
            CreateMap<EmployeeUpdateDto, Employee>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.EmployeeNumber, opt => opt.Ignore())
                          .ForMember(
        dest => dest.DepartmentId,
        opt => opt.Ignore()
    )
    .ForMember(
        dest => dest.JobPositionId,
        opt => opt.Ignore()
    )
    .ForMember(dest => dest.Department, opt => opt.Ignore())
    .ForMember(dest => dest.JobPosition, opt => opt.Ignore());

            // Entity → DTO
            CreateMap<Department, DepartmentDto>()
                .ForMember(dest => dest.EmployeeCount,
                           opt => opt.MapFrom(src => src.Employees.Count));

            // CreateDto → Entity
            CreateMap<DepartmentCreateDto, Department>();

            // UpdateDto → Entity
            CreateMap<DepartmentUpdateDto, Department>();

            // JobPosition
            CreateMap<JobPosition, JobPositionDto>().ReverseMap();
            CreateMap<JobPosition, JobPositionCreateDto>().ReverseMap();
            CreateMap<JobPosition, JobPositionUpdateDto>().ReverseMap();

            // LeaveRequest
            CreateMap<LeaveRequest, LeaveRequestDto>()
    .ForMember(dest => dest.FullName,
        opt => opt.MapFrom(src => src.Employee != null
            ? src.Employee.FullName: ""))
    .ForMember(dest => dest.Status,
        opt => opt.MapFrom(src => src.Status));
            CreateMap<LeaveRequest, LeaveRequestCreateDto>().ReverseMap();
            CreateMap<LeaveRequest, LeaveRequestUpdateDto>().ReverseMap();

            // PerformanceReview
            CreateMap<PerformanceReview, PerformanceReviewDto>().ReverseMap();
            CreateMap<PerformanceReview, PerformanceReviewCreateDto>().ReverseMap();
            CreateMap<PerformanceReview, PerformanceReviewUpdateDto>().ReverseMap();


            // Attendance
            CreateMap<Attendance, AttendanceDto>().ReverseMap();
            CreateMap<Attendance, AttendanceCreateDto>().ReverseMap();
            CreateMap<Attendance, AttendanceUpdateDto>().ReverseMap();


            // Payroll
            CreateMap<Payroll, PayrollDto>()
                .ForMember(dest => dest.NetSalary,
                           opt => opt.MapFrom(src => src.BaseSalary + src.Bonus - src.Deductions))
                    .ForMember(dest => dest.FullName, opt => opt.MapFrom(src =>
        src.Employee != null ? src.Employee.FullName : string.Empty));

            CreateMap<PayrollCreateDto, Payroll>();
            CreateMap<PayrollUpdateDto, Payroll>();

            // Entity → DTO
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role != null ? src.Role.RoleName : ""));

            // DTO → Entity
            CreateMap<CreateUserDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // hash controller’da yapılacak
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<UpdateUserDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore());
        }

    }
}
