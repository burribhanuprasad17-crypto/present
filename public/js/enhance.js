/* ══════════════════════════════════════════════════════════
   Bangaram Micro-Interaction Enhancements
   Beautiful + Romantic + Playful + Cinematic
   ══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  /* ══════════ HOME PAGE ENHANCEMENTS ══════════ */

  // ── Interactive petals: click to burst ──
  function initPetalInteractions() {
    if (RM) return;
    const petalsLayer = document.getElementById("petals-layer");
    if (!petalsLayer) return;

    // Make some petals interactive
    setInterval(() => {
      const petals = petalsLayer.querySelectorAll(".petal:not(.clicking)");
      if (petals.length === 0) return;
      // Pick one random petal to make interactive briefly
      const petal = pick([...petals]);
      petal.classList.add("clicked");
      petal.style.pointerEvents = "auto";
      petal.style.cursor = "pointer";
      
      const clickHandler = (e) => {
        e.stopPropagation();
        petal.removeEventListener("click", clickHandler);
        petal.classList.remove("clicked");
        petal.classList.add("click-burst");
        
        // Spawn sparkle burst at click position
        const rect = petal.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        spawnClickSparkles(cx, cy);
        
        // Spawn tiny hearts
        for (let i = 0; i < 3; i++) {
          setTimeout(() => spawnSurpriseHeart(cx, cy), i * 100);
        }
      };
      
      petal.addEventListener("click", clickHandler, { once: true });
      
      // Remove interactivity after a few seconds if not clicked
      setTimeout(() => {
        if (petal.classList.contains("clicked")) {
          petal.removeEventListener("click", clickHandler);
          petal.classList.remove("clicked");
        }
      }, 4000);
    }, 6000);
  }

  // ── Sparkle burst at a position ──
  function spawnClickSparkles(x, y) {
    const count = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "sparkle-burst";
      const angle = (Math.PI * 2 * i) / count;
      const dist = 20 + Math.random() * 40;
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--sx", Math.cos(angle) * dist + "px");
      s.style.setProperty("--sy", Math.sin(angle) * dist + "px");
      s.style.background = Math.random() > 0.5 
        ? "radial-gradient(circle, #ffd9e6, #f6b6c8)" 
        : "radial-gradient(circle, #fff5d4, #e6c280)";
      s.style.boxShadow = `0 0 ${4 + Math.random() * 4}px ${Math.random() > 0.5 ? "rgba(246,182,200,0.8)" : "rgba(230,194,128,0.8)"}`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  }

  // ── Surprise heart floating up ──
  function spawnSurpriseHeart(x, y) {
    const h = document.createElement("span");
    h.className = "surprise-heart";
    h.textContent = pick(["♥", "♡", "❀", "✿"]);
    h.style.left = (x + rand(-20, 20)) + "px";
    h.style.top = (y + rand(-10, 10)) + "px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }

  // ── Interactive fireflies ──
  function initFireflyInteractions() {
    if (RM) return;
    const particles = document.getElementById("particles");
    if (!particles) return;

    setInterval(() => {
      const flies = particles.querySelectorAll(".firefly:not(.interactive)");
      if (flies.length === 0) return;
      const fly = pick([...flies]);
      fly.classList.add("interactive");
      
      const clickHandler = (e) => {
        e.stopPropagation();
        fly.removeEventListener("click", clickHandler);
        fly.classList.remove("interactive");
        
        const rect = fly.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        // Firefly brightens and leaves sparkle trail
        fly.style.boxShadow = "0 0 24px 8px rgba(212,175,55,1)";
        setTimeout(() => {
          fly.style.boxShadow = "";
        }, 600);
        
        spawnClickSparkles(cx, cy);
      };
      
      fly.addEventListener("click", clickHandler, { once: true });
      
      setTimeout(() => {
        if (fly.classList.contains("interactive")) {
          fly.removeEventListener("click", clickHandler);
          fly.classList.remove("interactive");
        }
      }, 5000);
    }, 8000);
  }

  // ── Surprise moments (infrequent) ──
  function initSurpriseMoments() {
    if (RM) return;

    // Occasional butterfly
    setInterval(() => {
      if (Math.random() > 0.3) return; // only 70% chance each interval
      const bf = document.createElement("span");
      bf.className = "butterfly";
      bf.textContent = pick(["🦋", "🦋"]);
      bf.style.left = rand(10, 60) + "vw";
      bf.style.top = rand(30, 70) + "vh";
      bf.style.animationDuration = rand(5, 8) + "s";
      document.body.appendChild(bf);
      setTimeout(() => bf.remove(), 8000);
    }, 25000);

    // Occasional floating heart from bottom
    setInterval(() => {
      if (Math.random() > 0.4) return;
      const h = document.createElement("span");
      h.className = "surprise-heart";
      h.textContent = pick(["♥", "♡"]);
      h.style.left = rand(15, 85) + "vw";
      h.style.bottom = "-20px";
      h.style.fontSize = rand(12, 20) + "px";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 4000);
    }, 18000);
  }

  // ── Home photo gallery micro-interactions ──
  function initPhotoGalleryInteractions() {
    const imgBox = document.querySelector(".ib-frame");
    if (!imgBox) return;

    // Gentle sparkle on photo change
    const img = document.getElementById("ib-img");
    if (img) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.attributeName === "style" && img.style.opacity === "1") {
            // Photo just appeared - add gentle glow
            imgBox.style.transition = "box-shadow 0.8s ease";
            imgBox.style.boxShadow = "0 24px 60px rgba(75,25,48,.45), 0 0 30px rgba(232,139,168,0.25)";
            setTimeout(() => {
              imgBox.style.boxShadow = "";
            }, 1200);
          }
        });
      });
      observer.observe(img, { attributes: true });
    }

    // Click interaction on the photo frame
    imgBox.addEventListener("click", () => {
      const rect = imgBox.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Tiny sparkle burst
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          spawnClickSparkles(cx + rand(-30, 30), cy + rand(-30, 30));
        }, i * 80);
      }
    });
  }

  /* ══════════ HOME · Photo floating sparkles on transition ══════════ */
  function initPhotoSparkles() {
    if (RM) return;
    const imgBox = document.querySelector(".ib-frame");
    const img = document.getElementById("ib-img");
    if (!imgBox || !img) return;

    // Create a container for sparkles relative to the frame
    const sparkleContainer = document.createElement("div");
    sparkleContainer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:visible;z-index:5;";
    imgBox.style.position = "relative";
    imgBox.appendChild(sparkleContainer);

    let lastOpacity = img.style.opacity;
    setInterval(() => {
      if (img.style.opacity === "1" && lastOpacity !== "1") {
        // Photo just appeared - spawn floating sparkles
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const s = document.createElement("span");
            s.className = "photo-sparkle";
            const gold = Math.random() > 0.5;
            s.style.left = rand(10, 90) + "%";
            s.style.top = rand(10, 90) + "%";
            s.style.setProperty("--sx", rand(-15, 15) + "px");
            s.style.setProperty("--sy", rand(-20, -5) + "px");
            s.style.background = gold
              ? "radial-gradient(circle, #fff5d4, #e6c280)"
              : "radial-gradient(circle, #ffd9e6, #f6b6c8)";
            s.style.boxShadow = `0 0 ${3 + rand(0, 3)}px ${gold ? "rgba(230,194,128,0.8)" : "rgba(246,182,200,0.8)"}`;
            sparkleContainer.appendChild(s);
            setTimeout(() => s.remove(), 1800);
          }, i * 120);
        }
        // Golden glow pulse
        imgBox.classList.add("glow-in");
        setTimeout(() => imgBox.classList.remove("glow-in"), 1400);
      }
      lastOpacity = img.style.opacity;
    }, 200);
  }

  /* ══════════ HOME · Gentle parallax tilt on photo frame ══════════ */
  function initPhotoTilt() {
    if (RM || window.matchMedia("(pointer: fine)").matches === false) return;
    const imgBox = document.querySelector(".ib-frame");
    if (!imgBox) return;
    imgBox.classList.add("tiltable");

    imgBox.addEventListener("pointermove", (e) => {
      const rect = imgBox.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      imgBox.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.01)`;
    }, { passive: true });

    imgBox.addEventListener("pointerleave", () => {
      imgBox.style.transform = "";
    }, { passive: true });
  }

  /* ══════════ HOME · Character peek from photo corners ══════════ */
  function initHomePeekCharacter() {
    if (RM) return;
    const imgBox = document.querySelector(".ib-frame");
    if (!imgBox) return;
    imgBox.style.position = "relative";

    const peekEmojis = ["🙈", "🌸", "✨", "🎀", "🦋", "💫"];
    const positions = [
      { bottom: "8px", right: "8px", transform: "rotate(-10deg)" },
      { bottom: "8px", left: "8px", transform: "rotate(10deg)" },
      { top: "8px", right: "8px", transform: "rotate(10deg)" },
    ];

    setInterval(() => {
      if (Math.random() > 0.35) return;
      const peek = document.createElement("span");
      peek.className = "home-peek";
      peek.textContent = pick(peekEmojis);
      const pos = pick(positions);
      Object.assign(peek.style, pos);
      imgBox.appendChild(peek);

      // Show
      requestAnimationFrame(() => {
        requestAnimationFrame(() => peek.classList.add("show"));
      });

      // Hide after a moment
      setTimeout(() => {
        peek.classList.remove("show");
        peek.classList.add("hide");
        setTimeout(() => peek.remove(), 500);
      }, 2500);
    }, 20000);
  }

  /* ══════════ HOME · Scroll-reveal for sections ══════════ */
  function initScrollReveals() {
    const sections = document.querySelectorAll(".gift-garden, .cta-v3, .home-image-box");
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(s => {
      s.classList.add("reveal-scale");
      obs.observe(s);
    });
  }

  /* ══════════ HOME · Gift box sparkle particles on open ══════════ */
  function initGiftSparkles() {
    if (RM) return;
    const scene = document.getElementById("xmas-scene");
    if (!scene) return;

    // Use event delegation for gift box clicks
    scene.addEventListener("click", (e) => {
      const box = e.target.closest(".gift-box");
      if (!box || box.classList.contains("revealed")) return;

      const rect = box.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Sparkle particles from the box
      setTimeout(() => {
        for (let i = 0; i < 8; i++) {
          const s = document.createElement("span");
          s.className = "gift-sparkle-particle";
          s.style.left = cx + "px";
          s.style.top = cy + "px";
          s.style.setProperty("--gpx", rand(-40, 40) + "px");
          s.style.setProperty("--gpy", rand(-50, -10) + "px");
          const gold = Math.random() > 0.4;
          s.style.background = gold
            ? "radial-gradient(circle, #fff5d4, #e6c280)"
            : "radial-gradient(circle, #ffd9e6, #f6b6c8)";
          s.style.boxShadow = `0 0 ${rand(3, 6)}px ${gold ? "rgba(230,194,128,0.8)" : "rgba(246,182,200,0.8)"}`;
          document.body.appendChild(s);
          setTimeout(() => s.remove(), 900);
        }
      }, 200);
    });
  }

  /* ══════════ MEMORIES PAGE ENHANCEMENTS ══════════ */

  // ── Memory card playful reactions ──
  function initMemoryCardReactions() {
    const vine = document.getElementById("vine");
    if (!vine) return;

    const reactions = ["reacting", "bouncing", "reveal-glow"];
    const peekEmojis = ["🙈", "🌸", "✨", "💫", "🎀", "🌷"];

    vine.addEventListener("click", (e) => {
      const card = e.target.closest(".memory-card");
      if (!card) return;

      // Random reaction type
      const reaction = pick(reactions);
      card.classList.remove("reacting", "bouncing", "reveal-glow");
      
      // Force reflow to restart animation
      void card.offsetWidth;
      
      card.classList.add(reaction);
      
      // Remove reaction class after animation
      setTimeout(() => {
        card.classList.remove(reaction);
      }, 800);

      // Spawn tiny sparkles around the card
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnClickSparkles(cx, cy);
    });

    // Peek character on hover
    vine.addEventListener("pointerenter", (e) => {
      const card = e.target.closest(".memory-card");
      if (!card || card.querySelector(".peek-character")) return;
      
      if (Math.random() > 0.4) return; // Only 60% of cards get a peek

      const peek = document.createElement("span");
      peek.className = "peek-character";
      peek.textContent = pick(peekEmojis);
      card.appendChild(peek);

      // Auto-hide after a moment
      setTimeout(() => {
        if (peek.parentNode) {
          peek.classList.add("hide");
          setTimeout(() => peek.remove(), 400);
        }
      }, 2000);
    }, true);
  }

  // ── Enhanced lightbox entry ──
  function initLightboxEnhancements() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    const frame = lightbox.querySelector(".lightbox-frame");
    if (frame) {
      // Observe when lightbox becomes visible
      const observer = new MutationObserver(() => {
        if (!lightbox.hidden) {
          frame.classList.remove("enhanced-in");
          void frame.offsetWidth;
          frame.classList.add("enhanced-in");
          // Add warm glow pulse
          frame.classList.add("lb-warm-glow");
          setTimeout(() => frame.classList.remove("lb-warm-glow"), 2000);
        }
      });
      observer.observe(lightbox, { attributes: true, attributeFilter: ["hidden"] });
    }
  }

  /* ══════════ MEMORIES · 3D tilt on memory cards ══════════ */
  function initMemoryCardTilt() {
    if (RM || window.matchMedia("(pointer: fine)").matches === false) return;
    const vine = document.getElementById("vine");
    if (!vine) return;

    vine.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".memory-card");
      if (!card) return;
      card.classList.add("tiltable");

      const frame = card.querySelector(".photo-frame");
      if (!frame) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.04)`;
      frame.style.boxShadow = `0 20px 50px rgba(61,16,48,0.5), ${-x * 10}px ${-y * 10}px 30px rgba(232,139,168,0.15)`;
    }, { passive: true });

    vine.addEventListener("pointerleave", (e) => {
      const card = e.target.closest(".memory-card");
      if (!card) return;
      const frame = card.querySelector(".photo-frame");
      if (frame) {
        frame.style.transform = "";
        frame.style.boxShadow = "";
      }
    }, { passive: true });

    // Reset on each card leave
    vine.addEventListener("pointerout", (e) => {
      const card = e.target.closest(".memory-card");
      if (!card) return;
      const frame = card.querySelector(".photo-frame");
      if (frame) {
        frame.style.transform = "";
        frame.style.boxShadow = "";
      }
    }, { passive: true });
  }

  /* ══════════ MEMORIES · Lightbox floating petals ══════════ */
  function initLightboxPetals() {
    if (RM) return;
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    const observer = new MutationObserver(() => {
      if (!lightbox.hidden) {
        spawnLightboxPetals(lightbox);
      }
    });
    observer.observe(lightbox, { attributes: true, attributeFilter: ["hidden"] });
  }

  function spawnLightboxPetals(lightbox) {
    const petalsContainer = document.getElementById("lb-petals");
    if (!petalsContainer) return;

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const p = document.createElement("span");
        p.className = "lb-petal";
        p.style.left = rand(5, 95) + "%";
        p.style.top = rand(-10, 40) + "%";
        p.style.setProperty("--lbpx", rand(-30, 30) + "px");
        p.style.setProperty("--lbpy", rand(30, 80) + "px");
        p.style.width = rand(7, 14) + "px";
        p.style.height = rand(7, 14) + "px";
        petalsContainer.appendChild(p);
        setTimeout(() => p.remove(), 3500);
      }, i * 250);
    }
  }

  /* ══════════ MEMORIES · Add shimmer to memory cards ══════════ */
  function initMemoryShimmer() {
    const vine = document.getElementById("vine");
    if (!vine) return;

    // Add shimmer overlay to each card's photo
    vine.querySelectorAll(".memory-card").forEach(card => {
      const frame = card.querySelector(".photo-frame");
      if (frame) {
        const shimmer = document.createElement("span");
        shimmer.className = "photo-shimmer";
        frame.appendChild(shimmer);
      }
    });
  }

  /* ══════════ STORY PAGE ENHANCEMENTS ══════════ */

  // ── Character expression reactions ──
  function initStoryCharacterExpressions() {
    // Wait for the timeline scene to be visible
    const tlScene = document.getElementById("tl-scene");
    if (!tlScene) return;

    const expressionSets = {
      strangers: ["👀", "🤔"],
      familiar: ["😊", "👋"],
      reason: ["💬", "📱"],
      friends: ["😄", "🤣"],
      journey: ["🌅", "✨"],
      closer: ["💕", "☺️"],
      memories: ["📸", "🌸"],
      silly: ["😜", "😂"],
      together: ["❤️", "🥰"]
    };

    // When timeline scene changes, add character reactions
    const observer = new MutationObserver(() => {
      const chars = tlScene.querySelectorAll(".story-char.show");
      if (chars.length === 0) return;

      // Pick a random character to express
      const char = pick([...chars]);
      const sceneClass = [...tlScene.classList].find(c => c.startsWith("tl-"));
      const sceneKey = sceneClass ? sceneClass.replace("tl-", "") : "friends";
      const expressions = expressionSets[sceneKey] || ["😊"];
      
      // Add expression
      const expr = document.createElement("span");
      expr.className = "sc-expression";
      expr.textContent = pick(expressions);
      char.appendChild(expr);
      char.classList.add("expressing");
      
      setTimeout(() => {
        char.classList.remove("expressing");
        if (expr.parentNode) expr.remove();
      }, 2500);

      // Sometimes add blush
      if (Math.random() > 0.5 && (sceneKey === "closer" || sceneKey === "together" || sceneKey === "memories")) {
        const blush = document.createElement("span");
        blush.className = "sc-blush";
        blush.style.left = "calc(50% - 12px)";
        char.appendChild(blush);
        char.classList.add("blushing");
        
        setTimeout(() => {
          char.classList.remove("blushing");
          if (blush.parentNode) blush.remove();
        }, 3000);
      }

      // Stage-specific character reactions
      if (sceneKey === "familiar") {
        // Characters look at each other, then look away
        setTimeout(() => {
          if (chars[0]) {
            chars[0].classList.add("shy");
            setTimeout(() => chars[0].classList.remove("shy"), 1200);
          }
        }, 1500);
      }
      
      if (sceneKey === "reason") {
        // Typing animation effect - add small bubbles
        setTimeout(() => {
          const bubble = document.createElement("span");
          bubble.className = "tl-bubble fly";
          bubble.textContent = "hey...";
          bubble.style.cssText = "left:45%;top:25%;font-size:11px;animation-delay:0s;";
          tlScene.appendChild(bubble);
          setTimeout(() => {
            if (bubble.parentNode) {
              bubble.textContent = "hey ♥";
              setTimeout(() => {
                if (bubble.parentNode) bubble.remove();
              }, 2000);
            }
          }, 1200);
        }, 800);
      }

      if (sceneKey === "silly") {
        // Characters bounce
        chars.forEach((c, i) => {
          setTimeout(() => {
            c.classList.add("surprised");
            setTimeout(() => c.classList.remove("surprised"), 600);
          }, i * 300);
        });
      }
    });

    observer.observe(tlScene, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  // ── Story environment micro-movements ──
  function initStoryEnvironmentLife() {
    if (RM) return;
    const tlScene = document.getElementById("tl-scene");
    if (!tlScene) return;

    // Add gentle floating elements to scenes
    function addSceneAmbience() {
      const envObjs = tlScene.querySelectorAll(".tl-env-obj");
      envObjs.forEach(obj => {
        if (obj.classList.contains("tl-building") || obj.classList.contains("tl-phone")) {
          // Buildings and phones get subtle breathing
          obj.style.animation = `gentleSway ${4 + Math.random() * 3}s ease-in-out infinite`;
          obj.style.animationDelay = -Math.random() * 3 + "s";
        }
      });
    }

    const sceneObserver = new MutationObserver(() => {
      setTimeout(addSceneAmbience, 200);
    });
    sceneObserver.observe(tlScene, { childList: true });
  }

  // ── Book page photo hover effect ──
  function initBookPhotoEffects() {
    const photoFrame = document.querySelector(".book-stage .photo-frame");
    if (!photoFrame) return;

    photoFrame.addEventListener("click", () => {
      const rect = photoFrame.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Tiny sparkle around the photo
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          spawnClickSparkles(
            cx + rand(-40, 40),
            cy + rand(-40, 40)
          );
        }, i * 100);
      }
    });
  }

  // ── Notes card subtle breathing ──
  function initNotesBreathing() {
    const envelope = document.getElementById("note-envelope");
    if (!envelope) return;

    envelope.addEventListener("click", () => {
      if (envelope.classList.contains("opened")) return;
      
      // Add subtle pulse before opening
      envelope.style.transition = "transform 0.3s ease";
      envelope.style.transform = "scale(1.03)";
      setTimeout(() => {
        envelope.style.transform = "";
      }, 300);
    });
  }

  /* ══════════ STORY · Typing indicator for messages scene ══════════ */
  function initTypingIndicator() {
    if (RM) return;
    const tlScene = document.getElementById("tl-scene");
    if (!tlScene) return;

    const observer = new MutationObserver(() => {
      const sceneClass = [...tlScene.classList].find(c => c.startsWith("tl-"));
      if (sceneClass !== "tl-reason") return;

      // Check if typing dots already exist
      if (tlScene.querySelector(".typing-dots")) return;

      // Show typing indicator
      const typing = document.createElement("span");
      typing.className = "typing-dots";
      typing.style.cssText = "left:30%;top:32%;";
      typing.innerHTML = "<span></span><span></span><span></span>";
      tlScene.appendChild(typing);

      // Remove after a moment
      setTimeout(() => {
        if (typing.parentNode) {
          typing.style.transition = "opacity 0.4s ease";
          typing.style.opacity = "0";
          setTimeout(() => typing.remove(), 400);
        }
      }, 2500);
    });

    observer.observe(tlScene, { childList: true, subtree: true });
  }

  /* ══════════ STORY · Character glances ══════════ */
  function initCharacterGlances() {
    if (RM) return;
    const tlScene = document.getElementById("tl-scene");
    if (!tlScene) return;

    const glanceScenes = ["strangers", "familiar", "reason"];
    const awayScenes = ["familiar", "strangers"];

    const observer = new MutationObserver(() => {
      const sceneClass = [...tlScene.classList].find(c => c.startsWith("tl-"));
      if (!sceneClass) return;
      const sceneKey = sceneClass.replace("tl-", "");

      const chars = tlScene.querySelectorAll(".story-char.show");
      if (chars.length < 2) return;

      if (glanceScenes.includes(sceneKey)) {
        // One character glances at the other
        setTimeout(() => {
          const glanceChar = pick([...chars]);
          glanceChar.classList.add("glancing");
          setTimeout(() => glanceChar.classList.remove("glancing"), 1600);
        }, 1200);
      }

      if (awayScenes.includes(sceneKey)) {
        // After glancing, look away shyly
        setTimeout(() => {
          const lookAwayChar = chars[0];
          if (lookAwayChar) {
            lookAwayChar.classList.add("look-away");
            setTimeout(() => lookAwayChar.classList.remove("look-away"), 1200);
          }
        }, 3000);
      }
    });

    observer.observe(tlScene, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  /* ══════════ STORY · Environmental floating leaves ══════════ */
  function initStoryLeaves() {
    if (RM) return;
    const tlScene = document.getElementById("tl-scene");
    if (!tlScene) return;

    const leaves = ["🍃", "🍂", "🌸", "✿"];

    function spawnLeaf() {
      if (tlScene.hidden || !document.body.contains(tlScene)) return;

      const leaf = document.createElement("span");
      leaf.className = "story-leaf";
      leaf.textContent = pick(leaves);
      leaf.style.left = rand(5, 90) + "%";
      leaf.style.top = rand(5, 40) + "%";
      leaf.style.setProperty("--leafx", rand(-30, 50) + "px");
      leaf.style.setProperty("--leafy", rand(30, 80) + "px");
      tlScene.appendChild(leaf);
      setTimeout(() => leaf.remove(), 8000);
    }

    // Spawn leaves periodically when the scene is visible
    setInterval(() => {
      if (!tlScene.classList.contains("tl-scene") || tlScene.innerHTML === "") return;
      if (Math.random() > 0.4) return;
      spawnLeaf();
    }, 6000);
  }

  /* ══════════ STORY · Light ray shift ══════════ */
  function initStoryLightRays() {
    if (RM) return;
    const tlScene = document.getElementById("tl-scene");
    if (!tlScene) return;

    const warmScenes = ["close", "glow", "together"];

    const observer = new MutationObserver(() => {
      const sceneClass = [...tlScene.classList].find(c => c.startsWith("tl-"));
      if (!sceneClass) return;
      const sceneKey = sceneClass.replace("tl-", "");

      if (warmScenes.includes(sceneKey)) {
        // Spawn a gentle light ray
        const ray = document.createElement("div");
        ray.className = "story-light-ray";
        ray.style.left = rand(20, 80) + "%";
        tlScene.appendChild(ray);
        setTimeout(() => ray.remove(), 6000);
      }
    });

    observer.observe(tlScene, { childList: true });
  }

  /* ══════════ STORY · Cinematic vignette for emotional scenes ══════════ */
  function initCinematicVignette() {
    const tlScene = document.getElementById("tl-scene");
    if (!tlScene) return;

    const emotionalScenes = ["closer", "together", "glow"];

    const observer = new MutationObserver(() => {
      tlScene.classList.remove("cinematic-vignette");
      const sceneClass = [...tlScene.classList].find(c => c.startsWith("tl-"));
      if (!sceneClass) return;
      const sceneKey = sceneClass.replace("tl-", "");

      if (emotionalScenes.includes(sceneKey)) {
        setTimeout(() => tlScene.classList.add("cinematic-vignette"), 400);
      }
    });

    observer.observe(tlScene, { childList: true });
  }

  /* ══════════ BOOT ══════════ */
  function init() {
    // Detect which page we're on
    const isHome = !!document.getElementById("login-form") || !!document.getElementById("home-section");
    const isGallery = !!document.getElementById("vine");
    const isStory = !!document.getElementById("story-opening");

    if (isHome) {
      // Wait for home section to be visible
      const homeSection = document.getElementById("home-section");
      if (homeSection) {
        const observer = new MutationObserver(() => {
          if (!homeSection.hidden) {
            initPetalInteractions();
            initFireflyInteractions();
            initSurpriseMoments();
            initPhotoGalleryInteractions();
            initPhotoSparkles();
            initPhotoTilt();
            initHomePeekCharacter();
            initScrollReveals();
            initGiftSparkles();
            observer.disconnect();
          }
        });
        observer.observe(homeSection, { attributes: true, attributeFilter: ["hidden"] });
        // Also check immediately
        if (!homeSection.hidden) {
          initPetalInteractions();
          initFireflyInteractions();
          initSurpriseMoments();
          initPhotoGalleryInteractions();
          initPhotoSparkles();
          initPhotoTilt();
          initHomePeekCharacter();
          initScrollReveals();
          initGiftSparkles();
        }
      }
    }

    if (isGallery) {
      initMemoryCardReactions();
      initLightboxEnhancements();
      initMemoryCardTilt();
      initLightboxPetals();
      initMemoryShimmer();
    }

    if (isStory) {
      initStoryCharacterExpressions();
      initStoryEnvironmentLife();
      initBookPhotoEffects();
      initNotesBreathing();
      initTypingIndicator();
      initCharacterGlances();
      initStoryLeaves();
      initStoryLightRays();
      initCinematicVignette();
    }
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
