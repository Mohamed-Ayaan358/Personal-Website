export function buildBackground({
  THREE,
  $,
  makeScene,
  mesh,
  material,
  mats,
  chessPiece,
  tween,
  reduced,
  getPromotion,
}) {
  const s = makeScene($("#chess-background"), [0, 13, 8], 3.2);
  const stage = new THREE.Group();
  s.scene.add(stage);
  let furthest = 0,
    tossed = false,
    toss = 0,
    tossStart = 0,
    promoting = false,
    promotionStart = 0,
    resetting = false,
    resetStart = 0,
    resetFrom = 0,
    resetPosition = new THREE.Vector3(),
    resetRotation = new THREE.Vector3();
  // Keep the page floor continuous; reverse scrolling tips it instead of replaying moves.
  const floorMat = new THREE.ShaderMaterial({
    uniforms: {
      light: { value: new THREE.Color(0xdedbd3) },
      dark: { value: new THREE.Color(0xb6b2a7) },
      opacity: { value: 1 },
    },
    vertexShader:
      "varying vec3 world;void main(){vec4 p=modelMatrix*vec4(position,1.);world=p.xyz;gl_Position=projectionMatrix*viewMatrix*p;}",
    fragmentShader:
      "varying vec3 world;uniform vec3 light;uniform vec3 dark;uniform float opacity;void main(){float cell=mod(floor(world.x)+floor(world.z),2.);gl_FragColor=vec4(mix(light,dark,cell),opacity);}",
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
  const floor = mesh(
    new THREE.PlaneGeometry(180, 180),
    floorMat,
    stage,
    0,
    -0.03,
  );
  floor.rotation.x = -Math.PI / 2;
  s.scene.attach(floor);
  // The resting floor must write depth, otherwise it draws over the pieces.
  floorMat.transparent = false;
  floorMat.depthWrite = true;
  const finiteMat = floorMat.clone();
  finiteMat.transparent = true;
  finiteMat.depthWrite = false;
  finiteMat.uniforms.gridScale = { value: 1 };
  finiteMat.vertexShader =
    "uniform float gridScale;varying vec3 world;void main(){world=vec3(position.x,0.,-position.y)*gridScale;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";
  const finite = mesh(
    new THREE.PlaneGeometry(8, 8),
    finiteMat,
    stage,
    0,
    0.015,
  );
  finite.rotation.x = -Math.PI / 2;
  const rim = mesh(
    new THREE.BoxGeometry(8.12, 0.22, 8.12),
    material(0x4b463c),
    stage,
    0,
    -0.13,
  );
  finite.visible = false;
  rim.visible = false;
  const pawn = chessPiece("pawn", true),
    queen = chessPiece("queen", true),
    bishop = chessPiece("bishop", false),
    rook = chessPiece("rook", false),
    knight = chessPiece("knight", false);
  stage.add(pawn, queen, bishop, rook, knight);
  const pawnMat = material(0x8d897f);
  for (const piece of [pawn, queen])
    piece.traverse((o) => {
      if (o.isMesh) o.material = pawnMat;
    });
  queen.visible = false;
  const extras = [];
  const placements = [
    ["rook", false, -3.5, 2.5],
    ["bishop", true, 2.5, -2.5],
    ["knight", true, -2.5, 0.5],
    ["pawn", false, 3.5, -1.5],
    ["pawn", true, -1.5, 3.5],
    ["rook", true, -3.5, -3.5],
    ["bishop", false, 1.5, 3.5],
    ["pawn", false, -0.5, -2.5],
  ];
  placements.forEach(([kind, white, x, z], i) => {
    const p = chessPiece(kind, white);
    p.position.set(x, 0, z);
    p.userData.home = { x, z };
    stage.add(p);
    extras.push(p);
  });
  const allPieces = [pawn, queen, bishop, rook, knight, ...extras];
  // Give each piece its own fade materials; never fade the shared chess palette.
  const pieceMaterials = allPieces.map((piece) => {
    const materials = [];
    piece.traverse((node) => {
      if (!node.isMesh) return;
      node.material = node.material.clone();
      node.material.transparent = true;
      materials.push(node.material);
    });
    return materials;
  });
  const ease = (t) => t * t * (3 - 2 * t),
    range = (f, a, b) => ease(Math.max(0, Math.min(1, (f - a) / (b - a))));
  function rank(f) {
    const beats = [
      [0, 2.5],
      [0.13, 1.5],
      [0.22, 0.5],
      [0.41, -0.5],
      [0.59, -1.5],
      [0.72, -2.5],
      [0.94, -3.5],
    ];
    let z = 2.5;
    for (let i = 1; i < beats.length; i++) {
      if (f >= beats[i][0]) z = beats[i][1];
      else {
        const [end, next] = beats[i],
          [start, prev] = beats[i - 1];
        z = THREE.MathUtils.lerp(prev, next, range(f, end - 0.065, end));
        break;
      }
    }
    return z;
  }
  return {
    ...s,
    update(scroll) {
      const now = performance.now();
      if (scroll < 0.004 && tossed && !resetting) {
        resetting = true;
        resetStart = now;
        resetFrom = Math.max(0.1, toss);
        resetPosition.copy(stage.position);
        // Return through the nearest resting angle, rather than rewinding the toss.
        const restingAngle = (angle) =>
          Math.atan2(Math.sin(angle), Math.cos(angle));
        resetRotation.set(
          restingAngle(stage.rotation.x),
          restingAngle(stage.rotation.y),
          restingAngle(stage.rotation.z),
        );
        tossed = false;
        furthest = 0;
        promoting = false;
        getPromotion()?.reset();
      } else if (scroll < 0.004 && !resetting) {
        furthest = 0;
        toss = 0;
        if (promoting) getPromotion()?.reset();
        promoting = false;
      } else if (
        !tossed &&
        !resetting &&
        furthest - scroll > 0.006 &&
        furthest > 0.06
      ) {
        tossed = true;
        tossStart = now;
      }
      if (!tossed && !resetting) furthest = Math.max(furthest, scroll);
      const f = furthest;
      let resetProgress = 0;
      if (resetting) {
        resetProgress = reduced ? 1 : Math.min(1, (now - resetStart) / 3400);
        const ease = resetProgress * resetProgress * (3 - 2 * resetProgress);
        toss = resetFrom * (1 - ease);
        if (resetProgress === 1) {
          resetting = false;
          toss = 0;
        }
      } else
        toss = tossed
          ? reduced
            ? 1
            : Math.min(1, (now - tossStart) / 1450)
          : 0;
      const launch = toss * toss;
      const blend = resetting
        ? THREE.MathUtils.smoothstep(resetProgress, 0.58, 0.65)
        : tossed
          ? 0
          : 1;
      floor.visible = blend > 0;
      // Expand the settled surface before revealing the continuous floor.
      // Keep that floor opaque: crossfading two transparent surfaces caused the flash.
      floorMat.uniforms.opacity.value = 1;
      const spread = resetting
        ? THREE.MathUtils.smoothstep(resetProgress, 0.48, 0.58)
        : 0;
      finite.scale.setScalar(1 + spread * 30);
      finiteMat.uniforms.gridScale.value = 1 + spread * 30;
      finiteMat.uniforms.opacity.value = 1 - blend;
      rim.material.transparent = true;
      rim.material.opacity = resetting
        ? 1 - THREE.MathUtils.smoothstep(resetProgress, 0.4, 0.52)
        : 1;
      finite.visible = tossed || resetting;
      rim.visible = tossed || resetting;
      stage.rotation.set(toss * Math.PI * 2.3, toss * 0.45, toss * 1.65);
      stage.position.set(
        launch * 18,
        Math.sin(toss * Math.PI) * 3 +
          launch * 4 +
          (resetting && resetProgress > 0.8
            ? Math.sin(((resetProgress - 0.8) / 0.2) * Math.PI) * 0.13
            : 0),
        launch * 4,
      );
      if (resetting) {
        // A soft arc, one small landing bounce, then dissolve the board edge.
        const travel = THREE.MathUtils.smoothstep(resetProgress, 0, 0.4);
        const remaining = 1 - travel;
        const landing = THREE.MathUtils.smoothstep(resetProgress, 0.4, 0.48);
        const bounce = Math.sin(landing * Math.PI * 2) * (1 - landing) * 0.09;
        stage.position.set(
          resetPosition.x * remaining,
          resetPosition.y * remaining +
            Math.sin(travel * Math.PI) * 1.1 +
            bounce,
          resetPosition.z * remaining,
        );
        stage.rotation.set(
          resetRotation.x * remaining + bounce * 0.12,
          resetRotation.y * remaining,
          resetRotation.z * remaining,
        );
      }
      stage.visible = resetting || toss < 1;
      document.body.dataset.boardState = resetting
        ? "resetting"
        : tossed
          ? toss < 1
            ? "flying"
            : "gone"
          : "playing";
      const z = rank(f),
        promoted =
          f >= 0.94 ||
          (() => {
            const r = $("#promotion-slot").getBoundingClientRect();
            return r.top >= 0 && r.top < innerHeight * 0.72 && r.bottom > 0;
          })();
      if (!promoting) {
        pawn.position.set(0.5, 0, promoted ? -3.5 : z);
        queen.position.copy(pawn.position);
        queen.visible = false;
        pawn.visible = true;
        pawn.scale.setScalar(1);
      }

      let t = range(f, 0.08, 0.29);
      bishop.position.set(
        THREE.MathUtils.lerp(-2.5, 0.5, t),
        0,
        THREE.MathUtils.lerp(-1.5, 1.5, t),
      );
      t = range(f, 0.31, 0.49);
      rook.position.set(THREE.MathUtils.lerp(3.5, 0.5, t), 0, 0.5);
      t = range(f, 0.61, 0.78);
      knight.position.set(
        THREE.MathUtils.lerp(-1.5, 0.5, t),
        reduced ? 0 : Math.sin(t * Math.PI) * 0.55,
        THREE.MathUtils.lerp(-0.5, -1.5, t),
      );
      extras.forEach((p, i) => {
        p.position.set(p.userData.home.x, 0, p.userData.home.z);
      });
      allPieces.forEach((p, i) => {
        if (promoting && i < 2) return;
        if (resetting) {
          // The empty board lands first; pieces then drop onto their home squares.
          const start = 0.65 + i * 0.012;
          const placed = THREE.MathUtils.smoothstep(
            resetProgress,
            start,
            start + 0.14,
          );
          p.visible = placed > 0 && i !== 1;
          p.scale.setScalar(1);
          pieceMaterials[i].forEach((material) => {
            material.opacity = placed;
          });
          p.rotation.set(0, (1 - placed) * 0.25, 0);
          p.position.y += (1 - placed) * 1.5;
          return;
        }
        pieceMaterials[i].forEach((material) => {
          material.opacity = 1;
        });
        if (!promoting) {
          p.visible = i !== 1;
          p.scale.setScalar(1);
        }
        p.rotation.set(
          toss * (0.6 + i * 0.19),
          toss * i * 0.43,
          toss * (i % 2 ? -0.55 : 0.55),
        );
        p.position.x += toss * Math.sin(i * 2.1) * 2.5;
        p.position.z += toss * Math.cos(i * 1.7) * 2.5;
        p.position.y += Math.sin(toss * Math.PI) * (0.7 + i * 0.12);
      });
      // Eight files across the viewport, with the pawn in the quieter right margin.
      const aspect = s.el.clientWidth / s.el.clientHeight,
        span = 4 / aspect;
      s.camera.left = -4;
      s.camera.right = 4;
      s.camera.top = span;
      s.camera.bottom = -span;
      s.camera.updateProjectionMatrix();
      const centerZ = THREE.MathUtils.lerp(2, -3, f);
      s.camera.position.set(-1.8, 13, centerZ + 7);
      s.camera.lookAt(-1.8, 0, centerZ);
      if (promoted && !promoting) {
        promoting = true;
        getPromotion()?.play({ camera: s.camera, pawn, queen });
      }
      $("#journey-label").textContent = promoted
        ? "E8 / QUEEN"
        : f < 0.3
          ? "BISHOP MISSES / E" + Math.round(4.5 - z)
          : f < 0.54
            ? "ROOK MISSES / E" + Math.round(4.5 - z)
            : f < 0.82
              ? "KNIGHT TOO LATE / E" + Math.round(4.5 - z)
              : "E" + Math.round(4.5 - z) + " / ALMOST THERE";
      document.body.dataset.chess = promoted
        ? "promoted"
        : f < 0.3
          ? "bishop"
          : f < 0.54
            ? "rook"
            : f < 0.82
              ? "knight"
              : "escape";
      if (resetting)
        $("#journey-label").textContent =
          "SETTING THE BOARD / RESETTING PIECES";
      else if (tossed)
        $("#journey-label").textContent =
          toss < 1 ? "FLYING OFF THE TABLE" : "BOARD GONE / TOP TO RESET";
    },
  };
}
