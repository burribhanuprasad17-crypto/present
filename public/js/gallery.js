/* ══════════════════════════════════════════════════════════
   Memory Garden · v3
   Photos & captions live in CONFIG.photos (js/script.js).
   This file renders them as physical polaroid memories,
   the Memory Tree, and the cinematic lightbox.
   ══════════════════════════════════════════════════════════ */

(function initMemoryGarden() {
  const vine = document.getElementById("vine");
  const lightbox = document.getElementById("lightbox");
  if (!vine || !lightbox) return;

  const lbImage = document.getElementById("lb-image");
  const lbCounter = document.getElementById("lb-counter");
  const lbCaption = document.getElementById("lb-caption-text");
  const lbFrame = lightbox.querySelector(".lightbox-frame");
  const lbBackdrop = lightbox.querySelector(".lightbox-backdrop");

  const memories = CONFIG.photos;
  let current = 0;
  let lastFocus = null;

  /* ── Each card gets a different physical treatment ── */
  const VARIANTS = ["pin", "tape", "ribbon"];

  function makeCard(m, i, small = false) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card v3 reveal";
    const variant = VARIANTS[i % VARIANTS.length];
    card.classList.add(variant);
    // natural randomness — no two cards hang alike
    card.style.setProperty("--tilt", (Math.random() * 9 - 4.5).toFixed(1) + "deg");
    card.style.setProperty("--sway-dur", (4.5 + Math.random() * 3).toFixed(1) + "s");
    card.style.setProperty("--enter-delay", (i * 0.1).toFixed(2) + "s");
    card.style.setProperty("--tape-rot", (Math.random() * 10 - 5).toFixed(1) + "deg");

    card.innerHTML = `
      ${variant === "ribbon" ? '<span class="string" aria-hidden="true"></span>' : ""}
      ${variant === "pin" ? '<span class="pin" aria-hidden="true"></span>' : ""}
      <span class="photo-frame">
        <img src="${m.image}" alt="${m.caption}" loading="lazy" />
        <span class="caption">${m.caption}</span>
      </span>`;
    card.addEventListener("click", () => openLightbox(i));
    // delicate petals on hover
    card.addEventListener("pointerenter", () => hoverPetals(card));
    return card;
  }

  function hoverPetals(card) {
    if (REDUCED_MOTION) return;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const p = document.createElement("span");
        p.className = "hover-petal";
        p.style.left = rand(10, 90) + "%";
        p.style.bottom = rand(30, 80) + "%";
        card.appendChild(p);
        p.animate([
          { transform: "translateY(0) rotate(0deg)", opacity: .95 },
          { transform: `translate(${rand(-26,26)}px,-34px) rotate(${rand(180,420)}deg)`, opacity: 0 }
        ], { duration: rand(900, 1400), easing: "ease-out" }).onfinish = () => p.remove();
      }, i * 90);
    }
  }

  function renderCards() {
    memories.forEach((m, i) => vine.appendChild(makeCard(m, i)));
    const count = document.getElementById("memory-count");
    if (count) {
      count.innerHTML = `<b>${memories.length}</b> precious ${memories.length === 1 ? "memory" : "memories"} hanging in the garden&nbsp;♥`;
    }
  }

  /* ── Memory Trees — photos hang from branches of both trees ── */
  function renderMemoryTree() {
    const treeConfigs = [
      {
        holderId: "tree-photos",
        spots: [
          { left: "8%",   top: "46%" }, { left: "72%", top: "42%" },
          { left: "22%",  top: "62%" }, { left: "58%", top: "64%" },
          { left: "41%",  top: "38%" }
        ],
        slice: [0, 5]
      },
      {
        holderId: "tree-photos-2",
        spots: [
          { left: "12%",  top: "44%" }, { left: "68%", top: "40%" },
          { left: "30%",  top: "58%" }, { left: "55%", top: "62%" },
          { left: "44%",  top: "36%" }
        ],
        slice: [5, 10]
      }
    ];

    treeConfigs.forEach(cfg => {
      const holder = document.getElementById(cfg.holderId);
      if (!holder) return;
      const slice = memories.slice(cfg.slice[0], cfg.slice[1]);
      slice.forEach((m, i) => {
        const card = makeCard(m, memories.indexOf(m), true);
        card.classList.add("in");
        card.style.left = cfg.spots[i].left;
        card.style.top = cfg.spots[i].top;
        holder.appendChild(card);
      });
    });
  }


  /* ── Lightbox ── */
  function updateLightbox() {
    const m = memories[current];
    lbImage.src = m.image;
    lbImage.alt = m.caption;
    lbCounter.textContent = `Memory ${current + 1} of ${memories.length}`;
    lbCaption.textContent = m.caption;
  }
  function openLightbox(index) {
    current = index;
    lastFocus = document.activeElement;
    updateLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lb-close").focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function step(dir) {
    if (!lbFrame) return;
    lbFrame.classList.add("switching");
    setTimeout(() => {
      current = (current + dir + memories.length) % memories.length;
      updateLightbox();
      lbFrame.classList.remove("switching");
    }, 300);
  }

  
  renderCards();
  renderMemoryTree();

  // LIGHTBOX EVENT HANDLING - delegate from the lightbox container
  function handleLightboxClick(e) {
    const closeBtn = e.target.closest(".lb-close");
    const prevBtn = e.target.closest(".lb-prev");
    const nextBtn = e.target.closest(".lb-next");
    // backdrop click closes (only when clicking the backdrop itself, not its children)
    if (e.target === lbBackdrop || e.target.closest("[data-lb-close]")) {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    } else if (prevBtn || e.target.closest("[data-lb-prev]")) {
      e.preventDefault();
      e.stopPropagation();
      step(-1);
    } else if (nextBtn || e.target.closest("[data-lb-next]")) {
      e.preventDefault();
      e.stopPropagation();
      step(1);
    }
  }
  lightbox.addEventListener("click", handleLightboxClick);
  
  // Backwards-compatibility: also keep the original targeted listeners
  lightbox.querySelectorAll("[data-lb-close]").forEach(el => el.addEventListener("click", closeLightbox));
  lightbox.querySelector("[data-lb-prev]").addEventListener("click", () => step(-1));
  lightbox.querySelector("[data-lb-next]").addEventListener("click", () => step(1));
  
  // Enhanced keyboard controls
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  });
  
  // Enhanced touch/swipe support
  let touchStartX = null;
  let touchEndX = null;
  
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchEndX = null;
  }, { passive: true });
  
  lightbox.addEventListener("touchmove", (e) => {
    if (touchStartX !== null) {
      touchEndX = e.touches[0].clientX;
    }
  }, { passive: true });
  
  lightbox.addEventListener("touchend", (e) => {
    if (touchStartX === null || touchEndX === null) { touchStartX = null; touchEndX = null; return; }
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      step(deltaX > 0 ? -1 : 1);
    }
    touchStartX = null;
    touchEndX = null;
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════════
   BIRTHDAY CAKE EXPERIENCE
   Cinematic build, candle ignition, and blow-out interaction.
   ══════════════════════════════════════════════════════════ */
(function BirthdayCakeExperience() {
  const section = document.getElementById('birthday-cake');
  const stage = document.getElementById('bc-stage');
  if (!section || !stage) return;

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => Math.random() * (b - a) + a;
  const CANDLE_COUNT = 6;
  let played = false;

  /* ── Elements ── */
  const els = {
    wait: document.getElementById('bc-wait'),
    oneMore: document.getElementById('bc-one-more'),
    ambient: document.getElementById('bc-ambient'),
    cakeWrap: document.getElementById('bc-cake-wrap'),
    cake: document.getElementById('bc-cake'),
    tier1: document.getElementById('bc-tier-1'),
    tier2: document.getElementById('bc-tier-2'),
    tier3: document.getElementById('bc-tier-3'),
    candles: document.getElementById('bc-candles'),
    plate: document.querySelector('.bc-plate'),
    plateShadow: document.querySelector('.bc-plate-shadow'),
    creamRings: document.querySelectorAll('.bc-cream-ring'),
    decoRows: document.querySelectorAll('.bc-deco-row'),
    madeFor: document.getElementById('bc-made-for'),
    makeWish: document.getElementById('bc-make-wish'),
    blowBtn: document.getElementById('bc-blow-btn'),
    wishText: document.getElementById('bc-wish-text'),
    floaters: document.getElementById('bc-floaters'),
  };

  const candles = section.querySelectorAll('.bc-candle');

  /* ── Helpers ── */
  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  function spawnFloater(emoji) {
    const f = document.createElement('span');
    f.className = 'bc-floater';
    f.textContent = emoji;
    f.style.left = rand(10, 90) + '%';
    f.style.top = rand(10, 80) + '%';
    f.style.setProperty('--tx', rand(-30, 30) + 'px');
    f.style.setProperty('--ty', rand(-40, -15) + 'px');
    f.style.setProperty('--dur', rand(2.5, 4.5) + 's');
    f.style.setProperty('--del', rand(0, 2) + 's');
    els.floaters.appendChild(f);
    requestAnimationFrame(() => f.classList.add('show'));
  }

  function spawnPetals(count) {
    const container = document.getElementById('petals-layer');
    if (!container || RM) return;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const p = document.createElement('span');
        p.className = 'petal';
        const size = rand(8, 16);
        const shapes = ['70% 0 70% 0', '60% 0 60% 0'];
        p.style.cssText = `left:${rand(0,100)}%;top:-24px;width:${size}px;height:${size}px;
          border-radius:${shapes[Math.floor(rand(0,2))]};
          background:radial-gradient(circle at 30% 30%, #FCE7ED, #E88BA8 78%);
          opacity:${rand(.5,.9)};`;
        container.appendChild(p);
        p.animate([
          { transform: 'translate(0,-24px) rotate(0deg)', opacity: 0 },
          { opacity: .8, offset: .08 },
          { transform: `translate(${rand(-120,120)}px, ${window.innerHeight + 40}px) rotate(${rand(360,800)}deg)`, opacity: .05 }
        ], { duration: rand(7000, 14000), easing: 'cubic-bezier(.45,.05,.55,.95)' }
        ).onfinish = () => p.remove();
      }, i * 600);
    }
  }

  function spawnHearts(count) {
    if (RM) return;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.className = 'cursor-heart';
        h.textContent = Math.random() > .5 ? '♥' : '❀';
        h.style.left = rand(20, 80) + '%';
        h.style.top = '60%';
        h.style.fontSize = rand(12, 20) + 'px';
        document.body.appendChild(h);
        h.animate([
          { transform: 'translate(-50%,-50%) scale(.5)', opacity: 1 },
          { transform: `translate(calc(-50% + ${rand(-60,60)}px), calc(-50% - ${rand(80,180)}px)) scale(1) rotate(${rand(-30,30)}deg)`, opacity: 0 }
        ], { duration: rand(1400, 2200), easing: 'ease-out' }).onfinish = () => h.remove();
      }, i * 200);
    }
  }

  /* ── Phase 1: Intro text ── */
  async function phaseIntro() {
    if (RM) { els.wait.style.opacity = 1; els.wait.style.transform = 'none'; els.oneMore.style.opacity = 1; els.oneMore.style.transform = 'none'; return; }
    els.wait.classList.add('show');
    await wait(1800);
    els.wait.classList.add('hide');
    await wait(600);
    els.oneMore.classList.add('show');
    await wait(1600);
    els.oneMore.classList.add('hide');
    await wait(600);
  }

  /* ── Phase 2: Cake wrapper appears, plate builds ── */
  async function phaseCakeAppear() {
    els.cakeWrap.classList.add('show');
    await wait(RM ? 100 : 800);
    els.plate.classList.add('build');
    els.plateShadow.classList.add('build');
    await wait(RM ? 100 : 500);
  }

  /* ── Phase 3: Build tiers bottom to top ── */
  async function phaseTiers() {
    // Tier 1
    els.tier1.classList.add('build');
    await wait(RM ? 100 : 700);
    // Cream ring 1
    els.creamRings[0]?.classList.add('build');
    await wait(RM ? 100 : 400);
    // Tier 2
    els.tier2.classList.add('build');
    await wait(RM ? 100 : 600);
    // Cream ring 2
    els.creamRings[1]?.classList.add('build');
    await wait(RM ? 100 : 400);
    // Tier 3
    els.tier3.classList.add('build');
    await wait(RM ? 100 : 500);
  }

  /* ── Phase 4: Decorations appear ── */
  async function phaseDecorations() {
    // Add each deco row one by one
    for (const row of els.decoRows) {
      row.classList.add('build');
      await wait(RM ? 100 : 350);
    }
    await wait(RM ? 100 : 300);
  }

  /* ── Phase 5: Place candles one by one ── */
  async function phaseCandles() {
    for (let i = 0; i < candles.length; i++) {
      candles[i].classList.add('place');
      await wait(RM ? 100 : 300);
    }
    await wait(RM ? 100 : 400);
  }

  /* ── Phase 6: Light candles one by one ── */
  async function phaseIgnite() {
    for (let i = 0; i < candles.length; i++) {
      candles[i].classList.add('lit');
      await wait(RM ? 100 : 280);
    }
    // Show ambient glow after all lit
    els.ambient.classList.add('show');
    await wait(RM ? 100 : 600);
  }

  /* ── Phase 7: Reveal text + button ── */
  async function phaseReveal() {
    els.madeFor.classList.add('show');
    // Spawn floating decorations
    const emojis = ['🌸', '♥', '✨', '🌷', '💕', '✦', '🌺'];
    for (let i = 0; i < 8; i++) {
      spawnFloater(emojis[i % emojis.length]);
    }
    spawnPetals(4);
    await wait(RM ? 100 : 1400);
    els.makeWish.classList.add('show');
    await wait(RM ? 100 : 1200);
    els.blowBtn.hidden = false;
    requestAnimationFrame(() => els.blowBtn.classList.add('show'));
  }

  /* ── Full build sequence ── */
  async function buildCake() {
    await phaseIntro();
    await phaseCakeAppear();
    await phaseTiers();
    await phaseDecorations();
    await phaseCandles();
    await phaseIgnite();
    await phaseReveal();
  }

  /* ── Blow-out sequence ── */
  let blowing = false;

  async function blowCandles() {
    if (blowing) return;
    blowing = true;
    els.blowBtn.disabled = true;

    // Phase 1: Button text changes
    els.blowBtn.textContent = 'Make a wish... ♥';
    await wait(1200);

    // Phase 2: Breeze effect — flames lean
    els.candles.classList.add('breeze');
    await wait(600);

    // Phase 3: Blow out candles one by one
    for (let i = 0; i < candles.length; i++) {
      candles[i].classList.remove('lit');
      candles[i].classList.add('blown-out');
      await wait(RM ? 100 : 220);
      // Show smoke
      candles[i].classList.add('smoking');
    }

    // Phase 4: Hide ambient glow
    els.ambient.classList.remove('show');

    await wait(RM ? 100 : 1200);

    // Phase 5: Wish messages
    els.wishText.textContent = 'Wish made? ✨';
    els.wishText.classList.add('show');
    spawnHearts(8);
    spawnPetals(6);

    await wait(RM ? 100 : 2200);

    els.wishText.classList.remove('show');
    await wait(500);

    els.wishText.textContent = 'Good. ♥';
    els.wishText.classList.add('show');
    spawnHearts(12);
    spawnPetals(10);

    await wait(RM ? 100 : 2200);

    // Clean up smoke
    candles.forEach(c => c.classList.remove('smoking', 'blown-out'));

    // Smooth scroll to the existing finale
    const finale = document.getElementById('finale');
    if (finale) {
      finale.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
    }
  }

  /* ── Event binding ── */
  els.blowBtn.addEventListener('click', blowCandles);

  /* ── Intersection Observer — play once when visible ── */
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !played) {
      played = true;
      observer.disconnect();
      buildCake();
    }
  }, { threshold: 0.25 });
  observer.observe(section);
})();

