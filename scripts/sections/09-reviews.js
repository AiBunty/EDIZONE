(function () {
    const carousel = document.getElementById('reviewCarousel');
    const track = document.getElementById('reviewCarouselTrack');
    const prevBtn = document.getElementById('reviewCarouselPrev');
    const nextBtn = document.getElementById('reviewCarouselNext');
    const dotsWrap = document.getElementById('reviewCarouselDots');

    if (!carousel || !track || !prevBtn || !nextBtn || !dotsWrap) {
        return;
    }

    const slides = Array.from(track.querySelectorAll('.review-carousel-slide'));
    const videoScreens = Array.from(track.querySelectorAll('.video-testimonial'));
    if (!slides.length) {
        return;
    }

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let currentIndex = 0;
    let perView = mobileQuery.matches ? 1 : 2;
    let pageCount = 1;

    const getGap = () => {
        const styles = window.getComputedStyle(track);
        return Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    };

    // Keyed by screen element: active HLS instances (playing)
    const hlsInstances = new WeakMap();
    // Keyed by screen element: pre-warmed HLS instances (manifest pre-loaded, not yet playing)
    const preWarmedMap = new Map();
    const preconnectedOrigins = new Set();

    const canPlayNativeHls = () => {
        const video = document.createElement('video');
        return Boolean(
            video.canPlayType('application/vnd.apple.mpegurl') ||
            video.canPlayType('application/x-mpegURL')
        );
    };

    const getYouTubeEmbedUrl = (rawUrl) => {
        if (!rawUrl) {
            return null;
        }

        try {
            const url = new URL(rawUrl, window.location.href);
            const host = url.hostname.replace(/^www\./, '');
            const pathSegments = url.pathname.split('/').filter(Boolean);
            let videoId = '';

            if (host === 'youtu.be') {
                videoId = pathSegments[0] || '';
            } else if (host.endsWith('youtube.com')) {
                if (pathSegments[0] === 'shorts' || pathSegments[0] === 'embed') {
                    videoId = pathSegments[1] || '';
                } else if (pathSegments[0] === 'watch') {
                    videoId = url.searchParams.get('v') || '';
                }
            }

            if (!/^[\w-]{11}$/.test(videoId)) {
                return null;
            }

            return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
        } catch (error) {
            return null;
        }
    };

    const ensureHeadLink = (rel, href, crossOrigin) => {
        const key = `${rel}:${href}`;
        if (preconnectedOrigins.has(key)) {
            return;
        }

        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (crossOrigin) {
            link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
        preconnectedOrigins.add(key);
    };

    const preconnectYouTube = () => {
        ensureHeadLink('dns-prefetch', 'https://www.youtube.com');
        ensureHeadLink('dns-prefetch', 'https://www.youtube-nocookie.com');
        ensureHeadLink('dns-prefetch', 'https://i.ytimg.com');

        ensureHeadLink('preconnect', 'https://www.youtube.com', true);
        ensureHeadLink('preconnect', 'https://www.youtube-nocookie.com', true);
        ensureHeadLink('preconnect', 'https://i.ytimg.com', true);
    };

    const makeHlsConfig = () => ({
        enableWorker: true,
        lowLatencyMode: false,
        startLevel: 0,           // Start at lowest quality for fastest first frame
        startFragPrefetch: true, // Prefetch first fragment while manifest parses
        maxBufferLength: 8,      // Buffer only 8s — reduces startup wait
        maxMaxBufferLength: 20,
    });

    // ── Pre-warm: load manifest + first segment in background when section enters viewport
    const preWarmVideo = (screen) => {
        if (typeof window.Hls === 'undefined' || !window.Hls.isSupported()) return;
        if (preWarmedMap.has(screen)) return;
        const videoSrc = screen.dataset.videoSrc;
        if (!videoSrc) return;
        if (getYouTubeEmbedUrl(videoSrc)) return;

        const dummy = document.createElement('video');
        dummy.muted = true;
        dummy.preload = 'auto';

        const hls = new window.Hls(makeHlsConfig());
        hls.loadSource(videoSrc);
        hls.attachMedia(dummy);
        preWarmedMap.set(screen, hls);
    };

    // Observe the carousel — pre-warm all videos when section enters viewport
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                videoScreens.forEach(preWarmVideo);
                if (videoScreens.some((screen) => getYouTubeEmbedUrl(screen.dataset.videoSrc))) {
                    preconnectYouTube();
                }
                sectionObserver.disconnect();
            }
        }, { rootMargin: '0px 0px -60px 0px', threshold: 0 });
        sectionObserver.observe(carousel);
    }

    videoScreens.forEach((screen) => {
        if (!getYouTubeEmbedUrl(screen.dataset.videoSrc)) {
            return;
        }

        const trigger = screen.querySelector('.youtube-short-trigger');
        if (!trigger) {
            return;
        }

        trigger.addEventListener('pointerenter', preconnectYouTube, { once: true });
        trigger.addEventListener('focus', preconnectYouTube, { once: true });
        trigger.addEventListener('touchstart', preconnectYouTube, { once: true, passive: true });
    });

    const stopPlayer = (screen) => {
        const player = screen.querySelector('.video-testimonial-player');
        const embed = screen.querySelector('.video-testimonial-embed');
        const trigger = screen.querySelector('.youtube-short-trigger');
        const hls = hlsInstances.get(screen);

        if (hls) {
            hls.destroy();
            hlsInstances.delete(screen);
        }

        if (player) {
            try {
                player.pause();
            } catch (error) {
                // Ignore pause errors from partially attached players.
            }
            player.removeAttribute('src');
            player.load();
            player.remove();
        }

        if (embed) {
            embed.remove();
        }

        screen.classList.remove('is-playing');

        if (trigger) {
            trigger.hidden = false;
        }
    };

    const stopAllPlayers = (exceptScreen) => {
        videoScreens.forEach((screen) => {
            if (screen !== exceptScreen) {
                stopPlayer(screen);
            }
        });
    };

    const playVideo = (screen) => {
        const videoSrc = screen.dataset.videoSrc;
        const videoTitle = screen.dataset.videoTitle || 'Video testimonial';
        const trigger = screen.querySelector('.youtube-short-trigger');

        if (!videoSrc || !trigger) {
            return;
        }

        stopAllPlayers(screen);
        stopPlayer(screen);

        const youtubeEmbedSrc = getYouTubeEmbedUrl(videoSrc);
        if (youtubeEmbedSrc) {
            const embed = document.createElement('iframe');
            embed.className = 'video-testimonial-embed';
            embed.src = youtubeEmbedSrc;
            embed.title = `${videoTitle} video player`;
            embed.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            embed.referrerPolicy = 'strict-origin-when-cross-origin';
            embed.loading = 'eager';
            embed.setAttribute('allowfullscreen', '');

            trigger.hidden = true;
            screen.classList.add('is-playing');
            screen.appendChild(embed);
            return;
        }

        const player = document.createElement('video');
        player.className = 'video-testimonial-player';
        player.controls = true;
        player.playsInline = true;
        player.preload = 'auto';
        player.setAttribute('playsinline', '');
        player.setAttribute('webkit-playsinline', '');
        player.setAttribute('controlsList', 'nodownload');
        player.setAttribute('aria-label', `${videoTitle} video player`);

        trigger.hidden = true;
        screen.classList.add('is-playing');
        screen.appendChild(player);

        const tryPlay = () => {
            const playPromise = player.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
            }
        };

        if (typeof window.Hls !== 'undefined' && window.Hls.isSupported()) {
            // Reuse pre-warmed instance if available — manifest already fetched
            const preWarmedHls = preWarmedMap.get(screen);
            let hls;

            if (preWarmedHls) {
                preWarmedMap.delete(screen);
                hls = preWarmedHls;
                // Detach from dummy and attach to visible player
                hls.detachMedia();
                hls.attachMedia(player);
            } else {
                hls = new window.Hls(makeHlsConfig());
                hls.loadSource(videoSrc);
                hls.attachMedia(player);
            }

            hlsInstances.set(screen, hls);

            // MANIFEST_PARSED may have already fired during pre-warm.
            // Levels being populated means manifest is ready.
            if (hls.levels && hls.levels.length > 0) {
                player.addEventListener('canplay', tryPlay, { once: true });
            } else {
                hls.once(window.Hls.Events.MANIFEST_PARSED, tryPlay);
            }

            return;
        }

        if (canPlayNativeHls()) {
            player.src = videoSrc;
            player.addEventListener('loadedmetadata', tryPlay, { once: true });
            return;
        }

        screen.classList.remove('is-playing');
        trigger.hidden = false;
        player.remove();
        window.open(videoSrc, '_blank', 'noopener');
    };

    const getMaxIndex = () => Math.max(0, slides.length - perView);

    const buildDots = () => {
        pageCount = Math.max(1, slides.length - perView + 1);
        dotsWrap.innerHTML = '';

        for (let index = 0; index < pageCount; index += 1) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'review-carousel-dot';
            dot.setAttribute('aria-label', `Show review set ${index + 1}`);
            dot.addEventListener('click', () => {
                render(index);
            });
            dotsWrap.appendChild(dot);
        }
    };

    const render = (index) => {
        const maxIndex = getMaxIndex();
        currentIndex = Math.min(Math.max(index, 0), maxIndex);
        stopAllPlayers();

        const slideWidth = slides[0].getBoundingClientRect().width;
        const offset = currentIndex * (slideWidth + getGap());
        track.style.transform = `translateX(-${offset}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;

        Array.from(dotsWrap.children).forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === currentIndex);
        });
    };

    const syncLayout = () => {
        const nextPerView = mobileQuery.matches ? 1 : 2;
        if (nextPerView !== perView) {
            perView = nextPerView;
        }
        buildDots();
        render(currentIndex);
    };

    prevBtn.addEventListener('click', () => {
        render(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        render(currentIndex + 1);
    });

    videoScreens.forEach((screen) => {
        const trigger = screen.querySelector('.youtube-short-trigger');

        if (!trigger) {
            return;
        }

        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            playVideo(screen);
        });
    });

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', syncLayout);
    } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(syncLayout);
    }

    window.addEventListener('resize', syncLayout, { passive: true });

    buildDots();
    render(0);
})();
