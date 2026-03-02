# smh-connect 🔗

**smh-connect**, sosyal medya platformlarındaki (Instagram, TikTok, YouTube) dinamik içerikleri API üzerinden çekerek web arayüzlerine entegre eden hafif bir veri köprüsüdür.

## 🚀 Projenin Amacı
Bu proje, manuel güncelleme gerektirmeden sosyal medya gönderilerini (Reels, Post, Stories) portfolyo veya web sitelerinde dinamik bir grid yapısında sergilemek için geliştirilmiştir.

## 🛠️ Nasıl Çalışır? (Teknik Akış)
Sistem üç ana aşamada çalışır:
1. **Veri Kaynağı:** Sosyal medya hesabı bir RSS beslemesine (Feed) dönüştürülür.
2. **Köprü (Bridge):** `rss2json` servisi kullanılarak XML verisi, tarayıcının anlayabileceği **JSON** formatına çevrilir.
3. **Render:** `connect.js` içindeki asenkron (async/await) fonksiyon, bu veriyi çeker ve Tailwind CSS ile hazırlanan modern kartlara basar.

## 📦 Kurulum ve Kullanım

1. **Dosyaları Dahil Edin:**
   `connect.js` dosyasını projenize ekleyin ve HTML dosyanızın altına script olarak bağlayın.

2. **API Linkini Oluşturun:**
   - [RSS.app](https://rss.app) üzerinden sosyal medya linkinizi RSS'e çevirin.
   - `connect.js` içindeki `rssUrl` değişkenine bu linki yapıştırın.

3. **Arayüzü Hazırlayın:**
   HTML içinde verilerin dolacağı kapsayıcıya `id="smh-social-grid"` değerini verin.

## ✨ Özellikler
- **Dikey (9:16) Kart Yapısı:** Reels videoları için optimize edilmiş tasarım.
- **Otomatik Tip Algılama:** İçeriğin video veya resim olduğunu anlayıp uygun ikonları yerleştirir.
- **Performans:** Veri çekme işlemi asenkron yapıldığı için sayfa hızını etkilemez.

---
**Geliştirici:** [Semih](https://smhbalkan.dev)
