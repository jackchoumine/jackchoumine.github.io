# 测试组件的事件

vue 组件中，事件分为两种：原生事件和自定义事件。

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

> 合成事件是在 JavaScript 中创建的事件。实际上，合成事件的处理方式与浏览器分发事件的方式相同。区别在于原生事件通过 JavaScript **事件循环**异步调用事件处理程序，合成事件则是同步调用事件处理程序。

## 测试自定义事件

自定义事件，对子组件来说，是输出事件，对父组件来说，是输入。

### 三种方法测试自定义事件

1. 模拟用户交互，使用用原生事件触发自定义事件

vue-test-utils 提供了一个 `emitted` 方法，可获取到组件上触发的自定义事件。

单击关闭按钮，触发 `close-modal` 事件。

```js
it('test custom event', async () => {
  await wrapper.find('.btn-close').trigger('click')

  expect(wrapper.emitted('close-modal')).toHaveLength(1)
})
```

> `trigger` 方法返回一个 Promise，所以需要使用 `async` 和 `await` 。 `trigger` 方法的第二个参数是一个对象，可以传递事件的参数。

> wrapper.emitted 函数返回一个对象，key 是事件名称，value 是一个数组，数组元素是事件抛出的数据。

上面的测试用例断言还可以写成：

```js
expect(wrapper.emitted()['close-modal']).toHaveLength(1)
```

2. 直接通过组件实例调用方法，触发自定义事件

```js
wrapper.vm.closeModal()
```

> 直接调用，简便得多，不需要找到按钮，也不需要触发原生事件。

3. 使用 `call` 模拟 `this.$emit` ，使用 `events` 模拟 `wrapper.emitted` 的返回值。

```js
it('test custom event  by call', () => {
  const events = {}
  const $emit = (event, ...args) => (events[event] = args)

  ModalDemo.methods.closeModal.call({
    $emit
  })
  //  事件排除 两个数据 'hello' 'modal'
  expect(events['close-modal']).toHaveLength(2)
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

测试事件抛出的数据，就是测试 `emitted` 返回的数据，测试用例：

```js
it('test custom event payload', async () => {
  await wrapper.find('.btn-close').trigger('click')

  expect(wrapper.emitted('close-modal')).toHaveLength(1)
  expect(wrapper.emitted('close-modal')[0]).toEqual(['hello', 'modal'])
})
```

在 closeModal 里触发两个事件，测试用例：

```js
it('test custom event payload 2', async () => {
  await wrapper.find('.btn-close').trigger('click')

  expect(wrapper.emitted('close-modal')).toHaveLength(1)
  expect(wrapper.emitted('close-modal')[0]).toEqual(['hello', 'modal'])
  expect(wrapper.emitted('my-event')).toBeUndefined()
})
```

> 把用例的名字吧，改成 `test custom event payload 2` ，只希望单独运行这个用例，名字不能重复。

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

测试方法，让 ModalDemo 触发 `close-modal` ，测试父组件的 `onCloseModal` 是否被调用。

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

测试 `form-submit` 事件。

```js
import {
  shallowMount
} from '@vue/test-utils'
import FormDemo from './FormDemo.vue'
describe('FormDemo.vue', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(FormDemo, {})
  })
  it('test custom form-submit event', () => {
    wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('form-submit')[0]).toEqual([])
  })
})
```

> 如果测试 button 的点击事件，测试无法通过。测试 button 的 submit 事件，测试也能通过。

```js
wrapper.find('button').trigger('submit')
```

表单元素有很多，只测试输入框和单选框。

### 测试输入框

```js
it('test input field', async () => {
  const input = wrapper.find('input')
  const email = 'hello@163.com'
  // 内部调用 Vue.nextTick 所以返回 promise
  await input.setValue(email)

  expect(wrapper.vm.email).toBe(email)
  expect(wrapper.find('p').text()).toBe(email)
})
```

重构 FormDemo.vue

```html
<template>
  <div class="form-demo">
    <form @submit="submitForm">
      <input v-model="email" type="email" />
      <button>提交</button>
    </form>
    <p>{{ email }}</p>
  </div>
</template>

