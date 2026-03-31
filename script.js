

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
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

function applyTheme() {
    document.body.classList.toggle("dark", isDark);
    lightVideo.classList.toggle("video-active", !isDark);
    lightVideo.classList.toggle("video-inactive", isDark);
    darkVideo.classList.toggle("video-active", isDark);
    darkVideo.classList.toggle("video-inactive", !isDark);
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

function closeNavOnSelection(event) {
    if (event.target.matches("a")) {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
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

menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
});

siteNav.addEventListener("click", closeNavOnSelection);

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
