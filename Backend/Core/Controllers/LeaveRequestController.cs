using AutoMapper;
using HRPortal.Application.DTOs.LeaveRequest;
using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using HRPortal.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace HRPortal.API.Controllers
{
    /// <summary>
    /// İzin talepleri (Leave Request) CRUD işlemleri
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestRepository _leaveRequestRepository;
        private readonly IMapper _mapper;

        public LeaveRequestController(ILeaveRequestRepository leaveRequestRepository, IMapper mapper )
        {
            _leaveRequestRepository = leaveRequestRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Tüm izin taleplerini listeler
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var leaveRequests = await _leaveRequestRepository.GetAllWithEmployeeAsync();
            return Ok(leaveRequests);
        }

        /// <summary>
        /// ID ile izin talebini getirir
        /// </summary>
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var leaveRequest = await _leaveRequestRepository.GetByIdAsync(id);
            if (leaveRequest == null)
                return NotFound();

            return Ok(leaveRequest);
        }

        /// <summary>
        /// Belirli çalışanın izin taleplerini getirir
        /// </summary>
        [HttpGet("employee/{employeeId:guid}")]
        public async Task<IActionResult> GetByEmployee(Guid employeeId)
        {
            var leaveRequests = await _leaveRequestRepository.GetByEmployeeIdAsync(employeeId);
            return Ok(leaveRequests);
        }

        /// <summary>
        /// Duruma göre izin taleplerini listeler
        /// </summary>
        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetByStatus(LeaveStatus status)
        {
            var leaveRequests = await _leaveRequestRepository.GetByStatusAsync(status);
            return Ok(leaveRequests);
        }

        /// <summary>
        /// Yeni izin talebi oluşturur
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LeaveRequestCreateDto dto)
        {
            var leaveRequest = _mapper.Map<LeaveRequest>(dto);
            leaveRequest.Id = Guid.NewGuid();
            leaveRequest.Status = LeaveStatus.Pending;

            await _leaveRequestRepository.AddAsync(leaveRequest);

            var resultDto = _mapper.Map<LeaveRequestDto>(leaveRequest);
            return Ok(resultDto);
        }

        /// <summary>
        /// Mevcut izin talebini günceller
        /// </summary>
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] LeaveRequestUpdateDto dto)
        {
            var leaveRequest = await _leaveRequestRepository.GetByIdAsync(id);
            if (leaveRequest == null)
                return NotFound();

            _mapper.Map(dto, leaveRequest); 
            await _leaveRequestRepository.UpdateAsync(leaveRequest);

            var resultDto = _mapper.Map<LeaveRequestDto>(leaveRequest);
            return Ok(resultDto);
        }

        /// <summary>
        /// İzin talebini siler
        /// </summary>
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _leaveRequestRepository.DeleteAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Belirtilen izin talebini onaylar
        /// </summary>
        [HttpPatch("{id:guid}/approve")]
        public async Task<IActionResult> Approve(Guid id)
        {
            var leaveRequest = await _leaveRequestRepository.GetByIdAsync(id);
            if (leaveRequest == null)
                return NotFound();

            leaveRequest.Status = LeaveStatus.Approved;
            await _leaveRequestRepository.UpdateAsync(leaveRequest);

            var dto = _mapper.Map<LeaveRequestDto>(leaveRequest);
            return Ok(dto);
        }

        /// <summary>
        /// Belirtilen izin talebini reddeder
        /// </summary>

        [HttpPatch("{id:guid}/reject")]
        public async Task<IActionResult> Reject(Guid id)
        {
            var leaveRequest = await _leaveRequestRepository.GetByIdAsync(id);
            if (leaveRequest == null) return NotFound();

            leaveRequest.Status = LeaveStatus.Rejected;
            await _leaveRequestRepository.UpdateAsync(leaveRequest);

            var dto = _mapper.Map<LeaveRequestDto>(leaveRequest);
            return Ok(dto);
        }
    }
}

