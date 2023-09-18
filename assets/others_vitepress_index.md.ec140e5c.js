import{_ as s,o as a,c as n,a as l}from"./app.0b965c50.js";const h=JSON.parse('{"title":"vitepress 使用技巧","description":"","frontmatter":{},"headers":[{"level":2,"title":"如何让 nav 保持高亮？","slug":"如何让-nav-保持高亮","link":"#如何让-nav-保持高亮","children":[]},{"level":2,"title":"如何让代码块显示行号？","slug":"如何让代码块显示行号","link":"#如何让代码块显示行号","children":[]},{"level":2,"title":"如何添加评论功能？","slug":"如何添加评论功能","link":"#如何添加评论功能","children":[]},{"level":2,"title":"如何开启搜索功能？","slug":"如何开启搜索功能","link":"#如何开启搜索功能","children":[{"level":3,"title":"vitepress 自带的搜索","slug":"vitepress-自带的搜索","link":"#vitepress-自带的搜索","children":[]},{"level":3,"title":"使用 vitepress 插件","slug":"使用-vitepress-插件","link":"#使用-vitepress-插件","children":[]},{"level":3,"title":"接入algolia搜索","slug":"接入algolia搜索","link":"#接入algolia搜索","children":[]}]}],"relativePath":"others/vitepress/index.md"}'),e={name:"others/vitepress/index.md"},p=l(`<h1 id="vitepress-使用技巧" tabindex="-1">vitepress 使用技巧 <a class="header-anchor" href="#vitepress-使用技巧" aria-hidden="true">#</a></h1><nav class="table-of-contents"><ul><li><a href="#vitepress-使用技巧">vitepress 使用技巧</a><ul><li><a href="#如何让-nav-保持高亮">如何让 nav 保持高亮？</a></li><li><a href="#如何让代码块显示行号">如何让代码块显示行号？</a></li><li><a href="#如何添加评论功能">如何添加评论功能？</a></li><li><a href="#如何开启搜索功能">如何开启搜索功能？</a><ul><li><a href="#vitepress-自带的搜索">vitepress 自带的搜索</a></li><li><a href="#使用-vitepress-插件">使用 vitepress 插件</a></li><li><a href="#接入algolia搜索">接入algolia搜索</a></li></ul></li></ul></li></ul></nav><h2 id="如何让-nav-保持高亮" tabindex="-1">如何让 nav 保持高亮？ <a class="header-anchor" href="#如何让-nav-保持高亮" aria-hidden="true">#</a></h2><p>nav 里配置 <code>activeMatch</code></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight has-highlighted-lines" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">nav</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span></span>
<span class="line highlighted"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> link</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/vue3/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> activeMatch</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/vue3/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> link</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/vue2/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> activeMatch</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">^/vue2/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="如何让代码块显示行号" tabindex="-1">如何让代码块显示行号？ <a class="header-anchor" href="#如何让代码块显示行号" aria-hidden="true">#</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">markdown</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">lineNumbers</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><a href="https://vitepress.vuejs.org/guide/markdown.html#line-numbers" target="_blank" rel="noreferrer">更多 markdown 配置</a></p><h2 id="如何添加评论功能" tabindex="-1">如何添加评论功能？ <a class="header-anchor" href="#如何添加评论功能" aria-hidden="true">#</a></h2><h2 id="如何开启搜索功能" tabindex="-1">如何开启搜索功能？ <a class="header-anchor" href="#如何开启搜索功能" aria-hidden="true">#</a></h2><h3 id="vitepress-自带的搜索" tabindex="-1">vitepress 自带的搜索 <a class="header-anchor" href="#vitepress-自带的搜索" aria-hidden="true">#</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">themeConfig</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">search</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#FFCB6B;">provider</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">local</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>效果一般，不建议使用。</p><h3 id="使用-vitepress-插件" tabindex="-1">使用 vitepress 插件 <a class="header-anchor" href="#使用-vitepress-插件" aria-hidden="true">#</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">pagefindPlugin</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vitepress-plugin-pagefind</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">vite</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#82AAFF;">pagefindPlugin</span><span style="color:#A6ACCD;">()]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>效果好，推荐使用。</p><p>还有其他插件，可以自行搜索。</p><h3 id="接入algolia搜索" tabindex="-1">接入<code>algolia</code>搜索 <a class="header-anchor" href="#接入algolia搜索" aria-hidden="true">#</a></h3>`,18),o=[p];function r(t,c,i,F,D,y){return a(),n("div",null,o)}const u=s(e,[["render",r]]);export{h as __pageData,u as default};