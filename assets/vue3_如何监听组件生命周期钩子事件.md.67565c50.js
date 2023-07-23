import{_ as s,o as e,c as a,a as n}from"./app.8fc642ea.js";const h=JSON.parse('{"title":"vue3 如何监听生命周期钩子事件","description":"","frontmatter":{},"headers":[{"level":2,"title":"vue2 中也有类似的写法","slug":"vue2-中也有类似的写法","link":"#vue2-中也有类似的写法","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"relativePath":"vue3/如何监听组件生命周期钩子事件.md"}'),l={name:"vue3/如何监听组件生命周期钩子事件.md"},o=n(`<h1 id="vue3-如何监听生命周期钩子事件" tabindex="-1">vue3 如何监听生命周期钩子事件 <a class="header-anchor" href="#vue3-如何监听生命周期钩子事件" aria-hidden="true">#</a></h1><p>有时候需要父组件需要知道子组件的生命周期钩子事件，比如子组件的<code>mounted</code>钩子事件，父组件需要在子组件<code>mounted</code>钩子事件执行完毕后，再执行一些操作。</p><p>比如 animate.css 和 element-plus 一起使用，animate 的样式权重太高，让 element-plus 分页有禁用样式。</p><p><img src="https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/animate.css%E5%92%8Cele%E6%A0%B7%E5%BC%8F%E5%86%B2%E7%AA%81.png" alt="animate.css和ele样式冲突"></p><p>希望在分页组件挂载和更新后移除<code>disabled</code>属性。</p><p>vue3 提供了生命周期钩子事件。</p><p>这个需求可以这样写。</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">el-pagination</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@vnode-mounted</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">removePaginationDisabled</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@vnode-updated</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">removePaginationDisabled</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>jsx 写法</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ElPagination</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">onVnodeMounted</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">removePaginationDisabled</span><span style="color:#89DDFF;">} </span><span style="color:#C792EA;">onVnodeUpdated</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">removePaginationDisabled</span><span style="color:#89DDFF;">} /&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在模板里还支持这样写</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">el-pagination</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@vue:mounted</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">removePaginationDisabled</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@vue:updated</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">removePaginationDisabled</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>这种写法在 jsx 中理论上这样写<code>onVue:mounted</code>也是支持的，但是测试了<code>vue@3.2.47</code>，不支持，这种不统一的存在，很让人迷惑。 使用第一种即可。</p></blockquote><p>其他生命周期钩子事件</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">onVnodeBeforeMount</span></span>
<span class="line"><span style="color:#FFCB6B;">onVnodeBeforeUpdate</span></span>
<span class="line"><span style="color:#FFCB6B;">onVnodeBeforeUnmount</span></span>
<span class="line"><span style="color:#FFCB6B;">onVnodeUnmounted</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="vue2-中也有类似的写法" tabindex="-1">vue2 中也有类似的写法 <a class="header-anchor" href="#vue2-中也有类似的写法" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">@hook:mounted</span></span>
<span class="line"><span style="color:#FFCB6B;">@hook:updated</span></span>
<span class="line"><span style="color:#FFCB6B;">@hook:beforeDestroy</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-hidden="true">#</a></h2><p><a href="https://dev.to/the_one/vue-3-tipstricks-i-guarantee-you-didnt-know-49ml" target="_blank" rel="noreferrer">7 Vue3 tips you need to know</a></p><p><a href="https://juejin.cn/post/7006616545119961101" target="_blank" rel="noreferrer">Vue 官方文档里没告诉你的神秘钩子——@hook</a></p><p><a href="https://segmentfault.com/q/1010000040940921" target="_blank" rel="noreferrer">vue3 如何监听生命周期钩子？</a></p>`,21),p=[o];function t(r,c,i,d,u,m){return e(),a("div",null,p)}const D=s(l,[["render",t]]);export{h as __pageData,D as default};
