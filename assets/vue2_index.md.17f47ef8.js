import{_ as e,o as a,c as h,a as r}from"./app.bb474122.js";const f=JSON.parse('{"title":"vue 2 学习总结","description":"","frontmatter":{},"headers":[{"level":3,"title":"测试 vue 组件的事件","slug":"测试-vue-组件的事件","link":"#测试-vue-组件的事件","children":[]},{"level":3,"title":"测试 vue 组件的方法","slug":"测试-vue-组件的方法","link":"#测试-vue-组件的方法","children":[]},{"level":3,"title":"测试 vue 组件的输出","slug":"测试-vue-组件的输出","link":"#测试-vue-组件的输出","children":[]},{"level":3,"title":"vue 应用测试简介","slug":"vue-应用测试简介","link":"#vue-应用测试简介","children":[]},{"level":3,"title":"vue2 项目中遇到的问题","slug":"vue2-项目中遇到的问题","link":"#vue2-项目中遇到的问题","children":[]},{"level":3,"title":"如何使用 gh-pages 部署 vue 应用？","slug":"如何使用-gh-pages-部署-vue-应用","link":"#如何使用-gh-pages-部署-vue-应用","children":[]},{"level":3,"title":"vue2 响应式系统核心原理实现","slug":"vue2-响应式系统核心原理实现","link":"#vue2-响应式系统核心原理实现","children":[]},{"level":3,"title":"组件封装","slug":"组件封装","link":"#组件封装","children":[]},{"level":3,"title":"如何优雅地注册全局组件","slug":"如何优雅地注册全局组件","link":"#如何优雅地注册全局组件","children":[]},{"level":3,"title":"如何使用 render 函数写组件","slug":"如何使用-render-函数写组件","link":"#如何使用-render-函数写组件","children":[]},{"level":3,"title":"函数式组件是什么","slug":"函数式组件是什么","link":"#函数式组件是什么","children":[]},{"level":3,"title":"如何使用 render 改善组件","slug":"如何使用-render-改善组件","link":"#如何使用-render-改善组件","children":[]},{"level":3,"title":"commonJS 和 ES6 模块在 Vue 中混用","slug":"commonjs-和-es6-模块在-vue-中混用","link":"#commonjs-和-es6-模块在-vue-中混用","children":[]},{"level":3,"title":"vue 状态管理（三）","slug":"vue-状态管理-三","link":"#vue-状态管理-三","children":[]},{"level":3,"title":"vue 状态管理（二）","slug":"vue-状态管理-二","link":"#vue-状态管理-二","children":[]},{"level":3,"title":"vue 状态管理（一）","slug":"vue-状态管理-一","link":"#vue-状态管理-一","children":[]},{"level":3,"title":"vue 路由基础","slug":"vue-路由基础","link":"#vue-路由基础","children":[]},{"level":3,"title":"vue 路由进阶","slug":"vue-路由进阶","link":"#vue-路由进阶","children":[]}],"relativePath":"vue2/index.md"}'),l={name:"vue2/index.md"},i=r('<h1 id="vue-2-学习总结" tabindex="-1">vue 2 学习总结 <a class="header-anchor" href="#vue-2-学习总结" aria-hidden="true">#</a></h1><h3 id="测试-vue-组件的事件" tabindex="-1"><a href="./test-component-event.html">测试 vue 组件的事件</a> <a class="header-anchor" href="#测试-vue-组件的事件" aria-hidden="true">#</a></h3><h3 id="测试-vue-组件的方法" tabindex="-1"><a href="./test-component-method.html">测试 vue 组件的方法</a> <a class="header-anchor" href="#测试-vue-组件的方法" aria-hidden="true">#</a></h3><h3 id="测试-vue-组件的输出" tabindex="-1"><a href="./test-componet-output.html">测试 vue 组件的输出</a> <a class="header-anchor" href="#测试-vue-组件的输出" aria-hidden="true">#</a></h3><h3 id="vue-应用测试简介" tabindex="-1"><a href="./test-vue-intro.html">vue 应用测试简介</a> <a class="header-anchor" href="#vue-应用测试简介" aria-hidden="true">#</a></h3><h3 id="vue2-项目中遇到的问题" tabindex="-1"><a href="./some-issues.html">vue2 项目中遇到的问题</a> <a class="header-anchor" href="#vue2-项目中遇到的问题" aria-hidden="true">#</a></h3><h3 id="如何使用-gh-pages-部署-vue-应用" tabindex="-1"><a href="./vue-pro-deploy-gh-pages.html">如何使用 gh-pages 部署 vue 应用？</a> <a class="header-anchor" href="#如何使用-gh-pages-部署-vue-应用" aria-hidden="true">#</a></h3><h3 id="vue2-响应式系统核心原理实现" tabindex="-1"><a href="./vue2响应式系统核心原理实现.html">vue2 响应式系统核心原理实现</a> <a class="header-anchor" href="#vue2-响应式系统核心原理实现" aria-hidden="true">#</a></h3><h3 id="组件封装" tabindex="-1"><a href="./vue-组件封装.html">组件封装</a> <a class="header-anchor" href="#组件封装" aria-hidden="true">#</a></h3><h3 id="如何优雅地注册全局组件" tabindex="-1"><a href="./如何优雅地注册全局组件.html">如何优雅地注册全局组件</a> <a class="header-anchor" href="#如何优雅地注册全局组件" aria-hidden="true">#</a></h3><h3 id="如何使用-render-函数写组件" tabindex="-1"><a href="./render函数.html">如何使用 render 函数写组件</a> <a class="header-anchor" href="#如何使用-render-函数写组件" aria-hidden="true">#</a></h3><h3 id="函数式组件是什么" tabindex="-1"><a href="./函数式组件.html">函数式组件是什么</a> <a class="header-anchor" href="#函数式组件是什么" aria-hidden="true">#</a></h3><h3 id="如何使用-render-改善组件" tabindex="-1"><a href="./如何使用render函数封装高扩展的组件.html">如何使用 render 改善组件</a> <a class="header-anchor" href="#如何使用-render-改善组件" aria-hidden="true">#</a></h3><h3 id="commonjs-和-es6-模块在-vue-中混用" tabindex="-1"><a href="./commonJS和ES6模块在Vue中混用.html">commonJS 和 ES6 模块在 Vue 中混用</a> <a class="header-anchor" href="#commonjs-和-es6-模块在-vue-中混用" aria-hidden="true">#</a></h3><h3 id="vue-状态管理-三" tabindex="-1"><a href="./vue-状态管理（三）.html">vue 状态管理（三）</a> <a class="header-anchor" href="#vue-状态管理-三" aria-hidden="true">#</a></h3><h3 id="vue-状态管理-二" tabindex="-1"><a href="./vue-状态管理（二）.html">vue 状态管理（二）</a> <a class="header-anchor" href="#vue-状态管理-二" aria-hidden="true">#</a></h3><h3 id="vue-状态管理-一" tabindex="-1"><a href="./vue-状态管理（一）.html">vue 状态管理（一）</a> <a class="header-anchor" href="#vue-状态管理-一" aria-hidden="true">#</a></h3><h3 id="vue-路由基础" tabindex="-1"><a href="./vue路由基础.html">vue 路由基础</a> <a class="header-anchor" href="#vue-路由基础" aria-hidden="true">#</a></h3><h3 id="vue-路由进阶" tabindex="-1"><a href="./vue路由进阶.html">vue 路由进阶</a> <a class="header-anchor" href="#vue-路由进阶" aria-hidden="true">#</a></h3>',19),d=[i];function n(t,u,v,s,c,o){return a(),h("div",null,d)}const g=e(l,[["render",n]]);export{f as __pageData,g as default};
