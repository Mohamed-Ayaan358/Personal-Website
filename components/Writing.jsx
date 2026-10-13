export default function Writing() {
  return (
    <section id="writing" className="chapter">
      <p className="eyebrow">03 / CAPTURE A THOUGHT</p>
      <h2>Read your next move.</h2>
      <p className="lead">
        Three pieces. Three stories.
        <br />
        Move a numbered piece. Capture its opponent.
        <br />
        Watch a thought unfold.
      </p>
      <div className="game-shell checker-shell">
        <div className="table-heading">
          <span>THE READING BOARD</span>
          <button id="reset-checkers" className="text-button">
            RESET BOARD ↺
          </button>
        </div>
        <div className="reading-game">
          <div
            id="checker-scene"
            className="scene"
            aria-label="Interactive checkers board"
          ></div>
          <div className="reading-side">
            <p className="eyebrow">YOUR PIECES</p>
            <div className="post-options">
              <button data-post="0">
                <span>01</span>
                <strong>Project Kronos</strong>
                <small>Distributed systems</small>
              </button>
              <button data-post="1">
                <span>02</span>
                <strong>Evaluating the evaluator</strong>
                <small>RAG & evaluation</small>
              </button>
              <button data-post="2">
                <span>03</span>
                <strong>Web Review: CRED</strong>
                <small>Web development</small>
              </button>
            </div>
            <p id="checker-status" role="status">
              Drag a numbered piece diagonally, or select it and click a
              highlighted square.
            </p>
            <div className="checker-controls">
              <button id="move-left" disabled>
                ↖ MOVE LEFT
              </button>
              <button id="move-right" disabled>
                MOVE RIGHT ↗
              </button>
            </div>
            <button id="capture-button" className="button" disabled>
              QUICK READ · SELECT A PIECE
            </button>
          </div>
        </div>
        <p className="hint">
          DRAG TO MOVE · CLICK A PIECE + SQUARE · CAPTURE TO REVEAL A STORY
        </p>
      </div>
      <a className="scroll-link" href="/blog">
        ALL STORIES ↗
      </a>
    </section>
  );
}
