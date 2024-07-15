import{_ as e,o as a,c as n,a as s}from"./app.8ede9f51.js";const b=JSON.parse('{"title":"tailwind 和组件库样式冲突","description":"","frontmatter":{},"headers":[{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]},{"level":2,"title":"相似的问题","slug":"相似的问题","link":"#相似的问题","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"relativePath":"web/css/tailwind和组件库样式冲突.md"}'),i={name:"web/css/tailwind和组件库样式冲突.md"},t=s(`<h1 id="tailwind-和组件库样式冲突" tabindex="-1">tailwind 和组件库样式冲突 <a class="header-anchor" href="#tailwind-和组件库样式冲突" aria-hidden="true">#</a></h1><p>tailwind 在组件库样式之前引入，会导致 tailwind 样式被组件库样式覆盖，比如 <code>flex</code> 添加到 <code>el-col</code> 组件上，flex 样式会被 <code>el-col</code> 样式覆盖。</p><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-hidden="true">#</a></h2><p>组件库不使用自动引入，而是手动在 <code>tailwind</code> 之后引入，这样可确保 tailwind 的工具类生效。</p><p>然而，tailwind 后引入，它的 <code>@tailwind base</code> ，又会重置组件的库的样式。</p><p>经过搜索，得知 <code>base</code> 是重置样式，以保证页面在不同浏览器中的一致性。如果已经有了一套自己的重置样式，可不引入。</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// @tailwind base; // 不引入重置样式</span></span>
<span class="line"><span style="color:#A6ACCD;">@tailwind components</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">@tailwind utilities</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="相似的问题" tabindex="-1">相似的问题 <a class="header-anchor" href="#相似的问题" aria-hidden="true">#</a></h2><p><a href="https://stackoverflow.com/questions/71783177/remove-specific-style-from-tailwind-base" target="_blank" rel="noreferrer">remove specific style from tailwind base</a></p><p><a href="https://medium.com/@trungpv1601/how-to-safely-remove-tailwind-css-base-rules-when-building-chrome-extensions-f5ca9f9a9d04" target="_blank" rel="noreferrer">How to safely remove Tailwind CSS base rules when building Chrome Extensions</a></p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-hidden="true">#</a></h2><p><a href="https://powerkaifu.github.io/2020/09/24/lesson-tailwind-css/" target="_blank" rel="noreferrer">Tailwind CSS 大全</a></p><p><a href="https://blog.csdn.net/andy_68147772/article/details/134679114" target="_blank" rel="noreferrer">Tailwind使用技巧：在配置时，可以省略掉@tailwind base吗</a></p><p><a href="https://hsuchihting.github.io/categories/TailwindCSS/" target="_blank" rel="noreferrer">TailwindCSS</a></p><p><a href="https://mdnice.com/writing/a8fb53dcc8654401802fe1c935c41104" target="_blank" rel="noreferrer">带你探索Tailwind Css</a></p><p><a href="https://blackglory.me/notes/tailwind-css" target="_blank" rel="noreferrer">tailwind css</a></p>`,16),l=[t];function r(d,o,c,p,h,_){return a(),n("div",null,l)}const w=e(i,[["render",r]]);export{b as __pageData,w as default};
