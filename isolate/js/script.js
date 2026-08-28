/* ══════════════════════════════════════════════════════════
   Cherry Blossom Birthday Surprise · v3
   Love letter login · blossom garden · memories · music
   ══════════════════════════════════════════════════════════ */

/* ══════════ 1. PERSONALIZATION — edit everything here ══════════ */
const CONFIG = {
  name: "Bangaram",
  birthDate: "2006-09-12",                 // YYYY-MM-DD

  heroKicker: "Happy Birthday",
  heroName: "Bangaram ♥",
  gardenLine: "Today, the whole garden blooms a little brighter because it's your day.",
  unlockLine1: "I knew it was you…",

  quotes: [
    "Some people don't just enter our lives… they make our world a little more beautiful.",
    "If memories were flowers, I'd fill an entire garden with ours.",
    "Some moments are ordinary when they happen, but become priceless when we look back.",
    "May every year ahead give you another reason to smile.",
    "You deserve a life filled with beautiful moments, gentle hearts and endless reasons to be happy."
  ],

  // Photos used by the gallery AND the home quote compositions (first 4).
  photos: [
    { image: "images/photo1.jpeg", caption: "A beautiful memory ♥" },
    { image: "images/photo2.jpeg", caption: "One of those moments worth remembering." },
    { image: "images/photo3.jpeg", caption: "The day everything felt magical." },
    { image: "images/photo4.jpeg", caption: "Laughter that never gets old." },
    { image: "images/photo5.jpeg", caption: "A quiet moment, a loud heart." },
    { image: "images/photo6.jpeg", caption: "Forever my favourite person." },
    { image: "images/photo7.jpeg", caption: "Some smiles stay with you always." },
    { image: "images/photo8.jpeg", caption: "Wrapped in warmth, just like this day." },
    { image: "images/photo9.jpeg", caption: "Time flies when hearts are happy." },
    { image: "images/photo10.jpeg", caption: "A page from our favourite story." },
    { image: "images/photo11.jpeg", caption: "Little moments, endless love." },
    { image: "images/photo12.jpeg", caption: "And the best is yet to come…" }
  ],

  letter: {
    body: "If I could give you one thing today, it would be the ability to see yourself the way the people who love you see you — beautiful, special, and worth celebrating.",
    sign: "Happy Birthday, Bangaram ♥",
    finalLine: "May your life always have gardens to walk through, memories to keep, and reasons to smile, and I was there for you in every one of them."
  },

  finaleTitle: "HAPPY BIRTHDAY BANGARAM ♥",
  finaleSub: "This little world was made just for you.",

  musicEnabled: true,
  musicFile: "music/birthday.mp3"
};

/* ══════════ 2. Unlock state — login NEVER reappears during a visit ══════════
   sessionStorage: switching tabs / pages / refreshing keeps you unlocked,
   but closing the site clears it — the next visit starts at the login page. */
const STORAGE_KEY = "birthdayExperienceUnlocked";

function unlockExperience() {
  try { sessionStorage.setItem(STORAGE_KEY, "true"); } catch (e) {}
}
function isExperienceUnlocked() {
  try { return sessionStorage.getItem(STORAGE_KEY) === "true"; } catch (e) { return false; }
}
// Hidden dev helper: type `resetSurprise()` in the console to test the login again.
window.resetSurprise = function () {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem("birthdayIntroDone");
    localStorage.removeItem("birthdayExperienceUnlocked");
    sessionStorage.removeItem("surpriseUnlocked");
    location.reload();
  } catch (e) {}
};
// One-time cleanup: remove the old permanent flag from earlier versions.
try { localStorage.removeItem("birthdayExperienceUnlocked"); sessionStorage.removeItem("surpriseUnlocked"); } catch (e) {}

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const rand = (min, max) => Math.random() * (max - min) + min;
/* ══════════ 3. Scene builders (stars / treeline / branches / parallax) ══════════ */
function buildStars(container, count = 40) {
  if (!container || REDUCED_MOTION) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("i");
    s.className = "star";
    const size = rand(1, 2.6);
    s.style.cssText = `width:${size}px;height:${size}px;left:${rand(0,100)}%;top:${rand(0,45)}%;
      --tw-dur:${rand(2.5,6)}s;animation-delay:-${rand(0,5)}s;
      box-shadow:0 0 ${size*3}px rgba(255,240,246,.9);`;
    container.appendChild(s);
  }
}

function buildTreeline(container) {
  if (!container) return;
  [90,140,110,170,120,150,100,160,130,95].forEach(h => {
    const t = document.createElement("i");
    const w = h * rand(0.9, 1.25);
    t.style.cssText = `width:${w}px;height:${h}px;margin-bottom:${rand(-8,4)}px;opacity:${rand(.55,.95)};`;
    container.appendChild(t);
  });
}

