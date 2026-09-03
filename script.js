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

// ===== EXTRA JS MAGIC =====
window.addEventListener("load", () =>
  setTimeout(
    () => document.getElementById("preloader").classList.add("hide"),
    500,
  ),
);
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () =>
  backTop.classList.toggle("show", scrollY > 650),
);
backTop.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

// Ripple buttons
for (const b of document.querySelectorAll(".btn"))
  b.addEventListener("click", (e) => {
    const r = document.createElement("span");
    r.className = "ripple";
    const q = b.getBoundingClientRect(),
      z = Math.max(q.width, q.height);
    r.style.width = r.style.height = z + "px";
    r.style.left = e.clientX - q.left - z / 2 + "px";
    r.style.top = e.clientY - q.top - z / 2 + "px";
    b.appendChild(r);
    setTimeout(() => r.remove(), 650);
  });

// Magnetic interactions
for (const el of document.querySelectorAll(".btn-gold,.navbar-brand")) {
  el.classList.add("magnetic");
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.12}px,${(e.clientY - r.top - r.height / 2) * 0.12}px)`;
  });
  el.addEventListener("pointerleave", () => (el.style.transform = ""));
}

// Custom cursor
const dot = document.querySelector(".cursor-dot"),
  ring = document.querySelector(".cursor-ring");
let mx = innerWidth / 2,
  my = innerHeight / 2,
  rx = mx,
  ry = my;
addEventListener("pointermove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});
(function loop() {
  rx += (mx - rx) * 0.16;
  ry += (my - ry) * 0.16;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(loop);
})();
for (const el of document.querySelectorAll(
  "a,button,.project-card,.skill-pill",
)) {
  el.addEventListener("mouseenter", () => {
    ring.style.width = "48px";
    ring.style.height = "48px";
  });
  el.addEventListener("mouseleave", () => {
    ring.style.width = "32px";
    ring.style.height = "32px";
  });
}

// Rotating hero copy
const words = [
  "AI experiences.",
  "full-stack products.",
  "beautiful interfaces.",
  "ideas people remember.",
  "the next chapter.",
];
let wi = 0;
const wr = document.getElementById("wordRotate");
setInterval(() => {
  wr.style.opacity = 0;
  wr.style.transform = "translateY(8px)";
  setTimeout(() => {
    wi = (wi + 1) % words.length;
    wr.textContent = words[wi];
    wr.style.opacity = 1;
    wr.style.transform = "translateY(0)";
  }, 250);
}, 2300);

// Keyboard section shortcuts: 1-6
addEventListener("keydown", (e) => {
  if (e.target.matches("input,textarea")) return;
  const m = {
    1: "#home",
    2: "#about",
    3: "#work",
    4: "#journey",
    5: "#skills",
    6: "#contact",
  };
  if (m[e.key]) {
    document.querySelector(m[e.key]).scrollIntoView({ behavior: "smooth" });
    showToast("Section " + e.key + " opened ✦");
  }
});

// Double-click project spotlight
for (const card of document.querySelectorAll(".project-card"))
  card.addEventListener("dblclick", () => {
    card.classList.toggle("spotlight");
    card.style.boxShadow = card.classList.contains("spotlight")
      ? "0 0 0 1px rgba(217,181,109,.55),0 25px 100px rgba(217,181,109,.12)"
      : "";
    showToast(
      card.classList.contains("spotlight")
        ? "Project spotlight activated ✦"
        : "Spotlight closed",
    );
  });

// Secret word
let secret = "";
addEventListener("keydown", (e) => {
  secret = (secret + e.key.toLowerCase()).slice(-20);
  if (secret.includes("future")) {
    document.body.animate(
      [
        { filter: "brightness(1)" },
        { filter: "brightness(1.35)" },
        { filter: "brightness(1)" },
      ],
      { duration: 900 },
    );
    showToast("🚀 Future mode unlocked. Keep building.");
  }
});

// Native share button where supported
if (navigator.share) {
  const b = document.createElement("button");
  b.className = "btn btn-ghost mt-3 ms-2";
  b.innerHTML = '<i class="bi bi-share me-2"></i>Share my universe';
  document.querySelector("#contact .d-flex").appendChild(b);
  b.onclick = () =>
    navigator.share({
      title: "Samira Hakimi — AI & Software Developer",
      text: "Explore Samira Hakimi’s digital universe.",
      url: location.href,
    });
}

// Active navigation state
const navs = [...document.querySelectorAll(".nav-link")];
const secs = [...document.querySelectorAll("section[id]")];
new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting)
        navs.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + x.target.id,
          ),
        );
    }),
  { rootMargin: "-35% 0px -55% 0px" },
).observe;
secs.forEach((s) =>
  new IntersectionObserver(
    (es) =>
      es.forEach((x) => {
        if (x.isIntersecting)
          navs.forEach((a) =>
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + x.target.id,
            ),
          );
      }),
    { rootMargin: "-35% 0px -55% 0px" },
  ).observe(s),
);
