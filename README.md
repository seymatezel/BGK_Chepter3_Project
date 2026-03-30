# TrustCheck — README.md

## TrustCheck - Dijital Güvenlik Rehberiniz

TrustCheck, yaşlılar ve teknolojiye uzak bireyler için
tasarlanmış AI destekli dolandırıcılık tespit web
uygulamasıdır. Şüpheli SMS, e-posta, link ve QR kodları
saniyeler içinde analiz eder.

## Problem
Yaşlılar ve teknolojiye uzak bireyler sahte SMS,
e-posta ve linkleri ayırt edemiyor. Mevcut global
araçlar (Scamio, Norton Genie) Türkiye'ye özgü
dolandırıcılık kalıplarını tanımıyor.

## Çözüm
TrustCheck, Gemini AI kullanarak:
- Mesaj metinlerini ve görsellerini analiz eder.
- Şüpheli linkleri değerlendirir.
- QR kodları tehdit açısından inceler.
- Türkiye'ye özgü dolandırıcılık kalıplarını tanır.
- Sade Türkçe ile sonuç ve öneri sunar.
- Tüm analizleri yerel olarak kaydeder.

## Canlı Demo
**Yayın Linki🌐:** https://trustcheckapp.vercel.app

**Demo Video📽️:** [Yakında eklenecek]

## 🛠 Kullanılan Teknolojiler
- React + TypeScript
- Gemini AI API (Google)
- Framer Motion (animasyonlar)
- localStorage (geçmiş kayıt)
- n8n (ihbar ve bülten otomasyonu)
- Tailwind CSS
- Vercel (deploy)

## Nasıl Çalıştırılır?

### 1. Repoyu klonla
```bash
git clone https://github.com/seymatezel/BGK_Chepter3_Project.git
cd BGK_Chepter3_Project/features
```

### 2. Bağımlılıkları yükle
```bash
npm install
```

### 3. Environment değişkenlerini ayarla
`.env.example` dosyasını kopyala:
```bash
cp .env.example .env
```
`.env` dosyasına Gemini API anahtarını ekle:
```
GEMINI_API_KEY=senin_api_anahtarin
```

### 4. Uygulamayı başlat
```bash
npm run dev
```

## 📁 Proje Yapısı
```
features/
├── src/
│   ├── App.tsx              ← Ana uygulama
│   ├── components/
│   │   ├── AnalysisForm.tsx ← Analiz formu
│   │   ├── ResultCard.tsx   ← Sonuç kartı
│   │   ├── History.tsx      ← Geçmiş analizler
│   │   └── ErrorBoundary.tsx
│   ├── services/
│   │   ├── gemini.ts        ← AI entegrasyonu
│   │   └── automation.ts    ← n8n otomasyonu
│   ├── types.ts             ← TypeScript tipleri
│   └── index.css
├── .env.example
└── package.json
```

## Özellikler
- Mesaj & Görsel Analizi (metin + ekran görüntüsü)
- Link Kontrolü
- QR Kod Analizi
- Geçmiş Analizler (localStorage, maks. 50 kayıt)
- Sesli Okuma (yaşlı kullanıcılar için)
- Dolandırıcılık İhbarı (n8n otomasyonu)
- Haftalık Güvenlik Bülteni aboneliği
- Türkiye'ye özgü tehdit tespiti
- Çok dilli destek (otomatik algılama)
- Mobil uyumlu tasarım
