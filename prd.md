# TrustCheck — prd.md 

## 1. Genel Bakış
TrustCheck, yaşlılar ve teknolojiye uzak bireyler
için tasarlanmış AI destekli dolandırıcılık tespit
web uygulamasıdır. Türkiye'ye özgü yerel tehdit
kalıplarını tanır, sade Türkçe ile sonuç verir.
Kurulum gerektirmez, hesap açılmaz, direkt kullanılır.

## 2. Problem
Yaşlılar sahte SMS, e-posta ve linkleri ayırt
edemiyor. Mevcut global araçlar (Scamio, Norton
Genie) Türkiye'ye özgü kalıpları tanımıyor.

## 3. Hedef Kullanıcı
- Birincil: 60+ yaş, teknolojiye uzak bireyler
- Teknik bilgi varsayımı: Sıfır
- Arayüz: Büyük font, sade Türkçe, tek sayfa

## 4. Özellikler

### 4.1 Mesaj İncele 
- Kullanıcı metin yapıştırır VEYA görsel yükler
- "Mesajı Kontrol Et" butonuna basar
- AI tehdit seviyesini ve link/QR varlığını
  tespit eder
- Sonuç kartı gösterilir
- Link tespit → Link Kontrolü'ne yönlendirme
- QR tespit → Karekod Kontrolü'ne yönlendirme
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

### 4.4 Eski Kontrollerim (Geçmiş) 
- Sağ üstte buton ile erişilir
- localStorage'dan çekilir (maks. 50 kayıt)
- Tarih + içerik özeti + sonuç rengi
- Kayıt silebilme ve tekrar görüntüleme

### 4.5 Sesli Okuma 
- Sonuç kartında ses ikonu
- Türkçe sesli okuma (tr-TR)
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

Neden? → 2-3 cümle, sade dil, teknik terim yok
Ne yapmalısınız? → Tek somut öneri
🔊 Sesli Dinle butonu
```

### Link Tespit Edilirse
```
💡 Bu mesajda bir link tespit ettik.
Linkin güvenliğini de kontrol etmek
ister misiniz? Aşağıdaki Link Kontrolü
bölümünü kullanabilirsiniz.
```

### QR Tespit Edilirse
```
📷 Bu mesajda bir QR kod olduğu anlaşılıyor.
QR kodlar da tehlikeli olabilir! Fotoğrafını
aşağıdaki Karekod Kontrolü bölümüne yükleyin.
```

## 6. AI Sistem Mesajı (Kodun İçine Sabit)
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
- Kargo dolandırıcılığı

Ayrıca tespit et:
- Metinde link var mı? → LINK_VAR: true/false
- Metinde QR kod geçiyor mu? → QR_VAR: true/false

Yanıt formatı:
SONUÇ: [TEHLİKELİ / ŞÜPHELİ / GÜVENLİ]
NEDEN: [2-3 cümle, teknik terim yok, sade Türkçe]
NE YAPMALI: [Tek somut öneri]
LINK_VAR: [true/false]
QR_VAR: [true/false]

Dili otomatik algıla. Türkçe mesaja Türkçe,
İngilizce mesaja İngilizce yanıt ver.
```

## 7. Arayüz Gereksinimleri
- Tek sayfa, yukarıdan aşağı akış
- Büyük font (min 16px, başlıklar 24px+)
- Yüksek kontrast, koyu header (#101828)
- Sade Türkçe buton isimleri
- Mobil uyumlu (responsive)
- Yükleniyor: "Bakıyoruz, bir saniye..."
- Framer Motion animasyonları
- ErrorBoundary hata yönetimi

## 8. Tech Stack
- Frontend: React + TypeScript
- Animasyon: Framer Motion
- AI: Gemini API (Google AI Studio)
- Otomasyon: n8n (webhook)
- Veri: localStorage (maks. 50 kayıt)
- Deploy: Vercel
- Stil: Tailwind CSS

## 9. Kapsam Dışı
- Kullanıcı hesabı / giriş sistemi
- Gerçek zamanlı veritabanı
- Push bildirimleri

## 10. Başarı Kriteri
- Kullanıcı mesajı yapıştırıp 10 saniyede sonuç alır
- Türkçe dolandırıcılık kalıpları doğru tespit edilir
- Link/QR tespiti doğru yönlendirme yapar
- Geçmiş analizler kayıt altında tutulur
- Sesli okuma yaşlı kullanıcılara erişilebilirlik sağlar
- Uygulama mobilde sorunsuz çalışır
