/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-28 10:41:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-28 10:53:00
 * @Description : Provider
 */
import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
