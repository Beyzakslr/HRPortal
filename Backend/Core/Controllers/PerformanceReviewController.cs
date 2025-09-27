using AutoMapper;
using HRPortal.Application.DTOs.PerformanceReview;
using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HRPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerformanceReviewController : ControllerBase
    {
        private readonly IPerformanceReviewRepository _reviewRepository;
        private readonly IMapper _mapper;

        public PerformanceReviewController(IPerformanceReviewRepository reviewRepository, IMapper mapper)
        {
            _reviewRepository = reviewRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Tüm performans değerlendirmelerini getirir
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _reviewRepository.GetAllAsync();
            var dto = _mapper.Map<IEnumerable<PerformanceReviewDto>>(reviews);
            return Ok(dto);
        }

        /// <summary>
        /// Belirli bir performans değerlendirmesini getirir
        /// </summary>
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var review = await _reviewRepository.GetByIdAsync(id);
            if (review == null) return NotFound();
            return Ok(_mapper.Map<PerformanceReviewDto>(review));
        }

        /// <summary>
        /// Belirli bir çalışanın tüm performans değerlendirmelerini getirir
        /// </summary>
        [HttpGet("employee/{employeeId:guid}")]
        public async Task<IActionResult> GetByEmployeeId(Guid employeeId)
        {
            var reviews = await _reviewRepository.GetByEmployeeIdAsync(employeeId);
            var dto = _mapper.Map<IEnumerable<PerformanceReviewDto>>(reviews);
            return Ok(dto);
        }

        /// <summary>
        /// Yeni performans değerlendirmesi ekler
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PerformanceReviewCreateDto dto)
        {
            var review = _mapper.Map<PerformanceReview>(dto);
            await _reviewRepository.AddAsync(review);
            return Ok(_mapper.Map<PerformanceReviewDto>(review));
        }

        /// <summary>
        /// Performans değerlendirmesini günceller
        /// </summary>
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] PerformanceReviewUpdateDto dto)
        {
            var review = await _reviewRepository.GetByIdAsync(id);
            if (review == null) return NotFound();

            _mapper.Map(dto, review);
            await _reviewRepository.UpdateAsync(review);

            return Ok(_mapper.Map<PerformanceReviewDto>(review));
        }

        /// <summary>
        /// Performans değerlendirmesini siler
        /// </summary>
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _reviewRepository.DeleteAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Belirli bir çalışanın ortalama performans puanını getirir
        /// </summary>
        [HttpGet("employee/{employeeId:guid}/average-score")]
        public async Task<IActionResult> GetAverageScore(Guid employeeId)
        {
            var average = await _reviewRepository.GetAverageScoreByEmployeeIdAsync(employeeId);
            return Ok(new { EmployeeId = employeeId, AverageScore = average });
        }
    }
}

