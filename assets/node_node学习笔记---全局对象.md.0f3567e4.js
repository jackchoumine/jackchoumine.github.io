import{_ as s,o as n,c as a,a as e}from"./app.8fc642ea.js";const u=JSON.parse('{"title":"node 学习笔记 --- 全局对象","description":"","frontmatter":{},"headers":[{"level":2,"title":"global 对象","slug":"global-对象","link":"#global-对象","children":[]},{"level":2,"title":"process","slug":"process","link":"#process","children":[]},{"level":2,"title":"console","slug":"console","link":"#console","children":[]}],"relativePath":"node/node学习笔记---全局对象.md"}'),l={name:"node/node学习笔记---全局对象.md"},o=e(`<h1 id="node-学习笔记-全局对象" tabindex="-1">node 学习笔记 --- 全局对象 <a class="header-anchor" href="#node-学习笔记-全局对象" aria-hidden="true">#</a></h1><h2 id="global-对象" tabindex="-1">global 对象 <a class="header-anchor" href="#global-对象" aria-hidden="true">#</a></h2><p>node 用一个类似 window 的对象，是<code>全局变量</code>的宿主。 全局变量：</p><ul><li>global 的属性；</li><li>隐士定义的变量；</li><li>最外层定义的变量。 node 不可能在最外层定义变量，因为所有代码都在当前模块，而模块不是最外层上下文。</li></ul><h2 id="process" tabindex="-1">process <a class="header-anchor" href="#process" aria-hidden="true">#</a></h2><p><code>process</code> 是全局变量，global 的属性。描述当前 node 进程的状态，提供了一个与 操作系统的简单接口，命令行程序需要与之打交道。</p><ul><li><code>process.argv</code> 是命令行参数，第一个是 node，第二个元素是脚本文件名，第三个元素开始是运行的参数。</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// test.1.js</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">argv)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>运行：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test.1.js</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">jackzhou</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">age=</span><span style="color:#F78C6C;">23</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">location=Chengdu</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">C:\\\\Program Files\\\\nodejs\\\\node.exe</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">C:\\\\Users\\\\Administrator\\\\Desktop\\\\nodeJS学习\\\\node开发指南笔记\\\\test.</span></span>
<span class="line"><span style="color:#C3E88D;">1.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">jackzhou</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">age=23</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">location=Chengdu</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul><li><code>process.stdout</code> 是标准输出流，通常我们使用 <code>console.log()</code>向标准输出打印字符串，而 <code>process.stdout.write()</code> 函数提供了更底层的接口。</li><li><code>process.stdin</code>是标准输入流</li><li><code>process.nextTick(callback)</code>的功能是为事件循环设置一项任务， node 会在下次事件循环响应时调用 callback。 一个 node 进程只有一个线程，任何时刻，只有一个事件在执行。如果一个事件占用大量 CPU 时间，事件循环中的下一个事件，就需要等待很久，node 的一个编程原则是尽量缩短每个事件的执行时间。<code>process.nextTick()</code>可把复杂工作拆散成一个个较小的事件，从而缩短事件等待时间。</li></ul><h2 id="console" tabindex="-1">console <a class="header-anchor" href="#console" aria-hidden="true">#</a></h2><p>console 对象提供标准输出，用于标准输出流（stdout）或者标准错误流（stderr）。</p><ul><li><code>console.log()</code>,输出字符并<code>换行</code>。</li><li>error 。</li><li>trace：向标准输出流输出调用栈。</li></ul>`,14),p=[o];function c(r,t,i,d,D,C){return n(),a("div",null,p)}const h=s(l,[["render",c]]);export{u as __pageData,h as default};