const BRANCH_SVG = `<svg viewBox="0 0 520 260" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-10 30 C120 40 220 70 320 130 C380 165 430 190 500 200" stroke="#7A3355" stroke-width="12" stroke-linecap="round"/>
<path d="M150 58 C190 80 210 110 225 150" stroke="#7A3355" stroke-width="7" stroke-linecap="round"/>
<path d="M300 105 C340 115 370 140 385 175" stroke="#7A3355" stroke-width="6" stroke-linecap="round"/>
<g fill="#F6B6C8"><circle cx="120" cy="34" r="17"/><circle cx="180" cy="52" r="13"/><circle cx="235" cy="82" r="18"/><circle cx="290" cy="112" r="14"/><circle cx="330" cy="138" r="19"/><circle cx="395" cy="172" r="15"/><circle cx="455" cy="196" r="18"/><circle cx="60" cy="28" r="14"/><circle cx="205" cy="60" r="11"/><circle cx="262" cy="98" r="12"/><circle cx="360" cy="158" r="12"/><circle cx="420" cy="184" r="13"/></g>
<g fill="#E88BA8"><circle cx="150" cy="44" r="9"/><circle cx="212" cy="72" r="10"/><circle cx="262" cy="96" r="9"/><circle cx="310" cy="124" r="10"/><circle cx="368" cy="164" r="9"/><circle cx="482" cy="202" r="9"/></g>
<g fill="#FCE7ED"><circle cx="135" cy="42" r="5"/><circle cx="250" cy="90" r="5"/><circle cx="345" cy="148" r="5"/><circle cx="440" cy="192" r="5"/></g></svg>`;

function buildBranches() {
  document.querySelectorAll(".branch").forEach(el => { el.innerHTML = BRANCH_SVG; });
}

/* Gentle scroll parallax — heavily damped so the background only
   *floats* while scrolling (depths act as relative depth ratios,
   the small DAMP factor keeps actual movement barely noticeable). */
const PARALLAX_DAMP = 0.6;   /* 1.0 felt too fast, lower values too slow — 0.6 is lively but calm */
function initParallax() {
  if (REDUCED_MOTION) return;
  const layers = [...document.querySelectorAll("[data-depth]")];
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      layers.forEach(l => {
        l.style.transform = `translateY(${y * parseFloat(l.dataset.depth) * PARALLAX_DAMP}px)`;
      });
      ticking = false;
    });
  }, { passive: true });
}

/* ══════════ 4. Particle engine ══════════ */
function twinkleSparkle(container) {
  const s = document.createElement("span");
  s.className = "sparkle";
  const size = rand(2, 5);
  const gold = Math.random() > 0.65;
  s.style.cssText = `width:${size}px;height:${size}px;left:${rand(0,100)}%;top:${rand(0,100)}%;
    background:${gold ? "#f4e2a6" : "#ffd9e6"};
    box-shadow:0 0 ${size*3}px ${gold ? "rgba(217,164,65,.9)" : "rgba(246,182,200,.9)"};opacity:0;`;
  container.appendChild(s);
  s.animate([{ opacity: 0 }, { opacity: .9 }, { opacity: 0 }],
    { duration: rand(2200, 5200), easing: "ease-in-out" }
  ).onfinish = () => { s.remove(); twinkleSparkle(container); };
}
function spawnSparkles(container, count = 20) {
  if (REDUCED_MOTION || !container) return;
  for (let i = 0; i < count; i++) setTimeout(() => twinkleSparkle(container), i * 200);
}

/* Natural CSS/SVG-style hearts — varied size, blur, opacity, speed */
function floatHeart(container) {
  const h = document.createElement("span");
  h.className = "float-heart";
  const soft = Math.random() > 0.5;
  h.innerHTML = `<svg viewBox="0 0 32 29" width="${Math.round(rand(10,22))}"><path d="M16 28.7C10 23.6 0 15.9 0 8.9 0 4 4 .5 8.4.5c3 0 5.9 1.6 7.6 4.3C17.7 2.1 20.6.5 23.6.5 28 .5 32 4 32 8.9c0 7-10 14.7-16 19.8z" fill="${soft ? "rgba(246,182,200,.75)" : "rgba(232,139,168,.85)"}"/></svg>`;
  h.style.cssText = `position:absolute;left:${rand(2,96)}%;bottom:-40px;
    filter:blur(${Math.random() > .75 ? rand(1,2).toFixed(1) : 0}px);`;
  container.appendChild(h);
  h.animate([
    { transform: "translateY(0) rotate(-7deg)", opacity: 0 },
    { opacity: rand(.35,.85), offset: .15 },
    { transform: `translate(${rand(-60,60)}px,-${window.innerHeight + 80}px) rotate(9deg)`, opacity: 0 }
  ], { duration: rand(9000, 16000), easing: "linear" }
  ).onfinish = () => { h.remove(); floatHeart(container); };
}
function spawnFloatingHearts(container, count = 7) {
  if (REDUCED_MOTION || !container) return;
  for (let i = 0; i < count; i++) setTimeout(() => floatHeart(container), i * 1300);
}

