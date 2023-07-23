import{_ as s,o as n,c as a,a as p}from"./app.8fc642ea.js";const d=JSON.parse('{"title":"react 高级概念","description":"","frontmatter":{},"headers":[{"level":2,"title":"虚拟 DOM 以及性能优化","slug":"虚拟-dom-以及性能优化","link":"#虚拟-dom-以及性能优化","children":[]},{"level":2,"title":"高阶组件","slug":"高阶组件","link":"#高阶组件","children":[{"level":3,"title":"memo 函数","slug":"memo-函数","link":"#memo-函数","children":[]}]},{"level":2,"title":"hook","slug":"hook","link":"#hook","children":[]}],"relativePath":"react/intermediate.md"}'),l={name:"react/intermediate.md"},e=p(`<h1 id="react-高级概念" tabindex="-1">react 高级概念 <a class="header-anchor" href="#react-高级概念" aria-hidden="true">#</a></h1><h2 id="虚拟-dom-以及性能优化" tabindex="-1">虚拟 DOM 以及性能优化 <a class="header-anchor" href="#虚拟-dom-以及性能优化" aria-hidden="true">#</a></h2><p>DOM 是 HTML 文本结构的抽象，JS 直接对 DOM 进行操作，会引起页面重新布局和重新渲染，很耗时。前端优化的一条原则：尽量减少 DOM 操作。软件开发领域，遇到的问题，都可通过增加一层抽象层加以解决或改善。为了解决操作 DOM 效率底下的问题，react 引入虚拟 DOM，建立在真是 DOM 之上，对应真实 DOM。虚拟 DOM 并非是 react 独有的技术，而是一个独立的技术。</p><p>虚拟 DOM 和 react 元素是使用一个 JS 对象来描述它们的结构，访问 JS 对象比访问真是 DOM 快速得多。</p><p>diff 算法：</p><p>react 通过比较虚拟 DOM 结构的变化，找出差异部分，更新到真实 DOM 上去，这被叫调和过程（Reconciliation）。两种比较方式：</p><p>① 元素类型不同，生成不同的树；</p><p>② 列表元素中的 key 属性进行比较。</p><p>react 比较两棵树都从根节点比较，根据根节点类型不同，执行不同的操作。</p><blockquote><p>根节点类型不同</p></blockquote><p>根节点类型不同，react 认为是完全不同的树，不必再比较上属性和子节点，把整棵树销毁后重建。</p><p>销毁会执行 <code>componentWillUnmount</code>，重建会执行初始化、挂载等生命周期函数。这种情况需要大量 DOM，效率低下。</p><blockquote><p>根节点类型相同</p></blockquote><ol><li><p>根节点是相同 DOM，比较属性，更新变化的属性。</p></li><li><p>根节点是相同类型的组件，执行更新操作，变化会同步到虚拟 DOM 上。执行 <code>componentWillReceiveProps</code> 和 <code>componentWillUpdate</code></p><p>比较完根节点后， React 会以同样的原则继续递归比较子节点， 每一个子节点相对于其层级以下的节点来说又是一个根节点。 如此递归比较， 直到比较完两棵树上的所有节点， 计算得到最终的差异， 更新到 DOM 树中。</p></li></ol><p>性能优化的方式：</p><p>① 使用生产环境的版本的库</p><p>② 避免不必要的组件渲染。<code>shouldComponentUpdate</code> 决定是否需要重新渲染。继承 <code>PureComponent</code> 组件</p><p>React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。</p><div class="warning custom-block"><p class="custom-block-title">注意</p><p>React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。</p></div><p><a href="https://www.cnblogs.com/ldld/p/11107305.html" target="_blank" rel="noreferrer">更多内容</a></p><p>③ 使用 key</p><p>性能检查工具：</p><p>① react developer tool for chrome </p><p>② chrome 性能面板 </p><p>③ why-did-you-update npm 包 </p><blockquote><p>react / vue 中的 key 的作用？内部原理是什么？</p></blockquote><blockquote><p>为何遍历列表时，key 最后好不要用 index?</p></blockquote><p>① key 是虚拟 DOM 的标识，在比较虚拟 DOM 变化时，可提高比较速度。</p><p>详细说：当状态改变，会生成新的虚拟 DOM，然后新旧虚拟 DOM 会进行比较，比较规则：</p><p>A. key 相同 虚拟 DOM 的内容没有变化，使用旧的虚拟 DOM 虚拟 DOM 的内容改变，使用不同点去替换 B. key 不同 新虚拟 DOM 替换掉旧的虚拟 DOM</p><p>使用 index 存在的问题：存在破坏顺序的操作时，页面会发现错乱，特别是当列表中存在表单交互的 DOM，更加明显。</p><h2 id="高阶组件" tabindex="-1">高阶组件 <a class="header-anchor" href="#高阶组件" aria-hidden="true">#</a></h2><p>JS 中参数为函数，返回值也是函数的函数叫高阶函数。类似的，高阶组件接受组件为参数，返回新的组件，本质是一个函数，高阶组件抽象、封装和分离组件的通用逻辑，可实现逻辑复用。</p><p>现在在 App 组件中设置一个本地数据：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">constructor</span><span style="color:#A6ACCD;">(props) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">super</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">props</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setItem</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">jackchou</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后在两个组件中获取本地数据，然后渲染在组件中：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">componentWillMount</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getItem</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">defaultValue</span><span style="color:#89DDFF;">={this.</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">={(</span><span style="color:#A6ACCD;font-style:italic;">nameInput</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">nameInput </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> nameInput)</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>如果很多组件都用到了 name，那不得不在每个组件都获取一次 name，代码复用性不高。可使用高阶组件实现获取本地数据这一逻辑：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> React</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">withPersistentData</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">WrappedComponent</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">class</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">extends</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Component</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    componentWillMount</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getItem</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    render</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">WrappedComponent</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">={this.</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">}&gt;&lt;/</span><span style="color:#FFCB6B;">WrappedComponent</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> withPersistentData</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>使用：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> HocListBook </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WithPersistentData</span><span style="color:#A6ACCD;">(ListBook)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HocListBook</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 在 render 函数中</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>四种使用场景：</p><p>①. 操作 props</p><p>②. 通过 ref 访问组件实例</p><p>③. 组件状态提升</p><p>④. 使用其他元素包装组件，比如为被包装的组件提供样式</p><h3 id="memo-函数" tabindex="-1">memo 函数 <a class="header-anchor" href="#memo-函数" aria-hidden="true">#</a></h3><p>React.memo 是一个高阶组件，React.memo 仅检查 props 变更，返回最近一次渲染结果。</p><p>默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。</p><blockquote><p>高阶组件 vs 父组件</p></blockquote><p>高阶组件是一个函数， 函数关注的是逻辑； 父组件是一个组件， 组件主要关注的是 UI/DOM。</p><p>逻辑是与 DOM 直接相关的，那么这部分逻辑适合放到父组件中实现； 如果逻辑是与 DOM 不直接相关的， 那么这部分逻辑适合使用高阶组件抽象，如数据校验、请求发送等。</p><h2 id="hook" tabindex="-1">hook <a class="header-anchor" href="#hook" aria-hidden="true">#</a></h2>`,53),o=[e];function t(c,r,D,i,F,y){return n(),a("div",null,o)}const C=s(l,[["render",t]]);export{d as __pageData,C as default};
