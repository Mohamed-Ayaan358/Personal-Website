export default function About() {
  return (
    <section id="about" className="chapter about">
      <p className="eyebrow">04 / HIDDEN ROLES</p>
      <h2>Who’s at the table?</h2>
      <p className="lead">
        Three secret roles. One player.
        <br />
        Turn the cards over to get to know me.
      </p>
      <div className="role-table">
        <div className="table-heading">
          <span>THE IDENTITY GAME</span>
          <span id="role-progress" role="status">
            0 / 3 ROLES REVEALED
          </span>
        </div>
        <div className="role-hand">
          <button
            className="role-card"
            data-role="0"
            aria-expanded="false"
            aria-label="Reveal role one"
          >
            <span className="role-inner">
              <span className="role-front" aria-hidden="false">
                <small>CLASSIFIED / 01</small>
                <span className="seal">?</span>
                <strong>THE FIRST ROLE</strong>
                <span className="role-action">BREAK THE SEAL ↗</span>
              </span>
              <span className="role-back" aria-hidden="true">
                <small>ROLE REVEALED / 01</small>
                <span className="role-symbol">♜</span>
                <strong>The builder.</strong>
                <span>
                  I build tools for tracking websites, monitoring systems, and
                  exploring the web in 3D.
                </span>
              </span>
            </span>
          </button>
          <button
            className="role-card"
            data-role="1"
            aria-expanded="false"
            aria-label="Reveal role two"
          >
            <span className="role-inner">
              <span className="role-front" aria-hidden="false">
                <small>CLASSIFIED / 02</small>
                <span className="seal">?</span>
                <strong>THE SECOND ROLE</strong>
                <span className="role-action">BREAK THE SEAL ↗</span>
              </span>
              <span className="role-back" aria-hidden="true">
                <small>ROLE REVEALED / 02</small>
                <span className="role-symbol">♞</span>
                <strong>The student.</strong>
                <span>
                  I’m studying for my master’s degree in computer science at
                  NYU.
                </span>
              </span>
            </span>
          </button>
          <button
            className="role-card"
            data-role="2"
            aria-expanded="false"
            aria-label="Reveal role three"
          >
            <span className="role-inner">
              <span className="role-front" aria-hidden="false">
                <small>CLASSIFIED / 03</small>
                <span className="seal">?</span>
                <strong>THE THIRD ROLE</strong>
                <span className="role-action">BREAK THE SEAL ↗</span>
              </span>
              <span className="role-back" aria-hidden="true">
                <small>ROLE REVEALED / 03</small>
                <span className="role-symbol">♝</span>
                <strong>The thinker.</strong>
                <span>
                  I write about RAG evaluation, distributed systems, and the
                  technology behind websites.
                </span>
              </span>
            </span>
          </button>
        </div>
        <p id="role-clue" className="role-clue">
          A builder, a student, a thinker. Who is behind each card?
        </p>
        <button id="reset-roles" className="text-button">
          SEAL THE ROLES AGAIN ↺
        </button>
      </div>
      <a className="button" href="/Ayaan.pdf" target="_blank" rel="noopener">
        OPEN MY DOSSIER / RESUME ↗
      </a>
    </section>
  );
}
