import{_ as s,o as a,c as n,a as e}from"./app.a45c1767.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"重置密码","slug":"重置密码","link":"#重置密码","children":[]}],"relativePath":"mysql/index.md"}'),l={name:"mysql/index.md"},p=e(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1><h2 id="重置密码" tabindex="-1">重置密码 <a class="header-anchor" href="#重置密码" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">services</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql</span></span>
<span class="line"><span style="color:#FFCB6B;">pkill</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysqld</span></span>
<span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/var/mysql/</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># NOTE: this will delete your existing database!!!</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">postinstall</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">services</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql</span></span>
<span class="line"><span style="color:#FFCB6B;">mysql</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-u</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><a href="https://gist.github.com/zubaer-ahammed/c81c9a0e37adc1cb9a6cdc61c4190f52" target="_blank" rel="noreferrer">Reset mysql root password in Mac OS:</a></p>`,4),o=[p];function r(t,c,i,C,y,d){return a(),n("div",null,o)}const b=s(l,[["render",r]]);export{A as __pageData,b as default};