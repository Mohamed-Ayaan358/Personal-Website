import { allPosts, tagSlug } from "../../lib/posts";
import BlogShell from "../../components/BlogShell";
export const metadata = { title: "Tags — Mohamed Ayaan" };
export default function Tags() {
  const counts = {};
  allPosts().forEach((p) =>
    p.tags?.forEach((t) => (counts[t] = (counts[t] || 0) + 1)),
  );
  return (
    <BlogShell>
      <h1>Tags.</h1>
      <div className="post-tags">
        {Object.entries(counts).map(([tag, count]) => (
          <a key={tag} href={`/tags/${tagSlug(tag)}`}>
            {tag} ({count})
          </a>
        ))}
      </div>
    </BlogShell>
  );
}
