# Emin Ol — prd.md (Final)

## 1. Genel Bakış
Emin Ol, yaşlılar ve teknolojiye uzak bireyler
için tasarlanmış AI destekli dolandırıcılık tespit
web uygulamasıdır. Türkiye'ye özgü yerel tehdit
kalıplarını tanır, sade Türkçe ile sonuç verir.

## 2. Problem
Yaşlılar sahte SMS, e-posta ve linkleri ayırt
edemiyor. Mevcut global araçlar Türkiye'ye özgü
kalıpları tanımıyor.

## 3. Hedef Kullanıcı
- Birincil: 60+ yaş, teknolojiye uzak bireyler
- Teknik bilgi varsayımı: Sıfır
- Arayüz: Büyük font, sade Türkçe, tek sayfa

## 4. Özellikler

### 4.1 Mesaj İncele 
- Kullanıcı metin yapıştırır VEYA görsel yükler
- "Mesajı Kontrol Et" butonuna basar
- AI tehdit seviyesini ve link/QR varlığını tespit eder
- Sonuç kartı gösterilir
- Link tespit edilirse → Link Kontrolü'ne yönlendirme
- QR tespit edilirse → Karekod Kontrolü'ne yönlendirme
- Analiz localStorage'a kaydedilir

### 4.2 Link Kontrolü 
- Kullanıcı şüpheli URL yapıştırır
- "Linki Kontrol Et" butonuna basar
- AI URL'yi tehdit açısından değerlendirir
- Sonuç kartı gösterilir
- Analiz localStorage'a kaydedilir

### 4.3 Karekod (QR) Kontrolü 
- Kullanıcı QR kod görselini yükler
- "QR Kodu Kontrol Et" butonuna basar
- AI görselden URL'yi okur, tehdit analizi yapar
- Sonuç kartı gösterilir
- Analiz localStorage'a kaydedilir

### 4.4 Eski Kontrollerim 
- Sağ üstte buton ile erişilir
- localStorage'dan çekilir (maks. 50 kayıt)
- Tarih + içerik özeti + sonuç rengi
- Kayıt silebilme, geçmişten tekrar görüntüleme

### 4.5 Sesli Okuma 
- Sonuç kartında ses ikonu
- Türkçe sesli okuma
- Yaşlı kullanıcılar için erişilebilirlik

### 4.6 Dolandırıcılık İhbarı 
- TEHLİKELİ sonuçlarda ihbar butonu
- n8n webhook ile anonim raporlama
- Topluluk koruma amaçlı veri toplama

### 4.7 Haftalık Güvenlik Bülteni 
- E-posta abonelik formu
- n8n webhook ile kayıt
- Yeni tehditlere karşı haftalık uyarı

## 5. Sonuç Kartı Formatı

### Temel Format
```
🔴 TEHLİKELİ / 🟡 ŞÜPHELİ / 🟢 GÜVENLİ

Neden? → 2-3 cümle, sade dil
Ne yapmalısınız? → Tek somut öneri
🔊 Sesli Dinle
```

### Link Tespit Notu
```
💡 Bu mesajda bir link tespit ettik.
Güvenliğini kontrol etmek ister misiniz?
Aşağıdaki Link Kontrolü bölümünü kullanın.
```

### QR Tespit Notu
```
📷 Mesajda QR kod olduğu anlaşılıyor.
QR kodlar da tehlikeli olabilir!
Aşağıdaki Karekod Kontrolü bölümüne yükleyin.
```

## 6. AI Sistem Mesajı
```
Sen bir siber güvenlik uzmanısın.
Türkiye'deki dolandırıcılık kalıplarını
çok iyi biliyorsun.

Analiz ederken şunlara bak:
- Sahte kurum taklidi: Ziraat Bankası,
  Garanti, İş Bankası, Yapı Kredi, PTT,
  Turkcell, Vodafone, Türk Telekom,
  e-Devlet, SGK, vergi dairesi,
  Yurtiçi Kargo, MNG Kargo
- Aciliyet dili: "Hemen tıklayın",
  "Hesabınız askıya alındı", "Son 24 saat"
- Kimlik/kart/şifre talebi
- Ödül/hediye vaadi: "Tebrikler kazandınız"
- Şüpheli link varlığı
- Dil hataları ve tutarsız yazım

LINK_VAR: true/false
QR_VAR: true/false

SONUÇ: [TEHLİKELİ / ŞÜPHELİ / GÜVENLİ]
NEDEN: [2-3 cümle, teknik terim yok]
NE YAPMALI: [Tek somut öneri]
LINK_VAR: [true/false]
QR_VAR: [true/false]

Dili otomatik algıla.
```

## 7. Arayüz Gereksinimleri
- Tek sayfa, yukarıdan aşağı akış
- Büyük font (min 16px, başlıklar 24px+)
- Yüksek kontrast, koyu header
- Sade Türkçe buton isimleri
- Mobil uyumlu
- Framer Motion animasyonları
- ErrorBoundary hata yönetimi

## 8. Tech Stack
- Frontend: React + TypeScript
- Animasyon: Framer Motion
- AI: Gemini API (Google AI Studio)
- Otomasyon: n8n
- Veri: localStorage
- Deploy: Vercel
- Stil: Tailwind CSS

## 9. Kapsam Dışı
- Kullanıcı hesabı / giriş sistemi
- Gerçek zamanlı veritabanı
- Push bildirimleri

## 10. Başarı Kriteri
- 10 saniyede sonuç
- Türkçe kalıplar doğru tespit
- Link/QR yönlendirmesi çalışıyor
- Geçmiş kayıt tutuluyor
- Sesli okuma çalışıyor
- Mobilde sorunsuz
