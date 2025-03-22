const personalInfo = {
    name: "Manas Kushwaha",
    email: "manaskushwaha99@gmail.com",
    resumeUrl: "https://drive.google.com/file/d/1crVPv_OdwpvYC9i8jY9QmIt1S5E-q51s/view?usp=sharing",
    description:"Hi, I'm Manas—a Computer Science and Engineering student at ITER College (graduating in 2026) with a passion for hands-on technology projects. I enjoy working on practical solutions that bridge hardware and software, allowing me to explore how systems work at a deeper level.I have experience in Python, Java, C, C++, Shell Scripting, and Bootstrap. Some of my favorite projects include building a hand-following Arduino car using ultrasonic and IR sensors and experimenting with Android kernel modifications using KernelSU. I also enjoy troubleshooting PC hardware and exploring custom ROMs to enhance functionality.As a gamer who loves fast-paced action games and immersive worlds, I bring the same curiosity and problem-solving mindset to my tech pursuits. I’m always eager to learn new skills and take on challenges that push me to grow.Let’s connect if you’re working on exciting tech projects or need collaboration on innovative ideas!"
};

let isDark = false;
const lightVideo = document.getElementById('lightVideo');
const darkVideo = document.getElementById('darkVideo');
const infoDisplay = document.getElementById('infoDisplay');

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('click', handleBubbleClick);
    });
}

function handleBubbleClick(event) {
    const action = event.currentTarget.dataset.action;
    
    switch(action) {
        case 'contact':
            showContactInfo();
            break;
        case 'resume':
            openResume();
            break;
        case 'about':
            showAboutMe();
            break;
    }
}

function showContactInfo() {
    infoDisplay.innerHTML = `
        <h3 class="mb-3">Contact Information</h3>
        <p class="lead">📧 Email: ${personalInfo.email}</p>
    `;
    infoDisplay.style.display = 'block';
}

function openResume() {
    window.open(personalInfo.resumeUrl, '_blank');
}

function showAboutMe() {
    infoDisplay.innerHTML = `
        <h3 class="mb-3">${personalInfo.name}</h3>
        <p class="lead">${personalInfo.description}</p>
    `;
    infoDisplay.style.display = 'block';
}

function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    
    if (isDark) {
        lightVideo.classList.replace('video-active', 'video-inactive');
        darkVideo.classList.replace('video-inactive', 'video-active');
    } else {
        darkVideo.classList.replace('video-active', 'video-inactive');
        lightVideo.classList.replace('video-inactive', 'video-active');
    }
    
    document.querySelector('#themeToggle i').className = isDark ? 'bi bi-sun' : 'bi bi-moon';
}