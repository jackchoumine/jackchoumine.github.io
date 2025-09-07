import { computed, effect, reactive, watch } from '@vue/reactivity'

class CounterUI {
  constructor(container) {
    this.container = container
    this.state = reactive({
      count: 0,
      theme: 'light',
    })

    this.doubleCount = computed(() => this.state.count * 2)

    this.init()
  }

  init() {
    this.render()
    this.setupReactivity()
  }

  render() {
    this.container.innerHTML = `
      <div class="counter ${this.state.theme}">
        <h3>计数器</h3>
        <div class="count" id="count-display">${this.state.count}</div>
        <div class="double-count">${this.state.count}</div>
        <button id="increment-btn">增加</button>
        <button id="decrement-btn">减少</button>
      </div>
    `

    this.bindEvents()
  }

  bindEvents() {
    this.container.querySelector('#increment-btn').addEventListener('click', () => {
      this.state.count++
    })

    this.container.querySelector('#decrement-btn').addEventListener('click', () => {
      this.state.count--
    })
  }

  setupReactivity() {
    // 自动更新 UI
    effect(() => {
      const display = this.container.querySelector('#count-display')
      if (display) {
        display.textContent = this.state.count
      }
    })

    effect(() => {
      const counter = this.container.querySelector('.counter')
      if (counter) {
        counter.className = `counter ${this.state.theme}`
      }
    })
    watch(this.doubleCount, (newVal, old) => {
      console.log({ newVal, old })
      const doubleDisplay = this.container.querySelector('.double-count')
      if (doubleDisplay) {
        doubleDisplay.textContent = `双倍: ${newVal}`
      }
    })
  }

  // 外部更新方法
  setCount(value) {
    this.state.count = value
  }

  getCount() {
    return this.state.count
  }
}

export { CounterUI }
