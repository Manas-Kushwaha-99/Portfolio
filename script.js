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
        case 'projects':
            showProjects();
            break;
        case 'certificates':
            showCertificates();
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

function showProjects() {
  infoDisplay.innerHTML = `
    <h3>My Projects</h3>
    <ul>
      <li><a href="https://github.com/Manas-Kushwaha-99/Network-Monitor-Dashboard" target="_blank">Network Monitor Dashboard</a></li>
      <li><a href="https://github.com/Manas-Kushwaha-99/DNS-Manager" target="_blank">DNS Manager</a></li>
      <li><a href="https://github.com/Manas-Kushwaha-99/PC-Hardware-Performance-Profiler" target="_blank">PC Hardware Performance Profiler</a></li>
      <li><a href="https://drive.google.com/drive/folders/1Sp96ztjMIARk6Ijd_M4Mg19VtN_YywJ9" target="_blank">Hand-Following Arduino Car</a></li>
      <li><a href="https://github.com/Manas-Kushwaha-99/Fitness-and-Health-BLog" target="_blank">Fitness and Health Blog</a></li>
    </ul>
  `;
  infoDisplay.style.display = 'block';
}
function showCertificates() {
  infoDisplay.innerHTML = `
    <h3>My Certificates</h3>
    <ul>
      <li>
        <a href="https://media.geeksforgeeks.org/certificates/1745578492/2e3ff2772a76e9091848969c688e6cf1.pdf" target="_blank">Artificial Intelligence & Machine Learning – Technical Workshop(GeeksforGeeks)</a>
      </li>
      <li>
        <a href="https://drive.google.com/file/d/1CAMQPY8qJV6IFeMqXA42W6iaq-yFc_LK/view" target="_blank">Generative AI Mastermind — Outskill</a>
      </li>
      <li>
        <a href="https://drive.google.com/file/d/1A-np_e9jnXe-chLC_vwT3sCwpzKLcKWN/view" target="_blank">Coding Ninjas Certification — GenAI Projects</a>
      </li>
      <li>
        <a href="https://codesignal.com/learn/certificates/cmgwx47p10060l704oytu0whu/course-paths/21" target="_blank">Introduction to Programming with Python — Code Signal</a>
      </li>
    </ul>
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
