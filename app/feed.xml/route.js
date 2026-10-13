import {allPosts} from '../../lib/posts';
export const dynamic='force-static';
const escape=value=>String(value||'').replace(/[<>&"']/g,char=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[char]));
export function GET(){return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Mohamed Ayaan</title><link>https://www.mayaan.site</link><description>Writing and ideas</description>${allPosts().map(post=>`<item><title>${escape(post.title)}</title><link>https://www.mayaan.site/blog/${post.slug}</link><guid>https://www.mayaan.site/blog/${post.slug}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escape(post.summary)}</description></item>`).join('')}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml'}});}
