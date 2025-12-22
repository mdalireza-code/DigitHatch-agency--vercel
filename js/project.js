document.addEventListener("DOMContentLoaded", () => {

    const projects = document.querySelectorAll(".project-item");
    const btn = document.getElementById("showMoreBtn");

    const initialCount = 9;
    const step = 3;

    let visibleCount = initialCount;
    let expanded = false;

    // Initial state
    projects.forEach((item, index) => {
        item.style.display = index < initialCount ? "block" : "none";
    });

    btn.addEventListener("click", () => {

        // 🔽 EXPAND
        if (!expanded) {
            visibleCount += step;

            projects.forEach((item, index) => {
                if (index < visibleCount) {
                    item.style.display = "block";
                }
            });

            // All projects visible
            if (visibleCount >= projects.length) {
                expanded = true;
                btn.textContent = "Show Less";
            }
        }

        // 🔼 COLLAPSE
        else {
            visibleCount = initialCount;

            projects.forEach((item, index) => {
                item.style.display = index < initialCount ? "block" : "none";
            });

            expanded = false;
            btn.textContent = "See More Projects";

            // Optional: scroll back to projects section
            btn.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
});
