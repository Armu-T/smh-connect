// smh-connect: Instagram Veri Motoru
        async function fetchInstagramFeed() {
            const grid = document.querySelector('#smh-social-grid');

            // NOT: 'INSTAGRAM_RSS_ID' kısmını kendi feed id'in ile değiştir.
            const rssUrl = 'https://rss.app/feeds/v1/INSTAGRAM_RSS_ID';
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === 'ok') {
                    grid.innerHTML = '';

                    data.items.slice(0, 4).forEach((post) => {
                        const isVideo = post.enclosure && post.enclosure.type === 'video/mp4';
                        const thumbnail = post.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop';
                        const title = post.title || 'Yeni içerik yayında! 🚀';

                        const cardHTML = `
                            <a href="${post.link}" target="_blank" class="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 hover:border-[#3ABEF9]/50 transition-all duration-500 shadow-xl shadow-black/20">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-80"></div>
                                <img src="${thumbnail}" alt="smh-connect content" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute top-4 right-4 z-20 text-white/50 bg-black/20 backdrop-blur-md p-2 rounded-lg">
                                    <i class="fas ${isVideo ? 'fa-film' : 'fa-camera'} text-xs"></i>
                                </div>
                                <div class="absolute bottom-5 left-5 right-5 z-20">
                                    <p class="text-[10px] font-black text-[#3ABEF9] uppercase tracking-[0.2em] mb-2">
                                        ${isVideo ? 'Reels' : 'Post'}
                                    </p>
                                    <p class="text-xs text-slate-200 font-medium line-clamp-2 leading-relaxed">
                                        ${title}
                                    </p>
                                </div>
                            </a>
                        `;

                        grid.innerHTML += cardHTML;
                    });
                }
            } catch (error) {
                console.error('smh-connect: Veri cekilirken bir sorun olustu!', error);
                grid.innerHTML = '<p class="text-slate-500 text-xs italic">Icerikler su an yuklenemedi kanka.</p>';
            }
        }

        document.addEventListener('DOMContentLoaded', fetchInstagramFeed);
