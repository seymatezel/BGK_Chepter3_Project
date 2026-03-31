# TrustCheck — idea.md

## Problem
Yaşlılar ve teknolojiye uzak bireyler, SMS/e-posta
dolandırıcılığına ve sahte linklere karşı savunmasız.
Gelen mesajın gerçek mi sahte mi olduğunu
anlayamıyorlar — yanlış bir tıklama büyük maddi
ve kişisel zarara yol açabiliyor.

Türkiye'deki yerel dolandırıcılık kalıpları
(Ziraat, Garanti, PTT, e-Devlet, Turkcell taklidi,
kargo SMS'i vb.) mevcut global araçlar tarafından
yeterince tanınmıyor.

## Kullanıcı
Teknolojiye uzak bireyler — özellikle 60+ yaş grubu.
Akıllı telefon kullanan ama siber güvenlikten
anlamayan, dolandırıcılık mesajlarını fark etmekte
zorlanan kişiler.

Arayüz sade, büyük yazılı ve teknik terim
içermemeli. Kullanıcı hiçbir hesap açmadan,
kurulum yapmadan direkt kullanabilmeli.

## AI'ın Rolü
Dört farklı şekilde analiz yapar:

**Mesaj & Görsel Analizi**
Kullanıcının yapıştırdığı SMS veya e-posta
metnini ya da yüklediği görseli okur. Sahte
kurum taklidi, aciliyet dili, kimlik/para
talebi, şüpheli link ve dil hatalarını tespit
eder. Metinde link veya QR kod varlığını
tespit ederse ilgili bölüme yönlendirir.

**Link Kontrolü**
Kullanıcının yapıştırdığı şüpheli URL'yi
değerlendirir, tehdit tespiti yapar.

**QR Kod Analizi**
Kullanıcının yüklediği QR kod görselini okur,
içindeki URL'yi tespit eder, tehdit analizi
yapar.

**Sesli Okuma**
Sonuç kartını Türkçe olarak sesli okur —
yaşlı kullanıcılar için kritik erişilebilirlik.

Tüm analizlerde:
- Dili otomatik algılar (Türkçe, İngilizce vb.)
- Sonucu 3 kategoride sunar:
  🔴 TEHLİKELİ / 🟡 ŞÜPHELİ / 🟢 GÜVENLİ
- Sade Türkçe ile açıklama ve öneri sunar
- Tüm analizler localStorage'a kaydedilir

## Rakip Durum
| Araç | Güçlü Yönü | Zayıf Yönü |
|------|-----------|------------|
| Bitdefender Scamio | Çok platform, ücretsiz | Türkiye odağı yok |
| Norton Genie | Hızlı analiz | Uygulama gerektirir |
| TruthScan | AI phishing tespiti | Kurumsal odaklı |

**TrustCheck'in farkı:**
- Türkiye'ye özgü yerel kalıpları tanıyan tek araç
- Hesap/kurulum gerektirmiyor
- Yaşlı dostu arayüz + sesli okuma
- n8n ile dolandırıcılık ihbar otomasyonu
- Haftalık güvenlik bülteni aboneliği
- Geçmiş analizleri localStorage'da saklıyor

## Başarı Kriteri
Kullanıcı şüpheli bir mesajı yapıştırıp 10 saniye
içinde sade Türkçe ile NET bir uyarı alır —
hiçbir teknik bilgiye ve hesaba ihtiyaç duymadan.
