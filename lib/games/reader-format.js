import { marked } from "marked";
import katex from "katex";
import DOMPurify from "dompurify";

function mathHTML(text, displayMode) {
  return katex.renderToString(text, {
    displayMode,
    throwOnError: false,
    trust: false,
    strict: "ignore",
    output: "htmlAndMathml",
  });
}
// Capture TeX before Markdown can interpret its underscores or backslashes.
marked.use({
  extensions: [
    {
      name: "displayMath",
      level: "block",
      start(src) {
        return src.search(
          /\$\$|\\\[|\\begin\{(?:equation|align|gather|alignat)/,
        );
      },
      tokenizer(src) {
        let match = /^[ \t]*\$\$([\s\S]+?)\$\$(?:\s*\n|$)/.exec(src);
        if (!match) match = /^[ \t]*\\\[([\s\S]+?)\\\](?:\s*\n|$)/.exec(src);
        if (match)
          return { type: "displayMath", raw: match[0], text: match[1].trim() };
        match =
          /^[ \t]*\\begin\{(equation\*?|align\*?|gather\*?|alignat\*?)\}([\s\S]*?)\\end\{\1\}/.exec(
            src,
          );
        if (match)
          return { type: "displayMath", raw: match[0], text: match[0].trim() };
      },
      renderer(token) {
        return mathHTML(token.text, true);
      },
    },
    {
      name: "inlineMath",
      level: "inline",
      start(src) {
        return src.search(/\$|\\[([\]]/);
      },
      tokenizer(src) {
        const match =
          /^(?:\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\))/.exec(
            src,
          );
        if (match)
          return {
            type: "inlineMath",
            raw: match[0],
            text: (match[1] ?? match[2] ?? match[3] ?? match[4]).trim(),
            display: Boolean(match[1] ?? match[3]),
          };
      },
      renderer(token) {
        return mathHTML(token.text, token.display);
      },
    },
  ],
});

export function formatBlog(markdown) {
  return DOMPurify.sanitize(marked.parse(markdown, { gfm: true }), {
    USE_PROFILES: { html: true, mathMl: true, svg: true },
  });
}
