using AutoMapper;
using HRPortal.Application.DTOs.Payroll;
using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HRPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PayrollController : ControllerBase
    {
        private readonly IPayrollRepository _payrollRepository;
        private readonly IMapper _mapper;

        public PayrollController(IPayrollRepository payrollRepository, IMapper mapper)
        {
            _payrollRepository = payrollRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var payrolls = await _payrollRepository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<PayrollDto>>(payrolls));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var payroll = await _payrollRepository.GetByIdAsync(id);
            if (payroll == null) return NotFound();
            return Ok(_mapper.Map<PayrollDto>(payroll));
        }

        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetByEmployeeId(Guid employeeId)
        {
            var payrolls = await _payrollRepository.GetByEmployeeIdAsync(employeeId);
            return Ok(_mapper.Map<IEnumerable<PayrollDto>>(payrolls));
        }

        [HttpPost]
        public async Task<IActionResult> Create(PayrollCreateDto dto)
        {
            var payroll = _mapper.Map<Payroll>(dto);
            await _payrollRepository.AddAsync(payroll);
            return CreatedAtAction(nameof(GetById), new { id = payroll.Id }, _mapper.Map<PayrollDto>(payroll));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, PayrollUpdateDto dto)
        {
            var payroll = await _payrollRepository.GetByIdAsync(id);
            if (payroll == null) return NotFound();

            _mapper.Map(dto, payroll);
            await _payrollRepository.UpdateAsync(payroll);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var payroll = await _payrollRepository.GetByIdAsync(id);
            if (payroll == null) return NotFound();

            await _payrollRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
