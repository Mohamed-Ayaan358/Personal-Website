export default function Contact() {
  return (
    <section id="contact" className="chapter contact">
      <p className="eyebrow">05 / A NEW SET OF POSSIBILITIES</p>
      <div
        id="promotion-slot"
        className="queen-mark"
        aria-label="Pawn promotion"
      >
        <span id="promotion-caption">PAWN / ONE LAST MOVE</span>
        <div id="promotion-scene" aria-hidden="true"></div>
      </div>
      <h2>Make the next move.</h2>
      <p className="lead">An idea, a question, or a simple hello.</p>
      <a className="button" href="mailto:ayaanoff0@gmail.com">
        LET’S TALK ↗
      </a>
      <div className="social-pack" id="social-pack">
        <div
          className="social-spread"
          aria-label="Contact cards"
          aria-hidden="true"
        >
          <a
            className="social-card"
            href="https://twitter.com/Mohamed69985642"
            target="_blank"
            rel="noopener"
            tabIndex="-1"
          >
            <span className="social-suit">𝕏</span>
            <span className="rarity">SR</span>
            <strong>Twitter / X</strong>
            <small>FOLLOW THE THOUGHTS ↗</small>
          </a>
          <a
            className="social-card"
            href="https://github.com/Mohamed-Ayaan358"
            target="_blank"
            rel="noopener"
            tabIndex="-1"
          >
            <span className="social-suit">&lt;/&gt;</span>
            <span className="rarity">SSR</span>
            <strong>GitHub</strong>
            <small>EXPLORE THE BUILDS ↗</small>
          </a>
          <a
            className="social-card"
            href="https://www.linkedin.com/in/mohamed-ayaan-1750311b8/"
            target="_blank"
            rel="noopener"
            tabIndex="-1"
          >
            <span className="social-suit">in</span>
            <span className="rarity">EX</span>
            <strong>LinkedIn</strong>
            <small>LET’S CONNECT ↗</small>
          </a>
          <a
            className="social-card"
            href="mailto:ayaanoff0@gmail.com"
            tabIndex="-1"
          >
            <span className="social-suit">✉</span>
            <span className="rarity">UR</span>
            <strong>Email</strong>
            <small>SAY HELLO ↗</small>
          </a>
        </div>
        <button
          className="pack-box"
          id="open-social-pack"
          aria-expanded="false"
          aria-label="Open contact card pack"
        >
          <span className="pack-lid"></span>
          <span className="tear-strip">
            <span>PULL TO RIP ↗</span>
          </span>
          <span className="pack-body">
            <small>THE NEXT HAND</small>
            <span>♠</span>
            <strong>
              LET’S
              <br />
              CONNECT.
            </strong>
            <small id="pack-prompt">CLICK TO OPEN ↗</small>
          </span>
        </button>
        <p className="pack-caption" id="pack-caption" role="status">
          Four cards. Four ways to say hello.
        </p>
      </div>
      <footer className="endnote">
        <div>
          <span className="signature">Mohamed Ayaan.</span>
          <p>
            Building things. Following ideas.
            <br />
            Always another move to learn.
          </p>
        </div>
        <div>
          <span className="footer-label">FIND ME</span>
          <a
            href="https://github.com/Mohamed-Ayaan358"
            target="_blank"
            rel="noopener"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/mohamed-ayaan-1750311b8/"
            target="_blank"
            rel="noopener"
          >
            LinkedIn ↗
          </a>
          <a href="mailto:ayaanoff0@gmail.com">Say hello ↗</a>
        </div>
        <div>
          <span className="footer-label">BACK TO THE TABLE</span>
          <a href="#projects">Projects ↑</a>
          <a href="#writing">Writing ↑</a>
          <a href="#opening">Reset the board ↑</a>
        </div>
        <div className="copyright">
          <span>© 2026 MOHAMED AYAAN</span>
          <span>GOOD GAME. SEE YOU NEXT ROUND.</span>
        </div>
      </footer>
    </section>
  );
}
