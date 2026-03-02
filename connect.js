/**
 * smh-connect v1.0.0
 * Sosyal medya verilerini asenkron olarak çeker ve arayüzü günceller.
 */

class SmhConnect {
    constructor() {
        this.apiBase = "https://api.rss2json.com/v1/api.json?rss_url="; // Örnek bir köprü
        this.feeds = {
            instagram: "INSTAGRAM_RSS_LINK",
            tiktok: "TIKTOK_RSS_LINK"
        };
    }

    async getLatestPosts(platform) {
        console.log(`smh-connect: ${platform} verileri isteniyor...`);
        try {
            const response = await fetch(`${this.apiBase}${this.feeds[platform]}`);
            const data = await response.json();
            return data.items.slice(0, 3); // Son 3 postu al
        } catch (error) {
            console.error("smh-connect hatası:", error);
            return null;
        }
    }

    renderCard(post) {
        // Sitedeki o havalı kart yapısını döndürür
        return `
            <div class="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-[#3ABEF9]/50 transition">
                <img src="${post.thumbnail}" class="w-full aspect-square object-cover opacity-80 hover:opacity-100 transition">
                <div class="p-4">
                    <p class="text-xs text-[#3ABEF9] font-bold uppercase">${post.pubDate}</p>
                </div>
            </div>
        `;
    }
}

export default SmhConnect;