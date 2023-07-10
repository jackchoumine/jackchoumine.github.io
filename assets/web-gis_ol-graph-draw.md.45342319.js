import{_ as s,o as a,c as n,R as l}from"./chunks/framework.bf742a9e.js";const m=JSON.parse('{"title":"图形绘制","description":"","frontmatter":{},"headers":[],"relativePath":"web-gis/ol-graph-draw.md","filePath":"web-gis/ol-graph-draw.md"}'),e={name:"web-gis/ol-graph-draw.md"},p=l(`<h1 id="图形绘制" tabindex="-1">图形绘制 <a class="header-anchor" href="#图形绘制" aria-label="Permalink to &quot;图形绘制&quot;">​</a></h1><p>图形绘制：在地图上绘制点、线、面等图形，可以用来标记地图上的一些特殊位置，或者用来标记地图上的一些区域。</p><p>两种绘制方式：</p><ol><li><p>空间坐标未知，可使用鼠标绘制，即用户使用鼠标在地图上绘制图形，又叫交互式绘制</p></li><li><p>空间坐标已知，使用代码添加制作好的图形</p></li></ol><blockquote><p>空间坐标是绘制的基础。</p></blockquote><p>图形绘制在 GIS 应用中非常重要，可辅助其他功能实现，比如查询、编辑、分析等功能。</p><h2 id="交互式绘制" tabindex="-1">交互式绘制 <a class="header-anchor" href="#交互式绘制" aria-label="Permalink to &quot;交互式绘制&quot;">​</a></h2><p>原理：加载交互式控件到地图(实例化时设置绘制类型，如点、线、面)，用户使用鼠标在地图上绘制图形，绘制完成后，获取绘制的空间坐标，可用于其他功能。也可通过交互式编辑控件编辑已绘制的图形。绘制几何图形时，可设置图形的样式。</p><p>ol 中矢量地图为 ol.layer.Vector，矢量图层中的要素为 ol.Feature，要素的几何图形为 ol.geom.Geometry，几何图形的坐标为 ol.Coordinate。</p><p>交互式绘制控件为 ol.interaction.Draw，交互式编辑控件为 ol.interaction.Modify。在编辑时，需要先选中要编辑的要素，选择控件为 ol.interaction.Select。</p><h3 id="绘制几何图形" tabindex="-1">绘制几何图形 <a class="header-anchor" href="#绘制几何图形" aria-label="Permalink to &quot;绘制几何图形&quot;">​</a></h3><p>几何图形包括点、线、面，以及圆、正方形等。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="编辑图形样式" tabindex="-1">编辑图形样式 <a class="header-anchor" href="#编辑图形样式" aria-label="Permalink to &quot;编辑图形样式&quot;">​</a></h3><p>集合图形都有对应的样式，比如线型、线颜色、线宽、线透明度和填充色等, 从<code>ol/style</code>中导入样式类，设置样式。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Circle</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Fill</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Icon</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">IconImage</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Image</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">RegularShape</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 边界线</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Stroke</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 设置集合图形的样式</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Style</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 设置文本样式</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Text</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ol/style</span><span style="color:#89DDFF;">&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>不设置样式，会启用默认样式。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,18),o=[p];function r(t,c,i,y,b,d){return a(),n("div",null,o)}const D=s(e,[["render",r]]);export{m as __pageData,D as default};