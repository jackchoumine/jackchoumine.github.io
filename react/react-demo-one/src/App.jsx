/*
 * @Date        : 2022-09-01 15:09:07
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-28 10:53:10
 * @Description :
 */
import './App.css'
import React from 'react'

import {
  PrimeApp,
  KnowUseRef,
  TimeInterval,
  RememberLastState,
  SimpleCounter,
  WindowResize,
  UseHttpGetDemo,
  PopperDemo,
  UseAddDemo,
  UseCallbackDemo,
  // RxjsHooksDemo,
} from './components'
import CallMethod from './demos/CallMethod'
import ContainerAndDisplay from './components/DesignPattern/ContainerAndDisplay'
const themes = {
  light: { foreground: '#000000', background: '#eeeeee' },
  dark: { foreground: '#ffffff', background: '#222222' },
}

// const ThemeContext = React.createContext(themes.light)
import { useTheme } from './components/ThemeContext'

function App() {
  const [theme, toggleTheme] = useTheme()
  return (
    <div className='App'>
      <button onClick={toggleTheme}>切换主题 {theme}</button>
      <ContainerAndDisplay />
      <CallMethod />
      <UseCallbackDemo />
      <UseAddDemo />
      <PopperDemo />
      <UseHttpGetDemo />
      <h4>useWindowResize</h4>
      <WindowResize />
      <hr />
      <h4>useCounter</h4>
      <SimpleCounter />
      <hr />
      <KnowUseRef />
      <TimeInterval />
      <RememberLastState />
      <hr />
      <PrimeApp />
    </div>
  )
}

export default App
