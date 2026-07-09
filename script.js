const SVG_NS = 'http://www.w3.org/2000/svg';

/* ------- Loader ------- */

const loaderConfig = {
    particleCount: 86,
    trailSpan: 0.28,
    durationMs: 7800,
    rotationDurationMs: 44000,
    pulseDurationMs: 6800,
    strokeWidth: 4.3,
    searchTurns: 4,
    searchBaseRadius: 8,
    searchRadiusAmp: 8.5,
    searchPulse: 2.4,
    searchScale: 1,
    point(progress, detailScale, config) {
        const t = progress * Math.PI * 2;
        const angle = t * config.searchTurns;
        const radius =
            config.searchBaseRadius +
            (1 - Math.cos(t)) * (config.searchRadiusAmp + detailScale * config.searchPulse);
        return {
            x: 50 + Math.cos(angle) * radius * config.searchScale,
            y: 50 + Math.sin(angle) * radius * config.searchScale,
        };
    },
};

function normalizeProgress(progress) {
    return ((progress % 1) + 1) % 1;
}

function getDetailScale(time) {
    const pulseProgress = (time % loaderConfig.pulseDurationMs) / loaderConfig.pulseDurationMs;
    const pulseAngle = pulseProgress * Math.PI * 2;
    return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
}

function buildPath(detailScale, steps = 480) {
    return Array.from({ length: steps + 1 }, (_, index) => {
        const point = loaderConfig.point(index / steps, detailScale, loaderConfig);
        return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    }).join(' ');
}

function getParticle(index, progress, detailScale) {
    const tailOffset = index / (loaderConfig.particleCount - 1);
    const point = loaderConfig.point(normalizeProgress(progress - tailOffset * loaderConfig.trailSpan), detailScale, loaderConfig);
    const fade = Math.pow(1 - tailOffset, 0.56);
    return {
        x: point.x,
        y: point.y,
        radius: 0.9 + fade * 2.7,
        opacity: 0.04 + fade * 0.96,
    };
}

function initLoader() {
    const loader = document.getElementById("loader");
    const group = document.getElementById("loaderGroup");
    const path = document.getElementById("loaderPath");
    if (!loader || !group || !path) return;

    path.setAttribute('stroke-width', String(loaderConfig.strokeWidth));

    const particles = Array.from({ length: loaderConfig.particleCount }, () => {
        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('fill', 'currentColor');
        group.appendChild(circle);
        return circle;
    });

    const startedAt = performance.now();
    let animFrameId = null;

    function render(now) {
        const time = now - startedAt;
        const progress = (time % loaderConfig.durationMs) / loaderConfig.durationMs;
        const detailScale = getDetailScale(time);

        path.setAttribute('d', buildPath(detailScale));

        particles.forEach((node, index) => {
            const particle = getParticle(index, progress, detailScale);
            node.setAttribute('cx', particle.x.toFixed(2));
            node.setAttribute('cy', particle.y.toFixed(2));
            node.setAttribute('r', particle.radius.toFixed(2));
            node.setAttribute('opacity', particle.opacity.toFixed(3));
        });

        animFrameId = requestAnimationFrame(render);
    }

    animFrameId = requestAnimationFrame(render);

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden");
            setTimeout(() => cancelAnimationFrame(animFrameId), 700);
        }, 1000);
    });
}

initLoader();

/* ------- Portfolio data ------- */

const dataScript = document.getElementById("portfolio-data");
let portfolioData = {};
if (dataScript) {
    try {
        portfolioData = JSON.parse(dataScript.textContent);
    } catch (e) {
        console.warn("Failed to parse portfolio data", e);
    }
}

/* ------- DOM refs ------- */

const themeToggle = document.getElementById("themeToggle");
const siteNav = document.getElementById("siteNav");
const lightVideo = document.getElementById("lightVideo");
const darkVideo = document.getElementById("darkVideo");
const modal = document.getElementById("infoModal");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("portfolio-theme");
let isDark = storedTheme ? storedTheme === "dark" : prefersDark;

/* ------- Theme ------- */

function applyTheme() {
    document.body.classList.toggle("dark", isDark);

    if (lightVideo && darkVideo) {
        const oldVideo = isDark ? lightVideo : darkVideo;
        const newVideo = isDark ? darkVideo : lightVideo;

        document.body.classList.add("theme-switching");

        oldVideo.classList.add("video-inactive");
        oldVideo.classList.remove("video-active");
        newVideo.classList.remove("video-inactive");
        newVideo.classList.add("video-active");

        setTimeout(() => {
            document.body.classList.remove("theme-switching");
        }, 550);
    }

    if (themeToggle) {
        themeToggle.innerHTML = isDark
            ? '<i class="bi bi-brightness-high-fill"></i>'
            : '<i class="bi bi-moon-stars-fill"></i>';
    }
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
}

/* ------- Modal ------- */

function openInfoModal(key) {
    const entry = portfolioData[key];
    if (!entry) return;
    if (modalEyebrow) modalEyebrow.textContent = entry.eyebrow;
    if (modalTitle) modalTitle.textContent = entry.title;
    if (modalBody) modalBody.innerHTML = entry.body;
    if (modal && typeof modal.showModal === "function") {
        modal.showModal();
    }
}

/* ------- Scroll helpers ------- */

function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function markActiveSection() {
    const sections = document.querySelectorAll("main section[id]");
    const links = siteNav ? siteNav.querySelectorAll("a") : [];
    let activeId = "about";

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom > 140) {
            activeId = section.id;
        }
    });

    links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
}

/* ------- Bubble actions ------- */

function handleBubbleAction(event) {
    const action = event.currentTarget.dataset.action;
    if (action === "resume") {
        window.open(
            "https://drive.google.com/file/d/1crVPv_OdwpvYC9i8jY9QmIt1S5E-q51s/view?usp=sharing",
            "_blank",
            "noopener"
        );
        return;
    }
    if (["about", "projects", "certificates"].includes(action)) {
        smoothScrollTo(`#${action}`);
        return;
    }
    if (action === "contact") {
        smoothScrollTo("#contact");
    }
}

/* ------- Event listeners ------- */

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        isDark = !isDark;
        applyTheme();
    });
}

document.querySelectorAll(".bubble").forEach((bubble) => {
    bubble.addEventListener("click", handleBubbleAction);
});

if (modal) {
    modal.addEventListener("click", (event) => {
        const shell = modal.querySelector(".modal-shell");
        if (!shell) return;
        const bounds = shell.getBoundingClientRect();
        const isInside =
            event.clientX >= bounds.left &&
            event.clientX <= bounds.right &&
            event.clientY >= bounds.top &&
            event.clientY <= bounds.bottom;

        if (!isInside) {
            modal.close();
        }
    });
}

window.addEventListener("scroll", markActiveSection, { passive: true });

/* ------- Init ------- */

applyTheme();
markActiveSection();
