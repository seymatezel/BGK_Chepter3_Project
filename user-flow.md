## TrustCheck — user-flow.md

## Uygulama Açılışında
Kullanıcı siteye girer. Koyu header'da TrustCheck
logosu ve sağda "Eski Kontrollerim" butonu görünür.
Ana içerikte başlık, açıklama ve üç kart:
Mesaj İncele, Link Kontrolü, Karekod Tara.

## Akış 1 — Mesaj İncele
1. Kullanıcı "Mesaj İncele" kartına basar.
2. Mesajı metin kutusuna yapıştırır ya da
   "Görsel Yükle" ile ekran görüntüsü yükler.
3. "Mesajı Kontrol Et" butonuna basar.
4. "Bakıyoruz, bir saniye..." animasyonu görünür.
5. Sonuç kartı çıkar:
   🔴 TEHLİKELİ / 🟡 ŞÜPHELİ / 🟢 GÜVENLİ
   - Neden? (sade Türkçe, 2-3 cümle)
   - Ne yapmalısınız? (tek öneri)
   - 🔊 Sesli Dinle butonu
6. Mesajda link tespit edilirse →
   💡 Link Kontrolü bölümüne yönlendirme notu çıkar.
7. Mesajda QR kod tespit edilirse →
   📷 Karekod Kontrolü bölümüne yönlendirme notu çıkar.
8. TEHLİKELİ sonucunda → İhbar butonu görünür
   (detay için Akış 7'ye bak).
9. Analiz otomatik geçmişe kaydedilir.

## Akış 2 — Link Kontrolü
1. Kullanıcı "Link Kontrolü" kartına basar.
2. Şüpheli linki kutuya yapıştırır.
3. "Linki Kontrol Et" butonuna basar.
4. Sonuç kartı çıkar (aynı format).
5. TEHLİKELİ sonucunda → İhbar butonu görünür.
6. Analiz otomatik geçmişe kaydedilir.

## Akış 3 — Karekod (QR) Tara
1. Kullanıcı "Karekod Tara" kartına basar.
2. QR kod fotoğrafını yükler.
3. "QR Kodu Kontrol Et" butonuna basar.
4. AI görselden kodu okur, tehdit analizi yapar.
5. Sonuç kartı çıkar (aynı format).
6. TEHLİKELİ sonucunda → İhbar butonu görünür.
7. Analiz otomatik geçmişe kaydedilir.

## Akış 4 — Eski Kontrollerim
1. Kullanıcı sağ üstteki "Eski Kontrollerim"
   butonuna basar.
2. Sağdan kayan panel açılır.
3. Geçmiş analizler listelenir:
   tarih + içerik özeti + sonuç rengi
4. İstenen kayıt tıklanınca sonuç tekrar görünür.
5. Çöp kutusu ikonu ile kayıt silinebilir.
6. Panel dışına tıklanınca kapanır.
7. Geçmiş boşsa:
   "Henüz bir analiz yapmadınız." mesajı görünür.

## Akış 5 — Sesli Okuma
1. Sonuç kartında 🔊 ikonuna basılır.
2. Sonuç Türkçe sesli okunur:
   "Sonuç: TEHLİKELİ. Neden: ... Ne yapmalısınız: ..."
3. Tekrar basılınca durur.

## Akış 6 — Bültene Katıl
1. Kullanıcı sayfanın altına iner.
2. E-posta adresini yazar.
3. "Bültene Katıl" butonuna basar.
4. n8n webhook'a e-posta gönderilir.
5. "Aramıza hoş geldiniz! 🛡️" mesajı görünür.

## Akış 7 — Dolandırıcılık İhbarı
Bu özellik TEHLİKELİ sonuçlarda otomatik çıkar
ve topluluğu korumaya yönelik çalışır.
```
TEHLİKELİ sonuç çıkar
        ↓
Sonuç kartının altında buton görünür:
"📢 Bu Dolandırıcılığı İhbar Et"
        ↓
Kullanıcı butona basar
        ↓
Arka planda n8n webhook'a şu veriler gider:
- Mesajın içeriği (anonim, ilk 1000 karakter)
- Sonuç: TEHLİKELİ
- Neden tehlikeli olduğu
- Tarih ve saat
- Platform: TrustCheck Web
        ↓
n8n bu verileri toplar ve kaydeder
(Google Sheets veya veritabanı)
        ↓
Buton "✅ İhbar Edildi" olarak güncellenir
        ↓
Altında küçük not görünür:
"İhbarlar anonim olarak toplanır ve
 topluluğu uyarmak için kullanılır."
```

**Neden bu özellik var?**
Bir kullanıcı yeni bir dolandırıcılık tespit ettiğinde
bu bilgi anonim olarak toplanır. Biriken veriler
topluluğu uyarmak ve AI'ın tehdit tespitini
güçlendirmek için kullanılabilir. Kullanıcı
kişisel bilgi paylaşmaz, sadece mesajın içeriği
ve analiz sonucu iletilir.

## Genel Hata Durumları

### Boş Kutuyla Buton Basılırsa
```
"Lütfen önce bir mesaj yapıştırın
 veya görsel yükleyin."
```

### API Bağlantısı Yoksa
```
"Analiz sırasında bir hata oluştu.
 Lütfen tekrar deneyin."
```

### n8n Bağlantısı Yoksa
```
"İhbar gönderilirken bir sorun oluştu."
(uygulama çalışmaya devam eder)
```

### Desteklenmeyen Dosya Yüklenirse
```
"Lütfen PNG, JPG veya JPEG
 formatında dosya yükleyin."
```
```
