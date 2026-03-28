const staticReviewsData = [
    {
        author: 'Sobiya Khan',
        meta: '2 reviews',
        time: 'a month ago',
        text: 'I was a student at Edizone during my 9th and 10th grade, and it was truly one of the most important phases of my academic journey. The guidance and support I received there went far beyond regular classroom teaching. Science classes with Shahla Ma\'am were especially memorable and helped me build clarity instead of just memorizing for exams. Maths with Suraj Sir strengthened my fundamentals. Separate sessions on study techniques and psychological strategies helped me manage exam pressure and stay consistent. Edizone shaped the way I approach learning, and I am genuinely grateful for the mentorship.'
    },
    {
        author: 'Arish Shaikh',
        meta: '4 reviews',
        time: 'a month ago',
        text: 'To leave a review for Edizone Academy feels less like evaluating a tuition center and more like writing a thank-you note to a place that shaped who I am today. I studied here in 9th and 10th standard, and those years became some of my most cherished chapters. I am now a post graduate from Queen Mary University of London, and my academic roots were shaped here. The teachers simplify complex concepts and the atmosphere balances disciplined focus with vibrant energy. My sincere thanks to Shahla Ma\'am for mentorship that changed my trajectory.'
    },
    {
        author: 'Krish Guwalani',
        meta: 'Local Guide · 4 reviews · 2 photos',
        time: 'a month ago',
        text: 'Attending Edizone Academy was easily the highlight of my 10th-grade journey. The phenomenal faculty did not just teach the syllabus; they genuinely shaped me. Their blend of hearty laughter and serious study made board exam preparation feel far easier. If you want stellar results without losing the joy of learning, this is the place.'
    },
    {
        author: 'Tausif Shaikh',
        meta: '10 reviews',
        time: 'a month ago',
        text: 'Edizone Career is an excellent institute for students who want proper guidance and quality education. Faculty members are experienced, friendly, and explain every topic in an easy-to-understand way. Study material and regular practice sessions build strong concepts. The learning environment is supportive and motivating. Highly recommended for improving academic performance and achieving career goals.'
    },
    {
        author: 'ammanamanchi tanvi',
        meta: '1 review',
        time: 'a month ago',
        text: 'I am truly grateful to my 10th coaching institute for building a strong foundation for my career. The constant guidance from Shalla Ma\'am, Sayali Ma\'am, and the faculty made a huge difference. I solved more than 25 practice papers before boards, which improved confidence and accuracy. With their mentorship, I improved from 50% to 85% and passed with distinction.'
    },
    {
        author: 'vanshita badlani',
        meta: '7 reviews',
        time: 'a month ago',
        text: 'I attended the Emotional Intelligence session by Shahla Ma\'am at Edizone Academy, and it was truly meaningful. The session was simple, practical, and deeply relatable. Her message, No complain, No blame, No excuses, Just own it, stayed with me. Thank you for such an honest and insightful session.'
    },
    {
        author: 'Abdulgani Shaikh',
        meta: 'Local Guide · 12 reviews · 15 photos',
        time: 'a month ago',
        text: 'I had a positive experience at Edizone Academy. The instructors are supportive and create a great learning atmosphere. The personalized approach helped improve results. A great place for students looking for quality coaching.'
    },
    {
        author: 'Sargam Racca-Tipri',
        meta: '7 reviews · 3 photos',
        time: 'a month ago',
        text: 'An amazing mentor and guide. My son was her student, and the improvement in confidence and academics has been wonderful to see. She truly cares about each child\'s growth and gives personal attention. Highly recommended.'
    },
    {
        author: 'RAJESHWARI MUKHOTY',
        meta: '1 review',
        time: 'a month ago',
        text: 'Edizone Academy offers structured and professional career counseling aimed at guiding students toward informed academic and career decisions. With a personalized approach, expert mentors help students identify strengths and interests.'
    },
    {
        author: 'Avani Jethiwal',
        meta: '1 review',
        time: 'a month ago',
        text: 'My overall experience in the academy was really good. Faculty members were supportive and approachable. Timely examinations enhanced conceptual clarity. Biology classes were especially interesting with practical explanations.'
    },
    {
        author: 'Daraksha Patel',
        meta: '1 review',
        time: 'a month ago',
        text: 'I attended coaching here for std 10 and scored an excellent percentage in boards. Guidance from Shahla Ma\'am and Sayali Ma\'am was very helpful. Teachers are experienced and explain core concepts in an easy way. Continuous prelims helped me score better.'
    },
    {
        author: 'Vandana Mahajan',
        meta: '1 review',
        time: 'a month ago',
        text: 'Best guidance for students with qualified and hardworking teachers. Answers for all types of questions are provided with proper direction. You should visit once for the bright future of your child.'
    },
    {
        author: 'NUSRAT SHAIKH',
        meta: '2 reviews',
        time: 'a month ago',
        text: 'The institute maintains high academic standards and focuses on overall student development. The faculty is well-qualified, and the learning environment is positive and disciplined.'
    },
    {
        author: 'Megheswari Shinde',
        meta: '1 review',
        time: 'a month ago',
        text: 'It is always a pleasure to find a suitable coaching center for our loved ones. Edizone is the right place to resolve doubts. The continuous exam process helps children overcome every difficulty before their final exams.'
    },
    {
        author: 'jael Priscilla',
        meta: '1 review',
        time: 'a month ago',
        text: 'Extremely good institute for school students of all boards. Excellent teaching by seasoned professionals. Revisions and practice exams ensure high scores.'
    },
    {
        author: 'omar khateeb',
        meta: '2 reviews',
        time: 'a month ago',
        text: 'This is a really good setup for overall academic development. Teachers are excellent and notes are extremely helpful. Would highly recommend visiting.'
    },
    {
        author: 'zakyahmed shaikh',
        meta: '4 reviews',
        time: 'a month ago',
        text: 'My daughter is now a doctor. Thanks to madam and the entire faculty for shaping careers.'
    },
    {
        author: 'Salim Shaikh',
        meta: '1 review',
        time: 'a month ago',
        text: 'Excellent institute with supportive teachers and clear teaching methods. Highly recommended.'
    },
    {
        author: 'rehana khateeb',
        meta: '1 review',
        time: 'a month ago',
        text: 'They have excellent faculty, help in clearing basics, and solve doubts efficiently.'
    },
    {
        author: 'Rakesh Sharma',
        meta: '2 reviews',
        time: 'a month ago',
        text: 'Best teachers, best coaching, and best counseling in one place.'
    },
    {
        author: 'arti khatri',
        meta: 'Local Guide · 17 reviews',
        time: 'a month ago',
        text: 'Very good. Personal attention is paid to each and every child.'
    },
    {
        author: 'Risha Shaikh',
        meta: '2 reviews',
        time: 'Edited a month ago',
        text: 'I was here for my coaching and career counselling. Could not have had a better person guiding me. Thank you Edizone.'
    },
    {
        author: '15.Vaishnavi Kadam',
        meta: '1 review',
        time: 'a month ago',
        text: 'Very helpful with excellent guidance.'
    },
    {
        author: 'Vijay Kumar',
        meta: '3 reviews · 1 photo',
        time: 'a month ago',
        text: 'Very excellent.'
    },
    {
        author: 'Ai Bunty',
        meta: 'New review',
        time: '41 minutes ago',
        text: 'Edizone is more than just a coaching center. Shahla Ma\'am and Suraj Sir focus on deep conceptual clarity rather than rote memorization. Additional sessions on exam pressure and study strategy were incredibly helpful. They genuinely care about overall growth and mindset.'
    },
    {
        author: 'Geet Paryani',
        meta: '6 reviews',
        time: '6 days ago',
        text: 'My experience as an educator at Edizone Academy was truly wonderful. The atmosphere was positive and welcoming, the team was supportive, and people were cooperative and encouraging. I genuinely enjoyed my time there and learned many new things.'
    },
    {
        author: 'vinita motwani jtnmotwani',
        meta: 'Local Guide · 15 reviews',
        time: 'a week ago',
        text: 'Shahla Ma\'am puts great effort into students not only in academics but also confidence and overall development. She guides students for their careers too. Thank you Ma\'am.'
    }
];

