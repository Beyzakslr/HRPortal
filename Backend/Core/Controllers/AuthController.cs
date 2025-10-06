using HRPortal.Application.DTOs.Login;
using HRPortal.Domain.Entities;
using HRPortal.Infrastructure.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HRPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly HRContext _context;
        private readonly IConfiguration _config;

        public AuthController(HRContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // 1. Kullanıcıyı DB’den bul
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
                return Unauthorized("Kullanıcı bulunamadı.");

            // 2. Parola kontrolü (sen hash kullandığın için burada hash kontrol yapmalısın)
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Unauthorized("Hatalı şifre.");

            // 3. Token üret
            var token = GenerateToken(user);

            return Ok(new
            {
                token = token,
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    role = user.Role!.RoleName
                }
            });
        }

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role!.RoleName) // Admin / Employee
            };

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["JwtSettings:ExpireMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // Kayıt olmak için endpoint
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // 1. Aynı kullanıcı adı var mı kontrol et
            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
                return BadRequest("Bu kullanıcı adı zaten alınmış.");

            // 2. Rol var mı kontrol et
            var role = await _context.Roles.FindAsync(request.RoleId);
            if (role == null)
                return BadRequest("Geçersiz rol.");

            // 3. Kullanıcı oluştur
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password), // hashleme ✅
                RoleId = role.Id
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Kayıt başarılı.");
        }

        /// <summary>
        /// Şifre güncellemek için endpoint
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.NewPassword))
                return BadRequest("Eksik bilgi gönderildi.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.UserName);
            if (user == null)
                return NotFound("Kullanıcı bulunamadı.");

            // Eski şifre kontrolü
            //if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, user.PasswordHash))
            //    return BadRequest("Mevcut şifre yanlış.");

            // Yeni şifre hashlenip kaydediliyor
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok("Şifre başarıyla güncellendi.");
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            return Ok("Başarıyla çıkış yapıldı.");
        }

    }
}

