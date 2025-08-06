const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");
const crackTime = document.getElementById("crackTime");
const consoleLog = document.getElementById("console");
const togglePassword = document.getElementById("togglePassword");
const copyBtn = document.getElementById("copyBtn");
const suggestBtn = document.getElementById("suggestBtn");

// Requirements
const lengthReq = document.getElementById("lengthReq");
const upperReq = document.getElementById("upperReq");
const numReq = document.getElementById("numReq");
const specialReq = document.getElementById("specialReq");

// Dummy leaked password database
const leakedPasswords = [
  "123456", "password", "qwerty", "iloveyou", 
  "admin", "welcome", "dragon", "football", 
  "letmein", "monkey", "abc123"
];

function logMessage(message) {
    const p = document.createElement("p");
    p.classList.add("log");
    p.textContent = "> " + message;
    consoleLog.appendChild(p);
    consoleLog.scrollTop = consoleLog.scrollHeight;
}

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    let strength = 0;

    // Criteria checks
    if (password.length >= 8) { strength++; lengthReq.textContent = "✅ At least 8 characters"; lengthReq.classList.add("glow"); }
    else { lengthReq.textContent = "❌ At least 8 characters"; lengthReq.classList.remove("glow"); }

    if (/[A-Z]/.test(password)) { strength++; upperReq.textContent = "✅ At least 1 uppercase"; upperReq.classList.add("glow"); }
    else { upperReq.textContent = "❌ At least 1 uppercase"; upperReq.classList.remove("glow"); }

    if (/[0-9]/.test(password)) { strength++; numReq.textContent = "✅ At least 1 number"; numReq.classList.add("glow"); }
    else { numReq.textContent = "❌ At least 1 number"; numReq.classList.remove("glow"); }

    if (/[^A-Za-z0-9]/.test(password)) { strength++; specialReq.textContent = "✅ At least 1 special char"; specialReq.classList.add("glow"); }
    else { specialReq.textContent = "❌ At least 1 special char"; specialReq.classList.remove("glow"); }

    // Strength levels
    let width = "0%";
    let color = "red";
    let label = "Weak ❌";
    let crack = "Instantly cracked";

    switch(strength) {
        case 1: width = "25%"; color = "red"; label = "Weak ❌"; crack = "Instant"; break;
        case 2: width = "50%"; color = "orange"; label = "Fair ⚠️"; crack = "Few hours"; break;
        case 3: width = "75%"; color = "#00ffcc"; label = "Strong ✅"; crack = "Months"; break;
        case 4: width = "100%"; color = "lime"; label = "Very Strong 🔒"; crack = "Centuries"; break;
    }

    // Update Strength Bar
    strengthBar.style.background = `linear-gradient(to right, ${color} ${width}, #111 ${width})`;
    strengthLabel.textContent = label;
    crackTime.textContent = "⌛ Crack Time: " + crack;
    strengthBar.classList.remove("breached");

    // Breach Check
    if (leakedPasswords.includes(password.toLowerCase())) {
        logMessage("⚠️ ALERT: This password appears in known breaches!");
        crackTime.textContent = "❌ Breached Password (Unsafe)";
        strengthBar.style.background = "linear-gradient(to right, crimson 100%, crimson 100%)";
        strengthLabel.textContent = "COMPROMISED ⚠️";
        strengthBar.classList.add("breached");
    } else if (password.length > 0) {
        logMessage(`Password Strength: ${label} | Crack Time: ${crack}`);
    }
});

// Toggle Show/Hide Password
togglePassword.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    togglePassword.textContent = passwordInput.type === "password" ? "👁" : "🙈";
});

// Copy Password
copyBtn.addEventListener("click", () => {
    if (!passwordInput.value) return alert("Enter a password first!");
    navigator.clipboard.writeText(passwordInput.value);
    logMessage("Password copied to clipboard.");
});

// Suggest Strong Password
suggestBtn.addEventListener("click", () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let suggestion = "";
    for (let i = 0; i < 14; i++) {
        suggestion += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordInput.value = suggestion;
    passwordInput.dispatchEvent(new Event("input"));
    logMessage("Suggested new strong password.");
});

// Matrix Animation Background
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
let drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffcc";
  ctx.font = fontSize + "px monospace";
  
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(drawMatrix, 40);