const staticReviewsStage = document.getElementById('staticReviewsStage');
const staticReviewsPrev = document.getElementById('staticReviewsPrev');
const staticReviewsNext = document.getElementById('staticReviewsNext');
const staticReviewsProgress = document.getElementById('staticReviewsProgress');
const staticReviewsShell = document.getElementById('staticReviewsShell');

if (staticReviewsStage && staticReviewsPrev && staticReviewsNext && staticReviewsProgress && staticReviewsData.length) {
    let activeIndex = 0;
    let autoplayId = null;

    const buildStars = (rating = 5) => `${'★'.repeat(rating)}${'☆'.repeat(Math.max(0, 5 - rating))}`;

    const buildCardMarkup = (item, index, total) => {
        return `
            <article class="static-reviews-card is-hidden" data-review-index="${index}" aria-label="Review by ${item.author}">
                <div class="static-reviews-top">
                    <div>
                        <div class="static-reviews-author">${item.author}</div>
                        <div class="static-reviews-meta">${item.meta}</div>
                    </div>
                </div>
                <div class="static-reviews-stars" aria-label="5 star review">${buildStars(5)}</div>
                <p class="static-reviews-text">${item.text}</p>
                <div class="static-reviews-bottom">
                    <span class="static-reviews-badge">Verified Reviewer</span>
                    <span class="static-reviews-index">${index + 1} / ${total}</span>
                </div>
            </article>
        `;
    };

    const cardsMarkup = staticReviewsData
        .map((item, index) => buildCardMarkup(item, index, staticReviewsData.length))
        .join('');
    staticReviewsStage.innerHTML = cardsMarkup;

    staticReviewsProgress.innerHTML = staticReviewsData
        .map((_, idx) => `<span class="static-reviews-dot${idx === 0 ? ' is-active' : ''}" data-dot-index="${idx}"></span>`)
        .join('');

    const cards = Array.from(staticReviewsStage.querySelectorAll('.static-reviews-card'));
    const dots = Array.from(staticReviewsProgress.querySelectorAll('.static-reviews-dot'));

    const applyClasses = () => {
        const total = cards.length;
        const prevIndex = (activeIndex - 1 + total) % total;
        const nextIndex = (activeIndex + 1) % total;

        cards.forEach((card, idx) => {
            card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
            if (idx === activeIndex) {
                card.classList.add('is-active');
            } else if (idx === prevIndex) {
                card.classList.add('is-prev');
            } else if (idx === nextIndex) {
                card.classList.add('is-next');
            } else {
                card.classList.add('is-hidden');
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('is-active', idx === activeIndex);
        });
    };

    const render = (nextIndex) => {
        const total = cards.length;
        activeIndex = (nextIndex + total) % total;
        applyClasses();
    };

    const stopAutoplay = () => {
        if (autoplayId) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        autoplayId = window.setInterval(() => {
            render(activeIndex + 1);
        }, 5200);
    };

    staticReviewsPrev.addEventListener('click', () => {
        render(activeIndex - 1);
        startAutoplay();
    });

    staticReviewsNext.addEventListener('click', () => {
        render(activeIndex + 1);
        startAutoplay();
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const idx = Number(dot.getAttribute('data-dot-index'));
            if (!Number.isFinite(idx)) return;
            render(idx);
            startAutoplay();
        });
    });

    staticReviewsShell.addEventListener('mouseenter', stopAutoplay);
    staticReviewsShell.addEventListener('mouseleave', startAutoplay);
    staticReviewsShell.addEventListener('focusin', stopAutoplay);
    staticReviewsShell.addEventListener('focusout', startAutoplay);

    const reviewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            render(0);
            startAutoplay();
            reviewObserver.disconnect();
        });
    }, { threshold: 0.25 });

    reviewObserver.observe(staticReviewsStage);
}