/* Hearts rising gently around a section (e.g., the greeting) */
function spawnRisingHearts(sectionEl, count = 6) {
  if (REDUCED_MOTION || !sectionEl) return;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h = document.createElement("span");
      h.className = "rise-heart";
      h.textContent = Math.random() > 0.6 ? "❀" : "♥";
      h.style.left = rand(6, 94) + "%";
      h.style.fontSize = rand(11, 22) + "px";
      h.style.setProperty("--rd", rand(7, 13) + "s");
      h.style.setProperty("--ro", rand(.25, .6));
      h.style.setProperty("--hb", Math.random() > .6 ? "1.5px" : "0px");
      sectionEl.style.position = getComputedStyle(sectionEl).position === "static" ? "relative" : sectionEl.style.position;
      sectionEl.appendChild(h);
    }, i * 2100);
  }
}
/* ══════════ 5. Blossom petal system (varied shapes · drift · depth) ══════════ */
const PETAL_SHAPES = ["70% 0 70% 0", "60% 0 60% 0", "80% 10 60% 0"];

function fallPetal(container, respawn, slow = false) {
  const p = document.createElement("span");
  p.className = "petal";
  const size = rand(8, 18);
  p.style.cssText = `left:${rand(0,100)}%;top:-24px;width:${size}px;height:${size}px;
    border-radius:${PETAL_SHAPES[Math.floor(rand(0,PETAL_SHAPES.length))]};
    background:radial-gradient(circle at 30% 30%, ${Math.random() > .5 ? "#FCE7ED" : "#F6B6C8"}, #E88BA8 78%);
    opacity:${rand(.5,.95)};`;
  container.appendChild(p);

  // occasional petal drifts toward the viewer
  const toward = Math.random() > 0.85;
  const endScale = toward ? rand(1.6, 2.6) : 1;
  const dur = slow ? rand(14000, 22000) : rand(8000, 16000);
  p.animate([
    { transform: "translate(0,-24px) rotate(0deg) scale(1)", opacity: 0 },
    { opacity: .9, offset: .07 },
    { transform: `translate(${rand(-160,160)}px, ${window.innerHeight + 60}px) rotate(${rand(360,900)}deg) scale(${endScale})`, opacity: .05 }
  ], { duration: dur, easing: "cubic-bezier(.45,.05,.55,.95)" }
  ).onfinish = () => { p.remove(); if (respawn && document.body.contains(container)) fallPetal(container, true); };
}
function spawnPetals(container, count = 12, continuous = true, slow = false) {
  if (REDUCED_MOTION || !container) return;
  for (let i = 0; i < count; i++) setTimeout(() => fallPetal(container, continuous, slow), i * 700);
}

/* Petal-sweep transition — petals cover the screen before navigation */
function petalSweep(callback) {
  const sweep = document.getElementById("petal-sweep");
  if (!sweep || REDUCED_MOTION) { callback(); return; }
  for (let i = 0; i < 60; i++) {
    const p = document.createElement("span");
    p.className = "sweep-petal";
    p.style.left = rand(0, 100) + "%";
    const size = rand(12, 26);
    p.style.width = size + "px";
    p.style.height = size * rand(.8, 1.2) + "px";
    p.style.borderRadius = PETAL_SHAPES[Math.floor(rand(0, PETAL_SHAPES.length))];
    sweep.appendChild(p);
    p.animate([
      { transform: "translateY(-30px) rotate(0deg)", opacity: 0 },
      { opacity: 1, offset: .15 },
      { transform: `translateY(${window.innerHeight + 40}px) rotate(${rand(400,800)}deg)` }
    ], { duration: rand(1100, 1900), delay: rand(0, 500), easing: "linear", fill: "forwards" });
  }
  setTimeout(callback, 1500);
}

function wander(el) {
  el.animate([
    { transform: "translate(0,0)", opacity: rand(.3,.7) },
    { transform: `translate(${rand(-70,70)}px, ${rand(-50,50)}px)`, opacity: rand(.6,1) },
    { transform: `translate(${rand(-70,70)}px, ${rand(-50,50)}px)`, opacity: rand(.25,.6) }
  ], { duration: rand(5000, 10000), easing: "ease-in-out" }).onfinish = () => wander(el);
}
function spawnFireflies(container, count = 10) {
  if (REDUCED_MOTION || !container) return;
  for (let i = 0; i < count; i++) {
    const f = document.createElement("span");
    f.className = "firefly";
    f.style.left = rand(0, 100) + "%";
    f.style.top = rand(35, 95) + "%";
    container.appendChild(f);
    wander(f);
  }
}

