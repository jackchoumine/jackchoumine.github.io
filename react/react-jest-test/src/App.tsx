/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-13 11:40:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-19 19:01:43
 * @Description : 应用根组件
 */
import React from 'react'
import { Button } from 'antd'
import classnames from 'classnames'
import { sum } from 'utils'
import { HelloJest, MyInput } from 'components'

const App = () => {
  const h1ClassNames = classnames('h1-title hello')
  const result = sum(1, 2)
  return (
    <div>
      <h1 className={h1ClassNames}>Hello,{result}</h1>
      <HelloJest />
      <MyInput />
      <Button>点我</Button>
    </div>
  )
}

export default App
