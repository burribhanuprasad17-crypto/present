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
        First mission...
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
        Click or tap the flower to give it
        a little love ♥
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

    let step = 0;
    let completed = false;

    function bloom() {
      if (completed) return;

      step =
        Math.min(
          step + 1,
          4
        );

      flower.dataset.step =
        step;

      progress.style.width =
        `${step * 25}%`;

      if (step !== 4) return;

      completed = true;

      flower.classList.add(
        "bloomed"
      );

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
            data-action="hearts"
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
     SCENE 4 — FOLLOW HEART
     ========================================================== */

  function startFollowHearts() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <p class="bi-eyebrow">
        Okay, this one's easy...
      </p>

      <h1
        class="bi-title"
        style="font-size:clamp(26px,5vw,40px)"
      >
        Follow the right heart. 👀
      </h1>

      <p class="bi-line small">
        They're going to shuffle...
        pick the one that's glowing.
      </p>

      <div
        class="bi-hearts-row"
        data-hearts-row
      >
        <span
          class="bi-triheart"
          data-heart="0"
        >
          ♡
        </span>

        <span
          class="bi-triheart"
          data-heart="1"
        >
          ♡
        </span>

        <span
          class="bi-triheart"
          data-heart="2"
        >
          ♡
        </span>
      </div>

      <p
        class="bi-hold-hint"
        data-heart-hint
      >
        Watch carefully... 👀
      </p>
    `;

    setScene(card);

    const row =
      $(
        "[data-hearts-row]",
        card
      );

    const hearts =
      $$(
        "[data-heart]",
        card
      );

    let winner =
      Math.floor(
        Math.random() * 3
      );

    let locked = false;

    function positionHearts() {
      const width =
        row.clientWidth;

      const heartSize =
        window.innerWidth <= 600
          ? 70
          : 90;

      const gap =
        Math.max(
          10,
          (width -
            heartSize * 3) /
            2
        );

      hearts.forEach(
        (heart, index) => {
          heart.style.left =
            `${
              index *
              (heartSize + gap)
            }px`;

          heart.style.top =
            "25px";
        }
      );
    }

    positionHearts();

    const shufflePositions = () => {
      const order =
        [0, 1, 2].sort(
          () =>
            Math.random() - 0.5
        );

      hearts.forEach(
        (heart, index) => {
          heart.dataset.position =
            order[index];
        }
      );
    };

    async function shuffle() {
      for (let i = 0; i < 3; i++) {
        shufflePositions();

        await new Promise(
          resolve =>
            setTimeout(
              resolve,
              650
            )
        );
      }

      positionHearts();

      hearts.forEach(
        (heart, index) => {
          heart.style.opacity =
            index === winner
              ? "1"
              : "0.7";
        }
      );

      const hint =
        $(
          "[data-heart-hint]",
          card
        );

      hint.textContent =
        "Pick the glowing heart ♥";
    }

    shuffle();

    row.addEventListener(
      "click",
      event => {
        if (locked) return;

        const heart =
          event.target.closest(
            "[data-heart]"
          );

        if (!heart) return;

        const selected =
          Number(
            heart.dataset.heart
          );

        if (selected === winner) {
          locked = true;

          heart.textContent =
            "♥";

          heart.classList.add(
            "win"
          );

          createBurst(
            row,
            heart.offsetLeft +
              heart.offsetWidth / 2,
            heart.offsetTop +
              heart.offsetHeight / 2,
            20
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
                I knew you could do it.
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
          }, 1000);

        } else {
          heart.classList.add(
            "shake"
          );

          setTimeout(() => {
            heart.classList.remove(
              "shake"
            );
          }, 450);

          $(
            "[data-heart-hint]",
            card
          ).textContent =
            "Nope 😂 — try again.";
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
        One tiny favor...
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

  function startSurprise() {
    const card =
      create(
        "div",
        "bi-scene-card"
      );

    card.innerHTML = `
      <p class="bi-eyebrow">
        Perfect. You passed all the tests. 😌
      </p>

      <h1
        class="bi-title"
        style="font-size:clamp(26px,5vw,42px)"
      >
        Wait... one more thing.
      </h1>

      <p class="bi-line">
        Do you like surprises?
      </p>

      <div class="bi-choices">

        <button
          class="bi-choice yes"
          type="button"
          data-action="finale"
        >
          YES ❤️
        </button>

        <button
          class="bi-choice"
          type="button"
          data-action="finale"
        >
          Obviously 😂
        </button>

      </div>
    `;

    setScene(card);
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
     SKIP BUTTON
     ========================================================== */

  const skip =
    create(
      "button",
      "bi-skip",
      "skip intro →"
    );

  skip.type = "button";

  skip.addEventListener(
    "click",
    revealLogin
  );

  host.appendChild(
    skip
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
     START
     ========================================================== */

  startOpening();

})(window);
