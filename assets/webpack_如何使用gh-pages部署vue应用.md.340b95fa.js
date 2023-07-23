import{_ as s,o as a,c as e,a as n}from"./app.8fc642ea.js";const D=JSON.parse('{"title":"如何使用 gh-pages 部署 vue 应用？","description":"","frontmatter":{},"headers":[{"level":2,"title":"gh-pages 是什么？","slug":"gh-pages-是什么","link":"#gh-pages-是什么","children":[]},{"level":2,"title":"如何部署到 gh-pages?","slug":"如何部署到-gh-pages","link":"#如何部署到-gh-pages","children":[]},{"level":2,"title":"如何解决切换路由后刷新浏览器 404 ？","slug":"如何解决切换路由后刷新浏览器-404","link":"#如何解决切换路由后刷新浏览器-404","children":[]},{"level":2,"title":"react 项目如何解决 404 问题？","slug":"react-项目如何解决-404-问题","link":"#react-项目如何解决-404-问题","children":[]}],"relativePath":"webpack/如何使用gh-pages部署vue应用.md"}'),p={name:"webpack/如何使用gh-pages部署vue应用.md"},l=n(`<h1 id="如何使用-gh-pages-部署-vue-应用" tabindex="-1">如何使用 gh-pages 部署 vue 应用？ <a class="header-anchor" href="#如何使用-gh-pages-部署-vue-应用" aria-hidden="true">#</a></h1><p>使用 webpack5 实现了微前端，希望能把这些应用部署到 git-pages, 如何办呢？</p><p><a href="https://jackchoumine.github.io/webpack/%E6%A8%A1%E5%9D%97%E8%81%94%E9%82%A6%E5%AE%9E%E7%8E%B0%E5%BE%AE%E5%89%8D%E7%AB%AF.html" target="_blank" rel="noreferrer">webpack5 模块联邦实现微前端</a></p><h2 id="gh-pages-是什么" tabindex="-1">gh-pages 是什么？ <a class="header-anchor" href="#gh-pages-是什么" aria-hidden="true">#</a></h2><p>gh-pages 是 github 提供给项目、组织等托管静态页面的服务，可使用这项服务托管项目介绍页面、使用文档和组织介绍、个人简历等。</p><h2 id="如何部署到-gh-pages" tabindex="-1">如何部署到 gh-pages? <a class="header-anchor" href="#如何部署到-gh-pages" aria-hidden="true">#</a></h2><p>参考这个。</p><p><a href="https://github.com/vortesnail/blog/issues/8" target="_blank" rel="noreferrer">如何部署 create-react-app 项目到 Github pages 步骤</a></p><p><a href="https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f" target="_blank" rel="noreferrer">How to deploy React App to GitHub Pages</a></p><p>还可与 CI CD 工具结合，实现自动部署，相关操作可执行搜索。</p><p><a href="https://jackchoumine.github.io/vue3-dashboard/" target="_blank" rel="noreferrer">部署后的效果</a></p><h2 id="如何解决切换路由后刷新浏览器-404" tabindex="-1">如何解决切换路由后刷新浏览器 404 ？ <a class="header-anchor" href="#如何解决切换路由后刷新浏览器-404" aria-hidden="true">#</a></h2><p>设置两个地方</p><ol><li>把仓库名字作为基础路径</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> isProd </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">NODE_ENV </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">production</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> history </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> isMemoryHistory</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createMemoryHistory</span><span style="color:#A6ACCD;">(basePath)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createWebHistory</span><span style="color:#A6ACCD;">(isProd </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/vue3-dashboard</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">undefined</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 生产环境才设置基础路径</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// vue3-dashboard 是项目名字</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="2"><li>设置自定义错误页面</li></ol><p>添加一个 <code>404.html</code>，内容和 <code>index.html</code>一样当找不到路径时，会渲染 404.html.</p><p>每次复制文件也麻烦，我是每次执行部署，脚本执行成功后复制 index.html 为 404.html</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">&quot;build&quot;</span><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">webpack --config config/webpack.prod.js --progress</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">&quot;postbuild&quot;</span><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cp dist/index.html dist/404.html</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">&quot;predeploy&quot;</span><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">npm run build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">&quot;deploy&quot;</span><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">gh-pages -d dist</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>其他解决办法：</p><p>使用 hash 模式，然后根据这个设置一下 <a href="https://siddharam.com.tw/post/20190929/" target="_blank" rel="noreferrer">部署 vue 到 GitHub Pages：404 頁面</a></p><p>我没试过，不知道能否成功。</p><p>我还试了<a href="https://segmentfault.com/a/1190000012951274" target="_blank" rel="noreferrer">单页应用在 gh-pages 动态路由刷新后 404 解决方案</a>，没成功。</p><p>更多方法，参考 <a href="https://stackoverflow.com/questions/11577147/how-to-fix-http-404-on-github-pages" target="_blank" rel="noreferrer">How to fix HTTP 404 on Github Pages?</a></p><h2 id="react-项目如何解决-404-问题" tabindex="-1">react 项目如何解决 404 问题？ <a class="header-anchor" href="#react-项目如何解决-404-问题" aria-hidden="true">#</a></h2><p>尝试了 vue 类似的解决办法，没成功，要是你有个更好的办法，感谢告诉我。</p>`,26),o=[l];function t(r,c,i,h,d,y){return a(),e("div",null,o)}const g=s(p,[["render",t]]);export{D as __pageData,g as default};
