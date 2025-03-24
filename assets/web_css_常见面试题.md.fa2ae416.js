import{_ as o,o as e,c as l,a as s}from"./app.e8c38dc5.js";const _=JSON.parse('{"title":"css 常见面试题","description":"","frontmatter":{},"headers":[],"relativePath":"web/css/常见面试题.md"}'),c={name:"web/css/常见面试题.md"},a=s(`<h1 id="css-常见面试题" tabindex="-1">css 常见面试题 <a class="header-anchor" href="#css-常见面试题" aria-hidden="true">#</a></h1><ol><li>什么是盒模型？</li></ol><p>CSS 盒模型是描述 HTML 元素在页面中所占空间的模型。它将每个 HTML 元素看作一个矩形的盒子，包含了内容(content)、内边距(padding)、边框(border)和外边距(margin)四个部分。这些部分的组合决定了元素在页面中的大小和位置</p><ol start="2"><li>盒模型有哪两种？</li></ol><p>盒模型有两种：标准盒模型和 IE 盒模型。标准盒模型的宽度和高度只包括内容部分，不包括内边距、边框和外边距。IE 盒模型的宽度和高度包括内容、内边距和边框，但不包括外边距。</p><ol start="3"><li>如何设置盒模型的模式？</li></ol><p>可以通过 CSS 的 <code>box-sizing</code> 属性设置盒模型的模式。<code>box-sizing</code> 属性有两个值：<code>content-box</code> 和 <code>border-box</code>。<code>content-box</code> 是标准盒模型，<code>border-box</code> 是 IE 盒模型。</p><p>标准盒模型的宽度和高度只包括内容部分，不包括内边距、边框和外边距。IE 盒模型的宽度和高度包括内容、内边距和边框，但不包括外边距。</p><div class="language-BASH line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">BASH</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># content-box   </span></span>
<span class="line"><span style="color:#FFCB6B;">total-width</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">content-width</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">padding</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">border</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">margin</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># border-box</span></span>
<span class="line"><span style="color:#FFCB6B;">total-width</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">content-width</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">margin</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="4"><li>如何清除浮动？</li></ol><p>清除浮动是指清除浮动元素对父元素的影响，使父元素能够包含浮动元素。清除浮动的方法有以下几种：</p><ul><li>使用空元素清除浮动：在浮动元素的后面添加一个空元素，并设置 <code>clear: both</code>。</li><li>使用父元素的伪元素清除浮动：给父元素添加 <code>:after</code> 伪元素，并设置 <code>content: &#39;&#39;</code>、<code>display: block</code> 和 <code>clear: both</code>。</li></ul><ol start="5"><li>什么是 BFC？</li></ol><p>BFC（Block Formatting Context）是块级格式化上下文的缩写，是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。BFC 是一个独立的渲染区域，内部元素的布局不会影响到外部元素，反之亦然。</p><ol start="6"><li>BFC 的触发条件有哪些？</li></ol><p>BFC 的触发条件有以下几种：</p><ul><li>根元素或包含根元素的元素。</li><li>浮动元素：<code>float</code> 不为 <code>none</code>。</li><li>绝对定位元素：<code>position</code> 为 <code>absolute</code> 或 <code>fixed</code>。</li><li>行内块元素：<code>display</code> 为 <code>inline-block</code>。</li><li>表格单元格：<code>display</code> 为 <code>table-cell</code>。</li><li>表格标题：<code>display</code> 为 <code>table-caption</code>。</li><li>匿名表格单元格元素：<code>display</code> 为 <code>table</code>、<code>table-row</code>、<code>table-row-group</code>、<code>table-header-group</code>、<code>table-footer-group</code>、<code>table-column</code>、<code>table-column-group</code>、<code>table-cell</code>、<code>table-caption</code>。</li><li><code>overflow</code> 值不为 <code>visible</code> 的块元素。</li><li><code>display</code> 值为 <code>flow-root</code> 的元素。</li><li><code>contain</code> 值为 <code>layout</code>、<code>content</code> 或 <code>strict</code> 的元素。</li></ul><ol start="6"><li>display:none 和 visibility:hidden 的区别是什么？</li></ol><p><code>display: none</code> 和 <code>visibility: hidden</code> 都可以隐藏元素，但它们之间有以下几点区别：</p><ul><li><code>display: none</code> 会隐藏元素，并且不占据页面空间，元素不可见且不可点击。</li><li><code>visibility: hidden</code> 会隐藏元素，但仍然占据页面空间，元素不可见但可点击。</li></ul>`,20),n=[a];function d(t,i,p,r,C,b){return e(),l("div",null,n)}const u=o(c,[["render",d]]);export{_ as __pageData,u as default};
