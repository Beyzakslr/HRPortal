using AutoMapper;
using HRPortal.Application.DTOs.Attendance;
using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HRPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IMapper _mapper;

        public AttendanceController(IAttendanceRepository attendanceRepository, IMapper mapper)
        {
            _attendanceRepository = attendanceRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Tüm devam kayıtlarını getirir
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var records = await _attendanceRepository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<AttendanceDto>>(records));
        }

        /// <summary>
        /// Belirli bir devam kaydını getirir
        /// </summary>
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var record = await _attendanceRepository.GetByIdAsync(id);
            if (record == null) return NotFound();
            return Ok(_mapper.Map<AttendanceDto>(record));
        }

        /// <summary>
        /// Belirli bir çalışanın tüm devam kayıtlarını getirir
        /// </summary>
        [HttpGet("employee/{employeeId:guid}")]
        public async Task<IActionResult> GetByEmployeeId(Guid employeeId)
        {
            var records = await _attendanceRepository.GetByEmployeeIdAsync(employeeId);
            return Ok(_mapper.Map<IEnumerable<AttendanceDto>>(records));
        }

        /// <summary>
        /// Belirli bir tarihe ait devam kayıtlarını getirir
        /// </summary>
        [HttpGet("date/{date}")]
        public async Task<IActionResult> GetByDate(DateTime date)
        {
            var records = await _attendanceRepository.GetByDateAsync(date);
            return Ok(_mapper.Map<IEnumerable<AttendanceDto>>(records));
        }

        /// <summary>
        /// Yeni devam kaydı ekler
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AttendanceCreateDto dto)
        {
            var record = _mapper.Map<Attendance>(dto);
            await _attendanceRepository.AddAsync(record);
            return Ok(_mapper.Map<AttendanceDto>(record));
        }

        /// <summary>
        /// Devam kaydını günceller
        /// </summary>
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] AttendanceUpdateDto dto)
        {
            var record = await _attendanceRepository.GetByIdAsync(id);
            if (record == null) return NotFound();

            _mapper.Map(dto, record);
            await _attendanceRepository.UpdateAsync(record);

            return Ok(_mapper.Map<AttendanceDto>(record));
        }

        /// <summary>
        /// Devam kaydını siler
        /// </summary>
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _attendanceRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
