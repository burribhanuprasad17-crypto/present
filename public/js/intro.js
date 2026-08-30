/* ============================================================
   BIRTHDAY INTRO — INTERACTIVE LOGIC
   ============================================================ */

(function (root) {
  "use strict";

  if (root.__birthdayIntroInitialized) return;

  root.__birthdayIntroInitialized = true;

  // If intro already completed, redirect to home immediately
  try {
    if (sessionStorage.getItem("birthdayIntroDone") === "true" ||
        sessionStorage.getItem("birthdayExperienceUnlocked") === "true") {
      window.location.href = "home.html";
      return;
    }
  } catch (e) {}

  const host =
    document.getElementById("birthday-intro");

  if (!host) {
    console.warn(
      "BirthdayIntro: #birthday-intro not found."
    );
    return;
  }

  /* ==========================================================
     HELPERS
     ========================================================== */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const create = (
    tag,
    className = "",
    html = ""
  ) => {
    const element =
      document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (html) {
      element.innerHTML = html;
    }

    return element;
  };

  const random = (min, max) =>
    Math.random() * (max - min) + min;

  /* ==========================================================
     STATE
     ========================================================== */

  let activeScene = null;

  let cleanupFunctions = [];

  let transitionLocked = false;

  const flowers = [
    "🌸",
    "🌼",
    "🌷"
  ];

  /* ==========================================================
     BACKGROUND
     ========================================================== */

  const ambient =
    create("div", "bi-ambient");

  host.appendChild(ambient);

  function createBackground() {
    const orbA =
      create("div", "bi-orb a");

    const orbB =
      create("div", "bi-orb b");

    const orbC =
      create("div", "bi-orb c");

    ambient.appendChild(orbA);
    ambient.appendChild(orbB);
    ambient.appendChild(orbC);

    for (let i = 0; i < 35; i++) {
      const type = Math.random();

      if (type < 0.5) {
        const petal =
          create("span", "bi-petal");

        petal.textContent =
          flowers[
            Math.floor(
              Math.random() * flowers.length
            )
          ];

        petal.style.left =
          `${random(0, 100)}vw`;

        petal.style.animationDuration =
          `${random(7, 14)}s`;

        petal.style.animationDelay =
          `${-random(0, 14)}s`;

        petal.style.setProperty(
          "--drift",
          random(-100, 100)
        );

        ambient.appendChild(petal);

      } else if (type < 0.72) {
        const firefly =
          create("span", "bi-firefly");

        firefly.style.left =
          `${random(0, 100)}vw`;

        firefly.style.top =
          `${random(10, 95)}vh`;

        firefly.style.animationDuration =
          `${random(5, 9)}s`;

        firefly.style.animationDelay =
          `${-random(0, 8)}s`;

        ambient.appendChild(firefly);

      } else if (type < 0.9) {
        const spark =
          create("span", "bi-spark");

        spark.style.left =
          `${random(0, 100)}vw`;

        spark.style.top =
          `${random(0, 100)}vh`;

        spark.style.animationDuration =
          `${random(2, 4)}s`;

        spark.style.animationDelay =
          `${-random(0, 4)}s`;

        ambient.appendChild(spark);

      } else {
        const heart =
          create(
            "span",
            "bi-tiny-heart"
          );

        heart.style.left =
          `${random(0, 100)}vw`;

        heart.style.top =
          `${random(30, 95)}vh`;

        heart.style.animationDuration =
          `${random(6, 11)}s`;

        ambient.appendChild(heart);
      }
    }
  }

  createBackground();

  /* ==========================================================
     STAGE
     ========================================================== */

  const stage =
    create("div", "bi-stage");

  host.appendChild(stage);

  /* ==========================================================
     CLEANUP
     ========================================================== */

  function addCleanup(fn) {
    cleanupFunctions.push(fn);
  }

  function cleanupScene() {
    cleanupFunctions.forEach(fn => {
      try {
        fn();
      } catch (error) {
        console.warn(
          "BirthdayIntro cleanup error:",
          error
        );
      }
    });

    cleanupFunctions = [];
  }

  /* ==========================================================
     SCENE MANAGEMENT
     ========================================================== */

  function setScene(nextScene) {
    cleanupScene();

    if (activeScene) {
      const oldScene =
        activeScene;

      oldScene.classList.add(
        "leaving"
      );

      setTimeout(() => {
        oldScene.remove();
      }, 350);
    }

    activeScene =
      nextScene;

    stage.appendChild(
      nextScene
    );

    requestAnimationFrame(() => {
      nextScene.classList.add(
        "active"
      );
    });
  }

  /* ==========================================================
     BURST
     ========================================================== */

  function createBurst(
    parent,
    x,
    y,
    count = 15
  ) {
    const symbols = [
      "♥",
      "💗",
      "🌸",
      "✦",
      "✨"
    ];

    for (let i = 0; i < count; i++) {
      const burst =
        create(
          "span",
          "bi-burst",
          symbols[
            Math.floor(
              Math.random() *
              symbols.length
            )
          ]
        );

      burst.style.left =
        `${x}px`;

      burst.style.top =
        `${y}px`;

      const angle =
        random(0, Math.PI * 2);

      const distance =
        random(40, 140);

      burst.style.setProperty(
        "--bx",
        `${Math.cos(angle) * distance}px`
      );

      burst.style.setProperty(
        "--by",
        `${Math.sin(angle) * distance - 30}px`
      );

      burst.style.fontSize =
        `${random(14, 30)}px`;

      parent.appendChild(
        burst
      );

      setTimeout(() => {
        burst.remove();
      }, 1100);
    }
  }

  /* ==========================================================
     SCENE 1
     ========================================================== */

  function startOpening() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <p class="bi-eyebrow">
        Hey... you! 👀
      </p>

      <h1 class="bi-title">
        Yes, <em style="font-style:normal">YOU.</em>
      </h1>

      <p class="bi-line">
        Before you enter...
      </p>

      <p class="bi-line small">
        I have a few tiny things for you to do first. ♥
      </p>

      <button
        class="bi-btn"
        type="button"
        data-action="catch"
      >
        Okay... what? 👀
      </button>
    `;

    setScene(card);
  }

  /* ==========================================================
     SCENE 2 — CATCH HEART
     ========================================================== */

  function startCatchHeart() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <p class="bi-eyebrow">
        Mission 1 💕
      </p>

      <h1
        class="bi-title"
        style="font-size:clamp(28px,6vw,46px)"
      >
        Catch the heart. ♥
      </h1>

      <div
        class="bi-arena"
        data-arena
      >
        <div
          class="bi-catch-heart"
          data-catch-heart
          role="button"
          tabindex="0"
          aria-label="Catch the heart"
        >
          ♥
        </div>
      </div>

      <p class="bi-hold-hint">
        Don't let it escape 😂
      </p>
    `;

    setScene(card);

    const arena =
      $("[data-arena]", card);

    const heart =
      $("[data-catch-heart]", card);

    let caught = false;

    function moveHeart() {
      if (!arena || !heart) return;

      const width =
        arena.clientWidth;

      const height =
        arena.clientHeight;

      const x =
        random(30, width - 30);

      const y =
        random(30, height - 30);

      heart.style.left =
        `${x}px`;

      heart.style.top =
        `${y}px`;
    }

    setTimeout(
      moveHeart,
      150
    );

    function catchHeart(event) {
      event.preventDefault();

      if (caught) return;

      caught = true;

      const rect =
        heart.getBoundingClientRect();

      const arenaRect =
        arena.getBoundingClientRect();

      heart.style.opacity = "0";
      heart.style.pointerEvents =
        "none";

      createBurst(
        arena,
        rect.left -
          arenaRect.left,
        rect.top -
          arenaRect.top,
        22
      );

      setTimeout(() => {
        showCatchSuccess();
      }, 800);
    }

    function showCatchSuccess() {
      const next =
        create(
          "div",
          "bi-scene-card"
        );

      next.innerHTML = `
        <p class="bi-eyebrow">
          Got you! 😌❤️
        </p>

        <h1
          class="bi-title"
          style="font-size:clamp(24px,5vw,38px)"
        >
          Okay... you're good at this.
        </h1>

        <p class="bi-line small">
          One more little thing.
        </p>

        <button
          class="bi-btn"
          type="button"
          data-action="bloom"
        >
          Bloom a flower 🌸
        </button>
      `;

      setScene(next);
    }

    heart.addEventListener(
      "click",
      catchHeart
    );

    heart.addEventListener(
      "touchend",
      catchHeart,
      { passive: false }
    );

    heart.addEventListener(
      "keydown",
      event => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          catchHeart(event);
        }
      }
    );

    arena.addEventListener(
      "mousemove",
      event => {
        if (caught) return;

        const rect =
          arena.getBoundingClientRect();

        const dx =
          event.clientX -
          (rect.left + rect.width / 2);

        const dy =
          event.clientY -
          (rect.top + rect.height / 2);

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

        if (distance < 150) {
          moveHeart();
        }
      }
    );
  }

  /* ==========================================================
     SCENE 3 — FLOWER
     ========================================================== */

  function startBloomFlower() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <p class="bi-eyebrow">
        Mission 2 🌸
      </p>

      <h1
        class="bi-title"
        style="font-size:clamp(28px,6vw,46px)"
      >
        Make this flower bloom.
      </h1>

      <div
        class="bi-flower-wrap"
        data-flower-wrap
        tabindex="0"
        role="button"
        aria-label="Bloom the flower"
      >
        <div
          class="bi-flower"
          data-flower
          data-step="0"
        >
          <span class="petal"></span>
          <span class="petal"></span>
          <span class="petal"></span>
          <span class="petal"></span>
          <span class="petal"></span>
          <span class="center"></span>
        </div>
      </div>

      <div class="bi-progress">
        <i data-progress></i>
      </div>

      <p class="bi-hold-hint">
        Tap quickly — if you stop, it wilts back! 🌸
      </p>
    `;

    setScene(card);

    const wrapper =
      $(
        "[data-flower-wrap]",
        card
      );

    const flower =
      $("[data-flower]", card);

    const progress =
      $("[data-progress]", card);

    const TOTAL_BLOOM = 16;
    const DECAY_MS = 650;
    let step = 0;
    let completed = false;
    let decayTimer = null;

    function resetDecay() {
      clearTimeout(decayTimer);
      decayTimer = setTimeout(() => {
        if (completed) return;
        step = Math.max(0, step - 2);
        flower.dataset.step = step;
        progress.style.width = `${(step / TOTAL_BLOOM) * 100}%`;
        if (step > 0) {
          $("[data-flower-wrap]", card).style.transform =
            `scale(${0.95 + (step / TOTAL_BLOOM) * 0.1})`;
        }
      }, DECAY_MS);
    }

    function bloom() {
      if (completed) return;

      step = Math.min(step + 1, TOTAL_BLOOM);
      flower.dataset.step = step;
      progress.style.width = `${(step / TOTAL_BLOOM) * 100}%`;

      const scale = 0.95 + (step / TOTAL_BLOOM) * 0.1;
      wrapper.style.transform = `scale(${scale})`;

      resetDecay();

      if (step !== TOTAL_BLOOM) return;

      completed = true;
      clearTimeout(decayTimer);

      flower.classList.add("bloomed");

      createBurst(
        wrapper,
        wrapper.clientWidth / 2,
        wrapper.clientHeight / 2,
        25
      );

      setTimeout(() => {
        const next =
          create(
            "div",
            "bi-scene-card"
          );

        next.innerHTML = `
          <p class="bi-eyebrow">
            Aww... 🌸
          </p>

          <h1
            class="bi-title"
            style="font-size:clamp(24px,5vw,38px)"
          >
            Look what a little love can do.
          </h1>

          <p class="bi-line small">
            One more...
          </p>

          <button
            class="bi-btn"
            type="button"
            data-action="memory"
          >
            Continue 💕
          </button>
        `;

        setScene(next);
      }, 1100);
    }

    wrapper.addEventListener(
      "click",
      bloom
    );

    wrapper.addEventListener(
      "keydown",
      event => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          bloom();
        }
      }
    );
  }

  /* ==========================================================
     SCENE 3a — STAR CATCHER
     ========================================================== */

  function startMemoryMatch() {
    const card = create("div", "bi-scene-card");

    const EMOJIS = ["💖", "🌸", "💘", "🌙", "🦋", "✨"];
    const PAIRS = 6;
    let deck = [];
    EMOJIS.forEach(e => { deck.push(e, e); });
    /* Shuffle */
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(random(0, i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    card.innerHTML = `
      <p class="bi-eyebrow">Mission 3 🧩</p>

      <h1 class="bi-title" style="font-size:clamp(24px,5vw,38px)">
        Match the pairs! 🧩
      </h1>

      <p class="bi-hold-hint" data-match-hint>
        Find all 6 matching pairs to proceed.
      </p>

      <div class="bi-match-grid" data-match-grid>
        ${deck.map((e, i) => `<div class="bi-match-card" data-match-card data-idx="${i}" data-emoji="${e}"><span class="bi-match-face">♥</span><span class="bi-match-back">${e}</span></div>`).join("")}
      </div>

      <p class="bi-match-score" data-match-score>0 / ${PAIRS} pairs</p>
    `;

    setScene(card);

    const grid = $("[data-match-grid]", card);
    const hintEl = $("[data-match-hint]", card);
    const scoreEl = $("[data-match-score]", card);
    const cards = $$("[data-match-card]", card);
    let flipped = [];
    let locked = false;
    let matched = 0;

    cards.forEach(c => {
      c.addEventListener("click", () => {
        if (locked || c.classList.contains("flipped") || c.classList.contains("matched")) return;
        c.classList.add("flipped");
        flipped.push(c);

        if (flipped.length === 2) {
          locked = true;
          const [a, b] = flipped;
          if (a.dataset.emoji === b.dataset.emoji) {
            /* Match found */
            a.classList.add("matched");
            b.classList.add("matched");
            matched++;
            scoreEl.textContent = matched + " / " + PAIRS + " pairs";
            flipped = [];
            locked = false;
            if (matched >= PAIRS) {
              hintEl.textContent = "ALL MATCHED! 🎉";
              hintEl.style.color = "#ff6ba6";
              setTimeout(() => {
                const next = create("div", "bi-scene-card");
                next.innerHTML = `
                  <p class="bi-eyebrow">Incredible memory! 🧩✨</p>
                  <h1 class="bi-title" style="font-size:clamp(24px,5vw,38px)">
                    You remembered every single one.
                  </h1>
                  <p class="bi-line small">One more challenge ahead...</p>
                  <button class="bi-btn" type="button" data-action="balloon">
                    Inflate the heart 🎈
                  </button>
                `;
                setScene(next);
              }, 1000);
            }
          } else {
            /* No match — flip back */
            setTimeout(() => {
              a.classList.remove("flipped");
              b.classList.remove("flipped");
              flipped = [];
              locked = false;
            }, 800);
          }
        }
      });
    });
  }

  /* ==========================================================
     SCENE 3b — BALLOON INFLATION
     ========================================================== */

  function startBalloon() {
    const card = create("div", "bi-scene-card");

    card.innerHTML = `
      <p class="bi-eyebrow">Mission 4 🎈</p>

      <h1 class="bi-title" style="font-size:clamp(26px,5vw,42px)">
        Inflate the heart balloon.
      </h1>

      <div class="bi-balloon-wrap">
        <div class="bi-balloon-heart" data-balloon-heart>♥</div>
        <div class="bi-balloon-ribbon"></div>
      </div>

      <div class="bi-progress">
        <i data-balloon-progress></i>
      </div>

      <p class="bi-hold-hint" data-balloon-hint>
        Hold to inflate — release when it's just right! 🎈
      </p>
    `;

    setScene(card);

    const balloonEl = $("[data-balloon-heart]", card);
    const progressBar = $("[data-balloon-progress]", card);
    const hintEl = $("[data-balloon-hint]", card);
    const TARGET = 88;
    const TOLERANCE = 12;
    let inflated = 0;
    let inflating = false;
    let finished = false;
    let decayInterval = null;
    let attempts = 0;
    const maxAttempts = 5;

    function updateSize() {
      const pct = inflated / TARGET;
      const scale = 0.3 + pct * 0.7;
      balloonEl.style.transform = `scale(${scale})`;
      balloonEl.style.opacity = 0.4 + pct * 0.6;
      progressBar.style.width = Math.min(100, (inflated / (TARGET + TOLERANCE)) * 100) + "%";
    }

    function startInflate() {
      if (finished) return;
      inflating = true;
      clearInterval(decayInterval);
      decayInterval = setInterval(() => {
        inflated = Math.min(inflated + 1.8, TARGET + TOLERANCE + 15);
        updateSize();
      }, 35);
    }

    function stopInflate() {
      if (finished || !inflating) return;
      inflating = false;
      clearInterval(decayInterval);
      attempts++;

      const diff = Math.abs(inflated - TARGET);
      if (diff <= TOLERANCE) {
        finished = true;
        balloonEl.classList.add("bi-balloon-win");
        progressBar.style.width = "100%";
        hintEl.textContent = "Perfect! 🎈✨";
        createBurst(balloonEl, balloonEl.clientWidth / 2, balloonEl.clientHeight / 2, 28);
        setTimeout(() => {
          const next = create("div", "bi-scene-card");
          next.innerHTML = `
            <p class="bi-eyebrow">Wow! 🎈✨</p>
            <h1 class="bi-title" style="font-size:clamp(24px,5vw,38px)">
              You know exactly how much love to give.
            </h1>
            <p class="bi-line small">Almost there...</p>
            <button class="bi-btn" type="button" data-action="hearts">
              One last thing 💕
            </button>
          `;
          setScene(next);
        }, 1200);
      } else if (attempts >= maxAttempts) {
        finished = true;
        hintEl.textContent = "That's close enough — you tried your best! 💕";
        setTimeout(() => {
          const next = create("div", "bi-scene-card");
          next.innerHTML = `
            <p class="bi-eyebrow">Almost! 🎈</p>
            <h1 class="bi-title" style="font-size:clamp(24px,5vw,38px)">
              You know exactly how much love to give.
            </h1>
            <p class="bi-line small">Almost there...</p>
            <button class="bi-btn" type="button" data-action="hearts">
              One last thing 💕
            </button>
          `;
          setScene(next);
        }, 1200);
      } else {
        if (inflated > TARGET + TOLERANCE) {
          hintEl.textContent = "Too much! It almost popped! 😱";
          balloonEl.animate([
            { transform: `scale(${inflated / TARGET})`, opacity: 1 },
            { transform: "scale(0.15)", opacity: 0 }
          ], { duration: 500, easing: "ease-out" });
        } else {
          hintEl.textContent = "Not enough! Hold it longer! 💪";
          balloonEl.animate([
            { transform: `scale(${inflated / TARGET})` },
            { transform: "scale(0.3)" }
          ], { duration: 400, easing: "ease-in" });
        }
        inflated = 0;
        updateSize();
        progressBar.style.width = "0%";
      }
    }

    balloonEl.addEventListener("mousedown", startInflate);
    balloonEl.addEventListener("mouseup", stopInflate);
    balloonEl.addEventListener("mouseleave", stopInflate);
    balloonEl.addEventListener("touchstart", (e) => { e.preventDefault(); startInflate(); }, { passive: false });
    balloonEl.addEventListener("touchend", stopInflate);

    $("[data-balloon-wrap]", card).addEventListener("mousedown", startInflate);
    $("[data-balloon-wrap]", card).addEventListener("mouseup", stopInflate);
    $("[data-balloon-wrap]", card).addEventListener("mouseleave", stopInflate);
    $("[data-balloon-wrap]", card).addEventListener("touchstart", (e) => { e.preventDefault(); startInflate(); }, { passive: false });
    $("[data-balloon-wrap]", card).addEventListener("touchend", stopInflate);
  }

  /* ==========================================================
     SCENE 4 — SIMON HEARTS (pattern memory)
     ========================================================== */

  function startFollowHearts() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <p class="bi-eyebrow">
        Mission 5 😈
      </p>

      <h1
        class="bi-title"
        style="font-size:clamp(26px,5vw,40px)"
      >
        Remember the pattern. ♥
      </h1>

      <p class="bi-line small" data-simon-instruct>
        Watch which hearts light up, then repeat the sequence.
      </p>

      <div
        class="bi-simon-grid"
        data-simon-grid
        style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:min(320px,80vw);margin:18px auto 0;"
      >
        <button class="bi-simon-tile" data-tile="0" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
        <button class="bi-simon-tile" data-tile="1" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
        <button class="bi-simon-tile" data-tile="2" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
        <button class="bi-simon-tile" data-tile="3" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
        <button class="bi-simon-tile" data-tile="4" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
        <button class="bi-simon-tile" data-tile="5" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
        <button class="bi-simon-tile" data-tile="6" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
        <button class="bi-simon-tile" data-tile="7" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
        <button class="bi-simon-tile" data-tile="8" type="button" style="width:100%;aspect-ratio:1;border-radius:18px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:white;font-size:clamp(32px,8vw,44px);cursor:pointer;transition:transform .15s,background .15s,box-shadow .15s;user-select:none;">♥</button>
      </div>

      <p
        class="bi-hold-hint"
        data-simon-hint
      >
        Watch the pattern... 👀
      </p>
    `;

    setScene(card);

    const tiles =
      $$(
        "[data-tile]",
        card
      );

    const hint =
      $(
        "[data-simon-hint]",
        card
      );

    const instruct =
      $(
        "[data-simon-instruct]",
        card
      );

    const ROUNDS = [3, 4, 5];
    let currentRound = 0;
    let sequence = [];
    let playerIndex = 0;
    let inputLocked = true;

    function flashTile(index, duration) {
      return new Promise(resolve => {
        const tile = tiles[index];
        if (!tile) { resolve(); return; }
        tile.style.background = "linear-gradient(135deg,#ff4e95,#ff78b1)";
        tile.style.boxShadow = "0 0 28px rgba(255,78,149,.7)";
        tile.style.transform = "scale(1.12)";
        setTimeout(() => {
          tile.style.background = "rgba(255,255,255,.07)";
          tile.style.boxShadow = "none";
          tile.style.transform = "scale(1)";
          resolve();
        }, duration);
      });
    }

    async function showSequence() {
      inputLocked = true;
      hint.textContent = "Watch carefully... 👀";
      instruct.textContent = `Round ${currentRound + 1} of ${ROUNDS.length} \u2014 watch the pattern!`;

      await new Promise(r => setTimeout(r, 800));

      const baseDelay = Math.max(350, 550 - currentRound * 60);
      const flashDur = Math.max(250, 400 - currentRound * 40);

      for (const idx of sequence) {
        await flashTile(idx, flashDur);
        await new Promise(r => setTimeout(r, baseDelay - flashDur));
      }

      inputLocked = false;
      playerIndex = 0;
      hint.textContent = "Your turn! ♥";
      instruct.textContent = "Tap the hearts in the same order.";
    }

    function generateSequence() {
      const len = ROUNDS[currentRound];
      sequence = [];
      for (let i = 0; i < len; i++) {
        sequence.push(Math.floor(Math.random() * 9));
      }
    }

    function nextRound() {
      currentRound++;
      if (currentRound >= ROUNDS.length) {
        hint.textContent = "PERFECT! ♥";
        createBurst(
          $("[data-simon-grid]", card),
          $("[data-simon-grid]", card).clientWidth / 2,
          $("[data-simon-grid]", card).clientHeight / 2,
          30
        );
        setTimeout(() => {
          const next =
            create(
              "div",
              "bi-scene-card"
            );
          next.innerHTML = `
            <p class="bi-eyebrow">
              YES! ♥
            </p>

            <h1
              class="bi-title"
              style="font-size:clamp(24px,5vw,38px)"
            >
              Incredible memory!
            </h1>

            <p class="bi-line small">
              Last little thing...
            </p>

            <button
              class="bi-btn"
              type="button"
              data-action="petals"
            >
              Reveal what's underneath 🌸
            </button>
          `;
          setScene(next);
        }, 1100);
        return;
      }
      generateSequence();
      showSequence();
    }

    generateSequence();
    showSequence();

    $("[data-simon-grid]", card).addEventListener(
      "click",
      event => {
        if (inputLocked) return;
        const tile = event.target.closest("[data-tile]");
        if (!tile) return;

        const selected = Number(tile.dataset.tile);

        if (selected === sequence[playerIndex]) {
          flashTile(selected, 200);
          playerIndex++;

          if (playerIndex === sequence.length) {
            inputLocked = true;
            hint.textContent = "Correct! ♥";
            instruct.textContent = currentRound < ROUNDS.length - 1
              ? "Get ready for the next round..."
              : "One final round!";
            setTimeout(nextRound, 900);
          }
        } else {
          inputLocked = true;
          hint.textContent = "Oops! Watch again 😂";
          tiles.forEach(t => {
            t.style.animation = "bi-shake 0.4s ease";
            setTimeout(() => { t.style.animation = ""; }, 450);
          });
          setTimeout(() => {
            generateSequence();
            showSequence();
          }, 1200);
        }
      }
    );
  }

  /* ==========================================================
     SCENE 5 — CLEAR PETALS
     ========================================================== */

  function startClearPetals() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <p class="bi-eyebrow">
        Mission 6 🌸
      </p>

      <h1
        class="bi-title"
        style="font-size:clamp(26px,5vw,40px)"
      >
        Clear the petals 🌸
      </h1>

      <p class="bi-line small">
        Drag, tap, or sweep them away...
        to see what's underneath.
      </p>

      <div
        class="bi-petal-field"
        data-petal-field
      >
        <div
          class="bi-revealed-heart"
          data-revealed-heart
        >
          ♥
        </div>
      </div>

      <p
        class="bi-hold-hint"
        data-clear-count
      >
        0 cleared
      </p>
    `;

    setScene(card);

    const field =
      $(
        "[data-petal-field]",
        card
      );

    const revealed =
      $(
        "[data-revealed-heart]",
        card
      );

    const counter =
      $(
        "[data-clear-count]",
        card
      );

    const TOTAL =
      28;

    let cleared = 0;
    let finished = false;

    for (
      let i = 0;
      i < TOTAL;
      i++
    ) {
      const petal =
        create(
          "span",
          "bi-clear-petal",
          flowers[
            i %
            flowers.length
          ]
        );

      petal.style.left =
        `${random(
          15,
          field.clientWidth - 30
        )}px`;

      petal.style.top =
        `${random(
          10,
          field.clientHeight - 35
        )}px`;

      petal.style.fontSize =
        `${random(18, 32)}px`;

      petal.style.transform =
        `rotate(${random(
          0,
          360
        )}deg)`;

      field.appendChild(
        petal
      );
    }

    function clearPetal(petal) {
      if (
        !petal ||
        petal.classList.contains(
          "gone"
        )
      ) {
        return;
      }

      petal.classList.add(
        "gone"
      );

      petal.style.setProperty(
        "--cx",
        `${random(-100, 100)}px`
      );

      petal.style.setProperty(
        "--cy",
        `${random(-180, -50)}px`
      );

      petal.style.setProperty(
        "--cr",
        `${random(-250, 250)}deg`
      );

      cleared++;

      counter.textContent =
        `${cleared} cleared`;

      if (
        cleared >= TOTAL - 2 &&
        !finished
      ) {
        finished = true;

        setTimeout(() => {
          revealed.classList.add(
            "show"
          );

          counter.textContent =
            "You found it ♥";
        }, 400);

        setTimeout(() => {
          const next =
            create(
              "div",
              "bi-scene-card"
            );

          next.innerHTML = `
            <p class="bi-eyebrow">
              You found it. ♥
            </p>

            <h1
              class="bi-title"
              style="font-size:clamp(24px,5vw,38px)"
            >
              You see? It was always there.
            </h1>

            <p class="bi-line small">
              Just needed a little love.
            </p>

            <button
              class="bi-btn"
              type="button"
              data-action="surprise"
            >
              One more...
            </button>
          `;

          setScene(next);
        }, 2200);
      }
    }

    field.addEventListener(
      "click",
      event => {
        const petal =
          event.target.closest(
            ".bi-clear-petal"
          );

        if (petal) {
          clearPetal(petal);
        }
      }
    );

    let dragging = false;

    field.addEventListener(
      "pointerdown",
      event => {
        dragging = true;

        const element =
          document.elementFromPoint(
            event.clientX,
            event.clientY
          );

        clearPetal(
          element?.closest?.(
            ".bi-clear-petal"
          )
        );
      }
    );

    field.addEventListener(
      "pointermove",
      event => {
        if (!dragging) return;

        const element =
          document.elementFromPoint(
            event.clientX,
            event.clientY
          );

        clearPetal(
          element?.closest?.(
            ".bi-clear-petal"
          )
        );
      }
    );

    const stop =
      () => {
        dragging = false;
      };

    field.addEventListener(
      "pointerup",
      stop
    );

    field.addEventListener(
      "pointercancel",
      stop
    );

    field.addEventListener(
      "pointerleave",
      stop
    );
  }

  /* ==========================================================
     SCENE 6 — SURPRISE
     ========================================================== */

  /* Sad animation sequences — each No click plays a different one */
  const SAD_ANIMS = [
    {
      emoji: "💔",
      msg: "Are you sure? I worked really hard on this...",
      filter: "saturate(0.7)"
    },
    {
      emoji: "🥀",
      msg: "The flowers are wilting now...",
      filter: "saturate(0.5) brightness(0.92)"
    },
    {
      emoji: "🌧️",
      msg: "It's starting to rain in the garden...",
      filter: "saturate(0.35) brightness(0.85)"
    },
    {
      emoji: "😢",
      msg: "Please? Pretty please? 🥺",
      filter: "saturate(0.25) brightness(0.8)"
    },
    {
      emoji: "🥺",
      msg: "I promise it's worth it! Just say yes!",
      filter: "saturate(0.3) brightness(0.82)"
    },
    {
      emoji: "😿",
      msg: "My heart can't take much more of this...",
      filter: "saturate(0.2) brightness(0.78)"
    },
    {
      emoji: "💔",
      msg: "Okay fine, I'll just sit here and cry...",
      filter: "saturate(0.15) brightness(0.75)"
    }
  ];

  let noClickCount = 0;

  function startSurprise() {
    const card = create("div", "bi-scene-card");
    noClickCount = 0;

    card.innerHTML = `
      <p class="bi-eyebrow">Perfect. You passed all the tests. 😌</p>

      <h1 class="bi-title" style="font-size:clamp(26px,5vw,42px)">
        Wait... one more thing.
      </h1>

      <p class="bi-line">Do you like surprises?</p>

      <div class="bi-sad-anim" data-sad-anim style="display:none;"></div>

      <div class="bi-choices">
        <button class="bi-choice yes" type="button" data-yes-btn>YES ❤️</button>
        <button class="bi-choice no-btn" type="button" data-no-btn>No</button>
      </div>
    `;

    setScene(card);

    const yesBtn = $("[data-yes-btn]", card);
    const noBtn = $("[data-no-btn]", card);
    const sadAnim = $("[data-sad-anim]", card);

    yesBtn.addEventListener("click", () => {
      /* Exciting celebration animation */
      yesBtn.style.background = "linear-gradient(135deg, #ff4e95, #ffd700)";
      yesBtn.style.boxShadow = "0 0 40px rgba(255,78,149,.8), 0 0 80px rgba(255,215,0,.4)";
      yesBtn.style.transform = "scale(1.15)";
      yesBtn.style.pointerEvents = "none";
      if (noBtn) noBtn.style.display = "none";

      /* Burst of hearts + sparkles */
      const rect = yesBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const symbols = ["💖", "✨", "🎉", "💕", "🌟", "♥", "🌸", "🥳"];
      for (let i = 0; i < 40; i++) {
        const s = create("span", "bi-burst", symbols[Math.floor(Math.random() * symbols.length)]);
        s.style.left = cx + "px";
        s.style.top = cy + "px";
        s.style.fontSize = random(16, 36) + "px";
        const angle = random(0, Math.PI * 2);
        const dist = random(60, 280);
        s.style.setProperty("--bx", Math.cos(angle) * dist + "px");
        s.style.setProperty("--by", Math.sin(angle) * dist - 50 + "px");
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1200);
      }

      /* Sad animation cleanup if any */
      if (sadAnim) sadAnim.style.display = "none";
      if (card.parentElement) card.style.filter = "none";

      /* Update text */
      const eyebrow = card.querySelector(".bi-eyebrow");
      const title = card.querySelector(".bi-title");
      const line = card.querySelector(".bi-line");
      if (eyebrow) eyebrow.textContent = "YES! That's the spirit! 🎉";
      if (title) title.textContent = "I knew you'd say that!";
      if (line) line.textContent = "Get ready for something magical...";

      setTimeout(() => startFinale(), 2200);
    });

    noBtn.addEventListener("click", () => {
      const anim = SAD_ANIMS[noClickCount % SAD_ANIMS.length];
      noClickCount++;

      /* Show sad animation */
      sadAnim.style.display = "block";
      sadAnim.innerHTML = `
        <div class="bi-sad-emoji" style="font-size:64px;opacity:0;transform:scale(0.3);">
          ${anim.emoji}
        </div>
        <p class="bi-sad-msg" style="opacity:0;margin-top:10px;font-size:clamp(15px,3vw,19px);color:rgba(255,255,255,.85);">
          ${anim.msg}
        </p>
      `;

      const emoji = sadAnim.querySelector(".bi-sad-emoji");
      const msg = sadAnim.querySelector(".bi-sad-msg");

      emoji.animate([
        { transform: "scale(0.3) rotate(-15deg)", opacity: 0 },
        { transform: "scale(1.15) rotate(5deg)", opacity: 1, offset: 0.6 },
        { transform: "scale(1) rotate(0deg)", opacity: 1 }
      ], { duration: 800, easing: "cubic-bezier(.2,.8,.2,1)" });
      emoji.style.opacity = "1";
      emoji.style.transform = "scale(1)";

      msg.animate([
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], { duration: 600, delay: 300, easing: "ease-out" });
      msg.style.opacity = "1";

      /* Sad float-away particles */
      const syms = ["💧", "😢", "💙", "🌧️"];
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const p = create("span", "bi-burst", syms[Math.floor(Math.random() * syms.length)]);
          p.style.left = random(20, 80) + "%";
          p.style.top = "50%";
          p.style.fontSize = random(14, 26) + "px";
          p.style.setProperty("--bx", random(-80, 80) + "px");
          p.style.setProperty("--by", random(-200, -80) + "px");
          card.appendChild(p);
          setTimeout(() => p.remove(), 1100);
        }, i * 150);
      }

      /* Desaturate the background */
      card.style.filter = anim.filter;

      /* Update button label */
      const btns = [
        "Are you sure? 🥺", "Really? 😿", "Please? 🥺",
        "Pretty please? 💔", "I'm begging you! 😭",
        "Just this once? 🥺", "...please? 💔"
      ];
      noBtn.textContent = btns[noClickCount % btns.length];

      /* After many 'No' clicks, force Yes */
      if (noClickCount >= 7) {
        yesBtn.textContent = "OK FINE YES ❤️";
        yesBtn.style.animation = "bi-heartbeat 0.8s ease-in-out infinite";
        noBtn.textContent = "...okay, I give up 😂";
        noBtn.style.opacity = "0.5";
        noBtn.style.pointerEvents = "none";
      }
    });
  }

  /* ==========================================================
     SCENE 7 — FINALE
     ========================================================== */

  function startFinale() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <div class="bi-finale">

        <div class="bi-finale-heart">
          ♥
        </div>

        <div class="bi-finale-lines">

          <p
            class="bi-finale-line"
            data-finale-line
          >
            Okay...
          </p>

          <p
            class="bi-finale-line"
            data-finale-line
          >
            I think you're ready.
          </p>

          <p
            class="bi-finale-line"
            data-finale-line
          >
            But this little surprise...
          </p>

          <p
            class="bi-finale-line"
            data-finale-line
          >
            ...was made especially for you. ♥
          </p>

        </div>

      </div>
    `;

    setScene(card);

    const lines =
      $$(
        "[data-finale-line]",
        card
      );

    lines.forEach(
      (line, index) => {
        setTimeout(() => {
          line.classList.add(
            "show"
          );
        }, 700 + index * 1200);
      }
    );

    setTimeout(() => {
      const next =
        create(
          "div",
          "bi-scene-card"
        );

      next.innerHTML = `
        <p class="bi-eyebrow">
          A little something...
        </p>

        <h1
          class="bi-title"
          style="font-size:clamp(26px,5vw,42px)"
        >
          Just for you ♥
        </h1>

        <button
          class="bi-btn"
          type="button"
          data-action="ready"
        >
          Open the door 🌸
        </button>
      `;

      setScene(next);
    }, 5700);
  }

  /* ==========================================================
     SCENE 8 — READY
     ========================================================== */

  function startReady() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <div class="bi-ready-card">

        <span class="ribbon">
          ♥
        </span>

        <h3>
          One last little thing...
        </h3>

        <p>
          Tell me who you are.
        </p>

        <p>
          And I'll open the door. ♥
        </p>

        <button
          class="bi-btn"
          type="button"
          data-action="open-login"
        >
          Open the Surprise 🌸
        </button>

      </div>
    `;

    setScene(card);
  }

  /* ==========================================================
     LOGIN TRANSITION — redirect to home.html
     ========================================================== */

  function revealLogin() {
    if (transitionLocked) return;

    transitionLocked = true;

    // Mark intro as completed
    try {
      sessionStorage.setItem(
        "birthdayIntroDone",
        "true"
      );
    } catch (e) {}

    const sweep =
      create(
        "div",
        "bi-sweep",
        `
          <div class="bi-sweep-heart">
            ♥
          </div>
        `
      );

    host.appendChild(
      sweep
    );

    requestAnimationFrame(() => {
      sweep.classList.add(
        "run"
      );
    });

    setTimeout(() => {
      host.classList.add(
        "trans-out"
      );
    }, 300);

    // Redirect to home page after the sweep animation
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1300);
  }

  /* ==========================================================
     GLOBAL ACTIONS
     ========================================================== */

  host.addEventListener(
    "click",
    event => {
      const button =
        event.target.closest(
          "[data-action]"
        );

      if (!button) return;

      const action =
        button.dataset.action;

      switch (action) {
        case "catch":
          startCatchHeart();
          break;

        case "bloom":
          startBloomFlower();
          break;

        case "memory":
          startMemoryMatch();
          break;

        case "balloon":
          startBalloon();
          break;

        case "hearts":
          startFollowHearts();
          break;

        case "petals":
          startClearPetals();
          break;

        case "surprise":
          startSurprise();
          break;

        case "finale":
          startFinale();
          break;

        case "ready":
          startReady();
          break;

        case "open-login":
          revealLogin();
          break;

        default:
          console.warn(
            "Unknown BirthdayIntro action:",
            action
          );
      }
    }
  );

  /* ==========================================================
     PUBLIC API
     ========================================================== */

  root.BirthdayIntro = {
    revealLogin,

    restart() {
      window.location.reload();
    }
  };

  /* ==========================================================
     CINEMATIC INTRO ANIMATION
     ========================================================== */

  function startIntroAnimation() {
    /* Create full-screen intro overlay */
    const intro = create("div", "bi-intro-cinematic");
    intro.innerHTML = `
      <div class="bi-cine-bg"></div>
      <div class="bi-cine-particles"></div>
      <div class="bi-cine-content">
        <div class="bi-cine-heart">♥</div>
        <p class="bi-cine-line cine-line-1">Someone very special is about to enter…</p>
        <p class="bi-cine-line cine-line-2">And this little world has been waiting.</p>
        <p class="bi-cine-line cine-line-3">✨ ♥ ✨</p>
      </div>
    `;
    host.appendChild(intro);

    /* Trigger entrance animation on next frame */
    requestAnimationFrame(() => {
      intro.classList.add("active");
    });

    /* Spawn floating petals + sparkles */
    const particleBox = intro.querySelector(".bi-cine-particles");
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const p = create("span", "bi-cine-petal");
        p.textContent = ["🌸", "♥", "✦", "✨", "🌷"][Math.floor(Math.random() * 5)];
        p.style.left = random(0, 100) + "%";
        p.style.fontSize = random(14, 32) + "px";
        p.style.animationDuration = random(4, 8) + "s";
        p.style.setProperty("--drift", random(-60, 60));
        particleBox.appendChild(p);
      }, i * 200);
    }

    /* After animation, transition to first mission */
    setTimeout(() => {
      intro.classList.add("leaving");
      setTimeout(() => {
        intro.remove();
        startOpening();
      }, 800);
    }, 5500);
  }

  /* ==========================================================
     START
     ========================================================== */

  startIntroAnimation();

})(window);
