export function buildTable({
  THREE,
  $,
  makeScene,
  mesh,
  material,
  mats,
  chip,
  projectFace,
  tween,
}) {
  const s = makeScene($("#project-scene"), [0, 9, 6], 3.1),
    objects = [],
    overlays = [];
  let serial = 0,
    activeCard = null,
    activeRake = null,
    transition = null;
  const stacks = [];
  const render = s.render;
  function screen(v) {
    const p = v.project(s.camera);
    return {
      x: ((p.x + 1) * s.el.clientWidth) / 2,
      y: ((1 - p.y) * s.el.clientHeight) / 2,
    };
  }
  s.render = () => {
    const half = s.el.clientWidth < 600 ? 3.1 : 4.7,
      span = half / (s.el.clientWidth / s.el.clientHeight);
    s.camera.left = -half;
    s.camera.right = half;
    s.camera.top = span;
    s.camera.bottom = -span;
    s.camera.updateProjectionMatrix();
    render();
    if (activeCard) {
      const { group, face } = activeCard;
      face.hidden = !group.visible;
      if (group.visible) {
        group.updateWorldMatrix(true, false);
        const points = [
          [-0.8, 0.195, -1.1],
          [0.8, 0.195, -1.1],
          [0.8, 0.195, 1.1],
          [-0.8, 0.195, 1.1],
        ].map((p) => screen(group.localToWorld(new THREE.Vector3(...p))));
        projectFace(face, points, 200, 275);
      }
    }
    stacks.forEach(({ group, label, height }) => {
      group.updateWorldMatrix(true, false);
      const p = screen(
        group.localToWorld(new THREE.Vector3(0, height + 0.06, 0)),
      );
      label.style.transform =
        "translate(" + p.x + "px," + p.y + "px) translate(-50%,-50%)";
    });
  };
  s.renderer.shadowMap.enabled = true;
  s.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  s.scene.traverse((o) => {
    if (o.isDirectionalLight) {
      o.castShadow = true;
      o.shadow.mapSize.set(2048, 2048);
      Object.assign(o.shadow.camera, {
        left: -6,
        right: 6,
        top: 6,
        bottom: -6,
      });
      o.shadow.bias = -0.00005;
      o.shadow.normalBias = 0.015;
      o.shadow.radius = 4;
    }
  });
  const receiving = mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.ShadowMaterial({ opacity: 0.22 }),
    s.scene,
    0,
    -0.025,
  );
  receiving.rotation.x = -Math.PI / 2;
  receiving.receiveShadow = true;
  const wood = material(0x4d493f),
    metal = material(0x8b877d);
  function clear() {
    objects.forEach((g) => {
      s.scene.remove(g);
      g.traverse((o) => {
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
    });
    overlays.forEach((e) => e.remove());
    overlays.length = 0;
    objects.length = 0;
    stacks.length = 0;
    activeCard = null;
    activeRake = null;
  }
  function roundedCard() {
    const w = 1.6,
      h = 2.2,
      r = 0.1,
      shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 3,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++)
      positions.setZ(
        i,
        positions.getZ(i) + 0.08 * Math.pow(positions.getY(i) / 1.1, 4),
      );
    geometry.computeVertexNormals();
    const body = mesh(
      geometry,
      [material(0xf1e7d2), material(0x9c8d72)],
      new THREE.Group(),
    );
    body.castShadow = true;
    body.receiveShadow = false;
    body.rotation.x = -Math.PI / 2;
    body.position.y = 0.035;
    return body.parent;
  }
  function begin(project, done, pull, n) {
    clear();
    const sizes = [1.35, 1.35, 1.35],
      counts = project.languages.map((_, i) =>
        Math.max(1, Math.min(6, Math.round(project.chipCounts?.[i] ?? 3))),
      );
    s.el.dataset.phase = "dealing";
    project.languages.forEach((lang, i) => {
      const group = new THREE.Group();
      for (let j = 0; j < counts[i]; j++) {
        const c = chip(["01", "02", "03"][i]);
        c.position.set(
          Math.sin(j * 2 + i) * 0.025,
          j * 0.145,
          Math.cos(j + i) * 0.025,
        );
        group.add(c);
      }
      group.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      });
      group.scale.setScalar(sizes[i]);
      group.position.set(3.2, 0, (i - 1) * 1.28);
      s.scene.add(group);
      objects.push(group);
      const label = document.createElement("span");
      label.className = "chip-name";
      label.textContent = lang;
      s.el.append(label);
      overlays.push(label);
      stacks.push({
        group,
        label,
        height: counts[i] * 0.145,
        vx: 0,
        angle: 0,
        travelX: 3.2,
        target: project.chipPositions?.[i] ?? { x: -1, z: (i - 1) * 1.28 },
      });
    });
    const rake = new THREE.Group();
    mesh(new THREE.BoxGeometry(4.9, 0.09, 0.09), wood, rake, 2.45, 0.14, 0);
    mesh(new THREE.BoxGeometry(0.13, 0.22, 3.8), wood, rake, 0, 0.14, 0);
    mesh(new THREE.BoxGeometry(0.15, 0.24, 0.16), metal, rake, 0.07, 0.14, 0);
    rake.position.set(3.7, 0, 0);
    s.scene.add(rake);
    objects.push(rake);
    activeRake = rake;
    const card = roundedCard();
    card.position.set(-1.7, 0, 4.5);
    card.visible = false;
    s.scene.add(card);
    objects.push(card);
    const face = document.createElement("div");
    face.className = "dealt-face";
    face.hidden = true;
    const value =
      project.repo === "Stalkr" ? "A" : project.repo === "SysPerf" ? "K" : "Q";
    face.dataset.rarity = project.rarity || "SR";
    face.innerHTML =
      '<span class="face-corner">' +
      value +
      "<br>" +
      project.suit +
      '</span><span class="face-suit">' +
      project.suit +
      "</span><strong>" +
      project.name +
      '</strong><small>THE BUILD COLLECTION</small><span class="face-corner bottom">' +
      value +
      "<br>" +
      project.suit +
      "</span>";
    s.el.append(face);
    overlays.push(face);
    activeCard = { group: card, face };
    let pulled = false,
      last = performance.now();
    transition = tween(
      2200,
      (t) => {
        if (n !== serial) return;
        const now = performance.now(),
          dt = Math.min(0.04, (now - last) / 1000);
        last = now;
        const push = Math.max(0, Math.min(1, t / 0.34)),
          e = push * push * (3 - 2 * push),
          head = THREE.MathUtils.lerp(3.7, -0.55, e);
        rake.position.x = head;
        // Contact from the rake, followed by inertia and surface friction.
        stacks.forEach((body, i) => {
          const { group, target } = body;
          const boundary = head - 0.38 * sizes[i] - 0.02;
          const previousX = body.travelX;
          if (t < 0.34 && body.travelX > boundary) {
            body.travelX = boundary;
            body.vx = (boundary - previousX) / Math.max(0.001, dt);
          } else {
            body.vx *= Math.exp(-5.5 * dt);
            body.travelX += body.vx * dt;
          }
          // Spread the stacks after the rake releases them; stable positions prevent overlap.
          const scatter = Math.max(0, Math.min(1, (t - 0.34) / 0.3));
          const blend = scatter * scatter * (3 - 2 * scatter);
          group.position.x = THREE.MathUtils.lerp(
            body.travelX,
            target.x,
            blend,
          );
          group.position.z =
            THREE.MathUtils.lerp((i - 1) * 1.28, target.z, blend) +
            Math.sin(t * Math.PI * 3 + i) * Math.abs(body.vx) * 0.012;
          body.angle += body.vx * dt * 0.04;
          group.rotation.y = body.angle + i * 0.12 * blend;
          group.rotation.z =
            Math.sin(t * Math.PI * 7 + i) *
            Math.min(0.025, Math.abs(body.vx) * 0.004);
        });
        if (t > 0.36) {
          const p = Math.min(1, (t - 0.36) / 0.24),
            q = p * p * (3 - 2 * p);
          rake.position.x = THREE.MathUtils.lerp(-0.55, 6, q);
          rake.position.y = Math.sin(p * Math.PI) * 0.7;
          rake.rotation.y = -Math.sin(p * Math.PI) * 0.15;
        }
        if (t > 0.14) {
          if (!pulled) {
            pull();
            pulled = true;
          }
          card.visible = true;
          const p = Math.min(1, (t - 0.14) / 0.62),
            q = 1 - (1 - p) ** 3;
          card.position.set(
            THREE.MathUtils.lerp(-1.7, 1.7, q),
            Math.sin(p * Math.PI) * 1.1 + 0.06,
            THREE.MathUtils.lerp(4.5, 0.15, q),
          );
          card.rotation.set(
            Math.sin(p * Math.PI) * -0.35 + 0.05 * q,
            THREE.MathUtils.lerp(-0.2, 0.24, q),
            Math.sin(p * Math.PI) * -0.18 + 0.018 * q,
          );
          card.updateWorldMatrix(true, true);
          const bounds = new THREE.Box3().setFromObject(card);
          if (bounds.min.y < 0.018) card.position.y += 0.018 - bounds.min.y;
        }
      },
      () => {
        if (n !== serial) return;
        rake.visible = false;
        s.el.dataset.phase = "settled";
        done();
      },
    );
  }
  return {
    ...s,
    deal(project, done, pull, exchangeHand) {
      const requestId = ++serial;
      if (transition) transition.cancelled = true;
      if (!stacks.length) {
        begin(project, done, pull, requestId);
        return;
      }

      // First return the old card and rake the old tokens off the right edge.
      s.el.dataset.phase = "clearing";
      const oldCard = activeCard?.group;
      const cardStart = oldCard?.position.clone();
      const cardRotation = oldCard?.rotation.clone();
      const chipStarts = stacks.map(({ group }) => group.position.clone());
      const rakeStart = Math.min(...chipStarts.map((p) => p.x)) - 0.6;
      if (activeRake) {
        activeRake.visible = true;
        activeRake.position.set(rakeStart, 0, 0);
        activeRake.rotation.set(0, 0, 0);
      }
      transition = tween(
        850,
        (t) => {
          if (requestId !== serial) return;
          const ease = t * t * (3 - 2 * t);
          if (activeRake)
            activeRake.position.x = THREE.MathUtils.lerp(rakeStart, 6, ease);
          stacks.forEach(({ group }, i) => {
            group.position.x = chipStarts[i].x + (6 - rakeStart) * ease;
            group.position.z = chipStarts[i].z;
            group.rotation.z = 0;
          });
          if (oldCard?.visible) {
            oldCard.position.set(
              THREE.MathUtils.lerp(cardStart.x, -1.7, ease),
              cardStart.y + Math.sin(t * Math.PI) * 0.5,
              THREE.MathUtils.lerp(cardStart.z, 4.5, ease),
            );
            oldCard.rotation.set(
              cardRotation.x * (1 - ease),
              THREE.MathUtils.lerp(cardRotation.y, -0.2, ease),
              cardRotation.z * (1 - ease),
            );
          }
        },
        () => {
          if (requestId === serial) {
            exchangeHand?.();
            begin(project, done, pull, requestId);
          }
        },
      );
    },
  };
}
