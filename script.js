// Scroll progress
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  progress.style.width =
    (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
});

// Cursor glow
const glow = document.getElementById("cursorGlow");
window.addEventListener("pointermove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Particles
const particles = document.getElementById("particles");
for (let i = 0; i < 38; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDuration = 8 + Math.random() * 18 + "s";
  p.style.animationDelay = -Math.random() * 18 + "s";
  p.style.opacity = 0.15 + Math.random() * 0.5;
  particles.appendChild(p);
}

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Counters
const counters = document.querySelectorAll(".counter");
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "1";
      const target = +entry.target.dataset.target;
      let n = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const tick = () => {
        n = Math.min(target, n + step);
        entry.target.textContent = n + (target === 31 ? "+" : "");
        if (n < target) requestAnimationFrame(tick);
      };
      tick();
    });
  },
  { threshold: 0.8 },
);
counters.forEach((c) => counterObs.observe(c));

// Project filters
document.querySelectorAll("#filters button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("#filters button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".project-wrap").forEach((card) => {
      card.style.display =
        f === "all" || card.dataset.category === f ? "" : "none";
    });
  });
});

// Tilt cards
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 7}deg) translateY(-8px)`;
  });
  card.addEventListener("pointerleave", () => (card.style.transform = ""));
});

// Theme
const themeBtn = document.getElementById("themeBtn");
themeBtn.onclick = () => {
  document.body.classList.toggle("light");
  themeBtn.innerHTML = document.body.classList.contains("light")
    ? '<i class="bi bi-sun"></i>'
    : '<i class="bi bi-moon-stars"></i>';
};

// Toast
const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = "block";
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => (toast.style.display = "none"), 2800);
}

document.getElementById("helloBtn").onclick = () =>
  showToast("✨ The next chapter starts with one message.");
document.getElementById("copyBtn").onclick = async () => {
  const text =
    "I'm Samira Hakimi — an AI enthusiast and software developer who loves turning ambitious ideas into meaningful digital experiences.";
  try {
    await navigator.clipboard.writeText(text);
    showToast("Intro copied to your clipboard ✦");
  } catch (e) {
    showToast(text);
  }
};

// Command palette
const palette = document.getElementById("commandPalette");
const input = document.getElementById("commandInput");
function openCmd() {
  palette.classList.add("open");
  input.value = "";
  setTimeout(() => input.focus(), 50);
}
function closeCmd() {
  palette.classList.remove("open");
}
document.getElementById("cmdBtn").onclick = openCmd;
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openCmd();
  }
  if (e.key === "Escape") closeCmd();
});
palette.addEventListener("click", (e) => {
  if (e.target === palette) closeCmd();
});
document.querySelectorAll(".command-item").forEach((item) => {
  item.onclick = () => {
    closeCmd();
    document
      .querySelector(item.dataset.go)
      .scrollIntoView({ behavior: "smooth" });
  };
});
input.addEventListener("input", () => {
  const q = input.value.toLowerCase();
  document
    .querySelectorAll(".command-item")
    .forEach(
      (i) =>
        (i.style.display = i.textContent.toLowerCase().includes(q)
          ? "block"
          : "none"),
    );
});

// Secret interaction
let keys = "";
document.addEventListener("keydown", (e) => {
  keys = (keys + e.key.toLowerCase()).slice(-10);
  if (keys.includes("samira")) showToast("✦ You found the secret: keep going.");
});
