using AutoMapper;
using HRPortal.Application.DTOs.User;
using HRPortal.Domain.Entities;
using HRPortal.Infrastructure.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly HRContext _context;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public UsersController(HRContext context, IConfiguration config, IMapper mapper )
        {
            _context = context;
            _config = config;
            _mapper = mapper;
        }


        /// <summary>
        /// Yeni kullanıcı ekle
        /// </summary>
        [HttpPost("create")]
        public IActionResult Create([FromBody] CreateUserDto dto)
        {
            var user = _mapper.Map<User>(dto);
            user.Id = Guid.NewGuid();
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            _context.Users.Add(user);
            _context.SaveChanges();

            // Tekrar DTO'ya dön
            var result = _mapper.Map<UserDto>(user);
            return Ok(result);
        }

        /// <summary>
        /// Kullanıcıyı id ile getir
        /// </summary>
        [HttpGet("{id:guid}")]
        public IActionResult GetById(Guid id)
        {
            var user = _context.Users.Include(u => u.Role).FirstOrDefault(x => x.Id == id);
            if (user == null)
                return NotFound("Kullanıcı bulunamadı");

            var dto = _mapper.Map<UserDto>(user);
            return Ok(dto);
        }

        /// <summary>
        /// Tüm kullanıcıları getir
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users.Include(u => u.Role).ToList();
            var dtos = _mapper.Map<List<UserDto>>(users);
            return Ok(dtos);
        }

        /// <summary>
        /// Kullanıcı güncelle
        /// </summary>
        [HttpPut("{id:guid}")]
        public IActionResult Update(Guid id, [FromBody] UpdateUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
                return NotFound("Kullanıcı bulunamadı");

            _mapper.Map(dto, user);
            _context.SaveChanges();

            var result = _mapper.Map<UserDto>(user);
            return Ok(result);
        }

        /// <summary>
        /// Kullanıcı sil
        /// </summary>
        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
                return NotFound("Kullanıcı bulunamadı");

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok("Kullanıcı silindi");
        }
    }
}
