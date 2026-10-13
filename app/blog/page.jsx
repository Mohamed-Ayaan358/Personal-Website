import { allPosts } from "../../lib/posts";
import BlogShell from "../../components/BlogShell";
import PostList from "../../components/PostList";
import Newsletter from "../../components/Newsletter";
export const metadata = { title: "Writing — Mohamed Ayaan" };
export default function Blog() {
  return (
    <BlogShell>
      <p className="eyebrow">THE FULL READING DECK</p>
      <h1>Writing.</h1>
      <PostList posts={allPosts()} />
      <Newsletter />
    </BlogShell>
  );
}