/* Delicate heart trail following the cursor (desktop only) */
function initCursorTrail() {
  if (REDUCED_MOTION || !window.matchMedia("(pointer: fine)").matches) return;
  let last = 0;
  document.addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (now - last < 120) return;
    last = now;
    const h = document.createElement("span");
    h.className = "cursor-heart";
    h.textContent = Math.random() > 0.75 ? "✨" : "♥";
    h.style.left = e.clientX + "px";
    h.style.top = e.clientY + "px";
    document.body.appendChild(h);
    h.animate([
      { transform: "translate(-50%,-50%) scale(1)", opacity: .8 },
      { transform: "translate(-50%,-50%) translateY(-34px) scale(.4)", opacity: 0 }
    ], { duration: 950, easing: "ease-out" }).onfinish = () => h.remove();
  }, { passive: true });
}
/* ══════════ 6. Love-letter login flow (form first → sealed letter) ══════════ */
let pendingName = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  if (!message) { toast.classList.remove("show"); return; }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 3400);
}

function wireLetterFlow() {
  const loginScreen = document.getElementById("login-screen");
  const letterStage = document.getElementById("letter-stage");

  // Floating labels
  document.querySelectorAll(".field-v3 input").forEach(input => {
    const sync = () => input.classList.toggle("has-value", !!input.value);
    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
    input.addEventListener("blur", sync);
  });

  // Step 1 · validate name + birthday
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("login-name");
    const dateInput = document.getElementById("login-date");
    const name = (nameInput.value || "").trim();
    const date = dateInput.value;

    if (!name || !date) { showToast("Please tell me your name and birthday first ♥"); return; }
    const ok = name.toLowerCase() === CONFIG.name.toLowerCase() && date === CONFIG.birthDate;
    if (!ok) {
      showToast("Hmm… this little world is meant for someone special ♥");
      nameInput.value = ""; dateInput.value = "";
      nameInput.classList.remove("has-value"); dateInput.classList.remove("has-value");
      return;
    }

    // Correct! Reveal the sealed letter for them to open.
    pendingName = name;
    showToast("");                                   // clear any old message
    loginScreen.hidden = true;
    letterStage.hidden = false;
    document.getElementById("open-letter").focus();
  });

  // Step 2 · opening the sealed letter starts the magic
  const openBtn = document.getElementById("open-letter");
  if (!openBtn) return;
  openBtn.addEventListener("click", () => {
    document.querySelector(".sealed-letter")?.classList.add("opening");
    setTimeout(() => runUnlockSequence(pendingName || CONFIG.name), 800);
  });
}

/* ══════════ 7. The big emotional unlock sequence ══════════ */
function runUnlockSequence(name) {
  const overlay   = document.getElementById("unlock-overlay");
  const line1     = document.getElementById("unlock-line1");
  const line2     = document.getElementById("unlock-line2");
  const welcome   = document.getElementById("welcome-name");
  const bloom     = document.getElementById("bloom-flash");
  const particles = document.getElementById("particles");
  const petals    = document.getElementById("petals-layer");

  unlockExperience();                       // never show login again
  if (welcome && name) welcome.textContent = name;

  // Phase 1 — everything goes quiet, world darkens
  spawnPetals(petals, 6, false, true);      // a few slow petals
  setTimeout(() => overlay.classList.add("active"), 300);

  // Phases 2–3 — heart appears, then begins to beat
  setTimeout(() => overlay.classList.add("beating"), 1500);

  // Phase 4 — tiny hearts emerge from it
  [2100, 2500, 2900].forEach(t =>
    setTimeout(() => burstHearts(window.innerWidth / 2, window.innerHeight / 2 - window.innerHeight * .08, 10), t));

  // Phase 5 — petals explode gently outward
  setTimeout(() => {
    spawnPetals(petals, 26, false);
    burstPetals(window.innerWidth / 2, window.innerHeight / 2);
  }, 3300);

  // Phase 6 — the words
  setTimeout(() => line1 && line1.classList.add("show"), 3900);
  setTimeout(() => line2 && line2.classList.add("show"), 5900);

  // Phase 7 — screen blooms into pink light
  setTimeout(() => { bloom && bloom.classList.add("go"); overlay.classList.add("bloom"); }, 7600);

  // Phase 8 — into the garden
  setTimeout(() => {
    overlay.hidden = true;
    document.getElementById("login-screen").hidden = true;
    document.getElementById("letter-stage").hidden = true;
    const home = document.getElementById("home-section");
    home.hidden = false;
    startHomeExperience();
  }, 8400);
}

