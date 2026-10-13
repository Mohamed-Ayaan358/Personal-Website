# Structure

`app/layout.jsx` supplies document metadata and styles. `app/page.jsx` renders `Portfolio`, which composes five React section components and the blog dialog. Next.js renders the initial page; React hydrates it. The game engine loads only after the component mounts, keeping browser APIs out of server rendering.

The React components own the page layout. The game modules own transient game state, canvas contents, and animated DOM updates. React does not rerender game frames. This keeps the existing animations intact without embedding the static HTML page or loading the old app through a script tag.

## Game modules

- `app.js`: initializes the games, shares geometry helpers, manages the render loop and connects UI controls. Returns a cleanup function for React's effect.
- `chess-background.js`: the scroll journey, threats, tossed board and reset.
- `promotion-flight.js`: the pawn-to-queen flight and landing.
- `project-table.js`: the 3D card, chip stacks, dealer stick and sequential card exchanges.
- `checkers-game.js`: legal moves, pointer interactions and capture animation.
- `social-pack.js`: seal tearing, card reveal and waiting for the queen landing.
- `card-sparkles.js`: sparkle density and color by rarity.
- `projects.js`: editable project data.
- `reader-format.js`: Markdown and LaTeX rendering with sanitization.

Event listeners registered through `listen` are removed at cleanup. Resize and mutation observers disconnect, the animation frame stops, and renderer resources are disposed. Contact-pack observation is also disconnected. Reduced-motion preferences retain the immediate interaction paths.

## Editing chip counts

In `projects.js`, `languages`, `chipCounts` and `chipPositions` use matching indexes. For example, `chipCounts: [5, 3, 2]` creates five chips for the first language, three for the second, and two for the third. Chip counts are bounded between one and six. Positions are `[x, z]` pairs on the table; offset them to change the scattering.

## Repository migration

The redesign now runs in the original repository. All six source posts are rendered as MDX on full blog routes. The checker modal is regenerated from source at build time. Legacy implementation files remain under `legacy/`, and data/assets are preserved.
