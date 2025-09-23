using HRPortal.Application.DTOs.JobPosition;
using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HRPortal.API.Controllers
{
    /// <summary>
    /// İş pozisyonları için CRUD işlemleri
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class JobPositionController : ControllerBase
    {
        private readonly IJobPositionRepository _jobPositionRepository;

        public JobPositionController(IJobPositionRepository jobPositionRepository)
        {
            _jobPositionRepository = jobPositionRepository;
        }

        /// <summary>
        /// Tüm iş pozisyonlarını listeler
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobPositions = await _jobPositionRepository.GetAllAsync();
            return Ok(jobPositions);
        }

        /// <summary>
        /// ID ile iş pozisyonunu getirir
        /// </summary>
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var jobPosition = await _jobPositionRepository.GetByIdAsync(id);
            if (jobPosition == null)
                return NotFound();

            return Ok(jobPosition);
        }

        /// <summary>
        /// Yeni iş pozisyonu oluşturur
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] JobPositionCreateDto dto)
        {
            var jobPosition = new JobPosition
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Salary = dto.Salary
            };

            await _jobPositionRepository.AddAsync(jobPosition);
            return Ok(jobPosition);
        }

        /// <summary>
        /// Var olan iş pozisyonunu günceller
        /// </summary>
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] JobPositionUpdateDto dto)
        {
            var jobPosition = await _jobPositionRepository.GetByIdAsync(id);
            if (jobPosition == null)
                return NotFound();

            jobPosition.Title = dto.Title;
            jobPosition.Salary = dto.Salary;

            await _jobPositionRepository.UpdateAsync(jobPosition);
            return Ok(jobPosition);
        }

        /// <summary>
        /// İş pozisyonunu siler
        /// </summary>
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _jobPositionRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}

