/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 15:26:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-02 16:23:37
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// ./App.test.tsx
import { mount } from 'enzyme'

import App from './App'

describe('test', () => {
  it('first unit test', () => {
    //  <React.StrictMode>
    // </React.StrictMode>
    const app = mount(<App />)
    expect(app.find('.read-the-docs').text()).toEqual(
      'Click on the Vite and React logos to learn more'
    )
  })
})
