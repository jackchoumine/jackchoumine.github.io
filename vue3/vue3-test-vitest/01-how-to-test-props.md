# 如何测试 props

如何测试组件的 props ，是一个很重要的问题。好的测试方式可以让代码更加容易维护，能验证代码设计是否做到了**关注点分离**。

在测试 props 时，我们需要考虑以下几个方面：

1. 使用什么的方式声明 props？
2. props 的验证逻辑是否能和 UI 代码分离？

## 声明 props 的几种方式

> 使用对象写法 + 验证器，推荐的方式

有一 `MyMessage.vue` 组件：

```html
<script>
  export default {
    name: 'MyMessage',
    props: {
      type: {
        type: String,
        required: true,
        validator: (type) => {
          const typeList = ['success', 'info', 'warning', 'error']
          if (!typeList.includes(type)) {
            throw new Error(`type must be one of ${typeList.join(',')}, you passed ${type}`)
          }
          return true
        }
      }
    }
  }
</script>
<template> <div :class="['message',type]"></div></template>
```

不加验证器的写法，不推荐。

## 测试 props

> 普通写法

```ts
import { shallowMount } from '@vue/test-utils'
import MyMessage from './MyMessage.vue'
describe('MyMessage.vue', () => {
  it('type 的值必须是 success info warning error 之一', () => {
    const type = 'success'
    const wrapper = shallowMount(MyMessage, {
      props: {
        type
      }
    })
    expect(wrapper.classes()).toContain(type)
    const type2 = 'success'
    const wrapper = shallowMount(MyMessage, {
      props: {
        type2
      }
    })
    expect(wrapper.classes()).toContain(type2)
  })
  it('type 的值必需的', () => {
    const type = 'success'
    // 如何测试 prop 是必需的呢？
  })
})
```

> 进阶写法：shallowMount 多次调用，封装一个函数

```ts
import { shallowMount } from '@vue/test-utils'
import MyMessage from './MyMessage.vue'

describe('MyMessage.vue', () => {
  it('type 的值必须是 success info warning error 之一', () => {
    ;['success', 'info', 'warning', 'error'].forEach((type) => {
      const wrapper = renderMyMessage(type)
      expect(wrapper.classes()).toContain(type)
    })
  })
})

function renderMyMessage(type?: string) {
  return shallowMount(MyMessage, {
    props: {
      type
    }
  })
}
```

> 普通写法和进阶写法相，都存在什么问题？

1. type 的验证逻辑和 UI 逻辑耦合在一起，无法单独测试 type 是否必需。
2. 验证逻辑和 UI 逻辑耦合，无法复用 type 的验证逻辑。

## 进阶写法如何解决这两个问题的？

`分离关注点` 。

上面的例子中，通过测试 UI 逻辑来验证 props 是否正确，然后发现无法测试 props 是否必需。
造成这个问题的根源是我们的组件没有分离关注点 -- 把 props 的验证逻辑和 UI 逻辑耦合在一起，导致无法单独测试。

> 如何找到关注点的分界线呢？或者如何区分两种不同的逻辑呢？

找到关注点的**分界线**，是我们分离关注点的第一步。
`MyMessage.vue` 中，验证 type 的逻辑是纯 js 代码，而把 type 作为类名放到模板中，它就和样式相关，属于 UI 逻辑。
明白了组件中有两种不同的关注点后，就把验证 type 的逻辑提取出来，放到一个函数中。

```ts
// validateType.ts
export function validateType(type: string) {
  const typeList = ['success', 'info', 'warning', 'error']
  if (!typeList.includes(type)) {
    // 两种处理办法
    // 1. 返回 false
    // 2. 抛错
    throw new Error(`type must be one of ${typeList.join(',')}, you passed ${type}`)
  }
  return true
}
```

然后就可单独测试 `validateType` 函数了。

> 或者在组件中提取成单独的函数：

