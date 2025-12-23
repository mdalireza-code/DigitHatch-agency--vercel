// ===============================
// NAVBAR TOGGLE & AUTO CLOSE
// ===============================
const navbarCollapse = document.querySelector('.navbar-collapse');
const closeLinks = document.querySelectorAll(
    '.navbar-nav .nav-link, .navbar-brand'
);
const toggler = document.querySelector('.navbar-toggler');

// Close on nav link or brand click
closeLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (
            window.innerWidth < 992 &&
            navbarCollapse?.classList.contains('show')
        ) {
            bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
        }
    });
});

// Close on outside click
document.addEventListener('click', (e) => {
    if (
        window.innerWidth < 992 &&
        navbarCollapse?.classList.contains('show') &&
        !navbarCollapse.contains(e.target) &&
        !toggler.contains(e.target)
    ) {
        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
    }
});


// ===============================
// ABOUT STATS COUNTING (+ ICON)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    const formatNumber = (num) => {
        if (num >= 1000) {
            return Math.floor(num / 1000) + "K+";
        }
        return num + "+";
    };

    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        let current = 0;
        const duration = 1500;
        const startTime = performance.now();

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            current = Math.floor(progress * target);
            counter.innerText = formatNumber(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = formatNumber(target);
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // run once
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
});


// ===============================
// WORKING PROCESS REVEAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".reveal-step");
    if (!steps.length) return;

    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const index = [...steps].indexOf(entry.target);

                if (entry.isIntersecting) {
                    // Scroll DOWN → reveal
                    steps.forEach((step, i) => {
                        if (i <= index) {
                            step.classList.add("active");
                        }
                    });
                } else if (window.scrollY < lastScrollY) {
                    // Scroll UP → hide
                    steps.forEach((step, i) => {
                        if (i > index) {
                            step.classList.remove("active");
                        }
                    });
                }
            });

            lastScrollY = window.scrollY;
        },
        { threshold: 0.35 }
    );

    steps.forEach(step => observer.observe(step));
});

// testimonial Section
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("testimonialTrack");

    // Clone testimonials for infinite loop
    const cards = [...track.children];
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
});

