# 测试组件的事件

vue 组件中，事件分为两种，一种是原生事件，一种是自定义事件。

表单元素的测试也是本篇文章的重点。

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/test-moadal.png)

编写这样一个弹窗，学习这三种测试。

弹窗主要功能：

1. 点击关闭按钮，执行 props.onClose 关闭弹窗
2. 点击关闭按钮，触发自定义事件 `close-modal`

## 测试原生事件

`ModalDemo.vue` :

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
    props: ['onClose'],
  }
</script>
```

只测试组件契约，先不管具体实现。

测试用例

```js
import {
  shallowMount
} from '@vue/test-utils'
import ModalDemo from './ModalDemo.vue'
describe('ModalDemo.vue', () => {
  let wrapper = null
  beforeEach(() => {
    const onClose = () => {}
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

测试用例检查按钮被点击后， `props.onClose` 方法是否被调用。

在 Vue Test Utils 中，每个**包装器**都有一个 `trigger` 方法，用于在包装元素上触发一个合成事件。

> 合成事件是在 JavaScript 中创建的事件。实际上，合成事件的处理方式与浏览器分发事件的方式相同。区别在于原生事件通过 JavaScript 事件循环异步调用事件处理程序，合成事件则是同步调用事件处理程序。

> onClose 传递一个模拟函数，传递真实的函数，会导致测试失败，这点有点奇怪。

## 测试自定义事件

自定义事件，对子组件来说，是输出事件，对父组件来说，是输入。

组件触发的自定义事件，自定义事件是组件的契约的一部分，所以需要测试。

测试方法：vue-test-utils 提供了一个 `emitted` 方法，返回一个**二维数组**，包含事件抛出数据。

单击关闭按钮，触发 `close-modal` 事件。

```js
it('test custom event', () => {
  wrapper.find('.btn-close').trigger('click')
  expect(wrapper.emitted('close-modal')).toHaveLength(1)
})
```

测试失败，因为组件没触发 `close-modal` 事件，需要在组件中添加代码。

```html
<template>
  <div>
    <button @click="closeModal" class="btn-close">关闭</button>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'ModalDemo',
    props: ['onClose'],
    methods: {
      closeModal() {
        this.$emit('close-modal', 'hello', 'modal')
        this.onClose && this.onClose()
      }
    }
  }
</script>
```

测试通过。

测试 `emitted` 返回的数据，测试用例：

```js
it('test custom event payload', () => {
  wrapper.find('.btn-close').trigger('click')
  expect(wrapper.emitted('close-modal')).toHaveLength(1)
  expect(wrapper.emitted('close-modal')[0]).toEqual(['hello', 'modal'])
})
```

在 closeModal 里触发两个事件，测试用例：

```js
it('test custom event payload 2', () => {
  wrapper.find('.btn-close').trigger('click')
  expect(wrapper.emitted('close-modal')).toHaveLength(1)
  expect(wrapper.emitted('close-modal')[0]).toEqual(['hello', 'modal'])
  expect(wrapper.emitted('my-event')).toBeUndefined()
})
```

> 把用例的名字吧，改成 `test custom event payload 2` ，只希望单独运行这个用例，名字不能重复。

> 组件还没触发 `my-event` ，emitted 的值是 `undefined` 。

现在触发 `my-event` 事件:

```js
closeModal() {
  this.$emit('close-modal', 'hello', 'modal')
  this.$emit('my-event')
  this.onClose && this.onClose()
}
```

修改断言，让测试通过。

```js
expect(wrapper.emitted('my-event')[0]).toEqual([])
```

上面测试了组件作为输出，对于父组件来说，是输入，也需要测试。

```HTML
<script>
  import ModalDemo from './ModalDemo.vue';
  export default {
    name: 'ParentModal',
    methods: {
      onCloseModal() {
        console.log('onCloseModal');
      }
    },
    components: {
      ModalDemo
    }
  }
</script>

<template>
  <ModalDemo @close-modal="onCloseModal" />
</template>
```

测试方法，让ModalDemo触发 `close-modal` ，测试父组件的 `onCloseModal` 是否被调用。

```js
import {
  shallowMount
} from '@vue/test-utils'
import ParentModal from './ParentModal.vue'
import ModalDemo from './ModalDemo.vue'
describe('ParentModal.vue', () => {
  let wrapper = null
  // let onCloseModal = jest.fn()
  beforeEach(() => {
    wrapper = shallowMount(ParentModal, {
      // mocks: {
      //   methods: {
      //     onCloseModal, //: jest.fn(),
      //   },
      // },
    })
  })
  it('test close-modal event handler', () => {
    jest.spyOn(wrapper.vm, 'onCloseModal')
    wrapper.find(ModalDemo).vm.$emit('close-modal')
    expect(wrapper.vm.onCloseModal).toHaveBeenCalledTimes(1)
  })
})
```

> 测试报错： `expect(jest.fn()).toHaveBeenCalledTimes(expected)`

> 原因是 expect 只接受模拟函数，不接受真实函数，不知道如何解决。

以后再看了。

<!-- BUG -->

> 可以测试 closeModal 事件的副作用，比如弹窗不显示。

## 测试表单元素

有一个组件 `FormDemo.vue` ，包含一个输入框和一个按钮，点击按钮，触发 `submit` 事件。

```html
<template>
  <div class="form-demo">
    <form @submit="submitForm">
      <button>提交</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'FormDemo',
    data() {
      return {
        // data
      }
    },
    methods: {
      // methods
      submitForm() {
        this.$emit('form-submit')
      }
    },
  }
</script>
```
