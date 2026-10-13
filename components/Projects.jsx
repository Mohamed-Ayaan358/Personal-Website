import { projects } from "../lib/games/projects";
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
          <span id="deal-count">YOUR HAND · {projects.length} CARDS</span>
        </div>
        <div id="project-scene" className="scene" aria-hidden="true"></div>
        <div id="played-card" className="played-card" aria-hidden="true">
          <span>♠</span>
          <strong></strong>
        </div>
        <div className="table-result" aria-live="polite">
          <span id="project-status"></span>
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
          {projects.map((project, index) => (
            <button
              className="card"
              data-project={index}
              key={project.repo}
              aria-label={`Play ${project.name}`}
              data-fan-first={index === 0}
              style={{
                "--fan-angle": `${(index - (projects.length - 1) / 2) * 10}deg`,
                "--fan-lift": `${Math.pow(index - (projects.length - 1) / 2, 2) * 6}px`,
                "--fan-order": index + 1,
              }}
            >
              <span className="corner">
                {project.rank}
                <br />
                {project.suit}
              </span>
              <span className="suit">{project.suit}</span>
              <strong>{project.name}</strong>
              <small>{project.description}</small>
              <span className="corner bottom">
                {project.rank}
                <br />
                {project.suit}
              </span>
            </button>
          ))}
        </div>
        <p className="hint">
          A CARD GAME ABOUT CODE. EVERY TOKEN IS A LANGUAGE.
        </p>
      </div>
      <a className="scroll-link" href="/projects">
        ALL PROJECTS ↗
      </a>
    </section>
  );
}