<script>
  export default {
    name: 'FormDemo',
    data() {
      return {
        email: ''
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

> 把输入框接收的值，显示在 p 里，测试双向绑定是否生效。

> setValue 用于设置表单值，能触发双向绑定，直接设置 input 的 value 是不行的。

> setValue 返回 promise，需要使用 await 等待。

> 测试 p 标签，因为 vue 更新页面是异步的，使用 $nextTick 等待 DOM 更新，否则测试会失败。

### 测试单选框

添加测试用例

```js
it('test radio field true', async () => {
  const radio = wrapper.find('input[type="true"]')

  radio.setChecked()

  await wrapper.vm.$nextTick()

  expect(wrapper.vm.join).toBe('true')
  expect(wrapper.find('span').text()).toBe('true')
})
it('test radio field false', async () => {
  const radio = wrapper.find('input[value="false"]')

  await radio.setChecked()

  expect(wrapper.vm.join).toBe('false')
  expect(wrapper.find('span').text()).toBe('false')
})
```

> radio.setChecked() 设置单选框的值，能触发双向绑定，返回 promise。

重构组件，让用例通过

```html
<template>
  <div class="form-demo">
    <form @submit="submitForm">
      <input v-model="email" type="email" />
      <br />
      <input type="radio" id="one" value="true" v-model="join" />
      <label for="one">参加</label>
      <input type="radio" id="two" value="false" v-model="join" />
      <label for="two">不参加</label>
      <br />
      <button type="submit">提交</button>
    </form>
    <p>{{ email }}</p>
    <span>{{ join }}</span>
  </div>
</template>

<script>
  export default {
    name: 'FormDemo',
    data() {
      return {
        email: '',
        join: '',
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

## 测试表单提交

希望点击提交按钮后，提交表单到后端。

组件代码：

```js
{
  methods: {
    submitForm() {
      // $http 原型上的方法
      this.$http.post('test', {
        email: this.email,
        join: this.join,
      })
      this.$emit('form-submit', {
        email: this.email,
        join: this.join,
      })
    }
  }
}
```

测试用例：

```js
import {
  shallowMount
} from '@vue/test-utils'
import FormDemo from './FormDemo.vue'

describe('FormDemo.vue', () => {
  let wrapper = null
  const $http = {
    post: jest.fn(() => Promise.resolve({
      data: 'ok'
    })),
  }
  beforeEach(() => {
    wrapper = shallowMount(FormDemo, {
      mocks: {
        $http,
      },
    })
  })

  it('test http post', () => {
    // 设置表单值
    const data = expect.objectContaining({
      email,
      join: false,
    })
    const email = 'hello@163.com'
    const input = wrapper.find('input')
    const radio = wrapper.find('input[value="false"]')

    input.setValue(email)
    radio.setChecked()
    wrapper.find('button').trigger('submit')

    expect($http.post).toHaveBeenCalled()
    expect($http.post).toHaveBeenCalledWith('test', data)
  })
})
```

> jest.objectContaining 用来匹配对象中的属性，不关心其他属性。允许有其他属性，测试更加健壮。

### 测试接口返回值

接口成功后，通过触发 `success` 事件，把接口返回值抛出来。

测试用例：

```js
import {
  shallowMount
} from '@vue/test-utils'
import FormDemo from './FormDemo.vue'
import flushPromises from 'flush-promises'

describe('FormDemo.vue', () => {
  const res = {
    code: 0
  }
  let wrapper = null
  const $http = {
    post: jest.fn(() => Promise.resolve(res)),
  }
  beforeEach(() => {
    wrapper = shallowMount(FormDemo, {
      mocks: {
        $http,
      },
    })
  })

  it('test http post response', async () => {
    wrapper.find('button').trigger('submit')
    await flushPromises()

    expect(wrapper.emitted('success')[0][0]).toEqual(res)
  })
})
```

> 因为包含异步代码，所以需要使用 `flushPromises` 库，等待异步代码执行完毕。

重构组件，让测试用例通过：

```js
async submitForm() {
  const res = await this.$http.post('test', {
    email: this.email,
    join: this.join === 'true'
  })
  this.$emit('form-submit')
  this.$emit('success', res)
}
```

> 注意，重构后 form-submit 事件在接口返回后触发，也要使用 `flushPromises` ，才能保证以前的测试用例通过。

## jsdom 的局限性

jsdom 在 node 环境中实现了大部分 web api，但是有两个大部分没有实现：

布局和导航。

布局是关于计算元素位置的。如 `Element.getBoundingClientRect` 这样的 DOM 方法将不会按预期运行

jsdom 中没有页面的概念，因此你无法创建请求并导航到其他页面上。

但是以上情况不值得投入编写单元测试的时间。

## 问题

如果请求接口使用 `fetch` ，如何模拟呢？

组件的自定义事件触发，父组件的事件监听器执行，如何测试？

## 小结

测试的组件虽然没有样式，但是组件核心逻辑都测试了。

* 学习了如何测试**原生事件**，使用`trigger`触发原生事件，然后断言事件带来的结果是否符合预期，比如调用函数、元素隐藏、触发自定义事件等。

* 学习了三种测试**自定义事件**的方法。

* 学习了如何测试表单元素，使用`setValue`和`setChecked`方法，实现双向绑定，然后断言组件属性或者页面的变化。

* 学习了如何模拟，以测试 http 接口。

* `trigger`、`setValue`、`setChecked`方法都是异步的，需要使用`await`等待 DOM 更新，再断言。

* 使用`jest.objectContaining`断言对象，测试代码更加健壮。

* jsdom 没有实现页面导航和布局，但是不影响单元测试。
