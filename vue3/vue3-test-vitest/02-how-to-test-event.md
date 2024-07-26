# 如何测试组件的事件

有一组件： `SimpleCount.vue` :

```HTML
<script setup>
  import {
    ref
  } from 'vue'
  const count = ref(0)
</script>

<template>
  <div class="simple-count">
    <button @click="count + 1">+</button>
    <span>{{ count }}</span>
    <button @click="$emit('submit', count)" role="submit">submit</button>
  </div>
</template>
```

测试代码 `SimpleCount.spec.ts` ：

```ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-26 11:20:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-26 12:12:44
 * @Description :
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import SimpleCount from './SimpleCount.vue'

describe('SimpleCount.vue', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = renderComponent()
  })
  it('触发 submit 事件，参数为当前计数', async () => {
    const submitBtn = wrapper.find('button[role=submit]')

    await submitBtn.trigger('click')
    const emit = wrapper.emitted()

    expect(emit.submit[0]).toEqual([0])
  })
})

function renderComponent(props?: any) {
  return shallowMount(SimpleCount, {
    props
  })
}
```

运行测试，通过，说明组件按照预期工作。

## 重构组件

上面的组件，把js逻辑写在模板中，当组件变得复杂，很快变得一团糟，我们把逻辑都放在js中：

```html
<script setup>
  import {
    ref
  } from 'vue'
  const count = ref(0)
  const emit = defineEmits(['submit'])

  function onHandleSubmit() {
    emit('submit', count.value)
  }

  function onClickPlus() {
    ++count.value
  }
</script>

<template>
  <div class="simple-count">
    <button @click="onClickPlus">+</button>
    <span>{{ count }}</span>
    <button @click="onHandleSubmit" role="submit">submit</button>
  </div>
</template>
```

再运行测试，测试依然通过。

> 好的测试应该充满弹性，测试输入和输出，而不是测试实现细节，能保证测试用例的弹性。

### 事件处理器好的实践

> 不要在模板中写逻辑，因为随着组件功能变化，逻辑和模板混入，很快变得一团糟。

> 事件处理函数命名风格：我一般以 `on` 开头。

> 事件处理函数和自定义事件关联：要是事件处理函数需要触发自定义事件，命名为 `onEmitXXX` 或者 `onHandleXXX` , `XXX` 是自定义名称。

这是我个人的偏好，你可选一种你的偏好，并一如既往的执行，从而保证这种风格的统一性。

### 声明事件

上面的组件，事件声明简单使用了数组。

像 `props` 一样，可使用对象语法对事件验证。

重构事件声明：

```ts
import { isNumber } from 'petite-utils'

const emit = defineEmits({
  submit: isNumber
})
```

> 不能在 `script setup` 语法中引入本地变量，这点体验很差：

```ts
function submitValidator(count) {
  return isNumber(count)
}
const emit = defineEmits({
  submit: submitValidator
})
```

这种非法会报错，使用 `setup` 函数不会报错：

```html
<script>
  import {
    isNumber
  } from 'petite-utils'
  import {
    ref
  } from 'vue'

  export function submitValidator(count) {
    return isNumber(count)
  }

  export default {
    name: 'SimpleCount',
    props: {},
    emit: {
      submit: submitValidator
    },
    setup(props, {
      emit
    }) {
      const count = ref(0)

      function onEmitSubmit() {
        emit('submit', count.value)
      }

      function onClickPlus() {
        ++count.value
      }
      return {
        count,
        onClickPlus,
        onEmitSubmit
      }
    }
  }
</script>
```

> 实践建议：验证合法性时，使用 `xxxValidator` 。

按照最佳实践，应该需要测试 `submitValidator` ，但是我们使用了第三方库，就不测试了。
