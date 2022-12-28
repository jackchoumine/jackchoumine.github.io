/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-28 09:46:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 09:55:01
 * @Description :
 */
import { useMemo, useState } from 'react'
import { Button } from 'antd-mobile'
import { useCreation } from '../hooks'

function UseCreationDemo() {
  const [_, setFlag] = useState<boolean>(false)

  const getNowData = () => {
    return Math.random()
  }

  const nowData = useMemo(() => getNowData(), [])

  return (
    <div style={{ padding: 50 }}>
      <div>正常的函数： {getNowData()}</div>
      <div>useCreation包裹后的： {nowData}</div>
      <Button
        color='primary'
        onClick={() => {
          setFlag(v => !v)
        }}
      >
        渲染
      </Button>
    </div>
  )
}

export default UseCreationDemo
