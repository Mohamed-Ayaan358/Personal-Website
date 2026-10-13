import { notFound } from "next/navigation";
import { allPosts, tagSlug } from "../../../lib/posts";
import BlogShell from "../../../components/BlogShell";
import PostList from "../../../components/PostList";
export function generateStaticParams() {
  return [
    ...new Set(
      allPosts()
        .flatMap((p) => p.tags || [])
        .map(tagSlug),
    ),
  ].map((tag) => ({ tag }));
}
export default async function Tag({ params }) {
  const { tag } = await params;
  const posts = allPosts().filter((p) =>
    p.tags?.some((t) => tagSlug(t) === tag),
  );
  if (!posts.length) notFound();
  return (
    <BlogShell>
      <h1>{tag}</h1>
      <PostList posts={posts} />
    </BlogShell>
  );
}
