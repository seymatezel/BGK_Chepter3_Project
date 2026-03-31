# TrustCheck — tech-stack.md

## Teknoloji Seçimi ve Gerekçesi

### Frontend: React + TypeScript
TypeScript ile tip güvenliği sağlanıyor.
Bileşen tabanlı yapı sayesinde AnalysisForm,
ResultCard, History ayrı geliştirilebildi.
Bakımı kolay, ölçeklenebilir mimari.

### Animasyon: Framer Motion
Sayfa geçişleri, sonuç kartı ve form animasyonları.
Yaşlı kullanıcıların nerede olduklarını
anlamalarına yardımcı olan akıcı geçişler.

### AI: Gemini API (Google AI Studio)
Ücretsiz. Hem metin hem görsel analizi
yapabiliyor (multimodal). Türkçe dil desteği
güçlü. Model: gemini-2.0-flash

### Otomasyon: n8n
Kod yazmadan görsel otomasyon akışları:
- Dolandırıcılık ihbarları webhook ile toplanıyor
- Bülten abonelikleri webhook ile kaydediliyor

### Veri: localStorage
Sunucu gerektirmiyor. Kullanıcının tarayıcısında
saklanıyor. KVKK riski yok.
Maksimum 50 kayıt, 51. kayıtta en eski siliniyor.

### Deploy: Vercel
GitHub'a bağlı, her push'ta otomatik deploy.
Ücretsiz plan yeterli. Hızlı CDN.

### Stil: Tailwind CSS
Utility-first yaklaşım. Responsive tasarım kolay.
Büyük font boyutları yaşlı kullanıcı dostu.

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
├── assets/
│   ├── README.md
│   ├── user-flow-diagram.png
│   └── screenshots/
│       ├── ana-sayfa.png
│       ├── mesaj-analizi.png
│       ├── tehlikeli-sonuc.png
│       ├── link-kontrolu.png
│       └── gecmis-analizler.png
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
git clone https://github.com/seymatezel/BGK_Chepter3_Project.git
cd BGK_Chepter3_Project/features
npm install
cp .env.example .env
npm run dev
```
