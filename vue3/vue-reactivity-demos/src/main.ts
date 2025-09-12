import { CounterUI } from './CounterUI'
import { TodoApp } from './TodoApp'
import './demo-1'
import './style.css'

const container = document.querySelector('.demos')

const counter = new CounterUI(container)
console.log({ counter })
document.querySelector('#btn-outer')!.addEventListener('click', () => {
  counter.add()
})

// 使用
const todoContainer = document.getElementById('todo-app')
const todoApp = new TodoApp(todoContainer)

// 外部操作示例
setTimeout(() => {
  todoApp.addTodoFromExternal('外部添加的任务')
}, 3000)