```html
<script lang="ts">
  export function validatorType(type) {
    const typeList = ['success', 'info', 'warning', 'error']
    if (!typeList.includes(type)) {
      throw new Error(`type must be one of ${typeList.join(', ')}, you passed ${type}`)
    }
    return true
  }
  export default {
    name: 'MyMessage',
    props: {
      type: {
        type: String,
        required: true,
        validator: validatorType
      }
    }
  }
</script>
<template>
  <div :class="['message', type]">
    <slot></slot>
  </div>
</template>
```

测试 `validatorType` 函数：

```ts
// MyMessage.spec.ts
import { validatorType } from './MyMessage.vue'
import { describe, it, expect } from 'vitest'
describe('MyMessage.vue', () => {
  describe('测试 props -- type', () => {
    it('type 的值只能为 success info warning error', () => {
      ;['success', 'info', 'warning', 'error'].forEach((type) => {
        expect(() => validatorType(type)).not.toThrow()
      })
    })
    it('type 是必需的，否则报错', () => {
      expect(() => validatorType()).toThrow()
    })
    it('type 的值非法，报错', () => {
      expect(() => validatorType('invalid-type')).toThrow()
    })
  })
})
```

> 测试函数是否抛错，使用 `箭头函数` + `toThrow` ，不使用箭头函数，测试通不过。

通过测试代码，发现组件的 type 验证逻辑和 UI 逻辑耦合了，促使我们把验证逻辑提取出来，就可以单独测试验证逻辑了，达到了分离关注点的目的。

### 如何衡量是否做到了关注点分离？

1. 把逻辑移到别的框架：试着把逻辑放到不同的框架中，看看是否能正常运行。比如 vue 组件的 prop 验证逻辑就可以在 react 中复用，而模板相关的逻辑就不行。
2. 检查是否容易测试：要是发现你很难写测试，那就说明极可能把两种逻辑耦合在一起了。比如前面的例子，我们无法测试 prop 是否必需，就说明验证逻辑和 UI 逻辑耦合在一起。

### 常见的关注点分界线

1. JS 逻辑
   比如数据验证，数据处理等。
2. UI 逻辑 -- 模板相关的逻辑
3. 样式逻辑

## 看一个分离关注点的例子

使用 `jQuery` 写的代码，非常容易把**业务逻辑**和**UI逻辑**耦合在一起。

功能描述：一双鞋的价格是 100 元，购买超过 9 双，可打 8 折。

> 业务逻辑和 UI 逻辑耦合在一起的代码

```html
<label for="shoe-count">
  <input type="number" id="shoe-count" value="8" />
</label>
<div id="amount"></div>
<script>
  $(document).ready(function () {
    const $shoeCount = $('#shoe-count')
    showAmount()
    $shoeCount.on('change', showAmount)

    function showAmount() {
      const shoeCount = $shoeCount.val()
      if (shoeCount >= 10) {
        $('#amount').text(`总价：￥${shoeCount * 100 * 0.8}`)
      } else {
        $('#amount').text(`总价：￥${shoeCount * 100}`)
      }
    }
  })
</script>
```

> 以上代码把计算价格的业务逻辑和更新 UI 的逻辑耦合在一起，随着这种代码的增多，维护成本会越来越高。

如果把这个功能使用 vue 重构，需要仔细区分，才能弄清楚哪儿是业务逻辑开始的地方，哪儿是 UI 逻辑结束的地方。
我们把计算价格的逻辑提取出来，放到一个函数中。

```js
$(document).ready(function () {
  const $shoeCount = $('#shoe-count')
  showAmount()
  $shoeCount.on('change', showAmount)

  function showAmount() {
    const shoeCount = $shoeCount.val()
    const amount = calculateAmount(shoeCount)
    $('#amount').text(`总价：￥${amount}`)
  }
})
const DISCOUNT = 0.8
const SHOE_PRICE = 100.0
// 业务逻辑
function calculateAmount(shoeCount) {
  if (shoeCount >= 10) {
    return shoeCount * SHOE_PRICE * DISCOUNT
  } else {
    return shoeCount * SHOE_PRICE
  }
}
```

