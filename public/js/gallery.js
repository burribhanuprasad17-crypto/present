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

