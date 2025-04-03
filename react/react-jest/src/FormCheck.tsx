import { useEffect, useRef } from 'react'

/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 23:31:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-03 10:38:07
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
export default function FormCheck() {
  const ageInput = useRef<HTMLInputElement>(null)
  useEffect(() => {
    ageInput.current?.focus()
  }, [])
  return (
    <form className="test-form my-form">
      <label htmlFor="username">
        username
        <input
          type="text"
          id="username"
          name="username"
          disabled
          defaultValue="JACK"
          placeholder="请输入用户名"
        />
      </label>
      <label htmlFor="age">age</label>
      <input
        id="age"
        type="number"
        name="age"
        defaultValue={23}
        required
        ref={ageInput}
      />
      <label htmlFor="man">
        man
        <input id="man" type="radio" name="sex" value="man" defaultChecked />
      </label>
      <label htmlFor="woman">woman</label>
      <input id="woman" type="radio" name="sex" value="woman" />
      <span style={{ display: 'none' }}>none</span>
      <span style={{ display: 'none', color: 'red' }}>red</span>
    </form>
  )
}
