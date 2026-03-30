# TrustCheck — user-flow.md

## Uygulama Açılışında
Kullanıcı siteye girer. Koyu header'da TrustCheck
logosu ve sağda "Eski Kontrollerim" butonu görünür.
Ana içerikte başlık, açıklama ve üç kart:
Mesaj İncele, Link Kontrolü, Karekod Tara.

## Akış 1 — Mesaj İncele
1. Kullanıcı "Mesaj İncele" kartına basar.
2. Mesajı metin kutusuna yapıştırır
   ya da "Görsel Yükle" ile ekran görüntüsü yükler.
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
8. TEHLİKELİ sonucunda →
   "Bu Dolandırıcılığı İhbar Et" butonu çıkar.
9. Analiz otomatik geçmişe kaydedilir.

## Akış 2 — Link Kontrolü
1. Kullanıcı "Link Kontrolü" kartına basar.
2. Şüpheli linki kutuya yapıştırır.
3. "Linki Kontrol Et" butonuna basar.
4. Sonuç kartı çıkar (aynı format).
5. Analiz otomatik geçmişe kaydedilir.

## Akış 3 — Karekod (QR) Tara
1. Kullanıcı "Karekod Tara" kartına basar.
2. QR kod fotoğrafını yükler.
3. "QR Kodu Kontrol Et" butonuna basar.
4. AI görselden kodu okur, tehdit analizi yapar.
5. Sonuç kartı çıkar (aynı format).
6. Analiz otomatik geçmişe kaydedilir.

## Akış 4 — Eski Kontrollerim
1. Kullanıcı sağ üstteki "Eski Kontrollerim"
   butonuna basar.
2. Sağdan kayan panel açılır.
3. Geçmiş analizler listelenir:
   tarih + içerik özeti + sonuç rengi
4. İstenen kayıt tıklanınca sonuç tekrar görünür.
5. Çöp kutusu ikonu ile kayıt silinebilir.
6. Panel dışına tıklanınca kapanır.

## Akış 5 — Sesli Okuma
1. Sonuç kartında 🔊 ikonuna basılır.
2. Sonuç Türkçe olarak sesli okunur.
3. Tekrar basılınca durur.

## Akış 6 — Bültene Katıl
1. Kullanıcı sayfanın altına iner.
2. E-posta adresini yazar.
3. "Bültene Katıl" butonuna basar.
4. "Aramıza hoş geldiniz! 🛡️" mesajı görünür.
