/**
 * n8n Otomasyon Servisi - Gelişmiş ve Dayanıklı Versiyon
 */

// Environment değişkenlerini kontrol eden yardımcı fonksiyon
const getEnvUrl = (key: string) => {
  const url = import.meta.env[key];
  if (!url || url === 'undefined' || url.trim() === '') {
    return null;
  }
  return url;
};

const REPORT_WEBHOOK_URL = getEnvUrl('VITE_N8N_REPORT_URL');
const SUBSCRIBE_WEBHOOK_URL = getEnvUrl('VITE_N8N_SUBSCRIBE_URL');

/**
 * Şüpheli içeriği n8n üzerinden raporlar
 */
export async function reportScam(content: string, result: string, reason: string) {
  if (!REPORT_WEBHOOK_URL) {
    console.error('⚠️ n8n Raporlama URL\'si eksik! Vercel/Netlify üzerinden VITE_N8N_REPORT_URL değişkenini kontrol edin.');
    return false;
  }

  try {
    // Veriyi arka planda gönderiyoruz (await kullanmadan çağırmak hızı artırır)
    fetch(REPORT_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // CORS hatalarını önlemek için
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString('tr-TR'),
        type: 'SCAM_REPORT',
        content: content.substring(0, 1000), // Mesajı sınırla
        result,
        reason,
        platform: 'TrustCheck Web'
      }),
    });
    
    return true; 
  } catch (error) {
    console.error('❌ n8n İhbar Hatası:', error);
    return false;
  }
}

/**
 * Kullanıcıyı e-bültene kaydeder
 */
export async function subscribeToBulletin(email: string) {
  if (!SUBSCRIBE_WEBHOOK_URL) {
    console.error('⚠️ n8n Bülten URL\'si eksik! VITE_N8N_SUBSCRIBE_URL değişkenini kontrol edin.');
    return false;
  }

  try {
    const response = await fetch(SUBSCRIBE_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString('tr-TR'),
        type: 'NEWSLETTER_SUBSCRIPTION',
        email,
        source: 'TrustCheck Footer'
      }),
    });
    
    return true;
  } catch (error) {
    console.error('❌ n8n Bülten Hatası:', error);
    return false;
  }
}
