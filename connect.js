/**
 * smh-connect: Instagram Data Engine
 * GitHub: @Armu-T
 */

const INSTAGRAM_CONFIG = {
    // Kendi RSS linkini buraya koyabilirsin
    RSS_URL: 'https://rss.app/feeds/ZHXITnAybAOj5LP7.xml',
    // Resim yüklenemezse görünecek yedek görsel
    DEFAULT_IMG: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500',
    // Kaç adet post gösterilecek?
    POST_COUNT: 4
};

async function fetchInstagramFeed() {
    const grid = document.querySelector('#smh-social-grid');
    if (!grid) return;

    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(INSTAGRAM_CONFIG.RSS_URL)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            grid.innerHTML = '';

            data.items.slice(0, INSTAGRAM_CONFIG.POST_COUNT).forEach((post) => {
                // Ham görsel URL'sini belirle
                const rawImg = (post.enclosure && post.enclosure.link) ? post.enclosure.link : post.thumbnail;
                
                // Görsel URL'sini temizle ve Proxy üzerinden geçir
                let finalImg = INSTAGRAM_CONFIG.DEFAULT_IMG;
                if (rawImg) {
                    const cleanUrl = rawImg.replace(/&amp;/g, '&');
                    finalImg = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}`;
                }

                const isVideo = post.link.includes('/reels/') || post.link.includes('/p/');
                const title = post.title || 'Instagram Post';

                const cardHTML = `
                    <a href="${post.link}" target="_blank" class="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-xl transition-all duration-500 hover:border-[#3ABEF9]/50">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-80"></div>
                        
                        <img src="${finalImg}" 
                             alt="${title}" 
                             referrerpolicy="no-referrer"
                             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                             onerror="this.src='${INSTAGRAM_CONFIG.DEFAULT_IMG}';">
                        
                        <div class="absolute top-4 right-4 z-20 text-white/50 bg-black/20 backdrop-blur-md p-2 rounded-lg text-[10px]">
                            <i class="fas ${isVideo ? 'fa-video' : 'fa-camera'}"></i>
                        </div>
                        
                        <div class="absolute bottom-5 left-5 right-5 z-20">
                            <p class="text-[10px] font-black text-[#3ABEF9] uppercase tracking-[0.2em] mb-2">
                                ${isVideo ? 'Reels' : 'Post'}
                            </p>
                            <p class="text-[11px] text-slate-200 font-medium line-clamp-2 leading-relaxed">
                                ${title}
                            </p>
                        </div>
                    </a>
                `;
                grid.innerHTML += cardHTML;
            });
        }
    } catch (error) {
        grid.innerHTML = `<p class="text-slate-500 text-xs italic text-center col-span-full">Unable to load feed.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchInstagramFeed);
