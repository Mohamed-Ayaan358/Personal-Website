// Rarity changes the sparkle density; animations are disabled for reduced motion.
export function initCardSparkles({ projects, reduced }) {
  const density = { SR: 5, SSR: 10, EX: 14, UR: 18 };
  const cards = [
    ...document.querySelectorAll(".social-card,[data-project],.dealt-face"),
  ];
  function decorate(card) {
    if (card.dataset.sparkles) return;
    const rarity =
      card.querySelector(".rarity")?.textContent.trim() ||
      card.dataset.rarity ||
      projects[Number(card.dataset.project)]?.rarity ||
      "SR";
    card.dataset.sparkles = rarity;
    const layer = document.createElement("span");
    layer.className = "sparkle-layer";
    layer.setAttribute("aria-hidden", "true");
    for (let i = 0; i < (density[rarity] || 5); i++) {
      const star = document.createElement("i");
      star.style.setProperty("--sx", ((i * 37 + 9) % 94) + 3 + "%");
      star.style.setProperty("--sy", ((i * 53 + 17) % 90) + 5 + "%");
      star.style.setProperty("--delay", i * 0.09 + "s");
      star.style.setProperty("--size", (i % 3) + 3 + "px");
      layer.append(star);
    }
    card.append(layer);
  }
  if (reduced) return;
  cards.forEach(decorate);
  // Dealt faces are created later, so decorate only those new nodes.
  const observer = new MutationObserver((records) =>
    records.forEach((record) =>
      record.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.matches(".dealt-face")) decorate(node);
      }),
    ),
  );
  observer.observe(document.querySelector("#project-scene"), {
    childList: true,
  });
  return () => observer.disconnect();
}
