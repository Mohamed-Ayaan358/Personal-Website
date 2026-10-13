export function buildCheckers({
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
  isBusy,
  setBusy,
  getSelected,
}) {
  const s = makeScene($("#checker-scene"), [2.2, 9, 6], 4.3),
    board = new THREE.Group();
  s.scene.add(board);
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      mesh(
        new THREE.BoxGeometry(0.79, 0.065, 0.79),
        (r + c) % 2 ? mats.checkDark : mats.checkLight,
        board,
        (c - 3.5) * 0.8,
        0,
        (r - 3.5) * 0.8,
      );
  mesh(new THREE.BoxGeometry(6.55, 0.14, 6.55), mats.edge, board, 0, -0.1);
  const states = [
      { c: 1, r: 6 },
      { c: 3, r: 6 },
      { c: 5, r: 6 },
    ],
    initial = states.map((x) => ({ ...x })),
    enemyStates = [
      { c: 1, r: 4, alive: true },
      { c: 3, r: 4, alive: true },
      { c: 5, r: 4, alive: true },
    ],
    players = [],
    enemies = [],
    markers = [];
  function coord(c, r) {
    return new THREE.Vector3((c - 3.5) * 0.8, 0.08, (r - 3.5) * 0.8);
  }
  function checker(i, white) {
    const g = new THREE.Group(),
      mat = white ? mats.white : mats.black;
    disc(g, 0.32, 0.15, mat, 0, 0.1);
    disc(g, 0.285, 0.03, mat, 0, 0.19);
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle = white ? "#eeeadf" : "#292925";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = white ? "#706c61" : "#ccc6b8";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(128, 128, 112, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = white ? "#292925" : "#eeeadf";
    ctx.font = "700 95px Montserrat";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(i + 1), 128, 132);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const face = mesh(
      new THREE.CircleGeometry(0.27, 40),
      new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }),
      g,
      0,
      0.211,
    );
    face.rotation.x = -Math.PI / 2;
    return g;
  }
  states.forEach((p, i) => {
    const g = checker(i, true);
    g.position.copy(coord(p.c, p.r));
    g.userData.post = i;
    board.add(g);
    players.push(g);
    const enemy = checker(i, false);
    enemy.position.copy(coord(enemyStates[i].c, enemyStates[i].r));
    board.add(enemy);
    enemies.push(enemy);
  });
  function occupied(c, r) {
    return (
      states.some((p) => p.c === c && p.r === r) ||
      enemyStates.some((p) => p.alive && p.c === c && p.r === r)
    );
  }
  function legal(i) {
    const p = states[i],
      moves = [];
    for (const dir of [-1, 1]) {
      const c = p.c + dir,
        r = p.r - 1;
      if (c < 0 || c > 7 || r < 0) continue;
      const ei = enemyStates.findIndex(
        (e) => e.alive && e.c === c && e.r === r,
      );
      if (ei >= 0) {
        const dc = c + dir,
          dr = r - 1;
        if (dc >= 0 && dc < 8 && dr >= 0 && !occupied(dc, dr))
          moves.push({ c: dc, r: dr, enemy: ei, dir });
      } else if (!occupied(c, r)) moves.push({ c, r, enemy: -1, dir });
    }
    const captures = moves.filter((m) => m.enemy >= 0);
    return captures.length ? captures : moves;
  }
  function show(i) {
    markers.forEach((m) => {
      board.remove(m);
      m.geometry.dispose();
      m.material.dispose();
    });
    markers.length = 0;
    players.forEach((g, j) => g.scale.setScalar(j === i ? 1.1 : 1));
    if (i < 0) return;
    const moves = legal(i);
    moves.forEach((m) => {
      const marker = mesh(
        new THREE.RingGeometry(0.22, 0.32, 40),
        new THREE.MeshBasicMaterial({
          color: m.enemy >= 0 ? 0x33332c : 0x878173,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        }),
        board,
      );
      marker.rotation.x = -Math.PI / 2;
      marker.position.copy(coord(m.c, m.r));
      marker.position.y = 0.055;
      markers.push(marker);
    });
    $("#move-left").disabled = !moves.some((m) => m.dir === -1);
    $("#move-right").disabled = !moves.some((m) => m.dir === 1);
    if (!moves.length)
      status(
        "Piece " +
          (i + 1) +
          " has no forward moves. Select another piece or reset.",
      );
  }
  function flip(i, done) {
    const enemy = enemies[i],
      start = enemy.position.clone();
    const panel = new THREE.Group();
    mesh(new THREE.BoxGeometry(1.6, 0.045, 1.1), mats.white, panel);
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 350;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#faf8ef";
    ctx.fillRect(0, 0, 512, 350);
    ctx.fillStyle = "#262620";
    ctx.textAlign = "center";
    ctx.font = "700 20px Montserrat";
    ctx.fillText("CAPTURED THOUGHT " + (i + 1), 256, 85);
    ctx.font = "500 27px Montserrat";
    const title = [
      "Project Kronos",
      "Evaluating the evaluator",
      "Web Review: CRED",
    ][i];
    ctx.fillText(title, 256, 180);
    ctx.font = "16px Montserrat";
    ctx.fillText("OPEN THE STORY ↗", 256, 270);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const face = mesh(
      new THREE.PlaneGeometry(1.6, 1.1),
      new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }),
      panel,
      0,
      0.026,
    );
    face.rotation.x = -Math.PI / 2;
    panel.position.copy(start);
    panel.visible = false;
    board.add(panel);
    tween(
      1100,
      (t) => {
        enemy.rotation.x = t * Math.PI;
        enemy.position.y = start.y + Math.sin(t * Math.PI) * 1.15;
        if (t > 0.42) {
          const p = (t - 0.42) / 0.58;
          enemy.scale.setScalar(Math.max(0.01, 1 - p));
          panel.visible = true;
          panel.scale.setScalar(0.2 + 0.8 * p);
          panel.position.y = 0.2 + p * 1.3;
          panel.rotation.set(-p * 0.35, 0, -p * 0.12);
        }
      },
      () => {
        enemy.visible = false;
        panel.updateWorldMatrix(true, false);
        const rect = s.el.getBoundingClientRect(),
          pts = [
            [-0.8, 0, -0.55],
            [0.8, 0, -0.55],
            [0.8, 0, 0.55],
            [-0.8, 0, 0.55],
          ].map((p) => {
            const v = panel
              .localToWorld(new THREE.Vector3(...p))
              .project(s.camera);
            return {
              x: rect.left + ((v.x + 1) * rect.width) / 2,
              y: rect.top + ((1 - v.y) * rect.height) / 2,
            };
          }),
          xs = pts.map((p) => p.x),
          ys = pts.map((p) => p.y),
          origin = {
            rect: {
              left: Math.min(...xs),
              top: Math.min(...ys),
              width: Math.max(...xs) - Math.min(...xs),
              height: Math.max(...ys) - Math.min(...ys),
            },
          };
        done(origin);
        tween(
          760,
          (t) => {
            if (t > 0.15) panel.visible = false;
          },
          () => {
            board.remove(panel);
            panel.traverse((o) => {
              o.geometry?.dispose();
              for (const mat of Array.isArray(o.material)
                ? o.material
                : [o.material]) {
                if (mat?.map?.isTexture) {
                  mat.map.dispose();
                  mat.dispose();
                } else if (Array.isArray(o.material)) mat?.dispose();
              }
            });
          },
        );
      },
    );
  }
  function move(i, m) {
    if (isBusy()) return;
    setBusy(true);
    $("#capture-button").disabled = true;
    $("#move-left").disabled = true;
    $("#move-right").disabled = true;
    const start = coord(states[i].c, states[i].r),
      end = coord(m.c, m.r);
    show(-1);
    status(
      m.enemy >= 0
        ? "Jumping… the captured piece holds a story."
        : "Moving piece " + (i + 1) + "…",
    );
    tween(
      m.enemy >= 0 ? 650 : 400,
      (t) => {
        const e = t * t * (3 - 2 * t);
        players[i].position.lerpVectors(start, end, e);
        players[i].position.y =
          0.08 + Math.sin(t * Math.PI) * (m.enemy >= 0 ? 0.75 : 0.13);
      },
      () => {
        states[i].c = m.c;
        states[i].r = m.r;
        if (m.enemy >= 0) {
          enemyStates[m.enemy].alive = false;
          flip(m.enemy, (origin) => {
            setBusy(false);
            chooseStory(i);
            unlock(m.enemy, origin);
          });
        } else {
          setBusy(false);
          chooseStory(i);
          status(
            "Now choose a marked diagonal square. Capture a dark piece to reveal its post.",
          );
        }
      },
    );
  }
  const ray = new THREE.Raycaster(),
    pointer = new THREE.Vector2(),
    plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.08);
  let drag = null,
    suppressClick = false;
  function rayAt(e) {
    const r = s.el.getBoundingClientRect();
    pointer.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      (-(e.clientY - r.top) / r.height) * 2 + 1,
    );
    ray.setFromCamera(pointer, s.camera);
  }
  function playerAt(e) {
    rayAt(e);
    const hits = ray.intersectObjects(players, true);
    if (!hits.length) return -1;
    let o = hits[0].object;
    while (o.parent && o.userData.post === undefined) o = o.parent;
    return o.userData.post ?? -1;
  }
  function squareAt(e) {
    rayAt(e);
    const pos = new THREE.Vector3();
    if (!ray.ray.intersectPlane(plane, pos)) return null;
    return {
      c: Math.round(pos.x / 0.8 + 3.5),
      r: Math.round(pos.z / 0.8 + 3.5),
    };
  }
  listen(s.el, "pointerdown", (e) => {
    if (isBusy() || e.button !== 0) return;
    const i = playerAt(e);
    if (i < 0) return;
    chooseStory(i);
    drag = { i, x: e.clientX, y: e.clientY, moved: false };
    s.el.setPointerCapture(e.pointerId);
  });
  listen(s.el, "pointermove", (e) => {
    if (!drag || isBusy()) return;
    if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6)
      drag.moved = true;
    if (!drag.moved) return;
    s.el.classList.add("dragging");
    rayAt(e);
    const point = new THREE.Vector3();
    if (ray.ray.intersectPlane(plane, point)) {
      players[drag.i].position.copy(point);
      players[drag.i].position.y = 0.35;
    }
  });
  listen(s.el, "pointerup", (e) => {
    if (!drag) return;
    const d = drag;
    drag = null;
    s.el.classList.remove("dragging");
    suppressClick = d.moved;
    if (!d.moved) return;
    const dest = squareAt(e),
      m = dest && legal(d.i).find((m) => m.c === dest.c && m.r === dest.r);
    players[d.i].position.copy(coord(states[d.i].c, states[d.i].r));
    if (m) move(d.i, m);
    else
      status(
        "That square is not a legal forward diagonal move. Try a marked square.",
      );
  });
  listen(s.el, "pointercancel", () => {
    if (drag)
      players[drag.i].position.copy(coord(states[drag.i].c, states[drag.i].r));
    drag = null;
    s.el.classList.remove("dragging");
  });
  listen(s.el, "click", (e) => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    if (isBusy()) return;
    const i = playerAt(e);
    if (i >= 0) {
      chooseStory(i);
      return;
    }
    if (getSelected() < 0) return;
    const dest = squareAt(e),
      m =
        dest &&
        legal(getSelected()).find((m) => m.c === dest.c && m.r === dest.r);
    if (m) move(getSelected(), m);
  });
  return {
    ...s,
    select: show,
    direction(dir) {
      if (getSelected() < 0 || isBusy()) return;
      const m = legal(getSelected()).find((m) => m.dir === dir);
      if (m) move(getSelected(), m);
    },
    reset() {
      states.forEach((p, i) => {
        Object.assign(p, initial[i]);
        players[i].position.copy(coord(p.c, p.r));
        players[i].scale.setScalar(1);
        enemyStates[i].alive = true;
        enemies[i].position.copy(coord(enemyStates[i].c, enemyStates[i].r));
        enemies[i].rotation.set(0, 0, 0);
        enemies[i].scale.setScalar(1);
        enemies[i].visible = true;
      });
      show(-1);
    },
  };
}
