using AutoMapper;
using HRPortal.API.DTOs.Employee;
using HRPortal.Application.DTOs.User;
using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using HRPortal.Infrastructure.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRPortal.API.Controllers
{
    /// <summary>
    /// Employee işlemlerini yönetir.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {

        private readonly IEmployeeRepository _employeeRepository;
        private readonly IGenericRepository<Employee> _genericRepository;
        private readonly IMapper _mapper;
        private readonly HRContext _context;

        public EmployeesController(
     IEmployeeRepository employeeRepository,
     IGenericRepository<Employee> genericRepository,
     IMapper mapper,
     HRContext context)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _genericRepository = genericRepository ?? throw new ArgumentNullException(nameof(genericRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context;
        }

        /// <summary>
        /// id ye göre getirir
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);
            if (employee == null) return NotFound();

            var dto = _mapper.Map<EmployeeDto>(employee);
            return Ok(dto);
        }

        /// <summary>
        /// Employee oluşturur
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] EmployeeCreateDto dto)
        {

            var department = await _context.Departments
                .FirstOrDefaultAsync(d => d.Name.Trim().ToLower() == dto.DepartmentName.Trim().ToLower());

            if (department == null)
            {
                ModelState.AddModelError(nameof(dto.DepartmentName), $"'{dto.DepartmentName.Trim()}' adında bir departman bulunamadı.");
                return BadRequest(ModelState);
            }


            var positionNameFromDto = dto.JobPositionName.Trim().ToLower();
            var jobPosition = await _context.JobPositions
                .FirstOrDefaultAsync(jp =>
                    jp.Title.Trim().ToLower() == positionNameFromDto
                );

            if (jobPosition == null)
            {
                ModelState.AddModelError(nameof(dto.JobPositionName), $"'{positionNameFromDto}' adında bir pozisyon bulunamadı.");
                return BadRequest(ModelState);
            }

            var employee = _mapper.Map<Employee>(dto);

            employee.DepartmentId = department.Id;
            employee.JobPositionId = jobPosition.Id; 

            await _genericRepository.AddAsync(employee);

            var resultDto = _mapper.Map<EmployeeDto>(employee);
            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, resultDto);
        }

        /// <summary>
        /// Employee günceller
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] EmployeeUpdateDto dto)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound($"ID'si {id} olan çalışan bulunamadı.");
            }
            var department = await _context.Departments
                .FirstOrDefaultAsync(d => d.Name.Trim().ToLower() == dto.DepartmentName.Trim().ToLower());

            if (department == null)
            {
                ModelState.AddModelError(nameof(dto.DepartmentName), $"'{dto.DepartmentName.Trim()}' adında bir departman bulunamadı.");
                return BadRequest(ModelState);
            }

            var positionNameFromDto = dto.JobPositionName.Trim().ToLower();
            var jobPosition = await _context.JobPositions
                .FirstOrDefaultAsync(jp =>
                    jp.Title.Trim().ToLower() == positionNameFromDto 
                );

            if (jobPosition == null)
            {
                ModelState.AddModelError(nameof(dto.JobPositionName), $"'{positionNameFromDto}' adında bir pozisyon bulunamadı.");
                return BadRequest(ModelState);
            }

            _mapper.Map(dto, employee);

            employee.DepartmentId = department.Id;
            employee.JobPositionId = jobPosition.Id;
            await _context.SaveChangesAsync();

            var resultDto = _mapper.Map<EmployeeDto>(employee);
            return Ok(resultDto);


        }

        /// <summary>
        /// Employee siler
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);
            if (employee == null) return NotFound($"ID'si {id} olan çalışan bulunamadı.");
            await _employeeRepository.DeleteAsync(id);
            await _context.SaveChangesAsync();
            return NoContent();
        }



        /// <summary>
        ///Bütün Employee listeler
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employees
                                 .Include(e => e.Department)
                                 .Include(e => e.JobPosition)
                                 .ToListAsync();

            var employeeDtos = _mapper.Map<List<EmployeeDto>>(employees);

            return Ok(employeeDtos);
        }

        /// <summary>
        /// Toplam çalışan sayısını getiren endpoint
        /// </summary>
        /// <returns></returns>
        [HttpGet("Count")]
        public async Task<IActionResult> GetEmployeeCount()
        {
            var totalCount = await _employeeRepository.GetTotalEmployeeCountAsync();
            return Ok(new { totalEmployees = totalCount });
        }


        /// <summary>
        /// Toplam izinli çalışan sayısını getiren endpoint
        /// </summary>
        /// <returns></returns>
        [HttpGet("LeaveCount")]
        public async Task<IActionResult> GetOnLeaveEmployeeCount()
        {
            var totalCount = await _employeeRepository.GetOnLeaveEmployeeCountAsync();
            return Ok(new { totalEmployees = totalCount });
        }
    }
}
