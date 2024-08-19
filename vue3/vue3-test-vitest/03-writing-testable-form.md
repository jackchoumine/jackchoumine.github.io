# 编写可测试的表单

表单是 web 应用中最常见的输入方式，因此能正确使用它们非常重要。在这一节中，我们将学习如何编写可测试的表单。

## 什么是好的表单？

确保表单逻辑从 vue 组件分离，这能保证单独测试表单逻辑。还希望输入验证逻辑也从组件中分离，这样可以确保验证逻辑的正确性。

两级验证：

* 字段验证：在单个表单字段中验证输入是否符合要求，错误时显示提示信息。
* 表单验证：验证表单中的所有字段，都正确后才启用提交按钮。

需要两种测试：

* 测试业务逻辑：哪些字段是必填的，哪些字段是可选的，哪些字段需要特定格式等。
* 测试交互逻辑：输入错误时，显示错误信息，所有字段都正确时，提交按钮可用。

### 有一病人信息表单

```html
<script setup>
  import {
    ref
  } from 'vue'

  const name = ref('')
  const age = ref()

  function onSubmit() {
    console.log('submit')
  }
</script>

<template>
  <form>
    <label for="name">Name</label>
    <input id="name" v-model="name" />
    <label for="age">Age</label>
    <input id="age" v-model="age" range />
    <button @click="onSubmit">Submit</button>
  </form>
</template>
```

### 字段测试代码

需要 `isRequired` 和 `isBetween` 两个函数，分别用于验证是否必填和是否为数字。

```js
// formValidation.spec.ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-29 09:53:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-29 10:16:32
 * @Description :
 */
import {
  describe,
  expect,
  it
} from 'vitest'
import {
  isRequired,
  isBetween
} from './formValidation'

describe('formValidation.isRequired', () => {
  it(`''非法`, () => {
    expect(isRequired('')).toEqual({
      valid: false,
      message: '请输入必填'
    })
  })
  it(` undefined 非法`, () => {
    expect(isRequired()).toEqual({
      valid: false,
      message: '请输入必填'
    })
  })
  it(`字符串合法`, () => {
    expect(isRequired('some value ')).toEqual({
      valid: true
    })
  })
})
describe('formValidation.isBetween', () => {
  it(`在最大最小之间，合法`, () => {
    expect(
      isBetween(4, {
        min: 2,
        max: 10
      })
    ).toEqual({
      valid: true
    })
  })
  it(`等于最小值，合法`, () => {
    expect(
      isBetween(2, {
        min: 2,
        max: 10
      })
    ).toEqual({
      valid: true
    })
  })
  it(`等于最大值，合法`, () => {
    expect(
      isBetween(10, {
        min: 2,
        max: 10
      })
    ).toEqual({
      valid: true
    })
  })
  it(`不是数字，非法`, () => {
    expect(
      isBetween(NaN, {
        min: 2,
        max: 10
      })
    ).toEqual({
      valid: false,
      message: '请输入数字'
    })
    // @ts-ignore
    expect(
      isBetween(void 0, {
        min: 2,
        max: 10
      })
    ).toEqual({
      valid: false,
      message: '请输入数字'
    })
    // @ts-ignore
    expect(
      isBetween(null, {
        min: 2,
        max: 10
      })
    ).toEqual({
      valid: false,
      message: '请输入数字'
    })
  })
  it(`大于最大值，非法`, () => {
    expect(
      isBetween(10.5, {
        min: 2,
        max: 10
      })
    ).toEqual({
      valid: false,
      message: '必须在2和10之间'
    })
  })
  it(`小于最小值，非法`, () => {
    expect(
      isBetween(1.9, {
        min: 2,
        max: 10
      })
    ).toEqual({
      valid: false,
      message: '必须在2和10之间'
    })
  })
})
```

写好测试代码，接下来就是实现验证逻辑。

```ts
// formValidation.ts
import { isNumerical } from 'petite-utils'

/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-29 09:53:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-29 10:07:35
 * @Description :
 */
export interface ValidationResult {
  valid: boolean
  message?: string
}
export interface Between {
  min: number
  max: number
}
function isRequired(value?: string): ValidationResult {
  if (value === undefined) {
    return {
      valid: false,
      message: '请输入必填'
    }
  }
  if (value.trim() === '') {
    return {
      valid: false,
      message: '请输入必填'
    }
  }
  return {
    valid: true
  }
}

function isBetween(input: number, between: Between): ValidationResult {
  if (!isNumerical(input)) {
    return {
      valid: false,
      message: '请输入数字'
    }
  }
  if (input < between.min || input > between.max) {
    return {
      valid: false,
      message: `必须在${between.min}和${between.max}之间`
    }
  }
  return {
    valid: true
  }
}

export { isRequired, isBetween }
```
