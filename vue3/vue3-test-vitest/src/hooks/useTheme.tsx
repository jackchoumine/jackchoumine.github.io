/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-28 10:59:20
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-28 11:56:25
 * @Description : 切换主题
 */
import { defineComponent, inject, provide, readonly, ref, watch } from 'vue'

// export function useTheme() {
//   const theme = ref('light')
//   const toggleTheme = () => {
//     theme.value = theme.value === 'light' ? 'dark' : 'light'
//   }

export const TheThemeProvider = defineComponent({
  name: 'TheThemeProvider',
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  setup(props, { slots }) {
    const _theme = ref(props.theme)
    watch(
      () => props.theme,
      (val) => {
        _theme.value = val
      }
    )
    const toggleTheme = () => {
      console.log('toggleTheme')
      _theme.value = _theme.value === 'light' ? 'dark' : 'light'
    }
    provide('useTheme', {
      theme: readonly(_theme),
      toggleTheme
    })
    return () => {
      return slots.default?.()
    }
  }
})

export function useTheme() {
  const injection = (inject('useTheme') as any) ?? {}
  return {
    ...injection
  }
}
