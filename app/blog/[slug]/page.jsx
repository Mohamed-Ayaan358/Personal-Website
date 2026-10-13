import { notFound } from "next/navigation";
import { allPosts, postContent, tagSlug } from "../../../lib/posts";
import BlogShell from "../../../components/BlogShell";
import Comments from "../../../components/Comments";
export function generateStaticParams() {
  return allPosts().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = allPosts().find((post) => post.slug === slug);
  return {
    title: post ? `${post.title} — Mohamed Ayaan` : "Post not found",
    description: post?.summary,
  };
}
export default async function Post({ params }) {
  const { slug } = await params;
  const post = allPosts().find((post) => post.slug === slug);
  if (!post) notFound();
  const Content = await postContent(post);
  const Image = (props) => (
    <img {...props} alt={props.alt || ""} loading="lazy" />
  );
  return (
    <BlogShell>
      <p className="eyebrow">{post.date}</p>
      <h1>{post.title}</h1>
      <div className="post-tags">
        {post.tags?.map((tag) => (
          <a key={tag} href={`/tags/${tagSlug(tag)}`}>
            {tag}
          </a>
        ))}
      </div>
      <article className="blog-content">
        <Content components={{ Image }} />
      </article>
      <Comments />
    </BlogShell>
  );
}