function burstHearts(x, y, count = 14) {
  if (REDUCED_MOTION) return;
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "cursor-heart";
    h.textContent = Math.random() > 0.5 ? "♥" : "❀";
    h.style.left = x + "px"; h.style.top = y + "px";
    h.style.fontSize = rand(11, 22) + "px";
    document.body.appendChild(h);
    const angle = (Math.PI * 2 * i) / count + rand(-.25, .25);
    const dist = rand(110, 300);
    h.animate([
      { transform: "translate(-50%,-50%) scale(.4)", opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist - 70}px)) scale(1) rotate(${rand(-40,40)}deg)`, opacity: 0 }
    ], { duration: rand(1400, 2200), easing: "cubic-bezier(.17,.67,.35,1)" }).onfinish = () => h.remove();
  }
}
function burstPetals(x, y) {
  if (REDUCED_MOTION) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("span");
    p.className = "hover-petal";
    p.style.cssText += `position:fixed;left:${x}px;top:${y}px;width:${rand(9,16)}px;height:${rand(9,16)}px;z-index:82;`;
    document.body.appendChild(p);
    const angle = (Math.PI * 2 * i) / 18 + rand(-.3, .3);
    const dist = rand(140, 380);
    p.animate([
      { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) rotate(${rand(300,700)}deg)`, opacity: 0 }
    ], { duration: rand(1600, 2600), easing: "cubic-bezier(.15,.6,.3,1)" }).onfinish = () => p.remove();
  }
}
/* ══════════ 8. Home experience · quotes ══════════ */
function applyPersonalization() {
  const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };
  set("hero-name", CONFIG.heroName);
  set("welcome-name", CONFIG.name);
  set("finale-title", CONFIG.finaleTitle);
  const kicker = document.querySelector(".hero-kicker");
  if (kicker) kicker.textContent = CONFIG.heroKicker;
  const garden = document.querySelector(".hero-gardenline");
  if (garden) garden.textContent = CONFIG.gardenLine;
  const body = document.getElementById("letter-body");
  if (body && CONFIG.letter.body) body.textContent = CONFIG.letter.body;
  set("letter-sign", CONFIG.letter.sign);
  set("letter-final-line", CONFIG.letter.finalLine);
}

function startHomeExperience() {
  const particles = document.getElementById("particles");
  const petals = document.getElementById("petals-layer");
  spawnSparkles(particles, 22);
  spawnFloatingHearts(particles, 6);
  spawnPetals(petals, 12, true);
  spawnFireflies(particles, 7);
  startQuotes();
  const heroInner = document.querySelector(".hero-inner");
  if (heroInner) spawnRisingHearts(heroInner, 6);
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
}

/* Photo + quote crossfade composition — fixed elegant frame; each photo
   fills it fully, and an optional per-photo `focus` ("x% y%") keeps the
   person perfectly placed (lower focus % = show more of the top/face). */
function startQuotes() {
  const frame = document.getElementById("quote-frame");
  const quoteEl = document.getElementById("quote-text");
  if (!frame || !quoteEl) return;

  const spacer = document.createElement("span");
  spacer.className = "quote-spacer";
  frame.appendChild(spacer);

  const shots = CONFIG.photos.slice(0, Math.max(4, CONFIG.quotes.length)).map((p) => {
    const img = document.createElement("img");
    img.src = p.image;
    img.alt = "";
    img.loading = "lazy";
    if (p.focus) img.style.setProperty("--focus", p.focus);
    frame.appendChild(img);
    return img;
  });

  let idx = 0;
  shots[0].classList.add("live");

  setInterval(() => {
    quoteEl.classList.add("fading");
    setTimeout(() => {
      idx = (idx + 1) % CONFIG.quotes.length;
      quoteEl.textContent = `\u201C${CONFIG.quotes[idx]}\u201D`;
      shots.forEach((img, i) => img.classList.toggle("live", i === idx % shots.length));
      quoteEl.classList.remove("fading");
    }, 800);
  }, 6000);
}

/* Gallery CTA — petal sweep transition */
/* ══════════════════════════════════════════════════════════
   MEMORY TRANSITION · isolated component
   Runs ONLY when "Walk Through Some Memories ♥" is clicked.
   Timeline: button pop → hearts → garden wakes → giant heart
   explodes → petal spiral → message → flash → portal → gallery.
   ══════════════════════════════════════════════════════════ */
const PORTAL_FLAG = "memoryPortalIncoming";
const MT_HEART_SVG =
  '<svg viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M16 28.7C10 23.6 0 15.9 0 8.9 0 4 4 .5 8.4.5c3 0 5.9 1.6 7.6 4.3C17.7 2.1 20.6.5 23.6.5 28 .5 32 4 32 8.9c0 7-10 14.7-16 19.8z"/></svg>';

function mtAdd(tag, cls, cssText) {
  const el = document.createElement(tag);
  el.className = cls;
  if (cssText) el.style.cssText = cssText;
  document.body.appendChild(el);
  return el;
}

