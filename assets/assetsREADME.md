# TrustCheck — assets/README.md

## Bu Klasör Ne İçin?

Bu klasör TrustCheck projesinin görsel
dokümantasyonunu içerir.

## İçerik

### user-flow-diagram.png
Kullanıcı akış diyagramı. Figma'da tasarlanan
kullanıcı yolculuğunu görselleştirir. Tüm
akışları (Mesaj İncele, Link Kontrolü, Karekod
Tara, Eski Kontrollerim, İhbar) kapsar.

### screenshots/
Uygulamanın canlı ekran görüntüleri:

| Dosya | İçerik |
|-------|--------|
| ana-sayfa.png | Açılış ekranı, 3 ana kart |
| mesaj-analizi.png | Metin/görsel analiz formu |
| tehlikeli-sonuc.png | 🔴 TEHLİKELİ sonuç kartı |
| link-kontrolu.png | Link analiz ekranı |
| gecmis-analizler.png | Geçmiş panel görünümü |
```

---

Şimdi Figma için kullanıcı akışı yazısı:

---
```
TrustCheck — Figma User Flow Açıklaması

BAŞLANGIÇ NOKTASI: Ana Sayfa
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ekranda ne var:
- Koyu header: TrustCheck logosu (sol),
  "Eski Kontrollerim" butonu (sağ)
- Başlık: "Şüpheli mesajları birlikte
  kontrol edelim."
- 3 kart (dikey sıralı):
  1. Mesaj İncele (mor ikon)
  2. Link Kontrolü (mavi ikon)
  3. Karekod Tara (turuncu ikon)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AKIŞ 1: MESAJ İNCELE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Ana Sayfa]
    │
    ▼
[Mesaj İncele kartına tıklar]
    │
    ▼
[Form Ekranı - Geri Dön butonu üstte]
┌─────────────────────┐
│ Büyük metin kutusu  │
│ "Mesajı yapıştırın" │
└─────────────────────┘
[Görsel Yükle butonu]
[Mesajı Kontrol Et - büyük mavi buton]
    │
    ├──► [Metin yazıldı] ──► Butona basar
    │
    └──► [Görsel yüklendi] ──► Önizleme
                               görünür
                               ──► Butona
                                   basar
    │
    ▼
[Yükleniyor Ekranı]
"Bakıyoruz, bir saniye..."
(Loader animasyonu)
    │
    ▼
┌─────────────────────────────────┐
│ SONUÇ KARTI — 3 DURUM          │
├─────────────────────────────────┤
│ A) 🔴 TEHLİKELİ                │
│    Neden? [açıklama]           │
│    Ne yapmalısınız? [öneri]    │
│    🔊 Sesli Dinle              │
│    ─────────────────           │
│    [LINK_VAR=true ise]         │
│    💡 Link tespit notu         │
│    [QR_VAR=true ise]           │
│    📷 QR tespit notu           │
│    ─────────────────           │
│    📢 Bu Dolandırıcılığı       │
│       İhbar Et                 │
├─────────────────────────────────┤
│ B) 🟡 ŞÜPHELİ                  │
│    Neden? [açıklama]           │
│    Ne yapmalısınız? [öneri]    │
│    🔊 Sesli Dinle              │
│    [varsa link/QR notu]        │
├─────────────────────────────────┤
│ C) 🟢 GÜVENLİ                  │
│    Neden? [açıklama]           │
│    Ne yapmalısınız? [öneri]    │
│    🔊 Sesli Dinle              │
└─────────────────────────────────┘
    │
    ▼
[Kapat] ──► Ana Sayfaya döner

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AKIŞ 2: LİNK KONTROLÜ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Ana Sayfa]
    │
    ▼
[Link Kontrolü kartına tıklar]
    │
    ▼
[Form Ekranı]
┌─────────────────────┐
│ "Linki yapıştırın"  │
└─────────────────────┘
[Linki Kontrol Et butonu]
    │
    ▼
[Yükleniyor]
    │
    ▼
[Sonuç Kartı - aynı format]
TEHLİKELİ ise → İhbar butonu

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AKIŞ 3: KAREKOD TARA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Ana Sayfa]
    │
    ▼
[Karekod Tara kartına tıklar]
    │
    ▼
[Form Ekranı]
┌─────────────────────┐
│ QR kod yükleme alanı│
│ "Buraya tıklayın"   │
└─────────────────────┘
[QR Kodu Kontrol Et butonu]
    │
    ▼
[Yükleniyor]
    │
    ▼
[Sonuç Kartı - aynı format]
TEHLİKELİ ise → İhbar butonu

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AKIŞ 4: ESKİ KONTROLLERİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Herhangi bir ekranda]
    │
    ▼
[Sağ üstte "Eski Kontrollerim" tıklar]
    │
    ▼
[Sağdan kayan panel açılır]

DOLU ise:
┌────────────────────────────┐
│ 🔴 28 Mar - Mesaj İncele  │
│ "Hesabınız askıya..."      │
│                       [🗑️] │
├────────────────────────────┤
│ 🟢 27 Mar - Link Kontrolü │
│ "https://garanti..."       │
│                       [🗑️] │
└────────────────────────────┘
Kayıta tıklanınca → Sonuç tekrar görünür
Çöp kutusuna tıklanınca → Kayıt silinir

BOŞ ise:
"Henüz bir analiz yapmadınız."

[Panel dışına tıklanınca kapanır]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AKIŞ 5: İHBAR OTOMASYONu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Sonuç kartı - TEHLİKELİ]
    │
    ▼
[📢 İhbar Et butonuna basar]
    │
    ▼
[Buton: "Gönderiliyor..."]
    │
    ▼
[n8n webhook tetiklenir - arka planda]
    │
    ▼
[Buton: "✅ İhbar Edildi"]
"İhbarlar anonim toplanır."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RENK KODLARI (Figma İçin)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Header arka plan:  #101828
Ana arka plan:     #F0F4F8
TEHLİKELİ kart:   bg-red-50,  border-red-200
ŞÜPHELİ kart:     bg-yellow-50, border-yellow-200
GÜVENLİ kart:     bg-green-50, border-green-200
Link notu:         bg-blue-100, border-blue-200
QR notu:           bg-purple-100, border-purple-200
Ana buton:         bg-blue-600
```

---

## GitHub'a Yükleme Sırası
```
1. README.md        → güncelle
2. idea.md          → güncelle
3. prd.md           → güncelle
4. user-flow.md     → güncelle
5. tech-stack.md    → güncelle
6. agents/README.md → zaten var
7. assets/README.md → yeni oluştur
8. assets/screenshots/ → ekran görüntülerini yükle
9. assets/user-flow-diagram.png → Figma'dan export
