const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || '';
    const format = counter.dataset.format || '';
    let current = 0;

    const duration = 1500; // animation duration (ms)
    const startTime = performance.now();

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        current = Math.floor(progress * target);

        if (format === 'k') {
            const value = Math.floor(current / 1000);
            counter.innerText = value + 'K+';
        } else {
            counter.innerText = current + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };

    requestAnimationFrame(update);
};

/* Intersection Observer */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

counters.forEach(counter => observer.observe(counter));
