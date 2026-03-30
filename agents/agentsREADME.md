# agents/README.md

## TrustCheck — Otomasyon Akışları

TrustCheck, n8n kullanarak iki otomasyon akışı
çalıştırır. Bu akışlar kod yazmadan görsel olarak
kurulur ve webhook üzerinden tetiklenir.

---

## Akış 1 — Dolandırıcılık İhbarı

### Ne Yapar?
Kullanıcı TEHLİKELİ sonuçta "Bu Dolandırıcılığı
İhbar Et" butonuna bastığında tetiklenir.
Mesaj içeriği anonim olarak toplanır ve
topluluğu korumak için kaydedilir.

### Tetikleyici
```
TrustCheck → POST /webhook/scam-report
{
  "timestamp": "28.03.2026 14:32",
  "type": "SCAM_REPORT",
  "content": "Hesabınız askıya alındı...",
  "result": "TEHLİKELİ",
  "reason": "Ziraat Bankası taklidi yapıyor",
  "platform": "TrustCheck Web"
}
```

### n8n Akış Adımları
```
1. Webhook Tetikleyici
   POST /webhook/scam-report gelince başla
        ↓
2. Veri Doğrulama
   content ve result alanları dolu mu?
        ↓
3. Google Sheets'e Kaydet
   Tarih | İçerik | Sonuç | Neden
        ↓
4. (Opsiyonel) Belirli eşik aşılınca
   topluluk uyarısı e-postası gönder
```

### Kurulum
1. n8n.io üzerinden hesap aç
2. "New Workflow" → Webhook node ekle
3. Webhook URL'yi kopyala
4. Vercel'de VITE_N8N_REPORT_URL olarak kaydet

---

## Akış 2 — Haftalık Güvenlik Bülteni

### Ne Yapar?
Kullanıcı e-posta adresini girip "Bültene Katıl"
butonuna bastığında tetiklenir. E-posta listesine
eklenir, haftalık güvenlik haberleri gönderilir.

### Tetikleyici
```
TrustCheck → POST /webhook/newsletter
{
  "timestamp": "28.03.2026 14:32",
  "type": "NEWSLETTER_SUBSCRIPTION",
  "email": "kullanici@email.com",
  "source": "TrustCheck Footer"
}
```

### n8n Akış Adımları
```
1. Webhook Tetikleyici
   POST /webhook/newsletter gelince başla
        ↓
2. E-posta Doğrulama
   Geçerli format mı?
        ↓
3. Google Sheets'e Kaydet
   E-posta | Kayıt Tarihi
        ↓
4. Hoş Geldin E-postası Gönder
   "TrustCheck'e hoş geldiniz!"
```

### Kurulum
1. n8n'de yeni workflow oluştur.
2. Webhook URL'yi kopyala.
3. Vercel'de VITE_N8N_SUBSCRIBE_URL olarak kaydet.
