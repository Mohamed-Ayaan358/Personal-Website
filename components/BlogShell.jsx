export default function BlogShell({ children }) {
  return (
    <main className="blog-shell">
      <nav className="blog-nav">
        <a href="/">♟ Your move</a>
        <a href="/blog">Writing</a>
        <a href="/tags">Tags</a>
        <a href="/resume">Résumé</a>
      </nav>
      {children}
    </main>
  );
}
