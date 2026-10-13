import { tagSlug } from "../lib/posts";
export default function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <article key={post.slug}>
          <p className="eyebrow">{post.date}</p>
          <h2>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </h2>
          <p>{post.summary}</p>
          <div className="post-tags">
            {post.tags?.map((tag) => (
              <a key={tag} href={`/tags/${tagSlug(tag)}`}>
                {tag}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
