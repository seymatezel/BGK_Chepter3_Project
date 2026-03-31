# Emin Ol — tech-stack.md

## Teknoloji Seçimi ve Gerekçesi

### Frontend: React + TypeScript
TypeScript ile tip güvenliği sağlanıyor.
Bileşen tabanlı yapı sayesinde AnalysisForm,
ResultCard, History ayrı geliştirilebildi.

### Animasyon: Framer Motion
Sayfa geçişleri ve sonuç kartı animasyonları.
Yaşlı kullanıcıların nerede olduklarını
anlamalarına yardımcı olan akıcı geçişler.

### AI: Gemini API (Google AI Studio)
Ücretsiz. Metin + görsel analizi (multimodal).
Türkçe dil desteği güçlü.

### Otomasyon: n8n
- Dolandırıcılık ihbarları webhook ile toplanıyor
- Bülten abonelikleri webhook ile kaydediliyor
Kod yazmadan görsel otomasyon akışları.

### Veri: localStorage
Sunucu gerektirmiyor. KVKK riski yok.
Maksimum 50 kayıt, 51. kayıtta en eski siliniyor.

### Deploy: Vercel
GitHub'a bağlı, otomatik deploy. Ücretsiz plan.

### Stil: Tailwind CSS
Büyük font boyutları yaşlı kullanıcı dostu.
Responsive tasarım kolay.

## Dosya Yapısı
```
BGK_Chepter3_Project/
├── README.md
├── idea.md
├── prd.md
├── user-flow.md
├── tech-stack.md
├── agents/
│   ├── README.md
│   └── automation.ts
└── features/
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── index.css
    │   ├── types.ts
    │   ├── components/
    │   │   ├── AnalysisForm.tsx
    │   │   ├── ResultCard.tsx
    │   │   ├── History.tsx
    │   │   └── ErrorBoundary.tsx
    │   ├── services/
    │   │   ├── gemini.ts
    │   │   └── automation.ts
    │   └── lib/
    │       └── utils.ts
    ├── .env.example
    └── .gitignore
```

## Kurulum
```bash
# 1. Klonla
git clone https://github.com/seymatezel/BGK_Chepter3_Project.git
cd BGK_Chepter3_Project/features

# 2. Bağımlılıkları yükle
npm install

# 3. Environment ayarla
cp .env.example .env
# GEMINI_API_KEY ekle

# 4. Başlat
npm run dev
```
