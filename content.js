// URL'den tt kodunu al
const url = window.location.href;
const ttMatch = url.match(/tt\d+/);

if (ttMatch) {
    const ttCode = ttMatch[0];
    
    // Film mi dizi mi kontrol et
    function checkIfTvSeries() {
        const ratingSection = document.querySelector('[data-testid="hero-rating-bar__aggregate-rating"]');
        if (ratingSection) {
            // Sayfa içeriğinde "TV Series" veya episode count kontrolü
            const pageContent = document.body.textContent;
            return pageContent.includes('TV Series') || 
                   pageContent.includes('Episodes') ||
                   document.querySelector('[data-testid="episodes-browse-episodes"]') !== null;
        }
        return false;
    }
    
    // Buton konteynerı oluştur
    function createButtonContainer() {
        const isTvSeries = checkIfTvSeries();
        
        const container = document.createElement('div');
        container.id = 'custom-watch-button-container';
        container.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 10px 0;
            flex-wrap: wrap;
        `;
        
        if (isTvSeries) {
            // Dizi için: Buton + Sezon/Bölüm seçiciler
            const watchButton = document.createElement('a');
            watchButton.id = 'custom-watch-button';
            watchButton.target = '_blank';
            watchButton.textContent = '▶ Watch Now';
            watchButton.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white !important;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                font-size: 16px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                cursor: pointer;
                font-family: 'Roboto', sans-serif;
            `;
            
            watchButton.onmouseover = () => {
                watchButton.style.transform = 'translateY(-2px)';
                watchButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            };
            watchButton.onmouseout = () => {
                watchButton.style.transform = 'translateY(0)';
                watchButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            };
            
            // Sezon seçici
            const seasonLabel = document.createElement('label');
            seasonLabel.textContent = 'Season:';
            seasonLabel.style.cssText = 'font-weight: bold; margin-left: 5px;';
            
            const seasonSelect = document.createElement('select');
            seasonSelect.id = 'season-select';
            seasonSelect.style.cssText = `
                padding: 8px 12px;
                border-radius: 6px;
                border: 2px solid #667eea;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                background: white;
                color: #333;
            `;
            
            // 20 sezona kadar seçenek ekle
            for (let i = 1; i <= 20; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                seasonSelect.appendChild(option);
            }
            
            // Bölüm seçici
            const episodeLabel = document.createElement('label');
            episodeLabel.textContent = 'Episode:';
            episodeLabel.style.cssText = 'font-weight: bold; margin-left: 10px;';
            
            const episodeSelect = document.createElement('select');
            episodeSelect.id = 'episode-select';
            episodeSelect.style.cssText = `
                padding: 8px 12px;
                border-radius: 6px;
                border: 2px solid #667eea;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                background: white;
                color: #333;
            `;
            
            // 30 bölüme kadar seçenek ekle
            for (let i = 1; i <= 30; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                episodeSelect.appendChild(option);
            }
            
            // URL güncelleme fonksiyonu
            function updateWatchUrl() {
                const season = seasonSelect.value;
                const episode = episodeSelect.value;
                watchButton.href = `https://vidsrc-embed.ru/embed/tv/${ttCode}/${season}-${episode}`;
            }
            
            // Başlangıç URL'si
            updateWatchUrl();
            
            // Seçiciler değiştiğinde URL'yi güncelle
            seasonSelect.addEventListener('change', updateWatchUrl);
            episodeSelect.addEventListener('change', updateWatchUrl);
            
            container.appendChild(watchButton);
            container.appendChild(seasonLabel);
            container.appendChild(seasonSelect);
            container.appendChild(episodeLabel);
            container.appendChild(episodeSelect);
            
        } else {
            // Film için: Sadece buton
            const watchButton = document.createElement('a');
            watchButton.href = `https://vidsrc-embed.ru/embed/movie/${ttCode}`;
            watchButton.target = '_blank';
            watchButton.textContent = '▶ Şimdi İzle';
            watchButton.id = 'custom-watch-button';
            watchButton.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white !important;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                font-size: 16px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                cursor: pointer;
                font-family: 'Roboto', sans-serif;
            `;
            
            watchButton.onmouseover = () => {
                watchButton.style.transform = 'translateY(-2px)';
                watchButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            };
            watchButton.onmouseout = () => {
                watchButton.style.transform = 'translateY(0)';
                watchButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            };
            
            container.appendChild(watchButton);
        }
        
        return container;
    }
    
    // Butonu sayfaya ekle
    function addButton() {
        if (document.getElementById('custom-watch-button-container')) return;
        
        const ratingSection = document.querySelector('[data-testid="hero-rating-bar__aggregate-rating"]');
        
        if (ratingSection && ratingSection.parentElement) {
            const container = createButtonContainer();
            ratingSection.parentElement.appendChild(container);
        }
    }
    
    // Sayfa yüklendiğinde butonu ekle
    addButton();
    
    // Dinamik içerik değişikliklerini izle
    const observer = new MutationObserver(addButton);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Ekstra güvenlik için 1 saniye sonra tekrar dene
    setTimeout(addButton, 1000);
}