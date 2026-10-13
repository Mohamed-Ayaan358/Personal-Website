"use client";
import { useEffect } from "react";
import Opening from "./Opening";
import Projects from "./Projects";
import Writing from "./Writing";
import About from "./About";
import Contact from "./Contact";
export default function Portfolio() {
  useEffect(() => {
    let disposed = false;
    let cleanup;
    import("../lib/games/app")
      .then(({ initializePortfolio }) => initializePortfolio(() => disposed))
      .then((stop) => {
        if (disposed) stop?.();
        else cleanup = stop;
      })
      .catch((error) =>
        console.error("Portfolio initialization failed:", error),
      );
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  return (
    <>
      <div id="chess-background" aria-hidden="true"></div>
      <div className="veil" aria-hidden="true"></div>
      <header>
        <span>♟ &nbsp; MOHAMED AYAAN</span>
        <span>PORTFOLIO / PLAY EDITION</span>
      </header>
      <div className="journey" aria-live="off">
        <span id="journey-label">PAWN / OPENING</span>
        <div>
          <i id="journey-bar"></i>
        </div>
      </div>
      <main>
        <Opening />
        <Projects />
        <Writing />
        <About />
        <Contact />
      </main>
      <dialog id="reader">
        <div className="reader-top">
          <span>
            CAPTURED THOUGHT / <span id="reader-number"></span>
          </span>
          <button id="close-reader" aria-label="Close blog reader">
            ×
          </button>
        </div>
        <div className="reader-scroll" tabIndex="0">
          <p className="eyebrow" id="reader-meta"></p>
          <h2 id="reader-title"></h2>
          <article id="reader-body"></article>
          <a id="original-post" target="_blank" rel="noopener">
            READ ON THE ORIGINAL SITE ↗
          </a>
        </div>
      </dialog>
    </>
  );
}
