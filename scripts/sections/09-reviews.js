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

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', syncLayout);
    } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(syncLayout);
    }

    window.addEventListener('resize', syncLayout, { passive: true });

    buildDots();
    render(0);
})();