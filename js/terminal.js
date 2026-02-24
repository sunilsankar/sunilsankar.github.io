document.addEventListener("DOMContentLoaded", function () {

    // =========================
// Theme Handling
// =========================

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
}

updateThemeButton();

function updateThemeButton() {
    if (!themeToggle) return;
    themeToggle.textContent = 
        document.body.classList.contains("light") ? "Dark" : "Light";
}

function toggleTheme() {
    document.body.classList.toggle("light");

    const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);

    updateThemeButton();
}

if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}
    const terminal = document.getElementById("terminal");

    // =========================
    // Persistent History
    // =========================
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let historyIndex = history.length;

    // =========================
    // Fake File System
    // =========================
    const fileSystem = {
        "about.txt": `I am Linux Architech with 18 years experience in SRE/DevOps`,

        "skills.txt": `Infrastructure & DevOps:
AWS, Azure , Docker, Kubernetes, Terraform, Packer, Vagrant

CI/CD:
Jenkins, GitLab CI, OpenShift, Azure Devops

Configuration Management:
Ansible, Ansible Tower, Puppet

Virtualization:
VMware, KVM, Xen

Monitoring & Observability:
Prometheus, Grafana, Nagios, OP5

Scripting:
Bash, Python

Cloud Platforms:
AWS, OpenStack, GCP, Azure

BPM:
Pega`,

        "experience.txt": `18 years managing production systems.
Led migrations and infrastructure modernization.
Built scalable and resilient architectures.`
    };

    // =========================
    // Print Function
    // =========================
    function print(text = "", speed = 5) {
        const line = document.createElement("div");
        line.className = "line";
        terminal.appendChild(line);

        let i = 0;
        function type() {
            if (i < text.length) {
                line.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // =========================
    // Prompt
    // =========================
    function createPrompt() {
        const inputLine = document.createElement("div");
        inputLine.className = "input-line";

        const prompt = document.createElement("span");
        prompt.className = "prompt";
        prompt.textContent = "root@portfolio:~#";

        const input = document.createElement("input");
        input.type = "text";
        input.autocomplete = "off";

        inputLine.appendChild(prompt);
        inputLine.appendChild(input);
        terminal.appendChild(inputLine);
        input.focus();

        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {
                const command = input.value.trim();
                history.push(command);
                localStorage.setItem("history", JSON.stringify(history));
                historyIndex = history.length;
                input.disabled = true;
                handleCommand(command);
            }

            if (e.key === "ArrowUp") {
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = history[historyIndex];
                }
            }

            if (e.key === "ArrowDown") {
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    input.value = history[historyIndex];
                } else {
                    input.value = "";
                }
            }
        });
    }

    // =========================
    // Command Handler
    // =========================
    function handleCommand(cmd) {
        print("root@portfolio:~# " + cmd);

        const parts = cmd.split(" ");

        switch (parts[0]) {

            case "help":
                print(`Available commands:

help
ls
cat <file>
resume
whoami
uname
theme <light|dark>
sudo hire-me
clear`);
                break;

            case "ls":
                Object.keys(fileSystem).forEach(file => print(file));
                print("resume.pdf");
                break;

            case "cat":
                if (fileSystem[parts[1]]) {
                    print(fileSystem[parts[1]]);
                } else {
                    print("file not found");
                }
                break;

            case "resume":
                print('<a href="https://raw.githubusercontent.com/sunilsankar/sunilsankar/master/sunilsankar.pdf" target="_blank">Open Resume</a>');
                break;

            case "whoami":
                print("root");
                break;

            case "uname":
                print("Linux portfolio 6.11.0 x86_64 GNU/Linux");
                break;

            case "theme":
                if (parts[1] === "light") {
                    document.body.classList.add("light");
                    localStorage.setItem("theme", "light");
                } else if (parts[1] === "dark") {
                    document.body.classList.remove("light");
                    localStorage.setItem("theme", "dark");
                } else {
                    print("Usage: theme light | theme dark");
                    break;
                }

                updateThemeButton();
                print("Theme updated.");
                break;

            case "sudo":
                if (parts[1] === "hire-me") {
                    print("Access granted.");
                    print("You clearly know quality.");
                    print("Contact: sunil@sunil.cc");
                } else {
                    print("sudo: command not allowed");
                }
                break;

            case "clear":
                terminal.innerHTML = "";
                break;

            default:
                if (cmd !== "") {
                    print("command not found");
                }
        }

        createPrompt();
        window.scrollTo(0, document.body.scrollHeight);
    }

    // =========================
    // Footer System Info
    // =========================
    const bootTime = Date.now();

    function formatUptime(ms) {
        const s = Math.floor(ms / 1000);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return `${h}h ${m}m ${sec}s`;
    }

    function updateSystemInfo() {
        const el = document.getElementById("sysinfo");
        if (!el) return;

        const uptime = formatUptime(Date.now() - bootTime);
        const load1 = (Math.random() * 1.5).toFixed(2);
        const load5 = (Math.random() * 1.2).toFixed(2);
        const load15 = (Math.random() * 1.0).toFixed(2);

        el.textContent =
            `root@portfolio | uptime: ${uptime} | load avg: ${load1}, ${load5}, ${load15}`;
    }

    // =========================
    // Header Clock
    // =========================
    function updateClock() {
        const el = document.getElementById("header-clock");
        if (!el) return;
        el.textContent = new Date().toLocaleTimeString();
    }

    setInterval(updateSystemInfo, 1000);
    setInterval(updateClock, 1000);
    updateSystemInfo();
    updateClock();

    // =========================
    // Boot + Issue Page
    // =========================
    function showIssuePage() {

    print("Ubuntu 22.04.3 LTS \\n \\l");
    print("");

    print("Last login: " + new Date().toLocaleString());
    print("");

    print("*************************************************************");
    print("*                                                           *");
    print("*  Welcome to My Portfolio Server                           *");
    print("*  My Name is Sunil Sankar                                  *");
    print("*  Linux Architect - SRE/DevOps Engineer                    *");
    print("*  18 Years Experience                                      *");
    print("*  I approach complex infrastructure challenges methodically*");
    print("*  prioritizing automation, observability, and resilience   *");
    print("*  while quickly mastering new tools when needed.           *");
    print("*                                                           *");
    print("*   Type 'help' to get started                              *");
    print("*************************************************************");
    print("");
    print("  System Information:");
    print("  Hostname: portfolio.localhost");
    print("  Kernel: 6.11.0-generic x86_64");
    print("  Uptime: just booted");
    print("");

    createPrompt();
}

// Simulated login sequence
function bootSequence() {
    print("Connecting to portfolio server...");
    setTimeout(() => {
        print("Authenticating...");
        setTimeout(() => {
            print("Access granted.");
            print("");
            showIssuePage();
        }, 600);
    }, 800);
}

bootSequence();

});