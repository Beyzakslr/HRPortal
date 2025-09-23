using HRPortal.Application.DTOs.Department;
using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HRPortal.API.Controllers
{
    /// <summary>
    /// Departman CRUD işlemlerini yönetir.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController: ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        /// <summary>
        /// Tüm departmanları listeler.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departments = await _departmentRepository.GetAllAsync();
            return Ok(departments);
        }

        /// <summary>
        /// Belirtilen ID'ye sahip departmanı getirir.
        /// </summary>
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var department = await _departmentRepository.GetByIdAsync(id);
            if (department == null)
                return NotFound();

            return Ok(department);
        }

        /// <summary>
        /// Yeni bir departman oluşturur.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DepartmentCreateDto dto)
        {
            var department = new Department
            {
                Id = Guid.NewGuid(),
                Name = dto.Name
            };

            await _departmentRepository.AddAsync(department);
            return Ok(department);
        }

        /// <summary>
        /// Var olan departmanı günceller.
        /// </summary>
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] DepartmentUpdateDto dto)
        {
            var department = await _departmentRepository.GetByIdAsync(id);
            if (department == null)
                return NotFound();

            department.Name = dto.Name;
            await _departmentRepository.UpdateAsync(department);

            return Ok(department);
        }

        /// <summary>
        /// Departmanı siler.
        /// </summary>
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _departmentRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}

