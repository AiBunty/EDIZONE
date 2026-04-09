const pagePreloader = document.getElementById('pagePreloader');
        const preloaderMessage = document.getElementById('preloaderMessage');
        const preloaderSkipBtn = document.getElementById('preloaderSkipBtn');
        const preloaderMessageList = [
            'Preparing personalized guidance for your study abroad journey...',
            'Loading expert counselling resources for students and parents...',
            'Setting up top university options and scholarship pathways...',
            'Getting application and visa success roadmap ready for you...'
        ];
        let preloaderMessageIndex = 0;
        let preloaderMessageTimer = null;
        let preloaderSkipTimer = null;

        const rotatePreloaderMessage = () => {
            if (!preloaderMessage) {
                return;
            }
            preloaderMessage.classList.add('is-fading');
            preloaderMessageIndex = (preloaderMessageIndex + 1) % preloaderMessageList.length;
            window.setTimeout(() => {
                preloaderMessage.textContent = preloaderMessageList[preloaderMessageIndex];
                preloaderMessage.classList.remove('is-fading');
            }, 130);
        };

        if (preloaderMessage && preloaderMessageList.length > 1) {
            preloaderMessage.textContent = preloaderMessageList[0];
            preloaderMessageTimer = window.setInterval(rotatePreloaderMessage, 1700);
        }

        if (preloaderSkipBtn && pagePreloader) {
            preloaderSkipTimer = window.setTimeout(() => {
                if (!pagePreloader.classList.contains('is-hidden')) {
                    preloaderSkipBtn.classList.add('is-visible');
                }
            }, 2500);
        }

        const hidePagePreloader = () => {
            if (preloaderMessageTimer) {
                window.clearInterval(preloaderMessageTimer);
                preloaderMessageTimer = null;
            }
            if (preloaderSkipTimer) {
                window.clearTimeout(preloaderSkipTimer);
                preloaderSkipTimer = null;
            }
            pagePreloader?.classList.add('is-hidden');
            document.body.classList.remove('preloading');
            if (pagePreloader) {
                window.setTimeout(() => {
                    pagePreloader.style.display = 'none';
                }, 500);
            }
        };

        preloaderSkipBtn?.addEventListener('click', hidePagePreloader);

        window.addEventListener('load', hidePagePreloader);

        const timelineToggleBtn = document.getElementById('timelineToggleBtn');
        const timelineCollapsible = document.getElementById('timelineCollapsible');
        const studentBenefitsCarousel = document.getElementById('studentBenefitsCarousel');
        const studentBenefitsTrack = document.getElementById('studentBenefitsTrack');
        const studentBenefitsSlides = Array.from(document.querySelectorAll('.student-benefit-card'));
        const studentBenefitsDots = Array.from(document.querySelectorAll('.student-benefits-progress-dot'));

        if (studentBenefitsCarousel && studentBenefitsTrack && studentBenefitsSlides.length) {
            let studentBenefitsIndex = 0;
            let studentBenefitsAutoplayId = null;

            const renderStudentBenefitSlide = (index) => {
                studentBenefitsIndex = (index + studentBenefitsSlides.length) % studentBenefitsSlides.length;
                studentBenefitsTrack.style.transform = `translateX(-${studentBenefitsIndex * 100}%)`;
                studentBenefitsSlides.forEach((slide, slideIndex) => {
                    slide.classList.toggle('is-active', slideIndex === studentBenefitsIndex);
                });
                studentBenefitsDots.forEach((dot, dotIndex) => {
                    dot.classList.toggle('is-active', dotIndex === studentBenefitsIndex);
                });
            };

            const stopStudentBenefitsAutoplay = () => {
                if (studentBenefitsAutoplayId) {
                    window.clearInterval(studentBenefitsAutoplayId);
                    studentBenefitsAutoplayId = null;
                }
            };

            const startStudentBenefitsAutoplay = () => {
                stopStudentBenefitsAutoplay();
                studentBenefitsAutoplayId = window.setInterval(() => {
                    renderStudentBenefitSlide(studentBenefitsIndex + 1);
                }, 2000);
            };

            studentBenefitsDots.forEach((dot, dotIndex) => {
                dot.addEventListener('click', () => {
                    renderStudentBenefitSlide(dotIndex);
                    startStudentBenefitsAutoplay();
                });
            });

            studentBenefitsCarousel.addEventListener('mouseenter', stopStudentBenefitsAutoplay);
            studentBenefitsCarousel.addEventListener('mouseleave', startStudentBenefitsAutoplay);
            studentBenefitsCarousel.addEventListener('focusin', stopStudentBenefitsAutoplay);
            studentBenefitsCarousel.addEventListener('focusout', startStudentBenefitsAutoplay);

            renderStudentBenefitSlide(0);
            startStudentBenefitsAutoplay();
        }

        timelineToggleBtn?.addEventListener('click', () => {
            if (!timelineCollapsible) {
                return;
            }

            const willOpen = !timelineCollapsible.classList.contains('is-open');
            timelineCollapsible.classList.toggle('is-open', willOpen);
            timelineToggleBtn.setAttribute('aria-expanded', String(willOpen));

            const label = timelineToggleBtn.querySelector('span');
            if (label) {
                label.textContent = willOpen ? 'Hide Timeline' : 'Show Timeline';
            }
        });

        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.navbar-links');
        const navDrawerBackdrop = document.getElementById('navDrawerBackdrop');
        const mobileQuickActions = document.getElementById('mobileQuickActions');
        const mobileQuickToggle = document.getElementById('mobileQuickToggle');
        const backToTop = document.getElementById('backToTop');
        const openCounsellingSideBtn = document.getElementById('openCounsellingSide');
        const deckMediaQuery = window.matchMedia('(max-width: 768px)');
        let openModalCount = 0;

        const setModalState = (isOpen) => {
            if (isOpen) {
                openModalCount += 1;
            } else {
                openModalCount = Math.max(0, openModalCount - 1);
            }

            const hasOpenModal = openModalCount > 0;
            document.body.style.overflow = hasOpenModal ? 'hidden' : '';

            if (mobileQuickActions) {
                mobileQuickActions.style.opacity = hasOpenModal ? '0' : '';
                mobileQuickActions.style.pointerEvents = hasOpenModal ? 'none' : '';
            }
        };

        const updateStickyAndTopButton = () => {
            const scrolled = window.scrollY > 30;
            navbar?.classList.toggle('is-sticky-scrolled', scrolled);
            backToTop?.classList.toggle('is-visible', window.scrollY > 260);
        };

        window.addEventListener('scroll', updateStickyAndTopButton, { passive: true });
        updateStickyAndTopButton();

        backToTop?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ===== Counselling Modal =====
        const counsellingModal = document.getElementById('counsellingModal');
        const openBtn = document.getElementById('openCounsellingModal');
        const closeBtn = document.getElementById('closeCounsellingModal');
        const counsellingFrame = document.getElementById('counsellingCalendarFrame');

        const ensureCounsellingFrameLoaded = () => {
            if (!counsellingFrame) {
                return;
            }

            const source = counsellingFrame.dataset.src;
            if (source && counsellingFrame.src !== source) {
                counsellingFrame.src = source;
            }
        };

        const openModal = () => {
            ensureCounsellingFrameLoaded();
            counsellingModal.classList.add('is-open');
            setModalState(true);
        };

        const closeModal = () => {
            counsellingModal.classList.remove('is-open');
            setModalState(false);
        };

        openBtn?.addEventListener('click', openModal);
        openCounsellingSideBtn?.addEventListener('click', openModal);
        closeBtn?.addEventListener('click', closeModal);
        counsellingModal?.addEventListener('click', (e) => {
            if (e.target === counsellingModal) closeModal();
        });

        mobileQuickToggle?.addEventListener('click', () => {
            if (!mobileQuickActions) return;
            const willCollapse = !mobileQuickActions.classList.contains('is-collapsed');
            mobileQuickActions.classList.toggle('is-collapsed', willCollapse);
            mobileQuickToggle.setAttribute('aria-expanded', String(!willCollapse));
            const icon = mobileQuickToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-arrow-right', !willCollapse);
                icon.classList.toggle('fa-arrow-left', willCollapse);
            }
            mobileQuickToggle.setAttribute('aria-label', willCollapse ? 'Expand quick actions' : 'Collapse quick actions');
        });

        // ===== Enquiry Form Modal =====
        const enquiryModal = document.getElementById('enquiryModal');
        const openEnquiryFromEmailBtn = document.getElementById('openEnquiryFromEmail');
        const closeEnquiryBtn = document.getElementById('closeEnquiryModal');

        const openEnquiry = () => {
            enquiryModal.classList.add('is-open');
            setModalState(true);
        };

        const closeEnquiry = () => {
            enquiryModal.classList.remove('is-open');
            setModalState(false);
        };

        openEnquiryFromEmailBtn?.addEventListener('click', openEnquiry);
        closeEnquiryBtn?.addEventListener('click', closeEnquiry);
        enquiryModal?.addEventListener('click', (e) => {
            if (e.target === enquiryModal) closeEnquiry();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { closeModal(); closeEnquiry(); closeMobileNav(); }
        });

        const closeMobileNav = () => {
            if (!navToggle || !navLinks || window.innerWidth > 900) return;
            navLinks.classList.remove('is-open');
            navToggle.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navDrawerBackdrop?.classList.remove('is-visible');
            if (openModalCount === 0) document.body.style.overflow = '';
        };

        navDrawerBackdrop?.addEventListener('click', () => {
            closeMobileNav();
        });

        const setupMobileDeckStack = () => {
            const isDeckMode = deckMediaQuery.matches;
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 84;
            document.documentElement.style.setProperty('--mobile-deck-top', `${navHeight + 12}px`);

            document.querySelectorAll('.mobile-deck').forEach(deck => {
                const cards = deck.querySelectorAll(':scope > .mobile-deck-card');
                if (!cards.length) return;

                if (isDeckMode) {
                    cards.forEach((card, index) => {
                        card.style.zIndex = String(index + 1);
                    });
                    deck.style.paddingBottom = `${Math.max(96, cards.length * 20)}px`;
                    return;
                }

                cards.forEach(card => {
                    card.style.zIndex = '';
                });
                deck.style.paddingBottom = '';
            });
        };

        if (deckMediaQuery.addEventListener) {
            deckMediaQuery.addEventListener('change', setupMobileDeckStack);
        } else if (deckMediaQuery.addListener) {
            deckMediaQuery.addListener(setupMobileDeckStack);
        }

        setupMobileDeckStack();

        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                const willOpen = !navLinks.classList.contains('is-open');
                navLinks.classList.toggle('is-open', willOpen);
                navToggle.classList.toggle('is-open', willOpen);
                navToggle.setAttribute('aria-expanded', String(willOpen));
                navDrawerBackdrop?.classList.toggle('is-visible', willOpen);
                if (willOpen) {
                    document.body.style.overflow = 'hidden';
                } else if (openModalCount === 0) {
                    document.body.style.overflow = '';
                }
                setupMobileDeckStack();
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 900) {
                    navLinks.classList.remove('is-open');
                    navToggle.classList.remove('is-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navDrawerBackdrop?.classList.remove('is-visible');
                    if (openModalCount === 0) document.body.style.overflow = '';
                    mobileQuickActions?.classList.remove('is-collapsed');
                    mobileQuickToggle?.setAttribute('aria-expanded', 'true');
                }
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const yOffset = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                    window.scrollTo({
                        top: yOffset,
                        behavior: 'smooth'
                    });
                }
                closeMobileNav();
            });
        });

        // ===== Active nav link highlighting =====
        if ('IntersectionObserver' in window && navLinks) {
            const sectionIds = ['directors', 'universities', 'offers', 'services', 'gpaths', 'timeline', 'support', 'reviews', 'google-reviews-static', 'faq', 'contact'];
            const navLinkMap = new Map();
            sectionIds.forEach(id => {
                const sec = document.getElementById(id);
                const link = navLinks.querySelector(`a[href="#${id}"]`);
                if (sec && link) navLinkMap.set(sec, link);
            });

            const activeSectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const link = navLinkMap.get(entry.target);
                    if (link) link.classList.toggle('is-active', entry.isIntersecting);
                });
            }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });

            navLinkMap.forEach((_, sec) => activeSectionObserver.observe(sec));
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .service-box, .timeline-content, .director-card').forEach(el => {
            observer.observe(el);
        });

        // ===== PRELOAD EMBEDS ON PAGE LOAD =====
        const preloadEmbeds = () => {
            // Preload enquiry form
            const enquiryFrame = document.getElementById('inline-69afd0266f597');
            if (enquiryFrame && enquiryFrame.src) {
                console.log('✓ Enquiry form embed cached');
            }

            console.log('✓ Embeds preloaded for faster modal opening');
        };

        // Preload embeds on page load or when document is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', preloadEmbeds);
        } else {
            preloadEmbeds();
        }

        // Cache warmup: Create connections to embed servers in the background
        window.addEventListener('load', () => {
            const preloaderDiv = document.querySelector('.embed-preloader');
            if (preloaderDiv) {
                const frames = preloaderDiv.querySelectorAll('iframe');
                console.log(`✓ Embed cache warmed up with ${frames.length} preloader frames`);
            }
        });

        // ===== FAQ ACCORDION FUNCTIONALITY =====
        document.querySelectorAll('.faq-item').forEach((faqItem) => {
            const question = faqItem.querySelector('.faq-question');
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = faqItem.querySelector('.faq-toggle');
            if (!question || !answer) return;

            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0px';
            if (toggle) toggle.textContent = '+';

            const collapse = (item) => {
                const q = item.querySelector('.faq-question');
                const a = item.querySelector('.faq-answer');
                const t = item.querySelector('.faq-toggle');
                item.classList.remove('active');
                if (a) a.style.maxHeight = '0px';
                if (q) q.setAttribute('aria-expanded', 'false');
                if (t) t.textContent = '+';
            };

            const expand = (item) => {
                const q = item.querySelector('.faq-question');
                const a = item.querySelector('.faq-answer');
                const t = item.querySelector('.faq-toggle');
                item.classList.add('active');
                if (a) a.style.maxHeight = `${a.scrollHeight}px`;
                if (q) q.setAttribute('aria-expanded', 'true');
                if (t) t.textContent = '−';
            };

            const toggleFaq = () => {
                const isActive = faqItem.classList.contains('active');
                if (isActive) {
                    collapse(faqItem);
                } else {
                    expand(faqItem);
                }
            };

            question.addEventListener('click', toggleFaq);
            question.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleFaq();
                }
            });
        });

        // ===== UNIVERSITY COUNTRY CAROUSEL =====
        const enableExternalUniversityLogos = false;

        const universityLogoMap = {};

        const universityDemoImageMap = {
            HARV: 'assets/universities/demo/harv-campus.jpg',
            MIT: 'assets/universities/demo/mit-campus.jpg',
            SU: 'assets/universities/demo/su-campus.jpg',
            YU: 'assets/universities/demo/yu-campus.jpg',
            OX: 'assets/universities/demo/ox-campus.jpg',
            CAM: 'assets/universities/demo/cam-campus.jpg',
            ICL: 'assets/universities/demo/icl-campus.jpg',
            LSE: 'assets/universities/demo/lse-campus.jpg',
            UM: 'assets/universities/demo/um-campus.jpg',
            ANU: 'assets/universities/demo/anu-campus.jpg',
            UNSW: 'assets/universities/demo/unsw-campus.jpg',
            MON: 'assets/universities/demo/mon-campus.jpg',
            UOFT: 'assets/universities/demo/uoft-campus.jpg',
            UBC: 'assets/universities/demo/ubc-campus.jpg',
            MG: 'assets/universities/demo/mg-campus.jpg',
            MAC: 'assets/universities/demo/mac-campus.jpg',
            TUM: 'assets/universities/demo/tum-campus.jpg',
            HD: 'assets/universities/demo/hd-campus.jpg',
            HB: 'assets/universities/demo/hb-campus.jpg',
            BONN: 'assets/universities/demo/bonn-campus.jpg',
            PS: 'assets/universities/demo/ps-campus.jpg',
            SOR: 'assets/universities/demo/sor-campus.jpg',
            PSL: 'assets/universities/demo/psl-campus.jpg',
            HEC: 'assets/universities/demo/hec-campus.jpg',
            NUS: 'assets/universities/demo/nus-campus.jpg',
            NTU: 'assets/universities/demo/ntu-campus.jpg',
            SMU: 'assets/universities/demo/smu-campus.jpg',
            SUSS: 'assets/universities/demo/suss-campus.jpg',
            UVA: 'assets/universities/demo/uva-campus.jpg',
            UU: 'assets/universities/demo/uu-campus.jpg',
            EUR: 'assets/universities/demo/eur-campus.jpg',
            RUG: 'assets/universities/demo/rug-campus.jpg'
        };

        const applyUniversityLogos = () => {
            // External Clearbit DNS is unreliable in some regions/networks.
            // Keep local text/initial badges unless explicitly enabled.
            if (!enableExternalUniversityLogos) return;

            document.querySelectorAll('.country-university-head .uni-logo-chip').forEach((chip) => {
                const label = (chip.textContent || '').trim();
                if (!label || chip.dataset.logoApplied === 'true') return;

                const logoSrc = universityLogoMap[label.toUpperCase()];
                if (!logoSrc) return;

                chip.classList.add('has-logo');
                chip.dataset.logoApplied = 'true';
                chip.setAttribute('title', label);
                chip.textContent = '';

                const img = document.createElement('img');
                img.className = 'uni-logo-image';
                img.src = logoSrc;
                img.alt = `${label} logo`;
                img.loading = 'lazy';
                img.decoding = 'async';
                img.referrerPolicy = 'no-referrer';
                img.onerror = () => {
                    chip.classList.remove('has-logo');
                    chip.textContent = label;
                };

                chip.appendChild(img);
            });
        };

        const applyUniversityDemoImages = () => {
            document.querySelectorAll('.country-university-card').forEach((card) => {
                if (card.dataset.demoImageApplied === 'true') return;

                const head = card.querySelector('.country-university-head');
                const chip = head?.querySelector('.uni-logo-chip');
                const titleEl = card.querySelector('h4');
                const key = ((chip?.getAttribute('title') || chip?.textContent || '').trim().toUpperCase());
                const src = universityDemoImageMap[key] || 'assets/universities/demo/default-campus.jpg';

                const media = document.createElement('div');
                media.className = 'country-university-media';

                const img = document.createElement('img');
                img.src = src;
                img.alt = `${titleEl?.textContent || 'University'} demo campus image`;
                img.loading = 'lazy';
                img.decoding = 'async';

                media.appendChild(img);

                const desc = card.querySelector('p');
                if (desc) {
                    card.insertBefore(media, desc);
                } else {
                    card.appendChild(media);
                }

                card.dataset.demoImageApplied = 'true';
            });
        };

        applyUniversityLogos();
        applyUniversityDemoImages();

        const universitiesTrack = document.getElementById('universitiesTrack');
        const countryTabs = Array.from(document.querySelectorAll('.country-tab'));
        const slides = Array.from(document.querySelectorAll('.country-slide'));
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const carouselShell = document.getElementById('universitiesCarousel');
        const progressBar = document.getElementById('carouselProgressBar');

        if (universitiesTrack && countryTabs.length && slides.length && prevBtn && nextBtn && carouselShell && progressBar) {
            let activeIndex = 0;
            let autoplayId = null;
            let touchStartX = 0;
            const slideCount = slides.length;

            const renderSlide = (index) => {
                activeIndex = (index + slideCount) % slideCount;
                universitiesTrack.style.transform = `translateX(-${activeIndex * 100}%)`;
                countryTabs.forEach((tab, tabIndex) => {
                    tab.classList.toggle('is-active', tabIndex === activeIndex);
                    tab.setAttribute('aria-pressed', tabIndex === activeIndex ? 'true' : 'false');
                });
                progressBar.style.transform = `scaleX(${(activeIndex + 1) / slideCount})`;
            };

            const stopAutoplay = () => {
                if (autoplayId) {
                    clearInterval(autoplayId);
                    autoplayId = null;
                }
            };

            const startAutoplay = () => {
                stopAutoplay();
                autoplayId = window.setInterval(() => {
                    renderSlide(activeIndex + 1);
                }, 4200);
            };

            prevBtn.addEventListener('click', () => {
                renderSlide(activeIndex - 1);
                startAutoplay();
            });

            nextBtn.addEventListener('click', () => {
                renderSlide(activeIndex + 1);
                startAutoplay();
            });

            countryTabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    renderSlide(index);
                    startAutoplay();
                });
            });

            carouselShell.addEventListener('mouseenter', stopAutoplay);
            carouselShell.addEventListener('mouseleave', startAutoplay);
            carouselShell.addEventListener('focusin', stopAutoplay);
            carouselShell.addEventListener('focusout', startAutoplay);

            universitiesTrack.addEventListener('touchstart', (event) => {
                touchStartX = event.changedTouches[0].screenX;
            }, { passive: true });

            universitiesTrack.addEventListener('touchend', (event) => {
                const touchEndX = event.changedTouches[0].screenX;
                const deltaX = touchStartX - touchEndX;
                if (Math.abs(deltaX) > 40) {
                    renderSlide(activeIndex + (deltaX > 0 ? 1 : -1));
                    startAutoplay();
                }
            }, { passive: true });

            renderSlide(0);
            startAutoplay();
        }
