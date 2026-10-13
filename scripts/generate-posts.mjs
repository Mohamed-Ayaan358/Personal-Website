import {allPosts} from '../lib/posts.js';
import fs from 'node:fs';
const posts=allPosts().map(({content,...post})=>({...post,markdown:content.replace(/<Image\b/g,'<img').replace(/(width|height)=\{(\d+)\}/g,'$1="$2"')}));
// The three numbered checker pieces keep their stories; the blog index includes every post.
const selected=['kronos','evaluations','web-review_cred'].map(slug=>posts.find(post=>post.slug===slug)).filter(Boolean);
fs.writeFileSync('public/posts.json',JSON.stringify(selected,null,2)+'\n');
console.log(`Loaded ${posts.length} blog posts; generated ${selected.length} checker stories.`);