通过分离业务逻辑和 UI 逻辑，业务逻辑和 UI 逻辑就非常清晰了。使用 vue 重构这个功能，就非常容易了。
vue 重构的代码：

```html
<script setup lang="ts">
  import { ref, computed } from 'vue'
  const shoeCount = ref(8)
  const amount = computed(() => {
    return calculateAmount(shoeCount.value)
  })
  const DISCOUNT = 0.8
  const SHOE_PRICE = 100.0

  function calculateAmount(shoeCount: number) {
    if (shoeCount >= 10) {
      return shoeCount * SHOE_PRICE * DISCOUNT
    } else {
      return shoeCount * SHOE_PRICE
    }
  }
</script>
<template>
  <div>
    <label for="shoe-count">
      <input type="number" id="shoe-count" v-model="shoeCount" />
    </label>
    <div>￥{{ amount }}</div>
  </div>
</template>
```

> 理解和区分关注点，并合理组织它们，是写出可维护代码的关键，也是普通程序员和优秀程序员的重要区别。

## 再看一个例子

有一 `NavBae.vue` 组件：

```html
<script setup>
  const props = defineProps({
    // loggedIn
    logined: {
      type: Boolean,
      default: false
    }
  })
</script>
<template>
  <div class="nav-bar">
    <button v-if="props.logined">退出</button>
    <button v-else>登录</button>
  </div>
</template>
```

测试代码 `NavBar.spec.ts` :

```ts
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NavBar from './NavBar.vue'

describe('NavBar.vue', () => {
  it('已经登录', () => {
    const wrapper = renderNavBar({ logined: true })
    expect(wrapper.text()).toContain('退出')
  })
  it('未登录', () => {
    const wrapper = renderNavBar({ logined: false })
    expect(wrapper.text()).toContain('登录')
  })
})

function renderNavBar(props: { logined: boolean }) {
  return shallowMount(NavBar, {
    props
  })
}
```

已经登录，测试是否包含 `退出` 文本，没有登录，测试是否包含 `登录` 文本，没有测试是否存在 button 按钮，且包含 `退出` 或者 `登录` 文本。即没有测试具体的实现，而是测试功能，也就是测试做了什么，而是测试如何做。

> 测试做了啥，而不是测试如何做，可以让测试代码更加健壮，重构代码不会让代码测试失败。

现在重构 `NavBar.vue` :

```html
<script setup>
  const props = defineProps({
    logined: {
      type: Boolean,
      default: false
    }
  })
</script>
<template>
  <div class="nav-bar">
    <button>{{ props.logined ? '退出' : '登录' }}</button>
  </div>
</template>
```

重构后，测试用例依然通过。

再重构一个版本:

```html
<script setup>
  const props = defineProps({
    logined: {
      type: Boolean,
      default: false
    }
  })
</script>

<template>
  <div class="nav-bar">
    <span>hello</span>
    <a>{{ props.logined ? '退出' : '登录' }}</a>
  </div>
</template>
```

即使把 `button` 标签，改成 `a` 标签，添加一个 span 标签，用例依然通过。

检测测试代码是否健壮的方式：被测试代码重构后测试用例是否失败。

## 小结

1. 鼓励使用`对象 + 验证器`的方式声明组件的 props;
2. 分离 props 的验证逻辑和 UI 逻辑，让测试验证逻辑更加方便和易复用；
3. 测试组件的行为：根据组件输入，测试输出，而不是测试组件的实现细节。可通过重构来验证测试代码是否健壮；
4. 测试一个函数是否抛错：`箭头函数` + `toThrow`；
5. 理解和找到关注点的分界线，并合理组织不同关注点的逻辑，对写好易维护的代码至关重要；
6. 通过代码**是否容易测试**和**纯js逻辑是否快速移植到其他框架**，来验证代码设计得是否合理，关注点是否耦合或者分离了。