function mtHeartBurst(x, y, count, spread) {
  for (let i = 0; i < count; i++) {
    const h = mtAdd("span", "mt-heart");
    h.innerHTML = MT_HEART_SVG;
    const ang = Math.random() * Math.PI * 2;
    const dist = rand(spread * .35, spread);
    h.style.left = x + "px";
    h.style.top = y + "px";
    h.style.setProperty("--dx", (Math.cos(ang) * dist) + "px");
    h.style.setProperty("--dy", (Math.sin(ang) * dist - rand(40, 170)) + "px");
    h.style.setProperty("--rot", rand(-420, 420) + "deg");
    h.style.setProperty("--s", rand(.55, 1.35).toFixed(2));
    h.style.setProperty("--t", rand(1.2, 2.2).toFixed(2) + "s");
    h.style.color = Math.random() > .5 ? "var(--cherry)" : "var(--rose)";
    setTimeout(() => h.remove(), 2400);
  }
}

function startMemoryTransition() {
  if (document.body.classList.contains("mt-busy")) return;
  document.body.classList.add("mt-busy");
  try { sessionStorage.setItem(PORTAL_FLAG, "true"); } catch (e) {}

  const goNow = () => { window.location.href = "gallery.html"; };
  if (REDUCED_MOTION) { goNow(); return; }

  const btn = document.getElementById("open-memories");

  /* Phase 1 · button reaction + playful text */
  if (btn) {
    btn.classList.add("mt-button-pop");
    btn.style.transition = "opacity .18s ease";
    const label = btn.childNodes[0];
    const swap = (txt) => {
      btn.style.opacity = ".25";
      setTimeout(() => { label.nodeValue = txt + " "; btn.style.opacity = "1"; }, 180);
    };
    swap("Wait… ♥");
    setTimeout(() => swap("Taking you somewhere…"), 1800);
    setTimeout(() => swap("Follow the petals 🌸"), 3600);
    const r = btn.getBoundingClientRect();
    mtHeartBurst(r.left + r.width / 2, r.top + r.height / 2, 16, 230);
  }

  /* Phase 2 · the garden reacts */
  setTimeout(() => {
    document.body.classList.add("mt-alive");
    const particles = document.getElementById("particles");
    const petalsLayer = document.getElementById("petals-layer");
    if (petalsLayer) spawnPetals(petalsLayer, 16, false);
    if (particles) {
      spawnSparkles(particles, 12);
      spawnFloatingHearts(particles, 8);
      spawnFireflies(particles, 8);
    }
  }, 600);

  /* Phase 3 · giant heart grows, pulses, explodes — with shockwave rings,
     a pink zoom punch and a follow-up heart rain */
  let bigHeart = null;
  setTimeout(() => {
    bigHeart = mtAdd("div", "mt-big-heart");
    bigHeart.innerHTML = MT_HEART_SVG;
  }, 1500);
  setTimeout(() => {
    if (bigHeart) bigHeart.remove();

    // one soft zoom punch + a single clean shockwave ring
    const zoom = mtAdd("div", "mt-zoom");
    setTimeout(() => zoom.remove(), 700);
    const ring = mtAdd("div", "mt-ring");
    setTimeout(() => ring.remove(), 1050);

    // one full radial burst — no overlapping waves
    mtHeartBurst(window.innerWidth / 2, window.innerHeight / 2 - 40, 32,
                 Math.min(window.innerWidth, window.innerHeight) * .55);
  }, 3900);

  /* Phase 4 · cherry blossom spiral — two counter-rotating layers */
  setTimeout(() => {
    const makeSpiral = (cls, n, baseR) => {
      const tornado = mtAdd("div", "mt-tornado " + cls);
      for (let i = 0; i < n; i++) {
        const p = mtAdd("span", "mt-spiral-petal");
        p.style.transform = `rotate(${i * (360 / n)}deg) translateX(${baseR + (i % 4) * 50}px)`;
        p.style.animationDelay = (i * -.12) + "s";
        tornado.appendChild(p);
      }
      return tornado;
    };
    const t1 = makeSpiral("", 20, 90);
    const t2 = makeSpiral("mt-reverse", 12, 150);
    setTimeout(() => { t1.classList.add("mt-fast"); t2.classList.add("mt-fast"); }, 1400);
    setTimeout(() => { t1.remove(); t2.remove(); }, 2900);
  }, 4400);

  /* Phase 5 · "Your memories are calling..." — plays alone */
  setTimeout(() => {
    const msg = mtAdd("div", "mt-message");
    msg.innerHTML = "<h3>Your memories are calling&hellip;</h3><span>Let&rsquo;s go 🌸</span>";
    setTimeout(() => msg.remove(), 3000);
  }, 7500);

  /* Phase 6 · camera moment */
  setTimeout(() => {
    const flash = mtAdd("div", "mt-flash");
    setTimeout(() => flash.remove(), 950);
  }, 10600);

  /* Extra · petal confetti shower as the portal opens */
  setTimeout(() => {
    for (let i = 0; i < 16; i++) {
      setTimeout(() => {
        const c = mtAdd("span", "mt-confetti");
        c.style.left = rand(0, 100) + "vw";
        c.style.setProperty("--cx", rand(-120, 120) + "px");
        c.style.setProperty("--cr", rand(-540, 540) + "deg");
        c.style.setProperty("--t", rand(1.4, 2.2).toFixed(2) + "s");
        setTimeout(() => c.remove(), 2300);
      }, i * 70);
    }
  }, 11000);

  /* Phase 7 · memory portal expands (with orbiting sparkles), then navigate */
  setTimeout(() => {
    const portal = mtAdd("div", "mt-portal");
    portal.innerHTML = '<div class="mt-portal-core"></div>';
    for (let i = 0; i < 8; i++) {
      const s = mtAdd("span", "mt-portal-spark");
      s.style.setProperty("--pa", (i * 45) + "deg");
      s.style.setProperty("--pr", rand(9, 16) + "vmax");
      s.style.setProperty("--st", rand(.8, 1.4).toFixed(2) + "s");
      portal.appendChild(s);
    }
    setTimeout(goNow, 2300);   // leave while the portal fills the screen
  }, 11300);
}

