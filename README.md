# Mohamed Ayaan — Your move

An interactive portfolio built with Next.js App Router, React and Three.js. Scroll through chess, deal project cards, capture checker pieces to read blogs, and open a contact card pack.

## Run

Use Node.js 24.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production: `npm run build`, then `npm start`.

## Edit

- `components/`: homepage sections and blog interface.
- `app/globals.css`: spacing, Montserrat, colors and CSS animations.
- `lib/games/projects.js`: project card data, languages, chip counts and positions.
- `lib/games/`: Three.js game behavior.
- `data/blog/*.md`: every original blog post; supports MDX and LaTeX.
- `public/`: preserved images, favicon assets and `Ayaan.pdf`.

Building regenerates the three checker stories from their source Markdown. `/blog` lists all six posts. Their original `/blog/<slug>` URLs, `/tags`, tag pages, paginated blog URLs, `/resume`, `/sketch`, newsletter API endpoints, sitemap and RSS feed are preserved. `/about` redirects to the homepage About section. `/projects` preserves the complete original project collection.

Google Analytics retains the existing public measurement ID. Giscus uses the existing `NEXT_PUBLIC_GISCUS_*` environment variables. The newsletter uses Buttondown and the existing `BUTTONDOWN_API_KEY` / `BUTTONDOWN_API_URL`. Keep environment values in the current hosting project; never commit secrets. Other existing provider API endpoints remain available.

The previous site's implementation is preserved in `legacy/` for reference. It is not used to build the replacement. Content under `data/` and existing public assets remain intact.

See [DESIGN.md](./DESIGN.md) for the animation module structure.

## Simple portfolio

`/simple` is the concise dark portfolio. Its content is in `app/simple/page.jsx` and its styles are isolated in `app/simple/simple.module.css`.

To serve it at `simple.mayaan.site`, add that domain to this same Vercel project and create the DNS record shown by Vercel. The host-based rewrite serves `/simple` at the subdomain root while retaining the interactive site at `www.mayaan.site`. Deploy this source change before testing the domain. The existing résumé is reused at `/Ayaan.pdf`; replace it when updating its content.
