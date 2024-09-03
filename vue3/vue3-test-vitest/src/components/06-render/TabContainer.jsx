/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-30 11:02:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-03 09:43:46
 * @Description : tabs 组件
 */
import { defineComponent, h, computed, onMounted, onUnmounted, KeepAlive } from 'vue'
import './TabContainer.scss'

function withTabId(name) {
  return defineComponent({
    name,
    props: {
      id: {
        type: String || Number,
        required: true
      }
    },
    setup(props, { slots }) {
      onMounted(() => {
        console.log(`${name}  ${props.id} mounted`)
      })
      onUnmounted(() => {
        console.log(`${name} ${props.id} unmounted`)
      })
      return () => h('div', slots.default?.())
    }
  })
}

export const Tab = withTabId('Tab')
export const TabContent = withTabId('TabContent')

export const TabContainer = defineComponent({
  name: 'TabContainer',
  props: {
    modelValue: {
      type: String || Number,
      required: true
    },
    keepAlive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    // 获取子组件
    // @ts-ignore
    // const children: Array<typeof Tab | typeof TabContent> = slots.default?.() ?? []
    const children = slots.default?.() ?? []
    console.log(children)
    /**
     * 过滤 Tab 组件
     * @param component 组件
     * @returns 返回是否是 Tab 组件
     */
    // NOTE type 是组件对象的直接引用 可使用 === 判断组件类型
    // const tabFilter = (component: any): boolean => component.type === Tab
    function tabFilter(component) {
      return component.type === Tab
    }

    const tabs = computed(() => {
      const tabVNodes = children.filter(tabFilter).map((Tab) => {
        return h(Tab, {
          ...Tab.props,
          key: Tab.props.id,
          class: {
            active: Tab.props.id === props.modelValue,
            tab: true
          },
          onClick: () => {
            // console.log('Tab.props.id:', Tab.props.id)
            emit('update:modelValue', Tab.props.id)
          }
        })
      })
      return tabVNodes
    })

    // const contentFilter = (component: any): component is typeof TabContent =>
    //   component.type === TabContent && component.props.id === props.modelValue
    function contentFilter(component) {
      return component.type === TabContent && component.props.id === props.modelValue
    }
    const activeContent = computed(() => {
      const activeContent = children.find(contentFilter)
      const activeContentVNode = h(activeContent, {
        ...activeContent.props,
        key: activeContent.props.id
      })
      return activeContentVNode
    })

    return () => {
      let CurrContent = activeContent.value
      if (props.keepAlive) {
        CurrContent = h(KeepAlive, activeContent.value)
      }
      // return (
      //   <div class="tab-container">
      //     <div class="tabs">{tabs.value}</div>
      //     <div class="tab-content">{CurrContent}</div>
      //   </div>
      // )
      return h(() => CurrContent)
    }
  }
})
