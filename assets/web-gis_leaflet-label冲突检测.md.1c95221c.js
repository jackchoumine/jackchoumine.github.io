import{_ as e,o as a,c as l,a as s}from"./app.8fc642ea.js";const m=JSON.parse('{"title":"label 冲突检测","description":"","frontmatter":{},"headers":[{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]}],"relativePath":"web-gis/leaflet-label冲突检测.md"}'),n={name:"web-gis/leaflet-label冲突检测.md"},t=s(`<h1 id="label-冲突检测" tabindex="-1">label 冲突检测 <a class="header-anchor" href="#label-冲突检测" aria-hidden="true">#</a></h1><p>什么是 label 冲突？</p><p>当两个 label 距离很近的时候，会发生重叠，这就是 label 冲突。</p><p><img src="https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/leaflet-collision.png" alt="leaflet-label" title="两个label重叠"></p><p><img src="https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/leaflet-collision-many-20230718205042.png" alt="leaflet-label" title="很多label冲突"></p><p>label 重叠 (label overlapping)，会导致用户无法看清楚地图上的信息，所以需要解决 label 冲突。</p><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-hidden="true">#</a></h2><p>使用 leaflet 插件<code>@panzhiyue/leaflet-canvaslabel</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@panzhiyue/leaflet-canvaslabel</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,9),c=[t];function p(i,o,r,d,b,h){return a(),l("div",null,c)}const u=e(n,[["render",p]]);export{m as __pageData,u as default};
