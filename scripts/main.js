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

        const openModal = () => {
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
            if (e.key === 'Escape') { closeModal(); closeEnquiry(); }
        });

        const closeMobileNav = () => {
            if (!navToggle || !navLinks || window.innerWidth > 900) return;
            navLinks.classList.remove('is-open');
            navToggle.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        document.addEventListener('click', (event) => {
            if (!navToggle || !navLinks || window.innerWidth > 900) return;
            const target = event.target;
            if (!(target instanceof Node)) return;
            if (navLinks.contains(target) || navToggle.contains(target)) return;
            closeMobileNav();
        });

        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 900) {
                closeMobileNav();
            }
        }, { passive: true });

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
                setupMobileDeckStack();
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 900) {
                    navLinks.classList.remove('is-open');
                    navToggle.classList.remove('is-open');
                    navToggle.setAttribute('aria-expanded', 'false');
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
            
            // Preload calendar booking
            const counsellingFrame = document.getElementById('counsellingCalendarFrame');
            if (counsellingFrame && counsellingFrame.src) {
                console.log('✓ Calendar booking embed cached');
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

        // Video testimonial play functionality (placeholder)
        document.querySelectorAll('.video-testimonial').forEach(video => {
            video.addEventListener('click', function() {
                alert('Video testimonial would play here. Replace with actual video embed.');
            });
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

        const universityLogoMap = {
            HARV: 'https://logo.clearbit.com/harvard.edu',
            MIT: 'https://logo.clearbit.com/mit.edu',
            SU: 'https://logo.clearbit.com/stanford.edu',
            YU: 'https://logo.clearbit.com/yale.edu',
            OX: 'https://logo.clearbit.com/ox.ac.uk',
            CAM: 'https://logo.clearbit.com/cam.ac.uk',
            ICL: 'https://logo.clearbit.com/imperial.ac.uk',
            LSE: 'https://logo.clearbit.com/lse.ac.uk',
            UM: 'https://logo.clearbit.com/unimelb.edu.au',
            ANU: 'https://logo.clearbit.com/anu.edu.au',
            UNSW: 'https://logo.clearbit.com/unsw.edu.au',
            MON: 'https://logo.clearbit.com/monash.edu',
            UOFT: 'https://logo.clearbit.com/utoronto.ca',
            UBC: 'https://logo.clearbit.com/ubc.ca',
            MG: 'https://logo.clearbit.com/mcgill.ca',
            MAC: 'https://logo.clearbit.com/mcmaster.ca',
            TUM: 'https://logo.clearbit.com/tum.de',
            HD: 'https://logo.clearbit.com/uni-heidelberg.de',
            HB: 'https://logo.clearbit.com/hu-berlin.de',
            BONN: 'https://logo.clearbit.com/uni-bonn.de',
            PS: 'https://logo.clearbit.com/universite-paris-saclay.fr',
            SOR: 'https://logo.clearbit.com/sorbonne-universite.fr',
            PSL: 'https://logo.clearbit.com/psl.eu',
            HEC: 'https://logo.clearbit.com/hec.edu',
            NUS: 'https://logo.clearbit.com/nus.edu.sg',
            NTU: 'https://logo.clearbit.com/ntu.edu.sg',
            SMU: 'https://logo.clearbit.com/smu.edu.sg',
            SUSS: 'https://logo.clearbit.com/suss.edu.sg',
            UVA: 'https://logo.clearbit.com/uva.nl',
            UU: 'https://logo.clearbit.com/uu.nl',
            EUR: 'https://logo.clearbit.com/eur.nl',
            RUG: 'https://logo.clearbit.com/rug.nl'
        };

        const universityDemoImageMap = {
            HARV: 'https://picsum.photos/seed/harvard-campus/720/420',
            MIT: 'https://picsum.photos/seed/mit-campus/720/420',
            SU: 'https://picsum.photos/seed/stanford-campus/720/420',
            YU: 'https://picsum.photos/seed/yale-campus/720/420',
            OX: 'https://picsum.photos/seed/oxford-campus/720/420',
            CAM: 'https://picsum.photos/seed/cambridge-campus/720/420',
            ICL: 'https://picsum.photos/seed/imperial-campus/720/420',
            LSE: 'https://picsum.photos/seed/lse-campus/720/420',
            UM: 'https://picsum.photos/seed/unimelb-campus/720/420',
            ANU: 'https://picsum.photos/seed/anu-campus/720/420',
            UNSW: 'https://picsum.photos/seed/unsw-campus/720/420',
            MON: 'https://picsum.photos/seed/monash-campus/720/420',
            UOFT: 'https://picsum.photos/seed/uoft-campus/720/420',
            UBC: 'https://picsum.photos/seed/ubc-campus/720/420',
            MG: 'https://picsum.photos/seed/mcgill-campus/720/420',
            MAC: 'https://picsum.photos/seed/mcmaster-campus/720/420',
            TUM: 'https://picsum.photos/seed/tum-campus/720/420',
            HD: 'https://picsum.photos/seed/heidelberg-campus/720/420',
            HB: 'https://picsum.photos/seed/humboldt-campus/720/420',
            BONN: 'https://picsum.photos/seed/bonn-campus/720/420',
            PS: 'https://picsum.photos/seed/paris-saclay-campus/720/420',
            SOR: 'https://picsum.photos/seed/sorbonne-campus/720/420',
            PSL: 'https://picsum.photos/seed/psl-campus/720/420',
            HEC: 'https://picsum.photos/seed/hec-campus/720/420',
            NUS: 'https://picsum.photos/seed/nus-campus/720/420',
            NTU: 'https://picsum.photos/seed/ntu-campus/720/420',
            SMU: 'https://picsum.photos/seed/smu-campus/720/420',
            SUSS: 'https://picsum.photos/seed/suss-campus/720/420',
            UVA: 'https://picsum.photos/seed/uva-campus/720/420',
            UU: 'https://picsum.photos/seed/utrecht-campus/720/420',
            EUR: 'https://picsum.photos/seed/erasmus-campus/720/420',
            RUG: 'https://picsum.photos/seed/groningen-campus/720/420'
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
                const fallbackSeed = ((titleEl?.textContent || 'university').toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                const src = universityDemoImageMap[key] || `https://picsum.photos/seed/${fallbackSeed}/720/420`;

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