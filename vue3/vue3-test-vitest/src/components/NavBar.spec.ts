import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NavBar from './NavBar.vue'

describe('NavBar.vue', () => {
  it('已经登录', () => {
    const wrapper = renderNavBar({ logined: true })

    expect(wrapper.text()).toContain('退出')
  })

  it('未登录', () => {
    const wrapper = renderNavBar({ logined: false })

    expect(wrapper.text()).toContain('登录')
  })
})

function renderNavBar(props: { logined: boolean }) {
  return shallowMount(NavBar, {
    props
  })
}
