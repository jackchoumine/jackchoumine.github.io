import{_ as s,o as n,c as a,a as p}from"./app.a6d9b2ac.js";const m=JSON.parse('{"title":"pnpm 使用","description":"","frontmatter":{},"headers":[{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]},{"level":2,"title":"关于链接","slug":"关于链接","link":"#关于链接","children":[{"level":3,"title":"Linux文件链接分为软链接和硬链接，两者有什么区别？","slug":"linux文件链接分为软链接和硬链接-两者有什么区别","link":"#linux文件链接分为软链接和硬链接-两者有什么区别","children":[]}]}],"relativePath":"node/how-to-use-pnpm.md"}'),l={name:"node/how-to-use-pnpm.md"},e=p(`<h1 id="pnpm-使用" tabindex="-1">pnpm 使用 <a class="header-anchor" href="#pnpm-使用" aria-hidden="true">#</a></h1><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-w</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 安装到根工作空间</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 递归目录安装依赖，number 为递归层数</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 当前目录和子目录递归安装依赖，递归层数为 2</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 当前目录和子目录递归安装依赖，递归层数为 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 安装到开发依赖</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-P</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 安装到生产依赖</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-peer</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 安装到peer依赖</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 全局安装</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-w</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 安装到根工作空间的开发依赖</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 强制安装</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 更新到最新版本</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">package-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--filter</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pkg-name</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 指定工作空间 pkg-name 的 package.json 的 name 字段</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--filter</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pkg-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dev</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 指定工作空间执行 dev 命令</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="关于链接" tabindex="-1">关于链接 <a class="header-anchor" href="#关于链接" aria-hidden="true">#</a></h2><p>ln 是 Linux 系统中用于创建文件链接的命令。它有以下主要功能和特点:</p><ol><li><p>ln 命令可以创建硬链接和软链接(符号链接)两种类型的链接。</p></li><li><p>软链接(使用 ln -s 创建)类似于 Windows 中的快捷方式,只是指向源文件的路径,不占用额外磁盘空间。</p></li><li><p>硬链接(不使用 -s 选项)创建与源文件具有相同 inode 的副本,看起来像独立文件但实际共享同一份数据。</p></li><li><p>ln 命令会保持每一处链接文件的同步性,无论修改哪个链接,其他链接都会反映相同的变化。</p></li><li><p>软链接可以跨文件系统,可以链接到目录,也可以链接到不存在的文件。</p></li><li><p>硬链接只能在同一文件系统内创建,不能用于目录。</p></li><li><p>基本语法为:ln [选项] 源文件 目标文件。</p></li><li><p>常用选项包括 -s (创建软链接)、-f (强制执行)、-i (交互模式) 等。</p></li></ol><blockquote><p>ln 命令在 Linux 系统管理中非常有用, 可以有效节省磁盘空间并方便文件的共享和访问。</p></blockquote><h3 id="linux文件链接分为软链接和硬链接-两者有什么区别" tabindex="-1">Linux文件链接分为软链接和硬链接，两者有什么区别？ <a class="header-anchor" href="#linux文件链接分为软链接和硬链接-两者有什么区别" aria-hidden="true">#</a></h3><p>Linux中的符号链接，就是我们平时说的软连接，可以针对文件、目录创建，但是源文件删除后链接不可用，命令: <code>ln -s xxx xxx</code></p><p>Linux中的硬链接，只能针对文件，但是文件删除仍可使用，命令: <code>ln xxx xxx</code></p>`,10),o=[e];function c(t,r,C,i,y,A){return n(),a("div",null,o)}const d=s(l,[["render",c]]);export{m as __pageData,d as default};