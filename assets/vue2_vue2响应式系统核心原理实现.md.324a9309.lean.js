import{_ as p,o,c as e,z as s,a as n,t as a,R as l}from"./chunks/framework.bf742a9e.js";const k=JSON.parse('{"title":"vue2 响应式核心原理实现","description":"","frontmatter":{},"headers":[],"relativePath":"vue2/vue2响应式系统核心原理实现.md","filePath":"vue2/vue2响应式系统核心原理实现.md"}'),t={name:"vue2/vue2响应式系统核心原理实现.md"},c=s("h1",{id:"vue2-响应式核心原理实现",tabindex:"-1"},[n("vue2 响应式核心原理实现 "),s("a",{class:"header-anchor",href:"#vue2-响应式核心原理实现","aria-label":'Permalink to "vue2 响应式核心原理实现"'},"​")],-1),r=s("p",null,[n("vue 的核心功能就是实现了数据到模板的"),s("strong",null,"响应式系统"),n("----修改数据，vue 自动执行副作用（更新 DOM、执行监听器等），从而让开发者从手动处理 DOM 更新的繁琐中解脱出来。")],-1),y=s("code",null,"v-model",-1),F=s("code",null,"@click",-1),D=l("",27),i=s("code",null,"v-model",-1),A=s("code",null,"@",-1),C=l("",2),b=l("",4),u=l("",13);function m(d,f,E,v,h,g){return o(),e("div",null,[c,r,s("p",null,[n("今天就来实现一个响应式系统核心，完全实现 vue 的响应式系统，还是一个很复杂的一项工程，本文只实现核心部分和三个指令："),s("code",null,a(),1),n("、"),y,n("和"),F,n("。")]),D,s("p",null,[n("本教程只实现"),s("code",null,a(),1),n("、"),i,n("和"),A,n("这三个指令，指令的解析在模板编译阶段进行：")]),C,s("p",null,[n("看"),s("code",null,a(),1),n("的处理：")]),b,s("p",null,[s("code",null,a(),1),n("中的属性值没有被替换。")]),u])}const T=p(t,[["render",m]]);export{k as __pageData,T as default};
