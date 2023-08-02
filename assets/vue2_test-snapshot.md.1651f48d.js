import{_ as s,o as n,c as a,a as l}from"./app.cfc72729.js";const d=JSON.parse('{"title":"快照测试","description":"","frontmatter":{},"headers":[{"level":2,"title":"快照测试简介","slug":"快照测试简介","link":"#快照测试简介","children":[]},{"level":2,"title":"静态组件的快照测试","slug":"静态组件的快照测试","link":"#静态组件的快照测试","children":[]},{"level":2,"title":"动态组件的快照测试","slug":"动态组件的快照测试","link":"#动态组件的快照测试","children":[]}],"relativePath":"vue2/test-snapshot.md"}'),p={name:"vue2/test-snapshot.md"},e=l(`<h1 id="快照测试" tabindex="-1">快照测试 <a class="header-anchor" href="#快照测试" aria-hidden="true">#</a></h1><p>快照测试：自动比较应用程序两种图片的方法，保证不会无意中修改组件。</p><h2 id="快照测试简介" tabindex="-1">快照测试简介 <a class="header-anchor" href="#快照测试简介" aria-hidden="true">#</a></h2><p>一个对快照测试简单的解释就是获取代码的快照，并将其与以前保存的快照进行对比。如果新的快照与前一个快照不匹配，测试就会失败。</p><p>用Jest来编写快照测试。Jest快照测试会对比序列化值（serializable value）。基本上任何可以转换为字符串的JavaScript值都是序列化值。</p><p>toMatchSnapshot匹配器</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">expect</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toMatchSnapshot</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>或者把DOM节点传给快照</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">expect</span><span style="color:#A6ACCD;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">div</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toMatchSnapshot</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="静态组件的快照测试" tabindex="-1">静态组件的快照测试 <a class="header-anchor" href="#静态组件的快照测试" aria-hidden="true">#</a></h2><p>静态组件（static component）指的是总是渲染相同输出的组件。它不接收任何prop，也没有任何state。组件中没有任何逻辑，并且总是会渲染相同的HTML元素。</p><p>为静态组件编写单元测试是没有必要的，因为实际上它们也不做任何事情。但是，在最初编写完静态组件并手动测试它之后，想要确保静态组件在未来不会发生更改，单元测试就变得非常有用了。</p><p>有一静态组件 <code>StaticComponent.vue</code> :</p><div class="language-HTML line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">StaticComponent</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">StaticComponent 1</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>测试用例 <code>StaticComponent.spec.js</code> :</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">shallowMount</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vue/test-utils</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> StaticComponent </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./StaticComponent.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">describe</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">StaticComponent</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">it</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">快照测试</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">wrapper</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">shallowMount</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">StaticComponent</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">wrapper</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">element</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toMatchSnapshot</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>第一次运行，因为没有比较对象，所以会生成一个快照文件 <code>__snapshots__/StaticComponent.spec.js.snap</code> ，测试通过，内容如下。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">exports</span><span style="color:#A6ACCD;">[</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">StaticComponent 快照测试 1</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">&lt;div&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">  &lt;h1&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    StaticComponent</span></span>
<span class="line"><span style="color:#C3E88D;">  &lt;/h1&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">   </span></span>
<span class="line"><span style="color:#C3E88D;">  &lt;p&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    StaticComponent</span></span>
<span class="line"><span style="color:#C3E88D;">  &lt;/p&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>修改静态组件，再运行测试，测试失败，因为快照文件与新的快照不匹配。</p><p>会在控制台输出差异。</p><h2 id="动态组件的快照测试" tabindex="-1">动态组件的快照测试 <a class="header-anchor" href="#动态组件的快照测试" aria-hidden="true">#</a></h2>`,21),o=[e];function t(c,r,i,D,y,F){return n(),a("div",null,o)}const b=s(p,[["render",t]]);export{d as __pageData,b as default};
