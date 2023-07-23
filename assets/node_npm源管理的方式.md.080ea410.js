import{_ as s,o as n,c as a,a as l}from"./app.8fc642ea.js";const A=JSON.parse('{"title":"npm 源管理的方式","description":"","frontmatter":{},"headers":[{"level":2,"title":"推荐的方式 -- nrm 管理","slug":"推荐的方式-nrm-管理","link":"#推荐的方式-nrm-管理","children":[]},{"level":2,"title":"npm 命令","slug":"npm-命令","link":"#npm-命令","children":[]},{"level":2,"title":"手动修改全局的 ~/.npmrc","slug":"手动修改全局的-npmrc","link":"#手动修改全局的-npmrc","children":[]},{"level":2,"title":"项目内局部使用","slug":"项目内局部使用","link":"#项目内局部使用","children":[]},{"level":2,"title":"安装命令使用","slug":"安装命令使用","link":"#安装命令使用","children":[]}],"relativePath":"node/npm源管理的方式.md"}'),e={name:"node/npm源管理的方式.md"},p=l(`<h1 id="npm-源管理的方式" tabindex="-1">npm 源管理的方式 <a class="header-anchor" href="#npm-源管理的方式" aria-hidden="true">#</a></h1><h2 id="推荐的方式-nrm-管理" tabindex="-1">推荐的方式 -- nrm 管理 <a class="header-anchor" href="#推荐的方式-nrm-管理" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">list</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 查看源 前面有 * 的是正在使用的</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">use</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">registry-name</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 切换源</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">registry-name</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 测试</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">registry-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">url</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 添加新的源</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">del</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">registry-name</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 删除源</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set-auth</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-u</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">username</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">password</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">registry-name</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 对源添加认证信息</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">publish</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 发布 npm</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="npm-命令" tabindex="-1">npm 命令 <a class="header-anchor" href="#npm-命令" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">registry</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">url</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">registry</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>全局的 <code>.npmrc</code> 会修改</p><h2 id="手动修改全局的-npmrc" tabindex="-1">手动修改全局的 ~/.npmrc <a class="header-anchor" href="#手动修改全局的-npmrc" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">registry</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://registry.npm.taobao.org</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="项目内局部使用" tabindex="-1">项目内局部使用 <a class="header-anchor" href="#项目内局部使用" aria-hidden="true">#</a></h2><p>在项目里创建<code>.npmrc</code>，然后设置源。</p><h2 id="安装命令使用" tabindex="-1">安装命令使用 <a class="header-anchor" href="#安装命令使用" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--registry</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">url</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 从该 url 下载 npm</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,12),o=[p];function r(t,c,i,C,y,d){return n(),a("div",null,o)}const D=s(e,[["render",r]]);export{A as __pageData,D as default};
