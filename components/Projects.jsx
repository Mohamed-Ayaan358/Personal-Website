export default function Projects() {
  return (
    <section id="projects" className="chapter">
      <p className="eyebrow">02 / STACK & PLAY</p>
      <h2>Play your stack.</h2>
      <p className="lead">
        Pick a card. Put its languages in play.
        <br />
        See what’s behind the build.
      </p>
      <div className="game-shell project-game">
        <div className="table-heading">
          <span>THE BUILD TABLE</span>
          <span id="deal-count">YOUR HAND · 3 CARDS</span>
        </div>
        <div id="project-scene" className="scene" aria-hidden="true"></div>
        <div id="played-card" className="played-card" aria-hidden="true">
          <span>♠</span>
          <strong></strong>
        </div>
        <div className="table-result" aria-live="polite">
          <span id="project-status">Choose a project from your hand.</span>
          <div id="language-labels"></div>
          <a
            id="github-link"
            className="button"
            hidden
            target="_blank"
            rel="noopener"
          >
            OPEN REPOSITORY ↗
          </a>
        </div>
        <div className="hand" aria-label="Project cards">
          <button className="card" data-project="0">
            <span className="corner">
              A<br />♠
            </span>
            <span className="suit">♠</span>
            <strong>Stalkr</strong>
            <small>Website change tracking</small>
            <span className="card-action">DEAL THIS PROJECT ↗</span>
            <span className="corner bottom">
              A<br />♠
            </span>
          </button>
          <button className="card" data-project="1">
            <span className="corner">
              K<br />♣
            </span>
            <span className="suit">♣</span>
            <strong>SysPerf</strong>
            <small>A Rust & Go system monitor</small>
            <span className="card-action">DEAL THIS PROJECT ↗</span>
            <span className="corner bottom">
              K<br />♣
            </span>
          </button>
          <button className="card" data-project="2">
            <span className="corner">
              Q<br />♦
            </span>
            <span className="suit">♦</span>
            <strong>Planet Portfolio</strong>
            <small>A Three.js portfolio experiment</small>
            <span className="card-action">DEAL THIS PROJECT ↗</span>
            <span className="corner bottom">
              Q<br />♦
            </span>
          </button>
        </div>
        <p className="hint">
          A CARD GAME ABOUT CODE. EVERY TOKEN IS A LANGUAGE.
        </p>
      </div>
    <a className="scroll-link" href="/projects">ALL PROJECTS ↗</a>
    </section>
  );
}
