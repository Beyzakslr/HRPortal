// Backend adresi - SONUNA EĞİK ÇİZGİ (/) EKLENDİ
const API_URL = "https://localhost:7269/api/auth/";
//const API_URL = "http://localhost:5286/api/auth/";

// Generic API call function with better error handling
const apiCall = async (endpoint, data) => {
  try {
    console.log(`API Call: ${endpoint}`, data); // Debug log

    // Endpoint'in başındaki olası /'yi kaldırarak çift // olmasını engelle
    const finalEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

    const response = await fetch(`${API_URL}${finalEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    });

    console.log(`Response Status: ${response.status}`); // Debug log

    // Response'un JSON olup olmadığını kontrol et
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // Eğer yanıt 204 No Content ise, bu bir hata değildir.
      if (response.status === 204) return {}; 
      throw new Error(`Sunucu geçersiz yanıt döndü. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Response Data:`, result); // Debug log

    // HTTP status codes kontrolü
    if (!response.ok) {
      // Backend'den gelen hata mesajını kullan
      const errorMessage = result.message || result.error || `HTTP ${response.status} hatası`;
      throw new Error(errorMessage);
    }

    return result;

  } catch (error) {
    console.error(`API Error (${endpoint}):`, error); // Debug log

    // Network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Sunucuya bağlanılamıyor. Backend çalışıyor mu?');
    }

    // Re-throw the error with original message
    throw error;
  }
};

export const loginUser = async (data) => {
  return await apiCall('login', data);
};

export const updatePassword = async (data) => {
  return await apiCall('update-password', data);
};
