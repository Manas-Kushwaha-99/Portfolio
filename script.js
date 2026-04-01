

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

let isInitialThemeApply = true;

function applyTheme() {
    document.body.classList.toggle("dark", isDark);

    if (isInitialThemeApply) {
        // On initial load, set correct state without animation
        lightVideo.style.opacity = isDark ? "0" : "1";
        darkVideo.style.opacity = isDark ? "1" : "0";
        lightVideo.style.transition = "";
        darkVideo.style.transition = "";
        isInitialThemeApply = false;
    } else {
        // On toggle, stagger: fade out old, then fade in new
        const oldVideo = isDark ? lightVideo : darkVideo;
        const newVideo = isDark ? darkVideo : lightVideo;

        oldVideo.style.transition = "opacity 0.45s ease";
        oldVideo.style.opacity = "0";

        setTimeout(() => {
            newVideo.style.transition = "opacity 0.45s ease";
            newVideo.style.opacity = "1";
        }, 50);
    }

    themeToggle.innerHTML = isDark
        ? '<i class="bi bi-brightness-high-fill"></i>'
        : '<i class="bi bi-moon-stars-fill"></i>';
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
}

function openInfoModal(key) {
    const entry = portfolioData[key];
    if (!entry) return;
    modalEyebrow.textContent = entry.eyebrow;
    modalTitle.textContent = entry.title;
    modalBody.innerHTML = entry.body;
    if (typeof modal.showModal === "function") {
        modal.showModal();
    }
}

function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

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
        openInfoModal(action);
        return;
    }
    if (action === "contact") {
        smoothScrollTo("#contact");
        openInfoModal(action);
    }
}

function markActiveSection() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".site-nav a");
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

themeToggle.addEventListener("click", () => {
    isDark = !isDark;
    applyTheme();
});

document.querySelectorAll(".bubble").forEach((bubble) => {
    bubble.addEventListener("click", handleBubbleAction);
});

modal.addEventListener("click", (event) => {
    const bounds = modal.querySelector(".modal-shell").getBoundingClientRect();
    const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

    if (!isInside) {
        modal.close();
    }
});

window.addEventListener("scroll", markActiveSection, { passive: true });

applyTheme();
markActiveSection();
