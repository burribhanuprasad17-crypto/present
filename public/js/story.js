/* ══════════════════════════════════════════════════════════
   The Book of Us — Storybook Experience JS
   ══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Chapter data — easy to edit ── */
  const CHAPTERS = [
    {
      num: "CHAPTER 01",
      title: "Where It All Began",
      story:
        "There are moments that seem ordinary when they happen.\n" +
        "We don't know that someday we'll look back at them and realize they quietly became some of our favorite memories.",
      image: "assets/pic1.jpeg",
      caption: "The beginning of something beautiful.",
    },
    {
      num: "CHAPTER 02",
      title: "A Little More Than a Moment",
      story:
        "Sometimes it only takes one look, one conversation, one laugh — and something shifts inside you.\n" +
        "You don't notice it right away. But later, you realize it was the start of everything.",
      image: "assets/pic2.jpeg",
      caption: "Where everything started to change.",
    },
    {
      num: "CHAPTER 03",
      title: "The Memories We Kept",
      story:
        "Not every moment needs to be grand to be important.\n" +
        "Some of the ones we treasure most are quiet, soft, and easy to miss — the kind that only reveal their beauty in hindsight.",
      image: "assets/pic3.jpeg",
      caption: "Quiet moments, lasting memories.",
    },
    {
      num: "CHAPTER 04",
      title: "The Smile I Remember",
      story:
        "There is a smile I carry with me everywhere.\n" +
        "It doesn't belong to any one photograph or any single day — it belongs to all the moments that made me grateful you exist.",
      image: "assets/pic4.jpeg",
      caption: "The smile that stays with me.",
    },
    {
      num: "CHAPTER 05",
      title: "Somewhere Between Then & Now",
      story:
        "Time moves differently when you share it with someone special.\n" +
        "The ordinary becomes extraordinary, and suddenly the smallest details become the ones you never want to forget.",
      image: "assets/pic5.jpeg",
      caption: "Where time stood still for a moment.",
    },
    {
      num: "CHAPTER 06",
      title: "The Moments That Stayed",
      story:
        "We collect moments the way others collect things.\n" +
        "And the ones that truly stay with us aren't always the loudest — they're the ones that touched something deeper.",
      image: "assets/pic6.jpeg",
      caption: "The ones that touched my heart.",
    },
    {
      num: "CHAPTER 07",
      title: "If Memories Could Speak",
      story:
        "If these memories could talk, they'd tell you what I sometimes struggle to say.\n" +
        "That you mean more than words can hold, and that every shared moment has become a part of who I am.",
      image: "assets/pic7.jpeg",
      caption: "Words that come from the heart.",
    },
    {
      num: "CHAPTER 08",
      title: "Everything That Became Special",
      story:
        "What started as something small grew into something neither of us expected.\n" +
        "Every conversation, every silence, every shared glance — they all became threads in something beautiful.",
      image: "assets/pic8.jpeg",
      caption: "Where the ordinary became extraordinary.",
    },
    {
      num: "CHAPTER 09",
      title: "And This Is Only the Beginning",
      story:
        "This isn't the end of the story — it's just where the next chapter begins.\n" +
        "There are so many pages still unwritten, and I want to write every single one of them with you.",
      image: "assets/pic9.jpeg",
      caption: "The best is yet to come. ♥",
    },
  ];

  const REDUCED_MOTION = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const TOTAL = CHAPTERS.length;
  let current = 0;
  let turning = false;
  let bookStarted = false;

  /* ── DOM refs ── */
  const opening = document.getElementById("story-opening");
  const openBtn = document.getElementById("so-open");
  const stage = document.getElementById("book-stage");
  const book = document.getElementById("book");
  const bookLeft = document.getElementById("book-left");
  const bookRight = document.getElementById("book-right");
  const chapterIntro = document.getElementById("chapter-intro");
  const ciNumber = chapterIntro.querySelector(".ci-number");
  const ciTitle = chapterIntro.querySelector(".ci-title");
  const pChapterNum = document.getElementById("p-chapter-num");
  const pChapterTitle = document.getElementById("p-chapter-title");
  const pStory = document.getElementById("p-story");
  const pImage = document.getElementById("p-image");
  const pCaption = document.getElementById("p-caption");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const navCounter = document.getElementById("nav-counter");
  const progressEl = document.getElementById("book-progress");
  const ending = document.getElementById("story-ending");

  /* ══════════ DUST PARTICLES ══════════ */
  function buildDust() {
    if (REDUCED_MOTION) return;
    const container = document.getElementById("story-dust");
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const m = document.createElement("span");
      m.className = "dust-mote";
      const size = 1.5 + Math.random() * 2.5;
      m.style.setProperty("--ds", size + "px");
      m.style.setProperty("--dd", 6 + Math.random() * 8 + "s");
      m.style.setProperty("--dly", -Math.random() * 10 + "s");
      m.style.setProperty("--dx", (Math.random() * 60 - 30) + "px");
      m.style.setProperty("--dy", -(40 + Math.random() * 80) + "px");
      m.style.setProperty("--dx2", (Math.random() * 40 - 20) + "px");
      m.style.setProperty("--dy2", -(80 + Math.random() * 120) + "px");
      m.style.setProperty("--do", (0.3 + Math.random() * 0.4).toFixed(2));
      m.style.left = Math.random() * 100 + "%";
      m.style.top = 20 + Math.random() * 60 + "%";
      container.appendChild(m);
    }
  }

  /* ══════════ PROGRESS DOTS ══════════ */
  function buildProgress() {
    progressEl.innerHTML = "";
    for (let i = 0; i < TOTAL; i++) {
      const dot = document.createElement("span");
      dot.className = "bp-dot" + (i === 0 ? " active" : "");
      progressEl.appendChild(dot);
    }
  }

  function updateProgress() {
    const dots = progressEl.querySelectorAll(".bp-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  /* ══════════ RENDER CHAPTER ══════════ */
  function renderChapter(index, instant) {
    const ch = CHAPTERS[index];
    if (!ch) return;

    pChapterNum.textContent = ch.num;
    pChapterTitle.textContent = ch.title;
    pStory.textContent = ch.story;
    pImage.src = ch.image;
    pImage.alt = ch.caption;
    pImage.classList.remove("revealed");
    pCaption.textContent = ch.caption;

    navCounter.textContent =
      String(index + 1).padStart(2, "0") + " / " + String(TOTAL).padStart(2, "0");

    btnPrev.disabled = index === 0;
    btnNext.textContent = index === TOTAL - 1 ? "" : "Next →";
    if (index === TOTAL - 1) {
      btnNext.textContent = "Finish ♥";
    } else {
      btnNext.innerHTML = 'Next <span aria-hidden="true">→</span>';
    }

    updateProgress();

    // Reveal image after a brief delay
    const delay = instant ? 100 : 400;
    setTimeout(() => pImage.classList.add("revealed"), delay);
  }

  /* ══════════ CHAPTER INTRO ══════════ */
  function showChapterIntro(index) {
    return new Promise((resolve) => {
      const ch = CHAPTERS[index];
      ciNumber.textContent = ch.num;
      ciTitle.textContent = ch.title;
      chapterIntro.classList.add("show");
      chapterIntro.setAttribute("aria-hidden", "false");

      setTimeout(() => {
        chapterIntro.classList.remove("show");
        chapterIntro.setAttribute("aria-hidden", "true");
        setTimeout(resolve, 400);
      }, REDUCED_MOTION ? 600 : 1800);
    });
  }

  /* ══════════ PAGE TURN ══════════ */
  function turnForward() {
    if (turning || current >= TOTAL - 1) return;
    turning = true;
    book.classList.add("turning-forward");

    setTimeout(() => {
      current++;
      renderChapter(current, false);

      // Reset book position
      book.classList.remove("turning-forward");
      bookLeft.style.transform = "";
      bookLeft.style.opacity = "";

      setTimeout(() => {
        turning = false;
      }, 300);
    }, REDUCED_MOTION ? 200 : 700);
  }

  function turnBackward() {
    if (turning || current <= 0) return;
    turning = true;
    book.classList.add("turning-backward");

    setTimeout(() => {
      current--;
      renderChapter(current, false);

      book.classList.remove("turning-backward");
      bookRight.style.transform = "";
      bookRight.style.opacity = "";

      setTimeout(() => {
        turning = false;
      }, 300);
    }, REDUCED_MOTION ? 200 : 700);
  }

  /* ══════════ ENDING ══════════ */
  function showEnding() {
    stage.classList.remove("visible");
    setTimeout(() => {
      stage.hidden = true;
      ending.hidden = false;
      ending.classList.add("visible");
    }, 800);
  }

  /* ══════════ OPEN BOOK ══════════ */
  async function openBook() {
    if (bookStarted) return;
    bookStarted = true;

    opening.classList.add("hiding");
    await sleep(1200);
    opening.hidden = true;

    stage.hidden = false;
    buildProgress();
    renderChapter(0, true);

    // Brief pause then show stage
    await sleep(200);
    stage.classList.add("visible");

    // Show first chapter intro
    await showChapterIntro(0);
  }

  /* ══════════ EVENT LISTENERS ══════════ */
  openBtn.addEventListener("click", openBook);

  btnPrev.addEventListener("click", () => {
    if (current === 0) return;
    turnBackward();
  });

  btnNext.addEventListener("click", () => {
    if (current >= TOTAL - 1) {
      showEnding();
      return;
    }
    turnForward();
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!stage.classList.contains("visible")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (current >= TOTAL - 1) {
        showEnding();
      } else {
        turnForward();
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      turnBackward();
    }
  });

  // Mouse wheel
  let wheelCooldown = false;
  document.addEventListener(
    "wheel",
    (e) => {
      if (!stage.classList.contains("visible") || wheelCooldown) return;
      wheelCooldown = true;
      setTimeout(() => (wheelCooldown = false), 1200);

      if (e.deltaY > 30) {
        if (current >= TOTAL - 1) showEnding();
        else turnForward();
      } else if (e.deltaY < -30) {
        turnBackward();
      }
    },
    { passive: true }
  );

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  document.addEventListener("touchend", (e) => {
    if (!stage.classList.contains("visible")) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) {
        if (current >= TOTAL - 1) showEnding();
        else turnForward();
      } else {
        turnBackward();
      }
    }
  });

  // Click on left/right halves of book (desktop)
  document.addEventListener("click", (e) => {
    if (!stage.classList.contains("visible")) return;
    const bookRect = book.getBoundingClientRect();
    if (
      e.clientX < bookRect.left ||
      e.clientX > bookRect.right ||
      e.clientY < bookRect.top ||
      e.clientY > bookRect.bottom
    )
      return;

    // Don't trigger on buttons
    if (e.target.closest(".book-nav-btn")) return;

    const midX = bookRect.left + bookRect.width / 2;
    if (e.clientX < midX) {
      turnBackward();
    } else {
      if (current >= TOTAL - 1) showEnding();
      else turnForward();
    }
  });

  /* ══════════ HELPERS ══════════ */
  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  /* ══════════ INIT ══════════ */
  buildDust();
})();
