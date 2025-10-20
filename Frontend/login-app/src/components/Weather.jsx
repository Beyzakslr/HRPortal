import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HavaDurumu = ({ sehir = 'Istanbul' }) => {
  const [data, setData] = useState(null); // backend'in döndürdüğü tüm obje
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Backend endpoint'in doğru olduğundan emin ol:
        // Backend'de senin paylaştığın kodda: GET /api/widget/dashboard-info?sehir=Istanbul
        const url = `https://localhost:7269/api/widget/dashboard-info?sehir=${encodeURIComponent(sehir)}`;
        const response = await axios.get(url);

        console.log('Backend response status:', response.status);
        console.log('Backend response data:', response.data);

        // Eğer backend başarılıysa ve beklediğimiz yapıda veri döndüyse kaydet
        if (response && response.data) {
          setData(response.data);
        } else {
          setError('Beklenmeyen cevap alındı.');
        }

      } catch (err) {
        console.error('Hava durumu API hata detay:', err);
        // Eğer backend 4xx/5xx döndürdüyse axios hata objesinden mesaj al
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          'Hava durumu bilgisi alınamadı.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sehir]);

  if (loading) return <p>Hava durumu yükleniyor...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;


  const tarih = data?.tarih || '';
  const saat = data?.saat || '';
  const ow = data?.havaDurumu || {}; // OpenWeather verisi burada
  const cityName = ow?.name || sehir;
  const temperature = typeof ow?.main?.temp === 'number' ? Math.round(ow.main.temp) : null;
  const description = ow?.weather?.[0]?.description || 'Bilinmiyor';


  return (
    <div style={{
      marginTop: '15px',
      padding: '12px',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      maxWidth: '320px',
      background: '#fafafa'
    }}>
      <h3>📍 {cityName}</h3>

      {/* Sunucu tarafı tarih & saat gösterimi (backend zaten sağlıyor) */}
      {tarih && <p><strong>Tarih:</strong> {tarih}</p>}
      {saat && <p><strong>Saat:</strong> {saat}</p>}

      {/* OpenWeather verileri */}
      {temperature !== null ? <p><strong>Sıcaklık:</strong> {temperature}°C</p> : <p>Sıcaklık bilgisi yok</p>}
      <p><strong>Durum:</strong> {description.charAt(0).toUpperCase() + description.slice(1)}</p>

  
    </div>
  );
};

export default HavaDurumu;