/* Phase 8 · gallery appears through the same portal */
function revealGalleryThroughPortal() {
  if (REDUCED_MOTION) return;
  const veil = mtAdd("div", "mt-reveal");
  veil.innerHTML = MT_HEART_SVG;
  setTimeout(() => veil.remove(), 2400);   // full cleanup after reveal

  // welcome burst: hearts + petals as the garden appears
  setTimeout(() => mtHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 18,
               Math.min(window.innerWidth, window.innerHeight) * .4), 900);
  const petalsLayer = document.getElementById("petals-layer");
  if (petalsLayer) setTimeout(() => spawnPetals(petalsLayer, 12, false), 1100);
}

/* ══════════════════════════════════════════════════════════
   NAV "MEMORIES" TRANSITION · petal curtain wipe (.nt-*)
   Plays ONLY when 🌸 Memories is clicked from the HOME page.
   The gallery page's own link never triggers any transition.
   ══════════════════════════════════════════════════════════ */
function startMemoriesNavTransition() {
  if (document.body.classList.contains("mt-busy") ||
      document.body.classList.contains("nt-busy")) return;
  document.body.classList.add("nt-busy");
  try { sessionStorage.setItem(PORTAL_FLAG, "true"); } catch (e) {}

  const goNow = () => { window.location.href = "gallery.html"; };
  if (REDUCED_MOTION) { goNow(); return; }

  // petals raining across the whole screen
  for (let i = 0; i < 34; i++) {
    setTimeout(() => {
      const p = mtAdd("span", "nt-nav-petal");
      p.style.left = rand(0, 100) + "vw";
      p.style.setProperty("--sx", rand(-110, 110) + "px");
      p.style.setProperty("--r", rand(-460, 460) + "deg");
      p.style.setProperty("--t", rand(1.2, 2).toFixed(2) + "s");
      setTimeout(() => p.remove(), 2100);
    }, i * 45);
  }

  // rose silk curtain wipes down, holds a beat, then we go
  setTimeout(() => {
    const curtain = mtAdd("div", "nt-curtain");
    setTimeout(() => curtain.remove(), 1600);
  }, 250);
  setTimeout(() => {
    const label = mtAdd("div", "nt-label");
    label.textContent = "To the memories… 🌸";
  }, 700);

  setTimeout(goNow, 2400);
}

