import fs from "node:fs";
import path from "node:path";
function matter(source) {
 const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
 return match ? {data: yaml.load(match[1]) || {}, content:source.slice(match[0].length)} : {data:{},content:source};
}
import * as yaml from "js-yaml";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
const directory = path.join(process.cwd(), "data/blog");
export function allPosts() {
  return fs
    .readdirSync(directory)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(directory, file), "utf8"),
        { engines: { yaml: yaml.load } },
      );
      return {
        ...data,
        date: new Date(data.date).toISOString().slice(0, 10),
        slug: file.replace(/\.mdx?$/, ""),
        content,
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}
export async function postContent(post) {
  const result = await evaluate(post.content, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  });
  return result.default;
}
export function tagSlug(tag) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
