# 测试组件的事件

vue 组件中，事件分为两种，一种是原生事件，一种是自定义事件。

表单元素的测试也是本篇文章的重点。

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/test-moadal.png)

编写这样一个弹窗，学习这三种测试。

弹窗主要功能：

1. 点击关闭按钮，执行 props.onClose 关闭弹窗
2. 点击 subscribe 按钮，执行提交订阅表单

## 测试原生事件

`ModalDemo.vue`:

```html
<template>
  <div>
    <button @click="onClose" class="btn-close">关闭</button>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ModalDemo',
  props:['onClose'],
}
</script>
```

测试用例

```js
import { shallowMount } from '@vue/test-utils'
import ModalDemo from './ModalDemo.vue'
describe('ModalDemo.vue', () => {
  let wrapper = null
  beforeEach(() => {
    const onClose = ()=>{}
    // const onClose = jest.fn()
    wrapper = shallowMount(ModalDemo, {
      propsData: {
        onClose,
      },
    })
  })
  it('test native event click', () => {
    jest.spyOn(wrapper.vm, 'onClose')
    wrapper.find('.btn-close').trigger('click')
    expect(wrapper.vm.onClose).toHaveBeenCalledTimes(1)
  })
})
```

测试用例检查按钮被点击后，`props.onClose` 方法是否被调用。

在Vue Test Utils中，每个**包装器**都有一个`trigger`方法，用于在包装元素上触发一个合成事件。

> 合成事件是在JavaScript中创建的事件。实际上，合成事件的处理方式与浏览器分发事件的方式相同。区别在于原生事件通过JavaScript事件循环异步调用事件处理程序，合成事件则是同步调用事件处理程序。

> onClose 传递一个模拟函数，传递真实的函数，会导致测试失败，这点有点奇怪。

