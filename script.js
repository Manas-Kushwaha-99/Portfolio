(() => {
    "use strict";

    /* ------- Loader ------- */
    const loader = document.getElementById("loader");
    const hideLoader = () => {
        if (!loader) return;
        loader.classList.add("hidden");
        document.body.classList.add("loaded");
    };

    if (document.readyState === "complete") {
        setTimeout(hideLoader, 1000);
    } else {
        window.addEventListener("load", () => setTimeout(hideLoader, 1000), { once: true });
    }

    /* ------- Scroll spy ------- */
    const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
    const sections = Array.from(document.querySelectorAll("main section[id]"));

    if (sections.length && navLinks.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) {
                    const id = visible[0].target.id;
                    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
                }
            },
            { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        sections.forEach((s) => observer.observe(s));
    }
})();
