# 快照测试

快照测试：自动比较应用程序两种图片的方法，保证不会无意中修改组件。

## 快照测试简介

一个对快照测试简单的解释就是获取代码的快照，并将其与以前保存的快照进行对比。如果新的快照与前一个快照不匹配，测试就会失败。

用Jest来编写快照测试。Jest快照测试会对比序列化值（serializable value）。基本上任何可以转换为字符串的JavaScript值都是序列化值。

toMatchSnapshot匹配器

```js
expect('value').toMatchSnapshot()
```

或者把DOM节点传给快照

```js
expect(document.querySelector('div')).toMatchSnapshot()
```

## 静态组件的快照测试

静态组件（static component）指的是总是渲染相同输出的组件。它不接收任何prop，也没有任何state。组件中没有任何逻辑，并且总是会渲染相同的HTML元素。

为静态组件编写单元测试是没有必要的，因为实际上它们也不做任何事情。但是，在最初编写完静态组件并手动测试它之后，想要确保静态组件在未来不会发生更改，单元测试就变得非常有用了。

有一静态组件 `StaticComponent.vue` :

```HTML
<template>
  <div>
    <h1>StaticComponent</h1>
    <p>StaticComponent 1</p>
  </div>
</template>
```

测试用例 `StaticComponent.spec.js` :

```js
import {
  shallowMount
} from '@vue/test-utils'
import StaticComponent from './StaticComponent.vue'

describe('StaticComponent', () => {
  it('快照测试', () => {
    const wrapper = shallowMount(StaticComponent)
    expect(wrapper.element).toMatchSnapshot()
  })
})
```

第一次运行，因为没有比较对象，所以会生成一个快照文件 `__snapshots__/StaticComponent.spec.js.snap` ，测试通过，内容如下。

```js
exports[`StaticComponent 快照测试 1`] = `
<div>
  <h1>
    StaticComponent
  </h1>
   
  <p>
    StaticComponent
  </p>
</div>
`;
```

修改静态组件，再运行测试，测试失败，因为快照文件与新的快照不匹配。

会在控制台输出差异。

## 动态组件的快照测试
