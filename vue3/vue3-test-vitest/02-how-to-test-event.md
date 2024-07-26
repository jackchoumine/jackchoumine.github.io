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

```
