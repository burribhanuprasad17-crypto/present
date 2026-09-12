/* ══════════════════════════════════════════════════════════
   The Book of Us — Complete Story Journey
   Flow: Opening → Notes → Timeline → Letter → Book →
         Book Close → Birthday Reveal → Final Surprise
   ══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const T = (ms) => (REDUCED_MOTION ? 60 : ms);

  /* ── Chapter data (9 chapters, pic1–pic9) ── */
  const CHAPTERS = [
    {
      num: "CHAPTER 01", title: "Where It All Began",
      story: "There are moments that seem ordinary when they happen.\nWe don't know that someday we'll look back at them and realize they quietly became some of our favorite memories.",
      image: "assets/pic1.jpeg", caption: "The beginning of something beautiful.",
    },
    {
      num: "CHAPTER 02", title: "A Little More Than a Moment",
      story: "Sometimes it only takes one look, one conversation, one laugh — and something shifts inside you.\nYou don't notice it right away. But later, you realize it was the start of everything.",
      image: "assets/pic2.jpeg", caption: "Where everything started to change.",
    },
    {
      num: "CHAPTER 03", title: "The Memories We Kept",
      story: "Not every moment needs to be grand to be important.\nSome of the ones we treasure most are quiet, soft, and easy to miss — the kind that only reveal their beauty in hindsight.",
      image: "assets/pic3.jpeg", caption: "Quiet moments, lasting memories.",
    },
    {
      num: "CHAPTER 04", title: "The Smile I Remember",
      story: "There is a smile I carry with me everywhere.\nIt doesn't belong to any one photograph or any single day — it belongs to all the moments that made me grateful you exist.",
      image: "assets/pic4.jpeg", caption: "The smile that stays with me.",
    },
    {
      num: "CHAPTER 05", title: "Somewhere Between Then & Now",
      story: "Time moves differently when you share it with someone special.\nThe ordinary becomes extraordinary, and suddenly the smallest details become the ones you never want to forget.",
      image: "assets/pic5.jpeg", caption: "Where time stood still for a moment.",
    },
    {
      num: "CHAPTER 06", title: "The Moments That Stayed",
      story: "We collect moments the way others collect things.\nAnd the ones that truly stay with us aren't always the loudest — they're the ones that touched something deeper.",
      image: "assets/pic6.jpeg", caption: "The ones that touched my heart.",
    },
    {
      num: "CHAPTER 07", title: "If Memories Could Speak",
      story: "If these memories could talk, they'd tell you what I sometimes struggle to say.\nThat you mean more than words can hold, and that every shared moment has become a part of who I am.",
      image: "assets/pic7.jpeg", caption: "Words that come from the heart.",
    },
    {
      num: "CHAPTER 08", title: "Everything That Became Special",
      story: "What started as something small grew into something neither of us expected.\nEvery conversation, every silence, every shared glance — they all became threads in something beautiful.",
      image: "assets/pic8.jpeg", caption: "Where the ordinary became extraordinary.",
    },
    {
      num: "CHAPTER 09", title: "And This Is Only the Beginning",
      story: "This isn't the end of the story — it's just where the next chapter begins.\nThere are so many pages still unwritten, and I want to write every single one of them with you.",
      image: "assets/pic9.jpeg", caption: "The best is yet to come. ♥",
    },
  ];

  /* ── Things I Never Said (7 notes — NO image on note 2) ── */
  const NOTES = [
    { title: "A Little Thing", text: "You make ordinary days feel like small celebrations. I don't think you ever notice it — but the world around you gets a little softer, a little brighter, just because you're in it." },
    { title: "A Memory", text: "I keep returning to the memories we've made — not because they're perfect, but because they're ours. Every single one of them stays with me. Not a day goes by without one of them crossing my mind." },
    { title: "Something You Changed", text: "You changed the way I see ordinary things. A quiet evening, a random message, a simple laugh — they all mean more now. You made them mean more." },
    { title: "The Silly One", text: "We have jokes that only we understand, and moments that would make no sense to anyone else. I wouldn't trade a single one of them for anything." },
    { title: "Something I'm Grateful For", text: "I'm grateful for you. For your patience with me, for the way you listen, for the person you are when no one is watching. You are someone worth celebrating." },
    { title: "Something I Hope We Never Lose", text: "I hope we never lose the ease of talking to each other. The way we can say anything — or nothing at all — and it still feels like home." },
    { title: "The One I Really Wanted to Say", text: "Somewhere along the way, you stopped being just a part of my life — you became one of the most important parts of my story. I didn't plan it. It just happened. And I wouldn't change it for anything." },
  ];

  /* ── Our story · 9 cinematic timeline scenes ── */
  const TL = [
    {
      num: "01", key: "strangers", title: "Complete Strangers",
      text: "We were complete strangers.\nTwo people living completely separate lives.\nNeither of us knew that someday, our paths would become connected.",
      env: "town",
    },
    {
      num: "02", key: "familiar", title: "Just Someone I Knew",
      text: "Slowly, we became aware of each other.\nNot close. Not inseparable.\nJust two people who knew the other existed.",
      env: "passing",
    },
    {
      num: "03", key: "reason", title: "It Started With a Reason",
      text: "Then came a reason to talk.\nNothing extraordinary.\nWe simply needed each other for something.\nAnd somehow… one conversation became another.",
      env: "messages",
    },
    {
      num: "04", key: "friends", title: "You Became Part of My Every Day",
      text: "We started talking more.\nThen every day.\nConversations became longer.\nRandom things became important.\nAnd without realizing it… we had become friends.",
      env: "daynight",
    },
    {
      num: "05", key: "journey", title: "That One Journey",
      text: "Then came that one journey.\nWe didn't know how much it would change.\nBut somehow, after that journey… everything felt different.\nSomewhere along the way, we stopped feeling like two people who simply knew each other.",
      env: "travel",
    },
    {
      num: "06", key: "closer", title: "Closer Than We Expected",
      text: "It happened so quickly.\nIn such a short time,\nsomehow you became one of the people\nI felt closest to.",
      env: "close",
    },
    {
      num: "07", key: "memories", title: "Collecting Moments",
      text: "Then the memories started piling up.\nEvery moment became a little photograph\nI never wanted to let go of.\nOne beautiful moment after another.",
      env: "photos",
    },
    {
      num: "08", key: "silly", title: "And Then There Was… Us",
      text: "We did so many silly things to each other.\nRandom things. Stupid things.\nThings that wouldn't make sense to anyone else.\nAnd I loved every single one of them.",
      env: "silly",
    },
    {
      num: "09", key: "together", title: "Somewhere Along the Way…",
      text: "Somewhere between the conversations, the journeys, the silly moments, and all those memories…\nAnd somehow, without planning it…\nyou became one of the most important parts of my story.",
      env: "glow",
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
  const notesStage = document.getElementById("notes");
  const timelineStage = document.getElementById("timeline");
  const letterStage = document.getElementById("letter-stage");
  const bookStage = document.getElementById("book-stage");
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
  const bookCloseStage = document.getElementById("book-close");
  const jcBtn = document.getElementById("jc-btn");
  const noteCard = document.getElementById("note-card");
  const notesKicker = document.getElementById("notes-kicker");
  const noteIndex = document.getElementById("note-index");
  const noteTitle = document.getElementById("note-title");
  const noteText = document.getElementById("note-text");
  const notePhoto = document.getElementById("note-photo");
  const noteNext = document.getElementById("note-next");
  const notePrev = document.getElementById("note-prev");
  const notesProgress = document.getElementById("notes-progress");
  const envelopeProgress = document.getElementById("envelope-progress");
  const tlScene = document.getElementById("tl-scene");
  const tlAtmosphere = document.getElementById("tl-atmosphere");
  const tlCount = document.getElementById("tl-count");
  const tlTitle = document.getElementById("tl-title");
  const tlText = document.getElementById("tl-text");
  const tlNext = document.getElementById("tl-next");
  const tlPrev = document.getElementById("tl-prev");
  const tlProgressTrack = document.getElementById("tl-progress-track");
  const ltEnvelope = document.getElementById("lt-envelope");
  const ltLetter = document.getElementById("lt-letter");
  const ltLetterBody = document.getElementById("lt-letter-body");
  const ltNext = document.getElementById("lt-next");
  const revealStage = document.getElementById("reveal");
  const rvParticles = document.getElementById("rv-particles");
  const rvSurprise = document.getElementById("rv-surprise");
  const finalStage = document.getElementById("final-surprise");

  /* ══════════ Stage helpers ══════════ */
  function showStage(el) {
    if (!el) return;
    el.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("visible")));
  }

  function hideStage(el) {
    if (!el) return;
    el.classList.remove("visible");
    setTimeout(() => { el.hidden = true; }, 1500);
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

  /* ══════════ DESK PARTICLES (for notes) ══════════ */
  function buildDeskParticles() {
    const container = document.getElementById("desk-particles");
    if (!container || REDUCED_MOTION) return;
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.className = "desk-spark";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDuration = (3 + Math.random() * 4) + "s";
      s.style.animationDelay = -(Math.random() * 5) + "s";
      container.appendChild(s);
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
    navCounter.textContent = String(index + 1).padStart(2, "0") + " / " + String(TOTAL).padStart(2, "0");
    btnPrev.disabled = index === 0;
    if (index === TOTAL - 1) {
      btnNext.innerHTML = 'Finish <span aria-hidden="true">♥</span>';
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
      setTimeout(() => { turning = false; }, 300);
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
      setTimeout(() => { turning = false; }, 300);
    }, REDUCED_MOTION ? 200 : 700);
  }

  const BOOK_KEY = "bookOfUsChapter";
  function saveChapter(i) { try { localStorage.setItem(BOOK_KEY, String(i)); } catch (e) {} }
  function readChapter() {
    try { const v = parseInt(localStorage.getItem(BOOK_KEY) || "0", 10); if (!isNaN(v)) return Math.max(0, Math.min(TOTAL - 1, v)); } catch (e) {}
    return 0;
  }

  let bookOpenAnimating = false;

  async function openBook() {
    if (bookStarted) return;
    bookStarted = true;
    opening.classList.add("hiding");
    await sleep(T(1200));
    opening.hidden = true;
    bookStage.hidden = false;
    buildProgress();
    current = readChapter();
    renderChapter(current, true);
    await sleep(T(200));
    bookStage.classList.add("visible");
    await showChapterIntro(current);
  }

  /* ══════════ BOOK CLOSES ══════════ */
  function startBookClose() {
    if (bookFinished) return;
    bookFinished = true;
    SFX.bookClose();
    veil.classList.add("run");
    setTimeout(() => {
      bookStage.classList.remove("visible");
      setTimeout(() => { bookStage.hidden = true; }, 1400);
      showStage(bookCloseStage);
      playCloseLines();
      setTimeout(() => veil.classList.remove("run"), 3400);
    }, T(1400));
  }

  function playCloseLines() {
    const lines = [
      { t: "Nine little chapters.", cls: "" },
      { t: "Countless memories.", cls: "soft" },
      { t: "And somehow, all of them became us.", cls: "soft" },
      { t: "This book is closed now…", cls: "rose" },
      { t: "But the story is far from over.", cls: "rose" },
    ];
    const box = document.getElementById("jc-lines");
    box.innerHTML = "";
    lines.forEach((l, i) => {
      setTimeout(() => {
        const p = document.createElement("p");
        p.className = "jc-line" + (l.cls ? " " + l.cls : "");
        p.textContent = l.t;
        box.appendChild(p);
        requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add("show")));
        if (i === lines.length - 1) {
          setTimeout(() => { jcBtn.hidden = false; }, T(1400));
        }
      }, T(700 + i * 2200));
    });
  }

  jcBtn.addEventListener("click", () => {
    hideStage(bookCloseStage);
    setTimeout(() => {
      markBookCompleted();
      showStage(revealStage);
      startReveal();
    }, 500);
  });

  /* ══════════ THINGS I NEVER SAID (Notes) ══════════ */
  let noteIdx = 0;
  let notesComplete = false;

  function startNotes() {
    noteIdx = 0;
    showStage(notesStage);
    buildEnvelopeProgress();
    showNote(0);
  }

  function buildEnvelopeProgress() {
    envelopeProgress.innerHTML = "";
    for (let i = 0; i < NOTES.length; i++) {
      const dot = document.createElement("span");
      dot.className = "env-dot" + (i === 0 ? " active" : "");
      envelopeProgress.appendChild(dot);
    }
  }

  function updateEnvelopeProgress() {
    const dots = envelopeProgress.querySelectorAll(".env-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i <= noteIdx));
  }

  function showNote(i) {
    const n = NOTES[i];
    notesKicker.textContent = "Things I Never Said";
    noteIndex.textContent = "No. " + String(i + 1).padStart(2, "0") + " of 07";
    noteTitle.textContent = n.title;
    noteText.textContent = n.text;

    // Page 2 and others: NO photo
    notePhoto.hidden = true;
    notePhoto.innerHTML = "";

    updateEnvelopeProgress();

    noteCard.classList.remove("show");
    noteNext.classList.remove("show");
    if (notePrev) {
      notePrev.disabled = i === 0;
    }
    // Trigger envelope opening animation
    const envelope = document.getElementById("note-envelope");
    envelope.classList.remove("opened");
    setTimeout(() => {
      envelope.classList.add("opened");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        noteCard.classList.add("show");
        setTimeout(() => noteNext.classList.add("show"), T(800));
      }));
    }, 300);

    const isLast = i === NOTES.length - 1;
    noteNext.textContent = isLast ? "Walk Through Our Story →" : "Next ♥";
    notesProgress.textContent = (i + 1) + " of 7 — one at a time, because each one deserves a moment.";
  }

  if (notePrev) {
    notePrev.addEventListener("click", () => {
      if (noteIdx > 0) {
        noteIdx--;
        showNote(noteIdx);
      }
    });
  }

  noteNext.addEventListener("click", () => {
    if (noteIdx < NOTES.length - 1) {
      noteIdx++;
      showNote(noteIdx);
    } else if (!notesComplete) {
      notesComplete = true;
      saveNotesComplete();
      hideStage(notesStage);
      setTimeout(() => showJourneyTransition(), 500);
    }
  });

  /* ══════════ JOURNEY TRANSITION (Notes → Our Journey) ══════════ */
  function showJourneyTransition() {
    // Create a cinematic transition overlay
    const trans = document.createElement("div");
    trans.className = "journey-stage visible";
    trans.id = "journey-transition";
    trans.style.cssText = "display:grid;place-items:center;overflow:hidden;";
    trans.innerHTML = `
      <button id="jt-back" class="page-back" type="button" style="position:fixed;top:max(16px,env(safe-area-inset-top));left:max(16px,env(safe-area-inset-left));z-index:200;">← Things I Never Said</button>
      <div class="notes-inner" style="max-width:600px;text-align:center;">
        <p id="jt-line1" style="font-family:var(--font-serif);font-style:italic;font-size:clamp(18px,3.2vw,26px);color:var(--cream);opacity:0;transform:translateY(16px);transition:opacity 1.2s ease,transform 1.2s ease;line-height:1.7;">
          Some things can only be understood<br>when you know how the story began&hellip;
        </p>
        <p id="jt-line2" style="font-family:var(--font-display);font-size:clamp(28px,5.5vw,48px);color:var(--cherry);margin-top:40px;opacity:0;transform:translateY(20px);transition:opacity 1.4s ease,transform 1.4s ease;text-shadow:0 0 30px rgba(246,182,200,.6);">
          So let&rsquo;s go back.
        </p>
      </div>
    `;
    document.body.appendChild(trans);

    // Animate in the lines
    setTimeout(() => {
      const line1 = document.getElementById("jt-line1");
      if (line1) { line1.style.opacity = "1"; line1.style.transform = "translateY(0)"; }
    }, 800);
    setTimeout(() => {
      const line2 = document.getElementById("jt-line2");
      if (line2) { line2.style.opacity = "1"; line2.style.transform = "translateY(0)"; }
    }, 3000);
    // Then fade out and start timeline
    setTimeout(() => {
      trans.style.transition = "opacity 1.2s ease";
      trans.style.opacity = "0";
      setTimeout(() => {
        trans.remove();
        startTimeline();
      }, 1200);
    }, 5500);
  }

  /* ══════════ WALK THROUGH OUR STORY (Timeline) ══════════ */
  let tlIndex = 0;
  let timelineComplete = false;

  function startTimeline() {
    tlIndex = 0;
    showStage(timelineStage);
    buildTimelineProgress();
    renderTimelineScene(0);
  }

  function buildTimelineProgress() {
    tlProgressTrack.innerHTML = "";
    for (let i = 0; i < TL.length; i++) {
      const dot = document.createElement("span");
      dot.className = "tl-pdot" + (i === 0 ? " active" : "");
      dot.title = TL[i].title;
      tlProgressTrack.appendChild(dot);
    }
  }

  function updateTimelineProgress() {
    const dots = tlProgressTrack.querySelectorAll(".tl-pdot");
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === tlIndex);
      d.classList.toggle("done", i < tlIndex);
    });
  }

  function renderTimelineScene(i) {
    const st = TL[i];
    tlCount.textContent = String(i + 1).padStart(2, "0") + " / 09";
    tlTitle.textContent = st.title;
    tlText.textContent = st.text;
    tlNext.textContent = i === TL.length - 1 ? "Continue to the Letter ♥" : "Continue →";
    if (tlPrev) {
      tlPrev.disabled = i === 0;
    }
    updateTimelineProgress();

    // Show the UI panel
    const tlUi = document.querySelector(".tl-ui");
    if (tlUi) tlUi.classList.add("show");

    // Build scene environment
    buildTimelineEnvironment(st);
    // Show big line for final scene
    if (st.bigLine) setTimeout(() => showBigLine(st.bigLine), T(2000));
  }

  if (tlPrev) {
    tlPrev.addEventListener("click", () => {
      if (tlIndex > 0) {
        tlIndex--;
        renderTimelineScene(tlIndex);
      }
    });
  }

  function buildTimelineEnvironment(st) {
    tlScene.className = "tl-scene tl-" + st.key;
    tlScene.innerHTML = "";
    tlAtmosphere.className = "tl-atmosphere tl-env-" + st.env;

    // Ground
    const ground = document.createElement("div");
    ground.className = "tl-ground";
    tlScene.appendChild(ground);

    // Environment-specific decorations
    switch (st.env) {
      case "town": buildTownScene(); break;
      case "passing": buildPassingScene(); break;
      case "messages": buildMessagesScene(); break;
      case "daynight": buildDayNightScene(); break;
      case "travel": buildTravelScene(); break;
      case "close": buildCloseScene(); break;
      case "photos": buildPhotosScene(); break;
      case "silly": buildSillyScene(); break;
      case "glow": buildGlowScene(); break;
    }

    // Add characters (except travel which has its own)
    if (st.env !== "travel") {
      addStoryChars(st);
    }

    // Animate in
    requestAnimationFrame(() => requestAnimationFrame(() => {
      tlScene.querySelectorAll(".story-char, .tl-env-obj").forEach(el => el.classList.add("show"));
    }));
  }

  /* ── Character builder ── */
  function makeChar(kind, left, bottom, unit) {
    const el = document.createElement("div");
    el.className = "story-char " + kind;
    el.style.left = left + "%";
    el.style.bottom = (bottom || 16) + (unit || "%");
    el.innerHTML = '<div class="sc-head"></div><div class="sc-body"></div><div class="sc-skirt"></div>';
    return el;
  }

  function addStoryChars(st) {
    const a = makeChar("char-a", 28, 16);
    const b = makeChar("char-b", 64, 16);
    if (st.key === "familiar" || st.key === "memories") { b.classList.add("looking"); }
    if (st.key === "reason" || st.key === "friends" || st.key === "silly") { a.classList.add("talking"); b.classList.add("talking"); }
    if (st.key === "closer") { a.style.left = "38%"; b.style.left = "54%"; }
    if (st.key === "silly") { a.classList.add("bob-a"); b.classList.add("bob-b"); }
    tlScene.appendChild(a);
    tlScene.appendChild(b);
  }

  /* ── Scene builders ── */
  function addEnvObj(cls, css) {
    const el = document.createElement("div");
    el.className = "tl-env-obj " + cls;
    if (css) el.style.cssText = css;
    tlScene.appendChild(el);
    return el;
  }

  function buildTownScene() {
    // Buildings / houses in background
    addEnvObj("tl-building", "left:5%;bottom:22%;width:60px;height:80px;");
    addEnvObj("tl-building", "left:15%;bottom:22%;width:45px;height:60px;");
    addEnvObj("tl-building", "right:8%;bottom:22%;width:55px;height:75px;");
    addEnvObj("tl-building", "right:20%;bottom:22%;width:40px;height:55px;");
    // Stars above
    for (let i = 0; i < 8; i++) {
      addEnvObj("tl-star", "left:" + (10 + Math.random() * 80) + "%;top:" + (5 + Math.random() * 25) + "%;animation-delay:" + (-Math.random() * 3) + "s;");
    }
    // A petal passes between them
    const pass = document.createElement("span");
    pass.className = "tl-petal-pass";
    tlScene.appendChild(pass);
  }

  function buildPassingScene() {
    // Characters face each other from a distance
    addEnvObj("tl-building", "left:3%;bottom:22%;width:50px;height:70px;");
    addEnvObj("tl-building", "right:5%;bottom:22%;width:55px;height:65px;");
    // Small hearts floating
    const heart = document.createElement("span");
    heart.className = "tl-bubble";
    heart.textContent = "♥";
    heart.style.cssText = "left:48%;top:28%;font-size:16px;";
    tlScene.appendChild(heart);
    // Small wave
    const wave = document.createElement("span");
    wave.className = "tl-bubble wave";
    wave.textContent = "👋";
    wave.style.cssText = "left:12%;top:32%;animation-delay:1.6s;";
    tlScene.appendChild(wave);
  }

  function buildMessagesScene() {
    // Chat bubbles floating
    const msgs = [
      { t: "hey ♥", left: "34%", top: "26%", d: "0s" },
      { t: "haha :D", left: "52%", top: "18%", d: "1s" },
      { t: "you there?", left: "32%", top: "40%", d: "2s" },
      { t: "always ♥", left: "54%", top: "36%", d: "3s" },
    ];
    msgs.forEach(m => {
      const b = document.createElement("span");
      b.className = "tl-bubble fly";
      b.textContent = m.t;
      b.style.cssText = "left:" + m.left + ";top:" + m.top + ";animation-delay:" + m.d + ";";
      tlScene.appendChild(b);
    });
    // Phone outlines
    addEnvObj("tl-phone", "left:22%;bottom:28%;");
    addEnvObj("tl-phone", "right:22%;bottom:28%;");
  }

  function buildDayNightScene() {
    // Sun and moon cycle
    addEnvObj("tl-sun", "left:70%;top:10%;");
    addEnvObj("tl-moon", "left:15%;top:12%;");
    // Clouds
    addEnvObj("tl-cloud", "top:18%;width:130px;");
    addEnvObj("tl-cloud", "top:28%;width:170px;animation-delay:-8s;");
    // Stars
    for (let i = 0; i < 5; i++) {
      addEnvObj("tl-star", "left:" + (10 + Math.random() * 80) + "%;top:" + (5 + Math.random() * 20) + "%;");
    }
  }

  function buildTravelScene() {
    // Vehicle / journey
    addEnvObj("tl-road", "");
    addEnvObj("tl-vehicle", "left:35%;bottom:22%;");
    // Scenery passing
    addEnvObj("tl-tree-sil", "left:8%;bottom:28%;");
    addEnvObj("tl-tree-sil", "left:25%;bottom:30%;");
    addEnvObj("tl-tree-sil", "right:10%;bottom:28%;");
    addEnvObj("tl-tree-sil", "right:28%;bottom:32%;");
    // Mountains in background
    addEnvObj("tl-mountain", "left:0;bottom:40%;width:200px;height:90px;");
    addEnvObj("tl-mountain", "right:0;bottom:42%;width:180px;height:80px;");
    // Two characters sitting together
    const a = makeChar("char-a", 40, 24, "%");
    const b = makeChar("char-b", 52, 24, "%");
    a.classList.add("talking");
    b.classList.add("talking");
    tlScene.appendChild(a);
    tlScene.appendChild(b);
  }

  function buildCloseScene() {
    // Characters very close together
    // Warm lighting
    addEnvObj("tl-warm-glow", "");
    // Small floating hearts
    for (let i = 0; i < 5; i++) {
      addEnvObj("tl-float-heart", "left:" + (20 + Math.random() * 60) + "%;top:" + (15 + Math.random() * 40) + "%;animation-delay:" + (-Math.random() * 4) + "s;");
    }
  }

  function buildPhotosScene() {
    // Floating polaroids
    const pics = ["pic1.jpeg", "pic3.jpeg", "pic5.jpeg", "pic7.jpeg", "pic9.jpeg"];
    const spots = [
      { left: "8%", top: "18%", rot: "-6deg", d: "0s" },
      { left: "22%", top: "8%", rot: "5deg", d: "-1.4s" },
      { left: "40%", top: "14%", rot: "-3deg", d: "-2.6s" },
      { left: "62%", top: "6%", rot: "7deg", d: "-3.4s" },
      { left: "78%", top: "16%", rot: "-5deg", d: "-4.2s" },
    ];
    spots.forEach((s, i) => {
      const p = document.createElement("div");
      p.className = "tl-polaroid";
      p.style.cssText = "left:" + s.left + ";top:" + s.top + ";--rot:" + s.rot + ";animation-delay:" + s.d + ";";
      const img = document.createElement("img");
      img.src = "assets/" + pics[i];
      img.alt = "a memory";
      img.loading = "lazy";
      p.appendChild(img);
      tlScene.appendChild(p);
    });
  }

  function buildSillyScene() {
    // Playful emojis bouncing
    const items = [
      { t: "😂", left: "15%", top: "22%" }, { t: "🎉", left: "28%", top: "10%" },
      { t: "💛", left: "44%", top: "18%" }, { t: "😜", left: "60%", top: "8%" },
      { t: "✨", left: "74%", top: "20%" }, { t: "🥳", left: "84%", top: "14%" },
    ];
    items.forEach((it, i) => {
      const s = document.createElement("span");
      s.className = "tl-silly-item";
      s.textContent = it.t;
      s.style.cssText = "left:" + it.left + ";top:" + it.top + ";animation-delay:" + (i * 0.4) + "s;";
      tlScene.appendChild(s);
    });
    // Laughter bubble
    const laugh = document.createElement("span");
    laugh.className = "tl-bubble laugh fly";
    laugh.textContent = "😂😂";
    laugh.style.cssText = "left:44%;top:30%;animation-delay:1.2s;";
    tlScene.appendChild(laugh);
  }

  function buildGlowScene() {
    // Warm glow, all memories floating softly
    addEnvObj("tl-warm-glow", "");
    addEnvObj("tl-glow", "");
    // All previous photos softly
    const pics = ["pic1.jpeg", "pic3.jpeg", "pic5.jpeg", "pic7.jpeg", "pic9.jpeg"];
    pics.forEach((src, i) => {
      const p = document.createElement("div");
      p.className = "tl-polaroid mini";
      p.style.cssText = "left:" + (10 + i * 18) + "%;top:" + (10 + (i % 2) * 8) + "%;--rot:" + ((i % 2 ? 3 : -3)) + "deg;animation-delay:" + (-i * 0.8) + "s;opacity:.5;";
      const img = document.createElement("img");
      img.src = "assets/" + src;
      img.alt = "";
      img.loading = "lazy";
      p.appendChild(img);
      tlScene.appendChild(p);
    });
  }

  function showBigLine(text) {
    const bl = document.createElement("div");
    bl.className = "tl-bigline";
    bl.textContent = text;
    tlScene.appendChild(bl);
    requestAnimationFrame(() => requestAnimationFrame(() => bl.classList.add("show")));
    setTimeout(() => bl.remove(), T(5000));
  }

  tlNext.addEventListener("click", () => {
    if (tlIndex < TL.length - 1) {
      tlIndex++;
      renderTimelineScene(tlIndex);
    } else if (!timelineComplete) {
      timelineComplete = true;
      saveTimelineComplete();
      hideStage(timelineStage);
      setTimeout(startLetter, 500);
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
        requestAnimationFrame(() => requestAnimationFrame(() => ltLetter.classList.add("show")));
        setTimeout(() => {
          ltNext.hidden = false;
          ltNext.classList.add("show");
        }, T(1800));
      }, 600);
    }, T(1500));
  });

  ltNext.addEventListener("click", () => {
    saveLetterOpened();
    hideStage(letterStage);
    setTimeout(startBookFromLetter, 500);
  });

  async function startBookFromLetter() {
    bookStarted = false;
    bookFinished = false;
    bookStage.hidden = false;
    buildProgress();
    current = readChapter();
    renderChapter(current, true);
    await sleep(T(200));
    bookStage.classList.add("visible");
    await showChapterIntro(current);
  }

  /* ══════════ BIRTHDAY REVEAL ══════════ */
  function startReveal() {
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
    hideStage(revealStage);
    setTimeout(() => showStage(finalStage), 500);
  });

  /* ══════════ BOOK EVENT LISTENERS ══════════ */
  openBtn.addEventListener("click", () => {
    if (bookOpenAnimating) return;
    bookOpenAnimating = true;
    SFX.bookOpen();
    opening.classList.add("opening-book");
    setTimeout(() => openBookToNotes(), T(1600));
  });

  async function openBookToNotes() {
    opening.classList.add("hiding");
    await sleep(T(1200));
    opening.hidden = true;
    startNotes();
  }

  const soContinue = document.getElementById("so-continue");
  if (soContinue) {
    soContinue.addEventListener("click", () => {
      if (bookOpenAnimating) return;
      bookOpenAnimating = true;
      opening.classList.add("hiding");
      setTimeout(() => {
        opening.hidden = true;
        // Resume from saved state
        if (isBookCompleted()) {
          showStage(revealStage);
          startReveal();
        } else if (isLetterOpened()) {
          startBookFromLetter();
        } else if (isTimelineComplete()) {
          startLetter();
        } else if (isNotesComplete()) {
          startTimeline();
        } else {
          startNotes();
        }
      }, T(1300));
    });
  }

  btnPrev.addEventListener("click", () => { if (current === 0) return; turnBackward(); });
  btnNext.addEventListener("click", () => {
    if (current >= TOTAL - 1) { startBookClose(); return; }
    turnForward();
  });

  document.addEventListener("keydown", (e) => {
    if (!bookStage.classList.contains("visible")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      if (current >= TOTAL - 1) startBookClose(); else turnForward();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      turnBackward();
    }
  });

  let wheelCooldown = false;
  document.addEventListener("wheel", (e) => {
    if (!bookStage.classList.contains("visible") || wheelCooldown) return;
    wheelCooldown = true;
    setTimeout(() => (wheelCooldown = false), 1200);
    if (e.deltaY > 30) { if (current >= TOTAL - 1) startBookClose(); else turnForward(); }
    else if (e.deltaY < -30) { turnBackward(); }
  }, { passive: true });

  let touchStartX = 0, touchStartY = 0;
  document.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (!bookStage.classList.contains("visible")) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) { if (current >= TOTAL - 1) startBookClose(); else turnForward(); }
      else { turnBackward(); }
    }
  });

  document.addEventListener("click", (e) => {
    if (!bookStage.classList.contains("visible")) return;
    const bookRect = book.getBoundingClientRect();
    if (e.clientX < bookRect.left || e.clientX > bookRect.right || e.clientY < bookRect.top || e.clientY > bookRect.bottom) return;
    if (e.target.closest(".book-nav-btn")) return;
    const midX = bookRect.left + bookRect.width / 2;
    if (e.clientX < midX) { turnBackward(); }
    else { if (current >= TOTAL - 1) startBookClose(); else turnForward(); }
  });

  /* ══════════ HELPERS ══════════ */
  function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

  /* ══════════ STATE MANAGEMENT ══════════ */
  const STATE_KEYS = {
    notesComplete: "storyNotesComplete",
    timelineComplete: "storyTimelineComplete",
    letterOpened: "storyLetterOpened",
    bookCompleted: "storyBookCompleted",
  };

  function saveNotesComplete() { try { localStorage.setItem(STATE_KEYS.notesComplete, "true"); } catch (e) {} }
  function saveTimelineComplete() { try { localStorage.setItem(STATE_KEYS.timelineComplete, "true"); } catch (e) {} }
  function saveLetterOpened() { try { localStorage.setItem(STATE_KEYS.letterOpened, "true"); } catch (e) {} }
  function markBookCompleted() { try { localStorage.setItem(STATE_KEYS.bookCompleted, "true"); } catch (e) {} }

  function isNotesComplete() { try { return localStorage.getItem(STATE_KEYS.notesComplete) === "true"; } catch (e) { return false; } }
  function isTimelineComplete() { try { return localStorage.getItem(STATE_KEYS.timelineComplete) === "true"; } catch (e) { return false; } }
  function isLetterOpened() { try { return localStorage.getItem(STATE_KEYS.letterOpened) === "true"; } catch (e) { return false; } }
  function isBookCompleted() { try { return localStorage.getItem(STATE_KEYS.bookCompleted) === "true"; } catch (e) { return false; } }

  /* ══════════ MUSIC ══════════ */
  const MUSIC_KEY = "birthdayMusicWanted";
  const MUSIC_SRC = "music/love.mp3";

  const Music = (() => {
    let audio = null, fallback = null, playing = false;

    function ensureAudio() {
      if (!audio) { audio = new Audio(MUSIC_SRC); audio.loop = true; audio.addEventListener("error", () => { audio = null; }); }
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
        lfo.frequency.value = 0.1 + Math.random() * 0.08; lg.gain.value = 0.02;
        lfo.connect(lg).connect(g.gain);
        osc.connect(g).connect(master);
        osc.start(); lfo.start();
      });
      master.gain.linearRampToValueAtTime(0.5, fallback.currentTime + 3);
      return true;
    }
    function fadeVolume(a) {
      a.volume = 0;
      const fade = setInterval(() => { a.volume = Math.min(0.6, a.volume + 0.05); if (a.volume >= 0.6) clearInterval(fade); }, 150);
    }
    function play() {
      const a = ensureAudio();
      let hasSrc = false;
      try { hasSrc = !!(a.src && a.src !== window.location.href && !a.error); } catch (e) {}
      if (hasSrc) { a.play().then(() => fadeVolume(a)).catch(() => { if (startFallback()) fallback.resume(); }); }
      else if (startFallback()) fallback.resume();
      playing = true;
    }
    function pause() { if (audio) audio.pause(); if (fallback) fallback.suspend(); playing = false; }
    function toggle() { playing ? pause() : play(); try { localStorage.setItem(MUSIC_KEY, String(playing)); } catch (e) {} return playing; }
    function resumeIfWanted() { let wanted = false; try { wanted = localStorage.getItem(MUSIC_KEY) === "true"; } catch (e) {} if (wanted && !playing) play(); }
    return { toggle, resumeIfWanted, get playing() { return playing; } };
  })();

  /* ══════════ SOUND EFFECTS ══════════ */
  const SFX = (() => {
    let ctx = null;
    function ensure() {
      if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }
    function noiseBurst({ dur = 0.3, freq = 1400, sweepTo = 400, q = 1.2, gain = 0.05 } = {}) {
      const c = ensure(); if (!c) return;
      const len = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource(); src.buffer = buf;
      const f = c.createBiquadFilter(); f.type = "bandpass";
      f.frequency.setValueAtTime(freq, c.currentTime);
      f.frequency.exponentialRampToValueAtTime(sweepTo, c.currentTime + dur);
      f.Q.value = q;
      const g = c.createGain();
      g.gain.setValueAtTime(gain, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      src.connect(f); f.connect(g); g.connect(c.destination);
      src.start(); src.stop(c.currentTime + dur + 0.05);
    }
    function tone({ freq = 660, dur = 0.5, gain = 0.05, type = "sine", when = 0 } = {}) {
      const c = ensure(); if (!c) return;
      const o = c.createOscillator(); const g = c.createGain();
      o.type = type; o.frequency.value = freq;
      const t0 = c.currentTime + when;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(c.destination);
      o.start(t0); o.stop(t0 + dur + 0.05);
    }
    const gate = () => Music.playing;
    return {
      pageTurn() { if (!gate()) return; noiseBurst({ dur: 0.2, freq: 2200, sweepTo: 700, gain: 0.04, q: 0.9 }); },
      bookOpen() { if (!gate()) return; noiseBurst({ dur: 0.55, freq: 900, sweepTo: 240, gain: 0.05, q: 1.1 }); },
      bookClose() { if (!gate()) return; noiseBurst({ dur: 0.45, freq: 320, sweepTo: 110, gain: 0.06, q: 1.4 }); },
      seal() { if (!gate()) return; noiseBurst({ dur: 0.12, freq: 3400, sweepTo: 1200, gain: 0.05, q: 0.8 }); noiseBurst({ dur: 0.09, freq: 5200, sweepTo: 2600, gain: 0.03, q: 1 }); },
      heartbeat() { if (!gate()) return; tone({ freq: 70, dur: 0.14, gain: 0.12 }); tone({ freq: 62, dur: 0.16, gain: 0.1, when: 0.22 }); },
      chime() { if (!gate()) return; tone({ freq: 880, dur: 0.9, gain: 0.035 }); tone({ freq: 1320, dur: 0.7, gain: 0.025, when: 0.12 }); tone({ freq: 1760, dur: 0.5, gain: 0.018, when: 0.24 }); },
    };
  })();

  /* ══════════ MUSIC PILL ══════════ */
  function wireMusicPill() {
    const btn = document.getElementById("music-toggle");
    if (!btn) return;
    const syncUI = () => { btn.classList.toggle("playing", Music.playing); btn.setAttribute("aria-pressed", String(Music.playing)); };
    btn.addEventListener("click", () => { Music.toggle(); syncUI(); });
    Music.resumeIfWanted(); syncUI();
    ["pointerdown", "keydown", "touchstart"].forEach(evt =>
      document.addEventListener(evt, function once() { Music.resumeIfWanted(); syncUI(); ["pointerdown", "keydown", "touchstart"].forEach(ev2 => document.removeEventListener(ev2, once)); }, { once: true, passive: true })
    );
  }

  /* ══════════ CURSOR HEART TRAIL ══════════ */
  function initCursorTrail() {
    if (REDUCED_MOTION || !window.matchMedia("(pointer: fine)").matches) return;
    let last = 0;
    document.addEventListener("pointermove", (e) => {
      const now = performance.now(); if (now - last < 130) return; last = now;
      const h = document.createElement("span");
      h.className = "bi-cursor-heart";
      h.style.cssText = "position:fixed;z-index:3000;pointer-events:none;";
      h.textContent = Math.random() > 0.75 ? "✨" : "♥";
      h.style.left = e.clientX + "px"; h.style.top = e.clientY + "px";
      document.body.appendChild(h);
      h.animate([{ transform: "translate(-50%,-50%) scale(1)", opacity: 0.8 }, { transform: "translate(-50%,-50%) translateY(-34px) scale(0.4)", opacity: 0 }], { duration: 950, easing: "ease-out" }).onfinish = () => h.remove();
    }, { passive: true });
  }

  /* ══════════ BACK BUTTONS ══════════ */
  function wireBackButtons() {
    // Notes back → go to Home
    const notesBack = document.getElementById("notes-back");
    if (notesBack) notesBack.addEventListener("click", () => { window.location.href = "home.html#home-top"; });

    // Timeline back → go to Notes
    const timelineBack = document.getElementById("timeline-back");
    if (timelineBack) timelineBack.addEventListener("click", () => {
      hideStage(timelineStage);
      setTimeout(() => {
        // Reset notes state so they can be viewed again
        noteIdx = 0;
        notesComplete = false;
        startNotes();
      }, 500);
    });

    // Add back button to journey transition
    document.addEventListener("click", (e) => {
      const backBtn = e.target.closest("#jt-back");
      if (!backBtn) return;
      const trans = document.getElementById("journey-transition");
      if (trans) {
        trans.style.transition = "opacity .6s ease";
        trans.style.opacity = "0";
        setTimeout(() => {
          trans.remove();
          noteIdx = 0;
          notesComplete = false;
          startNotes();
        }, 600);
      }
    });

    // Letter back → go to Timeline
    const letterBack = document.getElementById("letter-back");
    if (letterBack) letterBack.addEventListener("click", () => {
      hideStage(letterStage);
      setTimeout(() => {
        // Reset timeline state
        tlIndex = 0;
        timelineComplete = false;
        startTimeline();
      }, 500);
    });

    // Book back → go to Letter
    const bookBack = document.getElementById("book-back");
    if (bookBack) bookBack.addEventListener("click", () => {
      hideStage(bookStage);
      setTimeout(() => {
        // Reset letter state
        ltEnvelope.classList.remove("opened");
        ltEnvelope.style.display = "";
        ltEnvelope.style.opacity = "";
        ltEnvelope.style.transition = "";
        ltLetter.hidden = true;
        ltLetter.classList.remove("show");
        ltNext.hidden = true;
        ltNext.classList.remove("show");
        startLetter();
      }, 500);
    });
  }

  wireBackButtons();

  /* ══════════ INIT ══════════ */
  buildDust();
  buildDeskParticles();
  wireMusicPill();
  initCursorTrail();

  // Welcome back — returning visitors who finished the journey
  try {
    if (isBookCompleted()) {
      if (soWelcome) soWelcome.hidden = false;
      if (soContinue) soContinue.hidden = false;
    }
  } catch (e) {}
})();
