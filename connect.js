/**
 * smh-connect v1.0.0
 * Sosyal medya verilerini asenkron olarak işleyen ana sınıf.
 */

class SmhConnect {
    constructor() {
        // İleride buraya kendi API anahtarlarını veya RSS köprülerini ekleyebilirsin
        this.apiBase = "https://api.rss2json.com/v1/api.json?rss_url=";
    }

    /**
     * Belirtilen platformdan son gönderileri çeker.
     * @param {string} platform - 'instagram', 'tiktok' veya 'youtube'
     */
    async getFeed(platformUrl) {
        try {
            const response = await fetch(`${this.apiBase}${platformUrl}`);
            const data = await response.json();
            
            if (data.status === 'ok') {
                console.log("smh-connect: Veri başarıyla çekildi.");
                return data.items;
            }
            throw new Error("Veri formatı hatalı.");
        } catch (error) {
            console.error("smh-connect Hatası:", error);
            return null;
        }
    }
}

export default SmhConnect;