# TrustCheck — tech-stack.md

## Teknoloji Seçimi ve Gerekçesi

### Frontend: React + TypeScript
TypeScript ile tip güvenliği sağlanıyor. Bileşen
tabanlı yapı sayesinde AnalysisForm, ResultCard,
History ayrı ayrı geliştirilebildi. Bakımı kolay,
ölçeklenebilir mimari.

### Animasyon: Framer Motion
Sayfa geçişleri, sonuç kartı girişleri ve form
animasyonları için kullanıldı. Yaşlı kullanıcıların
nerede olduklarını anlamalarına yardımcı olan
akıcı geçişler sağlıyor.

### AI: Gemini API (Google AI Studio)
Ücretsiz. Hem metin hem görsel analizi yapabiliyor
(multimodal). Türkçe dil desteği güçlü. API anahtarı
Google AI Studio'dan dakikalar içinde alınıyor.
Model: gemini-2.0-flash

### Otomasyon: n8n
Kod yazmadan görsel otomasyon akışları:
- Dolandırıcılık ihbarları webhook ile toplanıyor.
- Bülten abonelikleri webhook ile kaydediliyor.
n8n.io üzerinden ücretsiz self-hosted kurulum.

### Veri Saklama: localStorage
Sunucu gerektirmiyor. Kullanıcının tarayıcısında
saklanıyor. KVKK riski yok. Maksimum 50 kayıt,
51. kayıtta en eski siliniyor.

### Deploy: Vercel
GitHub'a bağlı, her push'ta otomatik deploy.
Ücretsiz plan yeterli. Hızlı CDN.

### Stil: Tailwind CSS
Utility-first yaklaşım. Responsive tasarım kolay.
Büyük font boyutları yaşlı kullanıcı dostu.

## Dosya Yapısı
```
features/
├── app/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── type.ts
│   ├── components/
│   │   ├── AnalysisForm.tsx
│   │   ├── ResultCard.tsx
│   │   ├── History.tsx
│   │   └── ErrorBoundary.tsx
│   ├── services/
│   │   ├── gemini.ts
│   │   └── automation.ts
│   ├── liraryb/
│   │   └── utils.ts
│   ├── types.ts
│   └── index.css
├── .env.example
└── .gitgnore
```

## Kurulum Adımları

### 1. Google AI Studio — API Anahtarı
1. aistudio.google.com adresine git
2. "Get API Key" → "Create API Key"
3. Anahtarı .env dosyasına ekle:
   GEMINI_API_KEY=senin_anahtarin

### 2. n8n Kurulumu (Opsiyonel)
1. n8n.io üzerinden hesap aç
2. İhbar ve bülten için webhook oluştur
3. URL'leri .env'e ekle:
   VITE_N8N_REPORT_URL=webhook_url
   VITE_N8N_SUBSCRIBE_URL=webhook_url

### 3. Vercel Deploy
1. vercel.com → GitHub ile bağlan
2. Repoyu seç, environment variables ekle
3. Deploy et
