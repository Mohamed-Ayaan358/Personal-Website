import { initCardSparkles } from "./card-sparkles.js";
import { buildCheckers } from "./checkers-game.js";
import { initSocialPack } from "./social-pack.js";
import { buildTable } from "./project-table.js";
import { buildBackground } from "./chess-background.js";
import { buildPromotion } from "./promotion-flight.js";
import { projects } from "./projects.js";
import { formatBlog } from "./reader-format.js";
export async function initializePortfolio(isDisposed = () => false) {
  if (isDisposed()) return;
  const cleanups = [];
  let frameId;
  function listen(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    cleanups.push(() => target.removeEventListener(event, handler, options));
  }
  function stop() {
    cancelAnimationFrame(frameId);
    cleanups.splice(0).forEach((cleanup) => cleanup());
  }

  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;

  let THREE,
    background,
    table,
    checkers,
    promotion,
    selected = -1,
    busy = false,
    dealId = 0;
  const captured = new Set(),
    motions = [];
  let posts = [];
  const postsReady = fetch("/posts.json", { cache: "no-store" })
    .then((r) => {
      if (!r.ok) throw Error("Posts unavailable");
      return r.json();
    })
    .then((p) => (posts = p))
    .catch(() => {
      posts = [];
    });
  function tween(ms, update, done) {
    const motion = {
      start: performance.now(),
      ms,
      update,
      done,
      cancelled: false,
    };
    if (reduced) {
      update(1);
      done?.();
      return motion;
    }
    motions.push(motion);
    return motion;
  }
  function status(s) {
    $("#checker-status").textContent = s;
  }
  function chooseStory(i) {
    if (busy) return;
    selected = i;
    $$("[data-post]").forEach((b, j) => b.classList.toggle("active", i === j));
    $("#capture-button").disabled = false;
    $("#capture-button").textContent =
      "QUICK READ · " + String(i + 1).padStart(2, "0") + " ↗";
    status(
      "Piece " +
        (i + 1) +
        " selected. Drag it diagonally or click a marked square.",
    );
    checkers?.select(i);
  }
  async function openStory(i, origin) {
    await postsReady;
    const p = posts[i];
    if (!p) {
      status("The reader could not load. Try resetting the board.");
      return;
    }
    $("#reader-number").textContent = "0" + (i + 1);
    $("#reader-meta").textContent = p.date + " / FROM THE BLOG";
    $("#reader-title").textContent = p.title;
    $("#reader-body").innerHTML = p.markdown ? formatBlog(p.markdown) : p.body;
    $("#reader-body")
      .querySelectorAll("a")
      .forEach((a) => {
        const href = a.getAttribute("href");
        if (href && !href.startsWith("#"))
          a.href = new URL(href, location.origin + "/blog/" + p.slug).href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      });
    $("#reader-body")
      .querySelectorAll("img")
      .forEach((img) => {
        img.src = new URL(
          img.getAttribute("src"),
          location.origin + "/blog/" + p.slug,
        ).href;
        img.loading = "lazy";
      });
    $("#original-post").href = "/blog/" + p.slug;
    const reader = $("#reader");
    reader.getAnimations().forEach((a) => a.cancel());
    reader.classList.add("arrived");
    reader.showModal();
    $(".reader-scroll").scrollTop = 0;
    if (!reduced) {
      const dest = reader.getBoundingClientRect(),
        r = origin?.rect,
        dx = r ? r.left + r.width / 2 - (dest.left + dest.width / 2) : 0,
        dy = r ? r.top + r.height / 2 - (dest.top + dest.height / 2) : 18,
        sx = r ? Math.max(0.05, r.width / dest.width) : 0.96,
        sy = r ? Math.max(0.05, r.height / dest.height) : 0.96;
      reader.animate(
        [
          {
            transform:
              "translate(" +
              dx +
              "px," +
              dy +
              "px) scale(" +
              sx +
              "," +
              sy +
              ") rotate(-6deg)",
            opacity: r ? 1 : 0,
          },
          { transform: "translate(0,0) scale(1) rotate(0)", opacity: 1 },
        ],
        { duration: 760, easing: "cubic-bezier(.16,.8,.2,1)" },
      );
      $(".reader-scroll").animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 420,
        delay: 180,
        fill: "backwards",
      });
    }
    $("#close-reader").focus();
  }
  function unlock(i, origin) {
    captured.add(i);
    $$("[data-post]")[i].classList.add("captured");
    busy = false;
    status("Captured thought " + (i + 1) + ". Your piece can keep moving.");
    openStory(i, origin);
  }
  $$("[data-post]").forEach((b) =>
    listen(b, "click", () => chooseStory(+b.dataset.post)),
  );
  listen($("#capture-button"), "click", () => {
    if (selected >= 0 && !busy) openStory(selected);
  });
  listen($("#move-left"), "click", () => checkers?.direction(-1));
  listen($("#move-right"), "click", () => checkers?.direction(1));
  listen($("#reset-checkers"), "click", () => {
    if (busy) return;
    selected = -1;
    captured.clear();
    checkers?.reset();
    $$("[data-post]").forEach((b) => b.classList.remove("active", "captured"));
    $("#capture-button").disabled = true;
    $("#capture-button").textContent = "QUICK READ · SELECT A PIECE";
    $("#move-left").disabled = true;
    $("#move-right").disabled = true;
    status(
      "Drag a numbered piece diagonally, or select it and click a highlighted square.",
    );
  });
  listen($("#close-reader"), "click", () => $("#reader").close());
  listen($("#reader"), "click", (e) => {
    const r = $("#reader").getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      $("#reader").close();
  });
  let requestedProject = -1;
  function deal(i) {
    if (i === requestedProject) return;
    requestedProject = i;
    const p = projects[i],
      id = ++dealId;
    // Keep the old card out of the hand until the dealer actually returns it.
    $$("[data-project]").forEach((button, index) => {
      button.classList.remove("in-flight", "returning");
      button.classList.toggle("selected", index === i);
    });
    const source = $$("[data-project]")[i];
    source.classList.add("in-flight");
    $("#github-link").hidden = true;
    $("#language-labels").replaceChildren();
    $("#deal-count").textContent = "IN PLAY / " + p.name.toUpperCase();
    function pulled() {
      if (id !== dealId) return;
      source.classList.remove("in-flight");
      source.classList.add("played");
      source.hidden = true;
      source.disabled = true;
      source.tabIndex = -1;
      source.setAttribute("aria-hidden", "true");
    }
    function done() {
      if (id !== dealId) return;
      if (!source.classList.contains("played")) pulled();
      $("#project-status").textContent =
        p.name + " · your stack is on the table";
      $("#language-labels").replaceChildren();
      p.languages.forEach((l) => {
        const el = document.createElement("span");
        el.textContent = l;
        $("#language-labels").append(el);
      });
      $("#github-link").href = "https://github.com/Mohamed-Ayaan358/" + p.repo;
      $("#github-link").hidden = false;
    }
    function exchangeHand() {
      if (id !== dealId) return;
      pulled();
      $$("[data-project]").forEach((button, index) => {
        if (index === i) return;
        const wasPlayed = button.classList.contains("played");
        button.classList.remove("played", "in-flight");
        button.hidden = false;
        button.disabled = false;
        button.tabIndex = 0;
        button.removeAttribute("aria-hidden");
        if (wasPlayed) button.classList.add("returning");
      });
    }
    if (table) table.deal(p, done, pulled, exchangeHand);
    else
      tween(
        700,
        () => {},
        () => {
          exchangeHand();
          done();
        },
      );
  }
  $$("[data-project]").forEach((b) =>
    listen(b, "click", () => deal(+b.dataset.project)),
  );
  const revealedRoles = new Set();
  $$("[data-role]").forEach((button) =>
    listen(button, "click", () => {
      const id = +button.dataset.role;
      button.classList.toggle("revealed");
      const revealed = button.classList.contains("revealed");
      button.setAttribute("aria-expanded", String(revealed));
      button
        .querySelector(".role-front")
        .setAttribute("aria-hidden", String(revealed));
      button
        .querySelector(".role-back")
        .setAttribute("aria-hidden", String(!revealed));
      button.setAttribute(
        "aria-label",
        (revealed ? "Hide" : "Reveal") + " role " + (id + 1),
      );
      if (revealed) revealedRoles.add(id);
      else revealedRoles.delete(id);
      $("#role-progress").textContent =
        revealedRoles.size + " / 3 ROLES REVEALED";
      $("#role-clue").textContent =
        revealedRoles.size === 3
          ? "CASE CLOSED. All three roles belong to Mohamed Ayaan."
          : "A builder, a student, a thinker. Who is behind each card?";
    }),
  );
  listen($("#reset-roles"), "click", () => {
    revealedRoles.clear();
    $$("[data-role]").forEach((b, i) => {
      b.classList.remove("revealed");
      b.setAttribute("aria-expanded", "false");
      b.querySelector(".role-front").setAttribute("aria-hidden", "false");
      b.querySelector(".role-back").setAttribute("aria-hidden", "true");
      b.setAttribute("aria-label", "Reveal role " + (i + 1));
    });
    $("#role-progress").textContent = "0 / 3 ROLES REVEALED";
    $("#role-clue").textContent =
      "A builder, a student, a thinker. Who is behind each card?";
  });
  const socialPack = initSocialPack({ tween, reduced, listen });
  cleanups.push(initCardSparkles({ projects, reduced }) || (() => {}));
  cleanups.push(socialPack.destroy);
  function makeScene(el, position, span) {
    const scene = new THREE.Scene(),
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    el.append(renderer.domElement);
    const camera = new THREE.OrthographicCamera(
      -span,
      span,
      span,
      -span,
      0.1,
      100,
    );
    camera.position.set(...position);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x888174, 2.8));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(4, 12, 8);
    scene.add(light);
    function resize() {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.left = (-span * w) / h;
      camera.right = (span * w) / h;
      camera.top = span;
      camera.bottom = -span;
      camera.updateProjectionMatrix();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    cleanups.push(() => {
      observer.disconnect();
      renderer.dispose();
      renderer.domElement.remove();
      if (el.id === "promotion-flight") el.remove();
      scene.traverse((o) => {
        o.geometry?.dispose();
        const materials = Array.isArray(o.material) ? o.material : [o.material];
        materials.forEach((m) => m?.dispose());
      });
    });
    resize();
    return {
      scene,
      camera,
      renderer,
      el,
      render() {
        renderer.render(scene, camera);
      },
    };
  }
  function material(color) {
    return new THREE.MeshStandardMaterial({
      color,
      roughness: 0.65,
      metalness: 0.08,
    });
  }
  const mats = {};
  function mesh(geometry, mat, parent, x = 0, y = 0, z = 0) {
    const m = new THREE.Mesh(geometry, mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  }
  function disc(parent, r, h, mat, x = 0, y = 0, z = 0) {
    return mesh(new THREE.CylinderGeometry(r, r, h, 40), mat, parent, x, y, z);
  }
  function chessPiece(kind, white) {
    const group = new THREE.Group(),
      mat = white ? mats.white : mats.black;
    disc(group, 0.3, 0.12, mat, 0, 0.09);
    disc(group, 0.24, 0.08, mat, 0, 0.19);
    mesh(new THREE.CylinderGeometry(0.11, 0.2, 0.42, 32), mat, group, 0, 0.42);
    disc(group, 0.21, 0.07, mat, 0, 0.67);
    if (kind === "pawn")
      mesh(new THREE.SphereGeometry(0.18, 24, 16), mat, group, 0, 0.85);
    if (kind === "rook") {
      disc(group, 0.22, 0.26, mat, 0, 0.82);
      for (let i = 0; i < 4; i++)
        mesh(
          new THREE.BoxGeometry(0.12, 0.12, 0.12),
          mat,
          group,
          Math.cos((i * Math.PI) / 2) * 0.17,
          1,
          Math.sin((i * Math.PI) / 2) * 0.17,
        );
    }
    if (kind === "bishop") {
      mesh(new THREE.SphereGeometry(0.2, 24, 16), mat, group, 0, 0.84).scale.y =
        1.5;
      mesh(new THREE.SphereGeometry(0.07, 16, 12), mat, group, 0, 1.12);
    }
    if (kind === "knight") {
      const neck = mesh(
        new THREE.BoxGeometry(0.22, 0.43, 0.23),
        mat,
        group,
        0,
        0.83,
      );
      neck.rotation.z = -0.25;
      mesh(new THREE.BoxGeometry(0.23, 0.19, 0.4), mat, group, 0, 1.04, 0.09);
      mesh(new THREE.ConeGeometry(0.07, 0.16, 4), mat, group, 0, 1.2, -0.05);
    }
    if (kind === "queen") {
      mesh(
        new THREE.CylinderGeometry(0.23, 0.1, 0.35, 32),
        mat,
        group,
        0,
        0.86,
      );
      for (let i = 0; i < 6; i++)
        mesh(
          new THREE.SphereGeometry(0.065, 12, 8),
          mat,
          group,
          Math.cos((i * Math.PI) / 3) * 0.2,
          1.1,
          Math.sin((i * Math.PI) / 3) * 0.2,
        );
      mesh(new THREE.SphereGeometry(0.09, 16, 12), mat, group, 0, 1.14);
    }
    return group;
  }
  function labelTexture(text) {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext("2d");
    ctx.scale(4, 4);
    ctx.fillStyle = "#292925";
    ctx.beginPath();
    ctx.arc(128, 128, 121, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#e4e1d6";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(128, 128, 101, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#f5f3eb";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "500 " + (text.length > 9 ? 24 : 30) + "px Montserrat";
    ctx.fillText(text, 128, 128);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }
  function chip(text, white = false) {
    const g = new THREE.Group(),
      mat = white ? mats.white : mats.orange || mats.black;
    disc(g, 0.38, 0.13, mat, 0, 0.07);
    const top = new THREE.MeshBasicMaterial({
      map: labelTexture(text),
      side: THREE.DoubleSide,
    });
    const face = mesh(new THREE.CircleGeometry(0.345, 40), top, g, 0, 0.142);
    face.rotation.x = -Math.PI / 2;
    for (let i = 0; i < 12; i++) {
      const d = mesh(
        new THREE.BoxGeometry(0.04, 0.08, 0.06),
        mats.black,
        g,
        Math.cos((i * Math.PI) / 6) * 0.365,
        0.07,
        Math.sin((i * Math.PI) / 6) * 0.365,
      );
      d.rotation.y = (-i * Math.PI) / 6;
    }
    return g;
  }
  // Project a live HTML face onto the physical card: titles stay text, rather than a bitmap.
  function projectFace(el, points, width, height) {
    const corners = [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
      ],
      rows = [];
    for (let i = 0; i < 4; i++) {
      const [u, v] = corners[i],
        { x, y } = points[i];
      rows.push(
        [u, v, 1, 0, 0, 0, -u * x, -v * x, x],
        [0, 0, 0, u, v, 1, -u * y, -v * y, y],
      );
    }
    for (let col = 0; col < 8; col++) {
      let pivot = col;
      for (let r = col + 1; r < 8; r++)
        if (Math.abs(rows[r][col]) > Math.abs(rows[pivot][col])) pivot = r;
      [rows[col], rows[pivot]] = [rows[pivot], rows[col]];
      const n = rows[col][col];
      if (Math.abs(n) < 1e-8) return;
      for (let k = col; k < 9; k++) rows[col][k] /= n;
      for (let r = 0; r < 8; r++) {
        if (r === col) continue;
        const factor = rows[r][col];
        for (let k = col; k < 9; k++) rows[r][k] -= factor * rows[col][k];
      }
    }
    const [a, b, c, d, e, f, g, h] = rows.map((r) => r[8]);
    el.style.transform =
      "matrix3d(" +
      [a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1].join(",") +
      ")";
  }

  let fraction = 0;
  function onScroll() {
    fraction = Math.max(
      0,
      Math.min(
        1,
        scrollY /
          Math.max(1, document.documentElement.scrollHeight - innerHeight),
      ),
    );
    $("#journey-bar").style.width = fraction * 100 + "%";
    $("#journey-label").textContent =
      fraction > 0.94
        ? "QUEEN / PROMOTED"
        : "PAWN / " +
          ["OPENING", "PROJECTS", "WRITING", "THE PLAYER", "NEXT MOVE"][
            Math.min(4, Math.floor(fraction * 5))
          ];
  }
  listen(window, "scroll", onScroll, { passive: true });
  listen(window, "resize", onScroll);
  onScroll();
  function frame(now) {
    if (isDisposed()) return;
    for (let i = motions.length - 1; i >= 0; i--) {
      const m = motions[i];
      if (m.cancelled) {
        motions.splice(i, 1);
        continue;
      }
      const t = Math.min(1, (now - m.start) / m.ms);
      m.update(t);
      if (t === 1) {
        motions.splice(i, 1);
        m.done?.();
      }
    }
    background?.update(fraction);
    for (const s of [background, table, checkers, promotion]) {
      if (!s) continue;
      const r = s.el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) s.render();
    }
    frameId = requestAnimationFrame(frame);
  }
  frameId = requestAnimationFrame(frame);
  try {
    await document.fonts.ready;
    if (isDisposed()) return stop;
    THREE = await import("three");
    if (isDisposed()) return stop;
    Object.assign(mats, {
      white: material(0xf2efe5),
      black: material(0x10110f),
      orange: material(0xc76532),
      tileLight: material(0xebe8df),
      tileDark: material(0x97958d),
      edge: material(0xbcb8ad),
      checkDark: material(0x4c4c46),
      checkLight: material(0xe2ded2),
    });
    background = buildBackground({
      THREE,
      $,
      makeScene,
      mesh,
      material,
      mats,
      chessPiece,
      tween,
      reduced,
      getPromotion: () => promotion,
    });
    table = buildTable({
      THREE,
      $,
      makeScene,
      mesh,
      material,
      mats,
      chip,
      projectFace,
      tween,
    });
    checkers = buildCheckers({
      listen,
      THREE,
      $,
      makeScene,
      mesh,
      disc,
      mats,
      tween,
      status,
      chooseStory,
      unlock,
      isBusy: () => busy,
      setBusy: (value) => {
        busy = value;
      },
      getSelected: () => selected,
    });
    promotion = buildPromotion({
      THREE,
      $,
      makeScene,
      chessPiece,
      material,
      tween,
      reduced,
    });
    document.body.dataset.three = "ready";
  } catch (e) {
    console.error("3D scenes unavailable:", e);
    $("#chess-background").classList.add("fallback-grid");
    status("Use the story buttons to select a piece and open the reader.");
    document.body.dataset.three = "unavailable";
  }

  return stop;
}
