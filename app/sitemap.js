import { allPosts, tagSlug } from "../lib/posts";
const origin = "https://www.mayaan.site";
export default function sitemap() {
  const posts = allPosts();
  return [
    "",
    "/blog",
    "/tags",
    "/resume",
    "/projects",
    ...posts.map((p) => "/blog/" + p.slug),
    ...[...new Set(posts.flatMap((p) => p.tags || []).map(tagSlug))].map(
      (t) => "/tags/" + t,
    ),
  ].map((path) => ({
    url: origin + path,
    lastModified: new Date(posts[0].date),
  }));
}
