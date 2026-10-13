// The pack auto-opens when it is visible, after the queen has had time to land.
// The button remains available to close/replay the pack manually.
export function initSocialPack({ tween, reduced, listen }) {
  const pack = document.querySelector("#social-pack");
  const button = document.querySelector("#open-social-pack");
  const cards = [...pack.querySelectorAll(".social-card")];
  let ripping = false;
  let automaticallyOpened = false;
  let visible = false;
  let waiting = false;
  let motion;

  function close() {
    if (motion) motion.cancelled = true;
    ripping = false;
    button.disabled = false;
    pack.classList.remove("ripping", "opened", "ripped");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Rip open contact card pack");
    pack.querySelector(".social-spread").setAttribute("aria-hidden", "true");
    document.querySelector("#pack-prompt").textContent =
      "OPEN YOUR NEXT HAND ↗";
    document.querySelector("#pack-caption").textContent =
      "Four cards. Four ways to say hello.";
    cards.forEach((card) => (card.tabIndex = -1));
  }

  function open() {
    if (ripping || pack.classList.contains("opened")) return;
    ripping = true;
    button.disabled = true;
    pack.classList.add("ripping");
    document.querySelector("#pack-prompt").textContent = "RIPPING THE SEAL…";
    document.querySelector("#pack-caption").textContent = "Breaking the seal…";
    motion = tween(
      reduced ? 1 : 1500,
      () => {},
      () => {
        ripping = false;
        button.disabled = false;
        pack.classList.remove("ripping");
        pack.classList.add("ripped", "opened");
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", "Close contact card pack");
        pack
          .querySelector(".social-spread")
          .setAttribute("aria-hidden", "false");
        document.querySelector("#pack-prompt").textContent =
          "REPLAY THE HAND ↺";
        document.querySelector("#pack-caption").textContent =
          "Your rarest connections. Pick a card.";
        cards.forEach((card) => (card.tabIndex = 0));
      },
    );
  }

  function waitForQueen(start) {
    if (!visible || automaticallyOpened) {
      waiting = false;
      return;
    }
    const landed =
      document.querySelector("#promotion-slot").dataset.state === "queen";
    if (
      (landed &&
        performance.now() -
          Number(
            document.querySelector("#promotion-slot").dataset.landedAt || 0,
          ) >
          1100) ||
      performance.now() - start > 6000 ||
      reduced
    ) {
      automaticallyOpened = true;
      waiting = false;
      open();
    } else requestAnimationFrame(() => waitForQueen(start));
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !automaticallyOpened && !waiting) {
        waiting = true;
        waitForQueen(performance.now());
      }
    },
    { threshold: 0.65 },
  );
  observer.observe(button);
  listen(button, "click", () => {
    automaticallyOpened = true;
    if (!ripping) pack.classList.contains("opened") ? close() : open();
  });
  listen(
    window,
    "scroll",
    () => {
      if (scrollY < 12) {
        automaticallyOpened = false;
        close();
      }
    },
    { passive: true },
  );
  return {
    open,
    close,
    destroy() {
      visible = false;
      automaticallyOpened = true;
      observer.disconnect();
      if (motion) motion.cancelled = true;
    },
  };
}
