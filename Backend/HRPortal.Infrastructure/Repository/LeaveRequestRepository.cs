using AutoMapper;
using AutoMapper.QueryableExtensions;
using HRPortal.Application.DTOs.LeaveRequest;
using HRPortal.Application.Repository;
using HRPortal.Domain.Entities;
using HRPortal.Domain.Enums;
using HRPortal.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRPortal.Infrastructure.Repository
{
    public class LeaveRequestRepository : GenericRepository<LeaveRequest>, ILeaveRequestRepository
    {
        public readonly IMapper _mapper;
        public LeaveRequestRepository(HRContext context, IMapper mapper = null) : base(context)
        {
            _mapper = mapper;
        }

        public async Task ApproveLeaveRequestAsync(Guid id)
        {
            var leaveRequest = await _dbSet.FindAsync(id);
            if (leaveRequest == null) return;

            leaveRequest.Status = LeaveStatus.Approved;
            await _context.SaveChangesAsync();
        }

        public async Task<List<LeaveRequestDto>> GetAllWithEmployeeAsync()
        {
            var leaveRequests = await _context.LeaveRequests
        .Include(l => l.Employee)
        .ToListAsync();

            return _mapper.Map<List<LeaveRequestDto>>(leaveRequests);
        }

        public async Task<IEnumerable<LeaveRequest>> GetByEmployeeIdAsync(Guid employeeId)
        {
            return await _dbSet.Where(lr => lr.EmployeeId == employeeId).ToListAsync();
        }

        public async Task<IEnumerable<LeaveRequest>> GetByStatusAsync(LeaveStatus status)
        {
            return await _dbSet.Where(lr => lr.Status == status).ToListAsync();
        }


    }
}
