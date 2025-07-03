# how to test pinia store

## setup store

`useCounterStore.ts`:

```ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counterStore', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
})
```

`src/stores/useCounterStore.spec.ts`:

```ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-03 15:35:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-20 09:38:28
 * @Description : counter 单元测试
 */
import { beforeEach, describe, expect, it } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from './useCounterStore'

// 测试 setup store
describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('初始状态', () => {
    const counterStore = useCounterStore()
    // NOTE 别解构，解构后失去响应式
    // const { count, doubleCount } = counterStore

    expect(counterStore.count).toBe(0)
    expect(counterStore.doubleCount).toBe(0)
  })
  it('修改count', () => {
    const counterStore = useCounterStore()
    expect(counterStore.count).toBe(0)
    expect(counterStore.doubleCount).toBe(0)

    counterStore.increment()

    expect(counterStore.count).toBe(1)
    expect(counterStore.doubleCount).toBe(2)
  })
})
```

## options store

`useTodoListStore.ts`:

```ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-03 17:28:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-20 09:35:57
 * @Description : todoListStore
 */
import { defineStore, acceptHMRUpdate } from 'pinia'

export type Todo = {
  id?: string
  title: string
  completed: boolean
}

export type TotoListState = {
  todoList: Todo[]
}

export const useTodoListStore = defineStore('todoListStore', {
  state: (): TotoListState => {
    return {
      todoList: []
    }
  },
  getters: {
    todoSize: (state) => {
      return state.todoList.length
    },
    completed: (state) => state.todoList.filter((todo) => todo.completed)
  },
  actions: {
    addTodo(todo: Todo) {
      if (!todo.id) todo.id = Math.random().toString(36)
      // NOTE 不通过 this.state.todoList 获取 todoList
      this.todoList.push(todo)
    },
    toggleTodo(id: string, completed?: boolean) {
      const arr = this.todoList.map((todo) => {
        if (todo.id !== id) return todo
        todo.completed = completed ?? !todo.completed
        return todo
      })
      this.todoList = arr
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoListStore, import.meta.hot))
}
```

`src/stores/useTodoListStore.spec.ts`:

```ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-03 15:35:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-03 18:07:03
 * @Description : todoListStore 单元测试
 */
import { beforeEach, describe, expect, it } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { useTodoListStore } from './useTodoListStore'
import type { Todo } from './useTodoListStore'

// 测试 option store
describe('todoListStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始状态', () => {
    const todoListStore = useTodoListStore()

    expect(todoListStore.todoList).toEqual([])
    expect(todoListStore.completed).toEqual([])
    expect(todoListStore.todoSize).toEqual(0)
  })

  it('addTodo action', () => {
    const todoListStore = useTodoListStore()

    const coding: Todo = {
      id: 'coding',
      title: 'coding',
      completed: false
    }

    todoListStore.addTodo(coding)

    expect(todoListStore.todoList).toEqual([coding])
    expect(todoListStore.todoSize).toEqual(1)
    expect(todoListStore.completed).toEqual([])
  })
  it('toggleTodo action', () => {
    const todoListStore = useTodoListStore()
    const coding: Todo = {
      id: 'coding',
      title: 'coding',
      completed: false
    }

    todoListStore.addTodo(coding)
    todoListStore.toggleTodo('coding', true)

    expect(todoListStore.completed).toEqual([{ ...coding, completed: true }])

    todoListStore.toggleTodo('coding')

    expect(todoListStore.completed).toEqual([])
  })
})
```

## store 中有 api 调用

<!-- TODO 详见 http-api -->

## store 中有 inject

<!-- TODO -->

## 小结
