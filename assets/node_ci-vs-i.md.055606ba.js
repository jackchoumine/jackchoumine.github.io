import{_ as s,o as n,c as a,a as e}from"./app.f4ae5ba7.js";const u=JSON.parse('{"title":"npm ci vs npm i","description":"","frontmatter":{},"headers":[{"level":2,"title":"yarn 和 pnpm 有类似的命令吗？","slug":"yarn-和-pnpm-有类似的命令吗","link":"#yarn-和-pnpm-有类似的命令吗","children":[]},{"level":2,"title":"该选择哪个？","slug":"该选择哪个","link":"#该选择哪个","children":[]}],"relativePath":"node/ci-vs-i.md"}'),o={name:"node/ci-vs-i.md"},l=e(`<h1 id="npm-ci-vs-npm-i" tabindex="-1">npm ci vs npm i <a class="header-anchor" href="#npm-ci-vs-npm-i" aria-hidden="true">#</a></h1><p>通过 <code>npm ci</code> 和 <code>npm i</code> 两个命令，都可安装项目的依赖。那么这两个命令有什么区别呢？</p><p><code>npm ci</code> 和 <code>npm i</code> （或 <code>npm install</code> ）之间有几个关键区别：</p><ol><li><p><strong>目的和用途</strong>：</p><ul><li><p><code>npm ci</code> ：根据项目中的 <code>package-lock.json</code> 文件来安装确切的依赖版本，忽略 <code>package.json</code> 中的 <code>^</code> 和 <code>~</code> 等符号。这确保了每次安装的依赖项版本都是一致的，非常适合自动化环境。</p></li><li><p><code>npm install</code> （或 <code>npm i</code> ）：用于在开发环境或其他非CI/CD环境中安装依赖项。它会根据 <code>package.json</code> 中的依赖规范（比如 <code>^</code> 和 <code>~</code> ）来安装符合条件的<strong>最新版本</strong>。安装完毕后，生成的 <code>package-lock.json</code> 文件会记录实际安装的依赖版本。</p></li></ul></li><li><p><strong>安装速度和效率</strong>：</p><ul><li><code>npm ci</code> 比 <code>npm install</code> 更快，因为它不需要解析和处理 <code>^</code> 和 <code>~</code> 等符号，而是直接依据锁定的版本号安装依赖。它还会跳过生成的 <code>node_modules</code> 目录中已存在的依赖项，从而节省时间。</li></ul></li><li><p><strong>用法限制</strong>：</p><ul><li><code>npm ci</code> 不会写入或更新 <code>package-lock.json</code> 文件。它专注于使用当前已有的锁定文件来安装依赖，以确保环境的一致性和可预测性。</li></ul></li></ol><p>综上所述，选择使用 <code>npm ci</code> 还是 <code>npm install</code> 取决于你的具体需求和环境。在CI/CD环境中，特别是为了保证依赖的一致性和安装的速度，推荐使用 <code>npm ci</code> 。在开发环境或需要灵活控制依赖版本的情况下，可以使用 <code>npm install</code> 。</p><blockquote><p>npm ci 保证了依赖的一致性和可预测性，适合CI/CD环境。npm install 则无法保证。</p></blockquote><h2 id="yarn-和-pnpm-有类似的命令吗" tabindex="-1">yarn 和 pnpm 有类似的命令吗？ <a class="header-anchor" href="#yarn-和-pnpm-有类似的命令吗" aria-hidden="true">#</a></h2><p>没有，通过自定义脚本来实现类似的功能。</p><blockquote><p>yarn</p></blockquote><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">preci</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rm -rf node_modules</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">ci</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">yarn install --frozen-lockfile</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote><p>pnpm</p></blockquote><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">ci</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pnpm install --frozen-lockfile</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="该选择哪个" tabindex="-1">该选择哪个？ <a class="header-anchor" href="#该选择哪个" aria-hidden="true">#</a></h2><ul><li>如果你是在CI/CD环境中，推荐使用 <code>npm ci</code> 以确保依赖的一致性和安装的速度。</li><li>要是开发环境下希望保持版本和同事的一样，也可以使用 <code>npm ci</code> 。但是，如果你需要灵活控制依赖版本，或者需要更新 <code>package-lock.json</code> 文件，那么 <code>npm install</code> 会更适合。</li></ul>`,14),p=[l];function c(t,r,i,d,D,m){return n(),a("div",null,p)}const y=s(o,[["render",c]]);export{u as __pageData,y as default};
