import{_ as s,o as n,c as l,a}from"./app.014efa19.js";const F=JSON.parse('{"title":"null 和 undefined 的区别","description":"","frontmatter":{},"headers":[{"level":2,"title":"相同点","slug":"相同点","link":"#相同点","children":[]},{"level":2,"title":"不同点","slug":"不同点","link":"#不同点","children":[{"level":3,"title":"undefined","slug":"undefined","link":"#undefined","children":[]},{"level":3,"title":"null","slug":"null","link":"#null","children":[]}]},{"level":2,"title":"该如何选择呢？","slug":"该如何选择呢","link":"#该如何选择呢","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"relativePath":"web/js/null和undefined的区别.md"}'),e={name:"web/js/null和undefined的区别.md"},o=a(`<h1 id="null-和-undefined-的区别" tabindex="-1">null 和 undefined 的区别 <a class="header-anchor" href="#null-和-undefined-的区别" aria-hidden="true">#</a></h1><h2 id="相同点" tabindex="-1">相同点 <a class="header-anchor" href="#相同点" aria-hidden="true">#</a></h2><p>都是假值。</p><h2 id="不同点" tabindex="-1">不同点 <a class="header-anchor" href="#不同点" aria-hidden="true">#</a></h2><h3 id="undefined" tabindex="-1">undefined <a class="header-anchor" href="#undefined" aria-hidden="true">#</a></h3><ol><li><code>undefined</code> 表示一个变量已经声明但是未初始化；</li><li>一个对象上不存在的属性，未定义<code>not defined</code>；</li><li>存在这个属性，值为<code>undefined</code>；</li><li>转成数值时为<code>NaN</code>。</li><li><code>undefined</code>会触发函数默认值和对象解构时的默认属性。</li></ol><div class="language-JS line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">JS</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">undefined,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">a) </span><span style="color:#676E95;font-style:italic;">// undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">b) </span><span style="color:#676E95;font-style:italic;">// undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">b</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// false</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> c</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(c) </span><span style="color:#676E95;font-style:italic;">// undefined</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote><p>如何区分是不存在属性还是属性值为 <code>undefined</code> ，使用 <code>obj.hasOwnProperty(&#39;b&#39;)</code> 。</p></blockquote><blockquote><p><code>undefined</code> 是 js 中一个特殊的全局变量和一个特殊的类型，可被重置，这点是语言设计失误。</p></blockquote><blockquote><p><code>JSON.stringify</code> 会删除值为 <code>undefined</code> 的属性。</p></blockquote><h3 id="null" tabindex="-1">null <a class="header-anchor" href="#null" aria-hidden="true">#</a></h3><ol><li>表示一个变量被明确赋值为<code>null</code>，一个特殊值。</li><li>表示一个变量为对象，其值为<code>null</code>，表示没有值，一般用于释放对象的内存。</li><li>转成数值时为<code>0</code>。</li><li>不会触发函数默认值和对象默认属性。</li></ol><h2 id="该如何选择呢" tabindex="-1">该如何选择呢？ <a class="header-anchor" href="#该如何选择呢" aria-hidden="true">#</a></h2><blockquote><p>使用 <code>null</code></p></blockquote><ol><li>一个对象稍才有确定的值，可以将初始化值设置为<code>null</code>。这样做的好好处，是的变量的类型一致。</li><li>释放对象的内存，使用<code>null</code>。</li><li>不希望<code>JSON.stringify</code>时属性被删除。</li></ol><blockquote><p>使用 <code>undefined</code></p></blockquote><ol><li>一个变量不确定其类型，可将初始化值设置为<code>undefined</code>。</li><li>希望触发函数默认值和对象默认属性。</li></ol><div class="language-JS line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">JS</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">undefined</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 默认值 a 生效 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">b</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// b 的默认值不生效</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-hidden="true">#</a></h2><p><a href="https://luke.sh/articles/we-don-t-need-null" target="_blank" rel="noreferrer">We don&#39;t need null</a></p>`,20),p=[o];function c(r,t,i,d,D,y){return n(),l("div",null,p)}const A=s(e,[["render",c]]);export{F as __pageData,A as default};
