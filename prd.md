# TrustCheck — prd.md 

## 1. Genel Bakış
TrustCheck, yaşlılar ve teknolojiye uzak bireyler için
tasarlanmış AI destekli dolandırıcılık tespit web
uygulamasıdır. Türkiye'ye özgü yerel tehdit kalıplarını
tanır, sade Türkçe ile sonuç verir. Kurulum
gerektirmez, hesap açılmaz, direkt kullanılır.

## 2. Problem
Yaşlılar sahte SMS, e-posta ve linkleri ayırt edemiyor.
Mevcut global araçlar (Scamio, Norton Genie) Türkiye'ye
özgü kalıpları tanımıyor.

## 3. Hedef Kullanıcı
- Birincil: 60+ yaş, teknolojiye uzak bireyler
- Teknik bilgi varsayımı: Sıfır
- Arayüz: Büyük font, sade Türkçe, tek sayfa

## 4. Özellikler

### 4.1 Mesaj İncele 
- Kullanıcı metin yapıştırır veya görsel yükler.
- "Mesajı Kontrol Et" butonuna basar.
- AI hem tehdit seviyesini hem de metinde
  link/QR kod varlığını tespit eder.
- Sonuç kartı gösterilir.
- Link tespit edilirse → Link Kontrolü bölümüne
  yönlendirme notu.
- QR kod tespit edilirse → QR Kod Kontrolü bölümüne
  yönlendirme notu.
- Analiz localStorage'a kaydedilir.

### 4.2 Link Kontrolü 
- Kullanıcı şüpheli URL yapıştırır.
- "Linki Kontrol Et" butonuna basar.
- AI URL'yi tehdit açısından değerlendirir.
- Sonuç kartı gösterilir.
- Analiz localStorage'a kaydedilir.

### 4.3 Karekod (QR) Kontrolü 
- Kullanıcı QR kod görselini yükler.
- "QR Kodu Kontrol Et" butonuna basar.
- AI görselden URL'yi okur, tehdit analizi yapar.
- Sonuç kartı gösterilir.
- Analiz localStorage'a kaydedilir.

### 4.4 Eski Kontrollerim (Geçmiş) 
- Sağ üstte "Eski Kontrollerim" butonu ile erişilir.
- localStorage'dan çekilir (maks. 50 kayıt)
- Her kayıtta: tarih, içerik özeti, sonuç (🔴/🟡/🟢).
- Geçmiş boşsa: "Henüz bir analiz yapmadınız" mesajı.
- Kayıt silebilme özelliği.
- Geçmişten seçilen sonuç tekrar görüntülenebilir.

### 4.5 Sesli Okuma 
- Sonuç kartında ses ikonu bulunur.
- Tıklanınca sonuç Türkçe sesli okunur.
- Tekrar tıklanınca durur.
- Yaşlı kullanıcılar için kritik erişilebilirlik.

### 4.6 Dolandırıcılık İhbarı 
- TEHLİKELİ sonuçlarda "Bu Dolandırıcılığı İhbar Et"
  butonu görünür.
- n8n webhook ile anonim olarak kullanıcıların ihbar ettiği mesajlar bir sheet'te depolanır ve raporlanır. (Bu depolanan veriler haftalık bültene abone olan kullanıcıları bilinçlendirmek için kullanılır.)
- İhbar edilince buton "İhbar Edildi" olarak güncellenir.

### 4.7 Haftalık Güvenlik Bülteni 
- Sayfanın altında e-posta abonelik formu.
- n8n webhook ile kayıt yapılır.
- Abone olanları haftalık olarak yeni dolandırıcılık yöntemlerinden haberdar eder.

## 5. Sonuç Kartı Formatı

### Temel Format
```
🔴 TEHLİKELİ / 🟡 ŞÜPHELİ / 🟢 GÜVENLİ

Neden? → 2-3 cümle, sade dil, teknik terim yok
Ne yapmalısınız? → Tek somut öneri
🔊 Sesli Dinle butonu
```

### Link Tespit Edilirse Ek Not
```
💡 Bu mesajda bir link tespit ettik.
Linkin güvenliğini de kontrol etmek
ister misiniz? Aşağıdaki Link Kontrolü
bölümünü kullanabilirsiniz.
```

### QR Tespit Edilirse Ek Not
```
📷 Bu mesajda bir QR kod olduğu
anlaşılıyor. QR kodlar da tehlikeli
olabilir! Fotoğrafını aşağıdaki
Karekod Kontrolü bölümüne yükleyin.
```

## 6. AI Sistem Mesajı (Kodun İçine Sabit Olarak Eklenmiştir.)
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

Yanıt formatı (kesinlikle bu formatta ver):
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
- Yüksek kontrast renkler (koyu header)
- Sade Türkçe buton isimleri
- Mobil uyumlu (responsive)
- Yükleniyor animasyonu: "Bakıyoruz, bir saniye..."
- "Eski Kontrollerim" sağ üstte sabit
- Framer Motion geçiş animasyonları
- ErrorBoundary ile hata yönetimi

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
- Kullanıcı mesajı yapıştırıp 10 saniyede sonuç alır.
- Türkçe dolandırıcılık kalıpları doğru tespit edilir.
- Link/QR tespiti doğru yönlendirme yapar.
- Geçmiş analizler kayıt altında tutulur.
- Sesli okuma yaşlı kullanıcılara erişilebilirlik sağlar.
- Uygulama mobilde sorunsuz çalışır.
