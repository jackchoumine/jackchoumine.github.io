/*
 * @Date        : 2022-09-01 15:09:07
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-19 11:54:40
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
const themes = {
  light: { foreground: '#000000', background: '#eeeeee' },
  dark: { foreground: '#ffffff', background: '#222222' },
}

const ThemeContext = React.createContext(themes.light)

function App() {
  return (
    <ThemeContext.Provider value={themes.light}>
      <div className='App'>
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
    </ThemeContext.Provider>
  )
}

export default App
