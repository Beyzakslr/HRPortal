using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration; // IConfiguration için

[ApiController]
[Route("api/[controller]")]
public class WidgetController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public WidgetController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    [HttpGet("dashboard-info")]
    public async Task<IActionResult> GetDashboardInfo([FromQuery] string sehir = "Istanbul")
    {
        // 1. Güncel Tarih ve Saat Bilgisi (Sunucu Saati)
        var sunucuZamani = DateTime.Now;

        // 2. Hava Durumu Bilgisi
        var apiKey = _configuration["OpenWeatherMap:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            return StatusCode(500, "API anahtarı yapılandırılmamış.");
        }

        object havaDurumu = null;
        try
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"https://api.openweathermap.org/data/2.5/weather?q={sehir}&appid={apiKey}&units=metric&lang=tr");

            if (response.IsSuccessStatusCode)
            {
                havaDurumu = await response.Content.ReadFromJsonAsync<object>();
            }
        }
        catch (Exception ex)
        {
            // Hata loglama mekanizması eklenebilir.
            Console.WriteLine(ex.Message);
        }

        // 3. İki bilgiyi birleştirip Frontend'e gönder
        var sonuc = new
        {
            Tarih = sunucuZamani.ToString("dd MMMM yyyy, dddd"),
            Saat = sunucuZamani.ToString("HH:mm:ss"),
            HavaDurumu = havaDurumu
        };

        return Ok(sonuc);
    }
}