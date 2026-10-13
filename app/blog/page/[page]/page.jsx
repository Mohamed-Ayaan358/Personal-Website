import { redirect, notFound } from "next/navigation";
import { allPosts } from "../../../../lib/posts";
import BlogShell from "../../../../components/BlogShell";
import PostList from "../../../../components/PostList";
const pageSize = 5;
export function generateStaticParams() {
  return Array.from(
    { length: Math.ceil(allPosts().length / pageSize) },
    (_, i) => ({ page: String(i + 1) }),
  );
}
export default async function BlogPage({ params }) {
  const { page } = await params;
  const number = Number(page);
  if (number === 1) redirect("/blog");
  const posts = allPosts();
  if (
    !Number.isInteger(number) ||
    number < 1 ||
    number > Math.ceil(posts.length / pageSize)
  )
    notFound();
  return (
    <BlogShell>
      <h1>Writing.</h1>
      <PostList
        posts={posts.slice((number - 1) * pageSize, number * pageSize)}
      />
      <a href="/blog">All posts ↗</a>
    </BlogShell>
  );
}