function wireGalleryButton() {
  const btn = document.getElementById("open-memories");
  const navLink = document.getElementById("nav-memories");
  if (btn) btn.addEventListener("click", () => startMemoryTransition());
  if (navLink) navLink.addEventListener("click", (e) => {
    e.preventDefault();
    startMemoriesNavTransition();   // lighter transition for the nav link
  });
}
/* ══════════ 9. Music pill with equalizer + persisted state ══════════ */
const MUSIC_KEY = "birthdayMusicWanted";
const Music = (() => {
  let audio = null, fallback = null, playing = false;

  function ensureAudio() {
    if (!audio) {
      audio = new Audio(CONFIG.musicFile);
      audio.loop = true;
      audio.addEventListener("error", () => { audio = null; });
    }
    return audio;
  }
  function startFallback() {
    if (fallback) return true;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return false;
    fallback = new Ctx();
    const master = fallback.createGain();
    master.gain.value = 0;
    master.connect(fallback.destination);
    [261.63, 329.63, 392.0, 523.25].forEach((freq, i) => {
      const osc = fallback.createOscillator(), g = fallback.createGain();
      osc.type = "sine"; osc.frequency.value = freq;
      g.gain.value = 0.05 / (i + 1);
      const lfo = fallback.createOscillator(), lg = fallback.createGain();
      lfo.frequency.value = rand(0.08, 0.18); lg.gain.value = 0.02;
      lfo.connect(lg).connect(g.gain);
      osc.connect(g).connect(master);
      osc.start(); lfo.start();
    });
    master.gain.linearRampToValueAtTime(0.5, fallback.currentTime + 3);
    return true;
  }
  function fadeVolume(a) {
    a.volume = 0;
    const fade = setInterval(() => {
      a.volume = Math.min(0.6, a.volume + 0.05);
      if (a.volume >= 0.6) clearInterval(fade);
    }, 150);
  }
  function play() {
    const a = ensureAudio();
    let hasSrc = false;
    try { hasSrc = !!(a.src && a.src !== window.location.href && !a.error); } catch (e) {}
    if (hasSrc) {
      a.play().then(() => fadeVolume(a)).catch(() => { if (startFallback()) fallback.resume(); });
    } else if (startFallback()) fallback.resume();
    playing = true;
  }
  function pause() {
    if (audio) audio.pause();
    if (fallback) fallback.suspend();
    playing = false;
  }
  function toggle() {
    playing ? pause() : play();
    try { localStorage.setItem(MUSIC_KEY, String(playing)); } catch (e) {}
    return playing;
  }
  function resumeIfWanted() {
    let wanted = false;
    try { wanted = localStorage.getItem(MUSIC_KEY) === "true"; } catch (e) {}
    if (wanted && !playing) play();
  }
  return { toggle, resumeIfWanted, get playing() { return playing; } };
})();

function wireMusicPill() {
  const btn = document.getElementById("music-toggle");
  if (!btn || !CONFIG.musicEnabled) { if (btn) btn.style.display = "none"; return; }

  const syncUI = () => {
    btn.classList.toggle("playing", Music.playing);
    btn.setAttribute("aria-pressed", String(Music.playing));
  };
  btn.addEventListener("click", () => { Music.toggle(); syncUI(); });

  // Browsers block autoplay until interaction: try on load, then first gesture.
  Music.resumeIfWanted(); syncUI();
  ["pointerdown", "keydown", "touchstart"].forEach(evt =>
    document.addEventListener(evt, function once() {
      Music.resumeIfWanted(); syncUI();
      ["pointerdown","keydown","touchstart"].forEach(ev2 =>
        document.removeEventListener(ev2, once));
    }, { once: true, passive: true }));
}

function initReveals() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length || !("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in")); return;
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } });
  }, { threshold: 0.18 });
  els.forEach(el => obs.observe(el));
}
/* ══════════ 10. Boot ══════════ */
document.addEventListener("DOMContentLoaded", () => {
  // If intro hasn't been completed, redirect to intro page
  if (!isExperienceUnlocked()) {
    try {
      if (sessionStorage.getItem("birthdayIntroDone") !== "true") {
        window.location.href = "intro.html";
        return;
      }
    } catch (e) {}
  }

  applyPersonalization();
  initCursorTrail();
  initParallax();
  initReveals();

  buildBranches();
  buildStars(document.getElementById("stars"));
  buildTreeline(document.getElementById("treeline"));
  wireMusicPill();

  const isLoginPage = !!document.getElementById("login-form");
  const particles = document.getElementById("particles");
  const petals = document.getElementById("petals-layer");

  if (isLoginPage) {
    wireLetterFlow();
    spawnPetals(petals, 10, true);
    spawnSparkles(particles, 14);

    // Already unlocked? NEVER show the login again.
    if (isExperienceUnlocked()) {
      document.getElementById("letter-stage").hidden = true;
      document.getElementById("login-screen").hidden = true;
      document.getElementById("home-section").hidden = false;
      startHomeExperience();
    }
  } else if (document.getElementById("vine")) {
    // Gallery page ambience
    spawnSparkles(particles, 20);
    spawnFloatingHearts(particles, 6);
    spawnPetals(petals, 12, true);
    spawnFireflies(particles, 9);

    // Arrived through the memory portal? Reveal the gallery through it.
    try {
      if (sessionStorage.getItem(PORTAL_FLAG) === "true") {
        sessionStorage.removeItem(PORTAL_FLAG);
        revealGalleryThroughPortal();
      }
    } catch (e) {}

    // Grand finale — quiet… one petal… then dozens, glowing heart, words.
    const finale = document.getElementById("finale");
    if (finale && "IntersectionObserver" in window) {
      new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting || finale.classList.contains("revealed")) return;
          finale.classList.add("revealed");
          obs.unobserve(finale);
          [400, 1400, 2600].forEach(t => setTimeout(() => fallPetal(petals, false, true), t));
          setTimeout(() => spawnPetals(petals, 24, false), 3600);
        });
      }, { threshold: 0.45 }).observe(finale);
    } else if (finale) {
      finale.classList.add("revealed");
    }

    // Personalize gallery letter + finale
    applyPersonalization();
  }

  wireGalleryButton();
});
