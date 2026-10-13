export function buildPromotion({
  THREE,
  $,
  makeScene,
  chessPiece,
  material,
  tween,
  reduced,
}) {
  const el = document.createElement("div");
  el.id = "promotion-flight";
  el.setAttribute("aria-hidden", "true");
  document.body.append(el);
  const s = makeScene(el, [0, 13, 8], 3.2);
  let played = false,
    serial = 0,
    source = null,
    progress = 0,
    startPixel = null,
    depth = 0,
    targetScale = 1,
    phase = "pawn",
    landedAt = 0;
  function pointAt(x, y) {
    const p = new THREE.Vector3(
      (x / innerWidth) * 2 - 1,
      1 - (y / innerHeight) * 2,
      depth,
    ).unproject(s.camera);
    p.y -= 0.55;
    return p;
  }
  function position() {
    if (!source) return;
    s.camera.copy(source.camera);
    const rect = $("#promotion-scene").getBoundingClientRect(),
      end = {
        x: rect.left + rect.width / 2,
        y:
          rect.bottom < 0 || rect.top > innerHeight
            ? Math.min(150, innerHeight * 0.25)
            : rect.top + rect.height / 2,
      };
    const t = progress,
      e = t * t * (3 - 2 * t),
      arc = Math.sin(t * Math.PI) * Math.min(180, innerHeight * 0.22);
    const x =
        THREE.MathUtils.lerp(startPixel.x, end.x, e) +
        Math.sin(t * Math.PI) * 55,
      y = THREE.MathUtils.lerp(startPixel.y, end.y, e) - arc,
      point = pointAt(x, y),
      scale = THREE.MathUtils.lerp(1, targetScale, e);
    if (t > 0.86 && t < 1)
      point.y +=
        (Math.sin(((t - 0.86) / 0.14) * Math.PI * 2) * 0.055 * (1 - t)) / 0.14;
    source.pawn.position.copy(point);
    source.queen.position.copy(point);
    source.pawn.scale.setScalar(
      scale * Math.max(0.01, 1 - Math.max(0, (t - 0.4) / 0.2)),
    );
    source.queen.scale.setScalar(
      scale * Math.min(1, Math.max(0, (t - 0.4) / 0.2)),
    );
    const turn = t < 0.85 ? t / 0.85 : 1;
    for (const piece of [source.pawn, source.queen])
      piece.rotation.set(
        turn * Math.PI * 2,
        Math.sin(t * Math.PI) * 0.3,
        Math.sin(t * Math.PI) * -0.35,
      );
    source.pawn.visible = t < 0.6;
    source.queen.visible = t >= 0.4;
    if (phase === "queen") {
      source.pawn.visible = false;
      source.queen.visible =
        (rect.bottom > 0 && rect.top < innerHeight) ||
        performance.now() - landedAt < 900;
      source.queen.rotation.set(0, 0.22, 0);
    }
  }
  const render = s.render;
  s.render = () => {
    position();
    render();
  };
  return {
    ...s,
    play(input) {
      if (played) return;
      played = true;
      const id = ++serial;
      source = { ...input, parent: input.pawn.parent };
      s.camera.copy(input.camera);
      input.pawn.updateWorldMatrix(true, false);
      const center = input.pawn
          .getWorldPosition(new THREE.Vector3())
          .add(new THREE.Vector3(0, 0.55, 0)),
        p = center.clone().project(s.camera);
      startPixel = {
        x: THREE.MathUtils.clamp(
          ((p.x + 1) * innerWidth) / 2,
          innerWidth * 0.15,
          innerWidth * 0.85,
        ),
        y: THREE.MathUtils.clamp(
          ((1 - p.y) * innerHeight) / 2,
          innerHeight * 0.2,
          innerHeight * 0.7,
        ),
      };
      depth = p.z;
      const up = center
        .clone()
        .add(new THREE.Vector3(0, 1.2, 0))
        .project(s.camera);
      targetScale = THREE.MathUtils.clamp(
        55 / Math.max(1, (Math.abs(up.y - p.y) * innerHeight) / 2),
        0.8,
        3.6,
      );
      s.scene.attach(input.pawn);
      s.scene.attach(input.queen);
      const orange = material(0xd1743f);
      input.queen.traverse((o) => {
        if (o.isMesh) o.material = orange;
      });
      phase = "flying";
      progress = 0;
      $("#promotion-caption").textContent = "PAWN → QUEEN";
      $("#promotion-slot").dataset.state = "flying";
      tween(
        2000,
        (t) => {
          if (id !== serial) return;
          progress = t;
          position();
        },
        () => {
          if (id !== serial) return;
          phase = "queen";
          landedAt = performance.now();
          $("#promotion-slot").dataset.landedAt = String(landedAt);
          progress = 1;
          position();
          $("#promotion-caption").textContent = "PROMOTED. YOUR NEXT MOVE.";
          $("#promotion-slot").dataset.state = "queen";
        },
      );
    },
    reset() {
      if (!played) return;
      serial++;
      played = false;
      phase = "pawn";
      if (source) {
        source.parent.add(source.pawn, source.queen);
        source.pawn.scale.setScalar(1);
        source.queen.scale.setScalar(1);
        source.pawn.rotation.set(0, 0, 0);
        source.queen.rotation.set(0, 0, 0);
        source.pawn.visible = true;
        source.queen.visible = false;
      }
      source = null;
      $("#promotion-caption").textContent = "PAWN / ONE LAST MOVE";
      $("#promotion-slot").dataset.state = "pawn";
    },
  };
}
