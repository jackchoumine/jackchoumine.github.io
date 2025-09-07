import { computed, effect, reactive } from '@vue/reactivity'

class TodoApp {
  constructor(container) {
    this.container = container
    this.state = reactive({
      todos: [],
      newTodo: '',
      filter: 'all',
    })

    this.filteredTodos = computed(() => {
      switch (this.state.filter) {
        case 'completed':
          return this.state.todos.filter(todo => todo.completed)
        case 'active':
          return this.state.todos.filter(todo => !todo.completed)
        default:
          return this.state.todos
      }
    })

    this.init()
  }

  init() {
    this.render()
    this.bindEvents()
    this.setupReactivity()
  }

  render() {
    this.container.innerHTML = `
      <div class="todo-app">
        <h2>Todo 应用</h2>
        
        <div class="input-section">
          <input 
            type="text" 
            id="new-todo" 
            placeholder="添加新任务..."
            value="${this.state.newTodo}"
          >
          <button id="add-todo">添加</button>
        </div>

        <div class="filters">
          <button class="filter-btn ${this.state.filter === 'all' ? 'active' : ''}" data-filter="all">全部</button>
          <button class="filter-btn ${this.state.filter === 'active' ? 'active' : ''}" data-filter="active">未完成</button>
          <button class="filter-btn ${this.state.filter === 'completed' ? 'active' : ''}" data-filter="completed">已完成</button>
        </div>

        <div class="todos-container">
          <ul id="todos-list"></ul>
        </div>

        <div class="stats">
          总计: <span id="total-count">0</span> | 
          完成: <span id="completed-count">0</span> |
          未完成: <span id="active-count">0</span>
        </div>
      </div>
    `
  }

  bindEvents() {
    // 添加任务
    this.container.querySelector('#add-todo').addEventListener('click', () => {
      this.addTodo()
    })

    this.container.querySelector('#new-todo').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        this.addTodo()
      }
    })

    // 输入框双向绑定
    this.container.querySelector('#new-todo').addEventListener('input', e => {
      this.state.newTodo = e.target.value
    })

    // 过滤器
    this.container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        this.state.filter = e.target.dataset.filter
      })
    })
  }

  setupReactivity() {
    // 更新任务列表
    effect(() => {
      const list = this.container.querySelector('#todos-list')
      if (list) {
        list.innerHTML = this.filteredTodos.value
          .map(
            todo => `
          <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <input 
              type="checkbox" 
              ${todo.completed ? 'checked' : ''}
              data-id="${todo.id}"
            >
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" data-id="${todo.id}">删除</button>
          </li>
        `
          )
          .join('')

        // 绑定新元素的事件
        this.bindTodoEvents()
      }
    })

    // 更新统计信息
    effect(() => {
      const total = this.container.querySelector('#total-count')
      const completed = this.container.querySelector('#completed-count')
      const active = this.container.querySelector('#active-count')

      if (total && completed && active) {
        total.textContent = this.state.todos.length
        completed.textContent = this.state.todos.filter(t => t.completed).length
        active.textContent = this.state.todos.filter(t => !t.completed).length
      }
    })

    // 更新输入框
    effect(() => {
      const input = this.container.querySelector('#new-todo')
      if (input) {
        input.value = this.state.newTodo
      }
    })

    // 更新过滤器按钮状态
    effect(() => {
      this.container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === this.state.filter)
      })
    })
  }

  bindTodoEvents() {
    // 复选框事件
    this.container
      .querySelectorAll('.todo-item input[type="checkbox"]')
      .forEach(checkbox => {
        checkbox.addEventListener('change', e => {
          const id = parseInt(e.target.dataset.id)
          const todo = this.state.todos.find(t => t.id === id)
          if (todo) {
            todo.completed = e.target.checked
          }
        })
      })

    // 删除按钮事件
    this.container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = parseInt(e.target.dataset.id)
        this.state.todos = this.state.todos.filter(t => t.id !== id)
      })
    })
  }

  addTodo() {
    if (this.state.newTodo.trim()) {
      this.state.todos.push({
        id: Date.now(),
        text: this.state.newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      })
      this.state.newTodo = ''
    }
  }

  // 外部方法
  addTodoFromExternal(text) {
    this.state.todos.push({
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    })
  }

  clearCompleted() {
    this.state.todos = this.state.todos.filter(t => !t.completed)
  }
}

export { TodoApp }
