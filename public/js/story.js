/* ══════════════════════════════════════════════════════════
   The Book of Us — The Complete Story Journey
   Book → book closes → one more thing → 7 notes → our story
   → the letter → rewind → birthday reveal → final surprise
   ══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const T = (ms) => (REDUCED_MOTION ? 60 : ms);

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

  /* ── Things I never said ── */
  const NOTES = [
    {
      title: "A Little Thing",
      text: "You make ordinary days feel like small celebrations. I don't think you ever notice it — but the world around you gets a little softer, a little brighter, just because you're in it.",
    },
    {
      title: "A Memory",
      photo: "assets/pic3.jpeg",
      text: "I keep returning to the memories we've made — not because they're perfect, but because they're ours. Every single one of them stays with me.",
    },
    {
      title: "Something You Changed",
      text: "You changed the way I see ordinary things. A quiet evening, a random message, a simple laugh — they all mean more now. You made them mean more.",
    },
    {
      title: "The Silly One",
      text: "We have jokes that only we understand, and moments that would make no sense to anyone else. I wouldn't trade a single one of them for anything.",
    },
    {
      title: "Something I'm Grateful For",
      text: "I'm grateful for you. For your patience with me, for the way you listen, for the person you are when no one is watching. You are someone worth celebrating.",
    },
    {
      title: "Something I Hope We Never Lose",
      text: "I hope we never lose the ease of talking to each other. The way we can say anything — or nothing at all — and it still feels like home.",
    },
    {
      title: "The One I Really Wanted to Say",
      text: "Somewhere along the way, you stopped being just a part of my life — you became one of the most important parts of my story. I didn't plan it. It just happened. And I wouldn't change it for anything.",
    },
  ];

  /* ── Our story · the timeline world ── */
  const TL = [
    {
      num: "01",
      key: "strangers",
      title: "Complete Strangers",
      text: "We were complete strangers.\nTwo people living completely separate lives.\nNeither of us knew that someday, our paths would become connected.",
      chars: { a: 14, b: 86 },
      decor: "strangers",
      mode: "still",
    },
    {
      num: "02",
      key: "familiar",
      title: "Somewhere in the Same World",
      text: "Slowly, we became aware of each other.\nNot close. Not inseparable.\nJust two people who knew the other existed.",
      chars: { a: 24, b: 74 },
      decor: "familiar",
      mode: "looking",
    },
    {
      num: "03",
      key: "reason",
      title: "It Started With a Reason",
      text: "Then came a reason to talk.\nNothing extraordinary.\nWe simply needed each other for something.\nAnd somehow… one conversation became another.",
      chars: { a: 27, b: 71 },
      decor: "bubbles",
      mode: "talking",
    },
    {
      num: "04",
      key: "friends",
      title: "Somehow, You Became Part of My Every Day",
      text: "We started talking more.\nThen every day. Conversations became longer.\nRandom things became important.\nTalking to you became normal.",
      chars: { a: 31, b: 68 },
      decor: "sun",
      mode: "talking",
    },
    {
      num: "05",
      key: "journey",
      title: "The Journey That Changed Everything",
      text: "Then came that one journey.\nWe didn't know how much it would change.\nBut somehow, after that journey…\neverything felt different.",
      chars: { a: 38, b: 62 },
      decor: "window",
      mode: "talking",
    },
    {
      num: "06",
      key: "closer",
      title: "Closer Than We Expected",
      text: "In such a short time,\nsomehow you became one of the people\nI felt closest to.",
      chars: { a: 35, b: 57 },
      decor: "closer",
      mode: "talking",
    },
    {
      num: "07",
      key: "memories",
      title: "Then We Started Collecting Moments",
      text: "After that, the memories just kept coming.\nEvery moment became a little photograph\nI never wanted to let go of.",
      chars: { a: 28, b: 70 },
      decor: "memories",
      mode: "looking",
    },
    {
      num: "08",
      key: "silly",
      title: "And Then There Was... Us",
      text: "We did so many silly things to each other.\nRandom things. Stupid things.\nThings that wouldn't make sense to anyone else.\nAnd I loved every single one of them.",
      chars: { a: 38, b: 57 },
      decor: "silly",
      mode: "talking",
    },
    {
      num: "09",
      key: "together",
      title: "Somewhere Along the Way...",
      text: "Somewhere between the conversations, the journeys, the silly moments, and all those memories…\nAnd somehow, without planning it…\nyou became one of the most important parts of my story.",
      chars: { a: 40, b: 54 },
      decor: "glow",
      mode: "still",
      bigLine: "WE BECAME MORE THAN FRIENDS.",
    },
  ];

  const LETTER_BODY =
    "Today, the whole world gets to celebrate you — but no one celebrates you quite like I do.\n\n" +
    "If I could give you one thing today, it would be the ability to see yourself the way someone who truly cares sees you — beautiful, special, and worth celebrating.\n\n" +
    "May your life always have gardens to walk through, memories to keep, and reasons to smile — and may I be there for every one of them.";

  /* ══════════ DOM refs ══════════ */
  const opening = document.getElementById("story-opening");
  const openBtn = document.getElementById("so-open");
  const soWelcome = document.getElementById("so-welcome");
  const stage = document.getElementById("book-stage");
  const veil = document.getElementById("book-veil");
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

  // Journey stages
  const bookCloseStage = document.getElementById("book-close");
  const jcBtn = document.getElementById("jc-btn");
  const oneMoreStage = document.getElementById("one-more");
  const omEnvelope = document.getElementById("om-envelope");
  const notesStage = document.getElementById("notes");
  const noteCard = document.getElementById("note-card");
  const notesKicker = document.getElementById("notes-kicker");
  const noteIndex = document.getElementById("note-index");
  const noteTitle = document.getElementById("note-title");
  const noteText = document.getElementById("note-text");
  const notePhoto = document.getElementById("note-photo");
  const noteNext = document.getElementById("note-next");
  const notesProgress = document.getElementById("notes-progress");
  const timelineStage = document.getElementById("timeline");
  const tlScene = document.getElementById("tl-scene");
  const tlPath = document.getElementById("tl-path");
  const tlCount = document.getElementById("tl-count");
  const tlTitle = document.getElementById("tl-title");
  const tlText = document.getElementById("tl-text");
  const tlNext = document.getElementById("tl-next");
  const letterStage = document.getElementById("letter-stage");
  const ltEnvelope = document.getElementById("lt-envelope");
  const ltLetter = document.getElementById("lt-letter");
  const ltLetterBody = document.getElementById("lt-letter-body");
  const ltNext = document.getElementById("lt-next");
  const rewindStage = document.getElementById("rewind");
  const revealStage = document.getElementById("reveal");
  const rvParticles = document.getElementById("rv-particles");
  const rvSurprise = document.getElementById("rv-surprise");
  const finalStage = document.getElementById("final-surprise");

  /* ══════════ Stage helpers ══════════ */
  function showStage(el) {
    if (!el) return;
    el.hidden = false;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => el.classList.add("visible"))
    );
  }

  function hideStage(el) {
    if (!el) return;
    el.classList.remove("visible");
    setTimeout(() => {
      el.hidden = true;
    }, 1500);
  }

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

  /* ══════════ BOOK ══════════ */
  const TOTAL = CHAPTERS.length;
  let current = 0;
  let turning = false;
  let bookStarted = false;
  let bookFinished = false;

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

    saveChapter(index);

    navCounter.textContent =
      String(index + 1).padStart(2, "0") + " / " + String(TOTAL).padStart(2, "0");

    btnPrev.disabled = index === 0;
    if (index === TOTAL - 1) {
      btnNext.innerHTML = "Finish <span aria-hidden=\"true\">♥</span>";
    } else {
      btnNext.innerHTML = 'Next <span aria-hidden="true">→</span>';
    }

    updateProgress();

    const delay = instant ? 100 : 400;
    setTimeout(() => pImage.classList.add("revealed"), delay);
  }

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

  function turnForward() {
    if (turning || current >= TOTAL - 1) return;
    turning = true;
    SFX.pageTurn();
    book.classList.add("turning-forward");

    setTimeout(() => {
      current++;
      renderChapter(current, false);

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
    SFX.pageTurn();
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

  const BOOK_KEY = "bookOfUsChapter";

  function saveChapter(i) {
    try {
      localStorage.setItem(BOOK_KEY, String(i));
    } catch (e) {}
  }

  function readChapter() {
    try {
      const v = parseInt(localStorage.getItem(BOOK_KEY) || "0", 10);
      if (!isNaN(v)) return Math.max(0, Math.min(TOTAL - 1, v));
    } catch (e) {}
    return 0;
  }

  let bookOpenAnimating = false;

  function beginBookOpen() {
    if (bookOpenAnimating) return;
    bookOpenAnimating = true;
    opening.classList.add("opening-book");
    SFX.bookOpen();
    setTimeout(() => openBook(), T(1600));
  }

  async function openBook() {
    if (bookStarted) return;
    bookStarted = true;

    opening.classList.add("hiding");
    await sleep(T(1200));
    opening.hidden = true;

    stage.hidden = false;
    buildProgress();
    current = readChapter();
    renderChapter(current, true);

    await sleep(T(200));
    stage.classList.add("visible");

    await showChapterIntro(current);
  }

  /* ══════════ THE BOOK CLOSES ══════════ */
  function startBookClose() {
    if (bookFinished) return;
    bookFinished = true;

    SFX.bookClose();
    veil.classList.add("run");

    setTimeout(() => {
      stage.classList.remove("visible");
      setTimeout(() => {
        stage.hidden = true;
      }, 1400);
      showStage(bookCloseStage);
      playCloseLines();
      setTimeout(() => veil.classList.remove("run"), 3400);
    }, T(1400));
  }

  function playCloseLines() {
    const lines = [
      { t: "You just walked through nine little pieces of our story.", cls: "" },
      { t: "But photographs can only tell you what happened…", cls: "soft" },
      { t: "They can't tell you everything I felt.", cls: "soft" },
      { t: "Some stories don't belong in books.", cls: "rose" },
      { t: "They belong between two people.", cls: "rose" },
    ];
    const box = document.getElementById("jc-lines");
    box.innerHTML = "";
    lines.forEach((l, i) => {
      setTimeout(() => {
        const p = document.createElement("p");
        p.className = "jc-line" + (l.cls ? " " + l.cls : "");
        p.textContent = l.t;
        box.appendChild(p);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => p.classList.add("show"))
        );
        if (i === lines.length - 1) {
          setTimeout(() => {
            jcBtn.hidden = false;
          }, T(1400));
        }
      }, T(700 + i * 2200));
    });
  }

  jcBtn.addEventListener("click", () => {
    hideStage(bookCloseStage);
    setTimeout(() => showStage(oneMoreStage), 400);
  });

  /* ══════════ ONE MORE THING ══════════ */
  omEnvelope.addEventListener("click", () => {
    if (omEnvelope.classList.contains("opened")) return;
    omEnvelope.classList.add("opened");
    SFX.seal();
    setTimeout(() => {
      hideStage(oneMoreStage);
      setTimeout(startNotes, 400);
    }, T(1600));
  });

  /* ══════════ SEVEN NOTES ══════════ */
  let noteIndexValue = 0;

  function startNotes() {
    noteIndexValue = 0;
    showStage(notesStage);
    showNote(0);
  }

  function showNote(i) {
    const n = NOTES[i];
    notesKicker.textContent = "Things I Never Said";
    noteIndex.textContent = "No. " + String(i + 1).padStart(2, "0") + " of 07";
    noteTitle.textContent = n.title;
    noteText.textContent = n.text;
    notePhoto.hidden = true;
    notePhoto.innerHTML = "";

    if (n.photo) {
      notePhoto.hidden = false;
      const img = document.createElement("img");
      img.src = n.photo;
      img.alt = n.title;
      img.loading = "lazy";
      notePhoto.appendChild(img);
    }

    noteCard.classList.remove("show");
    noteNext.classList.remove("show");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        noteCard.classList.add("show");
        setTimeout(() => noteNext.classList.add("show"), T(800));
      })
    );

    noteNext.textContent =
      i === NOTES.length - 1 ? "Walk Through Our Story →" : "Next ♥";
    notesProgress.textContent =
      i + 1 + " of 7 — one at a time, because each one deserves a moment.";
  }

  noteNext.addEventListener("click", () => {
    if (noteIndexValue < NOTES.length - 1) {
      noteIndexValue++;
      showNote(noteIndexValue);
    } else {
      hideStage(notesStage);
      setTimeout(startTimeline, 500);
    }
  });

  /* ══════════ OUR STORY · timeline world ══════════ */
  let tlIndex = 0;
  let tlMode = "stage"; // stage | map

  function startTimeline() {
    tlIndex = 0;
    tlMode = "stage";
    showStage(timelineStage);
    renderTimelineStage(0);
  }

  function makeChar(kind, left, bottom, unit) {
    const el = document.createElement("div");
    el.className = "story-char " + kind;
    el.style.left = left + "%";
    el.style.bottom = bottom + (unit || "%");
    el.innerHTML =
      '<div class="sc-head"></div><div class="sc-body"></div><div class="sc-skirt"></div>';
    return el;
  }

  function ground() {
    const g = document.createElement("div");
    g.className = "tl-ground";
    return g;
  }

  function buildScene(st) {
    tlScene.className = "tl-scene tl-" + st.key;
    tlScene.innerHTML = "";
    tlScene.appendChild(ground());

    if (st.decor === "strangers") {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "tl-paths");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.innerHTML =
        '<path d="M 10 80 C 34 62, 42 52, 50 46" fill="none" stroke="rgba(246,182,200,.4)" stroke-width="1.4" stroke-dasharray="4 5"/>' +
        '<path d="M 90 80 C 66 62, 58 52, 50 46" fill="none" stroke="rgba(217,164,65,.35)" stroke-width="1.4" stroke-dasharray="4 5"/>';
      tlScene.appendChild(svg);
      // one petal passes between them — they don't notice yet
      const pass = document.createElement("span");
      pass.className = "tl-petal-pass";
      tlScene.appendChild(pass);
      addChars(st);
    } else if (st.decor === "familiar") {
      const heart = document.createElement("span");
      heart.className = "tl-bubble";
      heart.style.cssText =
        "right:22%;top:30%;font-size:16px;padding:6px 12px;animation-delay:.8s;";
      heart.textContent = "♥";
      tlScene.appendChild(heart);
      // a small wave from the other side
      const wave = document.createElement("span");
      wave.className = "tl-bubble wave";
      wave.textContent = "👋";
      wave.style.cssText =
        "left:8%;top:36%;animation-delay:1.6s;";
      tlScene.appendChild(wave);
      addChars(st);
    } else if (st.decor === "bubbles") {
      const msgs = [
        { t: "hey ♥", left: "38%", top: "30%", d: "0s" },
        { t: "haha :D", left: "50%", top: "22%", d: "1s" },
        { t: "you there?", left: "36%", top: "44%", d: "2s" },
      ];
      msgs.forEach((m) => {
        const b = document.createElement("span");
        b.className = "tl-bubble fly";
        b.textContent = m.t;
        b.style.cssText =
          "left:" + m.left + ";top:" + m.top + ";animation-delay:" + m.d + ";";
        tlScene.appendChild(b);
      });
      addChars(st);
    } else if (st.decor === "sun") {
      const sun = document.createElement("div");
      sun.className = "tl-sun";
      tlScene.appendChild(sun);
      [
        { top: "24%", w: 130 },
        { top: "34%", w: 170, d: "-8s" },
      ].forEach((c) => {
        const cl = document.createElement("div");
        cl.className = "tl-cloud";
        cl.style.cssText =
          "top:" + c.top + ";width:" + c.w + "px;animation-delay:" + (c.d || "0s") + ";";
        tlScene.appendChild(cl);
      });
      addChars(st);
    } else if (st.decor === "window") {
      const win = document.createElement("div");
      win.className = "tl-window";
      win.innerHTML = '<span class="tl-window-stars">✦ ✦ ✦</span><div class="tl-road"></div>';
      const wc = document.createElement("div");
      wc.style.cssText =
        "position:absolute;left:0;right:0;bottom:12px;height:150px;transform:scale(.62);transform-origin:50% 100%;";
      const a = makeChar("char-a", 30, 10, "px");
      const b = makeChar("char-b", 60, 10, "px");
      a.classList.add("talking");
      b.classList.add("talking");
      wc.appendChild(a);
      wc.appendChild(b);
      win.appendChild(wc);
      tlScene.appendChild(win);
    } else if (st.decor === "closer") {
      const h = document.createElement("span");
      h.className = "tl-bubble fly";
      h.textContent = "♥";
      h.style.cssText = "left:47%;top:36%;font-size:18px;padding:6px 12px;";
      tlScene.appendChild(h);
      addChars(st);
    } else if (st.decor === "memories") {
      const pics = ["pic1.jpeg", "pic3.jpeg", "pic5.jpeg", "pic7.jpeg", "pic9.jpeg"];
      const spots = [
        { left: "12%", top: "24%", rot: "-6deg", d: "0s" },
        { left: "24%", top: "12%", rot: "5deg", d: "-1.4s" },
        { left: "40%", top: "20%", rot: "-3deg", d: "-2.6s" },
        { left: "60%", top: "10%", rot: "7deg", d: "-3.4s" },
        { left: "72%", top: "22%", rot: "-5deg", d: "-4.2s" },
      ];
      spots.forEach((s, i) => {
        const p = document.createElement("div");
        p.className = "tl-polaroid";
        p.style.cssText =
          "left:" + s.left + ";top:" + s.top + ";--rot:" + s.rot + ";animation-delay:" + s.d + ";";
        const img = document.createElement("img");
        img.src = "assets/" + pics[i];
        img.alt = "a memory";
        img.loading = "lazy";
        p.appendChild(img);
        tlScene.appendChild(p);
      });
      addChars(st);
    } else if (st.decor === "silly") {
      const items = [
        { t: "😂", left: "18%", top: "26%" },
        { t: "🎉", left: "30%", top: "12%" },
        { t: "💛", left: "46%", top: "22%" },
        { t: "😜", left: "60%", top: "10%" },
        { t: "✨", left: "72%", top: "24%" },
        { t: "🥳", left: "82%", top: "16%" },
      ];
      items.forEach((it, i) => {
        const s = document.createElement("span");
        s.className = "tl-silly-item";
        s.textContent = it.t;
        s.style.cssText =
          "left:" + it.left + ";top:" + it.top + ";animation-delay:" + i * 0.4 + "s;";
        tlScene.appendChild(s);
      });
      // the laughter bubble between them
      const laugh = document.createElement("span");
      laugh.className = "tl-bubble laugh fly";
      laugh.textContent = "😂😂";
      laugh.style.cssText = "left:44%;top:34%;animation-delay:1.2s;";
      tlScene.appendChild(laugh);
      addChars(st);
    } else if (st.decor === "glow") {
      const glow = document.createElement("div");
      glow.className = "tl-glow";
      tlScene.appendChild(glow);
      addChars(st);
    } else if (st.decor === "map") {
      const path = document.createElement("div");
      path.className = "tl-map-path";
      tlScene.appendChild(path);
      for (let i = 0; i < 9; i++) {
        const dot = document.createElement("div");
        dot.className = "tl-map-dot lit";
        dot.style.top = 13 + i * 8.5 + "%";
        tlScene.appendChild(dot);
      }
      addChars(st);
    } else {
      addChars(st);
    }

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        tlScene
          .querySelectorAll(".story-char, .tl-sun")
          .forEach((el) => el.classList.add("show"));
      })
    );
  }

  function addChars(st) {
    const bottom = st.key === "map" ? 10 : 16;
    const a = makeChar("char-a", st.chars.a, bottom);
    const b = makeChar("char-b", st.chars.b, bottom);
    if (st.mode === "talking") {
      a.classList.add("talking");
      b.classList.add("talking");
    }
    if (st.mode === "looking") {
      b.classList.add("looking");
    }
    if (st.key === "silly") {
      a.classList.add("bob-a");
      b.classList.add("bob-b");
    }
    tlScene.appendChild(a);
    tlScene.appendChild(b);
  }

  function buildPathDots(i) {
    tlPath.innerHTML = "";
    for (let d = 0; d < 9; d++) {
      const dot = document.createElement("span");
      dot.className = "tl-path-dot" + (d === i ? " active" : "");
      tlPath.appendChild(dot);
    }
    tlPath.classList.add("show");
  }

  function showBigLine(text) {
    const bl = document.createElement("div");
    bl.className = "tl-bigline";
    bl.textContent = text;
    tlScene.appendChild(bl);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => bl.classList.add("show"))
    );
    setTimeout(() => bl.remove(), T(3600));
  }

  function renderTimelineStage(i) {
    const st = TL[i];
    tlMode = "stage";
    tlCount.textContent = String(i + 1).padStart(2, "0") + " / 09";
    tlTitle.textContent = st.title;
    tlText.textContent = st.text;
    tlNext.textContent =
      i === TL.length - 1 ? "This is where we are now →" : "Continue →";
    buildScene(st);
    buildPathDots(i);
    if (st.bigLine) setTimeout(() => showBigLine(st.bigLine), T(1400));
  }

  function renderTimelineMap() {
    tlMode = "map";
    tlCount.textContent = "09 / 09";
    tlTitle.textContent = "And this is where we are now.";
    tlText.textContent = "But I still have one last thing to give you.";
    tlNext.textContent = "Open the Letter ♥";
    const mapSt = {
      key: "map",
      decor: "map",
      chars: { a: 42, b: 56 },
      mode: "still",
    };
    buildScene(mapSt);
  }

  tlNext.addEventListener("click", () => {
    if (tlMode === "map") {
      hideStage(timelineStage);
      setTimeout(startLetter, 500);
      return;
    }
    if (tlIndex < TL.length - 1) {
      tlIndex++;
      renderTimelineStage(tlIndex);
    } else {
      renderTimelineMap();
    }
  });

  /* ══════════ THE LETTER ══════════ */
  function startLetter() {
    showStage(letterStage);
    ltLetterBody.textContent = LETTER_BODY;
  }

  ltEnvelope.addEventListener("click", () => {
    if (ltEnvelope.classList.contains("opened")) return;
    ltEnvelope.classList.add("opened");
    SFX.seal();
    setTimeout(() => {
      ltEnvelope.style.transition = "opacity .6s ease";
      ltEnvelope.style.opacity = "0";
      setTimeout(() => {
        ltEnvelope.style.display = "none";
        ltLetter.hidden = false;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => ltLetter.classList.add("show"))
        );
        setTimeout(() => {
          ltNext.hidden = false;
          ltNext.classList.add("show");
        }, T(1800));
      }, 600);
    }, T(1500));
  });

  ltNext.addEventListener("click", () => {
    hideStage(letterStage);
    setTimeout(startRewind, 500);
  });

  /* ══════════ REWIND ══════════ */
  function startRewind() {
    showStage(rewindStage);
    const rw1 = rewindStage.querySelector(".rw-1");
    const rw2 = rewindStage.querySelector(".rw-2");
    const rw3 = rewindStage.querySelector(".rw-3");
    const beat = rewindStage.querySelector(".rw-beat");
    const flash = document.getElementById("rw-flash");

    setTimeout(() => rw1.classList.add("show"), T(500));

    setTimeout(() => {
      rw2.classList.add("show");
      spawnRewindPetals();
      spawnRewindFragments(flash);
    }, T(2400));

    setTimeout(() => {
      beat.classList.remove("thump");
      void beat.offsetWidth;
      beat.classList.add("thump");
      SFX.heartbeat();
    }, T(5200));

    setTimeout(() => rw3.classList.add("show"), T(6400));

    setTimeout(() => {
      hideStage(rewindStage);
      setTimeout(startReveal, 400);
    }, T(8600));
  }

  function spawnRewindPetals() {
    if (REDUCED_MOTION) return;
    for (let i = 0; i < 26; i++) {
      const p = document.createElement("span");
      p.className = "rw-petal-up";
      p.style.left = Math.random() * 100 + "vw";
      p.style.width = 10 + Math.random() * 8 + "px";
      p.style.height = 10 + Math.random() * 8 + "px";
      p.style.setProperty("--sw", (Math.random() * 120 - 60) + "px");
      p.style.animation =
        "rwPetalUp " + (2.4 + Math.random() * 2) + "s ease-in " + Math.random() + "s forwards";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 7000);
    }
  }

  function spawnRewindFragments(flash) {
    if (!flash) return;
    const pics = [
      "assets/pic9.jpeg", "assets/pic8.jpeg", "assets/pic7.jpeg",
      "assets/pic6.jpeg", "assets/pic5.jpeg", "assets/pic4.jpeg",
      "assets/pic3.jpeg", "assets/pic2.jpeg", "assets/pic1.jpeg",
    ];
    pics.forEach((src, i) => {
      setTimeout(() => {
        const f = document.createElement("span");
        f.className = "rw-frag";
        f.style.left = 10 + Math.random() * 60 + "%";
        f.style.top = 18 + Math.random() * 50 + "%";
        f.style.setProperty("--fx", (Math.random() * 120 - 60) + "px");
        f.style.setProperty("--fy", (-90 - Math.random() * 120) + "px");
        f.innerHTML = '<img src="' + src + '" alt="" />';
        f.style.animation = "rwFrag 1.6s ease forwards";
        flash.appendChild(f);
        setTimeout(() => f.remove(), 1800);
      }, i * 200);
    });
  }

  /* ══════════ BIRTHDAY REVEAL ══════════ */
  function startReveal() {
    showStage(revealStage);
    const rv1 = document.getElementById("rv-line-1");
    const rv2 = document.getElementById("rv-line-2");
    const rvBirthday = document.getElementById("rv-birthday");
    const rvThanks = document.getElementById("rv-thanks");
    const rvNotover = document.getElementById("rv-notover");
    const rvContinues = document.getElementById("rv-continues");

    setTimeout(() => rv1.classList.add("show"), T(600));
    setTimeout(() => rv2.classList.add("show"), T(2600));
    setTimeout(() => {
      rvBirthday.classList.add("show");
      spawnRevealParticles();
      SFX.chime();
    }, T(4600));
    setTimeout(() => rvThanks.classList.add("show"), T(7400));
    setTimeout(() => rvNotover.classList.add("show"), T(9400));
    setTimeout(() => rvContinues.classList.add("show"), T(11600));
    setTimeout(() => {
      rvSurprise.hidden = false;
      rvSurprise.classList.add("show");
    }, T(13800));
  }

  function spawnRevealParticles() {
    if (REDUCED_MOTION || !rvParticles) return;
    rvParticles.innerHTML = "";
    for (let i = 0; i < 34; i++) {
      const p = document.createElement("span");
      p.className = "rv-petal";
      p.style.left = Math.random() * 100 + "%";
      p.style.setProperty("--dur", (7 + Math.random() * 7) + "s");
      p.style.setProperty("--sw", (Math.random() * 140 - 70) + "px");
      p.style.setProperty("--rot", (300 + Math.random() * 400) + "deg");
      p.style.animationDelay = -(Math.random() * 9) + "s";
      rvParticles.appendChild(p);
    }
    for (let i = 0; i < 26; i++) {
      const s = document.createElement("span");
      s.className = "rv-spark";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = -(Math.random() * 3) + "s";
      rvParticles.appendChild(s);
    }
    for (let i = 0; i < 12; i++) {
      const f = document.createElement("span");
      f.className = "rv-firefly";
      f.style.left = Math.random() * 100 + "%";
      f.style.top = 30 + Math.random() * 60 + "%";
      f.style.setProperty("--fx", (Math.random() * 80 - 40) + "px");
      f.style.setProperty("--fy", (Math.random() * 90 - 45) + "px");
      f.style.setProperty("--fd", (6 + Math.random() * 6) + "s");
      f.style.animationDelay = -(Math.random() * 6) + "s";
      rvParticles.appendChild(f);
    }
  }

  rvSurprise.addEventListener("click", () => {
    try {
      localStorage.setItem("storyJourneyDone", "true");
    } catch (e) {}
    hideStage(revealStage);
    setTimeout(() => showStage(finalStage), 500);
  });

  /* ══════════ BOOK EVENT LISTENERS ══════════ */
  openBtn.addEventListener("click", beginBookOpen);

  const soContinue = document.getElementById("so-continue");
  if (soContinue) {
    soContinue.addEventListener("click", () => {
      if (bookOpenAnimating) return;
      bookOpenAnimating = true;
      opening.classList.add("hiding");
      setTimeout(() => {
        opening.hidden = true;
        showStage(oneMoreStage);
      }, T(1300));
    });
  }

  btnPrev.addEventListener("click", () => {
    if (current === 0) return;
    turnBackward();
  });

  btnNext.addEventListener("click", () => {
    if (current >= TOTAL - 1) {
      startBookClose();
      return;
    }
    turnForward();
  });

  document.addEventListener("keydown", (e) => {
    if (!stage.classList.contains("visible")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (current >= TOTAL - 1) startBookClose();
      else turnForward();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      turnBackward();
    }
  });

  let wheelCooldown = false;
  document.addEventListener(
    "wheel",
    (e) => {
      if (!stage.classList.contains("visible") || wheelCooldown) return;
      wheelCooldown = true;
      setTimeout(() => (wheelCooldown = false), 1200);

      if (e.deltaY > 30) {
        if (current >= TOTAL - 1) startBookClose();
        else turnForward();
      } else if (e.deltaY < -30) {
        turnBackward();
      }
    },
    { passive: true }
  );

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
        if (current >= TOTAL - 1) startBookClose();
        else turnForward();
      } else {
        turnBackward();
      }
    }
  });

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

    if (e.target.closest(".book-nav-btn")) return;

    const midX = bookRect.left + bookRect.width / 2;
    if (e.clientX < midX) {
      turnBackward();
    } else {
      if (current >= TOTAL - 1) startBookClose();
      else turnForward();
    }
  });

  /* ══════════ HELPERS ══════════ */
  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  /* ══════════ MUSIC ══════════ */
  const MUSIC_KEY = "birthdayMusicWanted";
  const MUSIC_SRC = "music/love.mp3";

  const Music = (() => {
    let audio = null,
      fallback = null,
      playing = false;

    function ensureAudio() {
      if (!audio) {
        audio = new Audio(MUSIC_SRC);
        audio.loop = true;
        audio.addEventListener("error", () => {
          audio = null;
        });
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
        const osc = fallback.createOscillator(),
          g = fallback.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        g.gain.value = 0.05 / (i + 1);
        const lfo = fallback.createOscillator(),
          lg = fallback.createGain();
        lfo.frequency.value = 0.1 + Math.random() * 0.08;
        lg.gain.value = 0.02;
        lfo.connect(lg).connect(g.gain);
        osc.connect(g).connect(master);
        osc.start();
        lfo.start();
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
      try {
        hasSrc = !!(a.src && a.src !== window.location.href && !a.error);
      } catch (e) {}
      if (hasSrc) {
        a.play()
          .then(() => fadeVolume(a))
          .catch(() => {
            if (startFallback()) fallback.resume();
          });
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
      try {
        localStorage.setItem(MUSIC_KEY, String(playing));
      } catch (e) {}
      return playing;
    }
    function resumeIfWanted() {
      let wanted = false;
      try {
        wanted = localStorage.getItem(MUSIC_KEY) === "true";
      } catch (e) {}
      if (wanted && !playing) play();
    }
    return {
      toggle,
      resumeIfWanted,
      get playing() {
        return playing;
      },
    };
  })();

  /* ══════════ SOFT SOUND EFFECTS (WebAudio · subtle, gated by music) ══════════ */
  const SFX = (() => {
    let ctx = null;

    function ensure() {
      if (!ctx) {
        const C = window.AudioContext || window.webkitAudioContext;
        if (!C) return null;
        ctx = new C();
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }

    function noiseBurst({ dur = 0.3, freq = 1400, sweepTo = 400, q = 1.2, gain = 0.05 } = {}) {
      const c = ensure();
      if (!c) return;
      const len = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = buf;
      const f = c.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.setValueAtTime(freq, c.currentTime);
      f.frequency.exponentialRampToValueAtTime(sweepTo, c.currentTime + dur);
      f.Q.value = q;
      const g = c.createGain();
      g.gain.setValueAtTime(gain, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      src.connect(f);
      f.connect(g);
      g.connect(c.destination);
      src.start();
      src.stop(c.currentTime + dur + 0.05);
    }

    function tone({ freq = 660, dur = 0.5, gain = 0.05, type = "sine", when = 0 } = {}) {
      const c = ensure();
      if (!c) return;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = type;
      o.frequency.value = freq;
      const t0 = c.currentTime + when;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g);
      g.connect(c.destination);
      o.start(t0);
      o.stop(t0 + dur + 0.05);
    }

    const gate = () => Music.playing;

    return {
      pageTurn() {
        if (!gate()) return;
        noiseBurst({ dur: 0.2, freq: 2200, sweepTo: 700, gain: 0.04, q: 0.9 });
      },
      bookOpen() {
        if (!gate()) return;
        noiseBurst({ dur: 0.55, freq: 900, sweepTo: 240, gain: 0.05, q: 1.1 });
      },
      bookClose() {
        if (!gate()) return;
        noiseBurst({ dur: 0.45, freq: 320, sweepTo: 110, gain: 0.06, q: 1.4 });
      },
      seal() {
        if (!gate()) return;
        noiseBurst({ dur: 0.12, freq: 3400, sweepTo: 1200, gain: 0.05, q: 0.8 });
        noiseBurst({ dur: 0.09, freq: 5200, sweepTo: 2600, gain: 0.03, q: 1 });
      },
      heartbeat() {
        if (!gate()) return;
        tone({ freq: 70, dur: 0.14, gain: 0.12 });
        tone({ freq: 62, dur: 0.16, gain: 0.1, when: 0.22 });
      },
      chime() {
        if (!gate()) return;
        tone({ freq: 880, dur: 0.9, gain: 0.035 });
        tone({ freq: 1320, dur: 0.7, gain: 0.025, when: 0.12 });
        tone({ freq: 1760, dur: 0.5, gain: 0.018, when: 0.24 });
      },
    };
  })();

  function wireMusicPill() {
    const btn = document.getElementById("music-toggle");
    if (!btn) return;
    const syncUI = () => {
      btn.classList.toggle("playing", Music.playing);
      btn.setAttribute("aria-pressed", String(Music.playing));
    };
    btn.addEventListener("click", () => {
      Music.toggle();
      syncUI();
    });
    Music.resumeIfWanted();
    syncUI();
    ["pointerdown", "keydown", "touchstart"].forEach((evt) =>
      document.addEventListener(
        evt,
        function once() {
          Music.resumeIfWanted();
          syncUI();
          ["pointerdown", "keydown", "touchstart"].forEach((ev2) =>
            document.removeEventListener(ev2, once)
          );
        },
        { once: true, passive: true }
      )
    );
  }

  /* ══════════ CURSOR HEART TRAIL ══════════ */
  function initCursorTrail() {
    if (REDUCED_MOTION || !window.matchMedia("(pointer: fine)").matches) return;
    let last = 0;
    document.addEventListener(
      "pointermove",
      (e) => {
        const now = performance.now();
        if (now - last < 130) return;
        last = now;
        const h = document.createElement("span");
        h.className = "bi-cursor-heart";
        h.style.cssText = "position:fixed;z-index:3000;pointer-events:none;";
        h.textContent = Math.random() > 0.75 ? "✨" : "♥";
        h.style.left = e.clientX + "px";
        h.style.top = e.clientY + "px";
        document.body.appendChild(h);
        h.animate(
          [
            { transform: "translate(-50%,-50%) scale(1)", opacity: 0.8 },
            {
              transform: "translate(-50%,-50%) translateY(-34px) scale(0.4)",
              opacity: 0,
            },
          ],
          { duration: 950, easing: "ease-out" }
        ).onfinish = () => h.remove();
      },
      { passive: true }
    );
  }

  /* ══════════ INIT ══════════ */
  buildDust();
  wireMusicPill();
  initCursorTrail();

  // Welcome back — returning visitors who finished the journey
  try {
    if (localStorage.getItem("storyJourneyDone") === "true") {
      if (soWelcome) soWelcome.hidden = false;
      if (soContinue) soContinue.hidden = false;
    }
  } catch (e) {}
})();