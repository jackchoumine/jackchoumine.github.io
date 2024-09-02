<script>
import { clone as deepClone } from 'petite-utils'

import RenderContainer from './RenderContainer'

function vTitle(el, bindings) {
  const { value, instance } = bindings
  // console.log('vTitle', value, instance)
  if (typeof value === 'function') {
    instance.setTile(el, value(instance.data))
  } else if (value) {
    instance.setTile(el, value)
  } else {
    const content = el.querySelector('.es-form-table-key').textContent.trim()
    // console.log('content', content)
    instance.setTile(el, content !== '--' ? content : '暂无数据')
  }
}

export default {
  name: 'ESDesc',
  components: {
    Container: RenderContainer
  },
  directives: {
    title: {
      mounted(el, bindings, vnode) {
        // console.log('mounted')
        vTitle(el, bindings)
      },
      updated(el, bindings, vnode) {
        // console.log('updated')
        vTitle(el, bindings)
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '7.5rem'
    },
    labelNumPreRow: {
      type: Number,
      default: 3,
      validator: (value) => {
        const validate = [1, 2, 3, 4, 5, 6].includes(value)
        if (!validate) {
          console.error('labelNumPreRow 表示一行有标题字段对,只能时 1 -- 6,默认 3')
        }
        return validate
      }
    },
    cols: {
      type: Array,
      default: () => {
        return []
      },
      validator: (value) => {
        const validate = value.every((item) => {
          const { label, prop } = item
          return label && prop
        })
        if (!validate) {
          console.log('传入的 colList 属性的元素必须包含 label  和 prop 属性')
        }
        return validate
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    titleInfo() {
      // NOTE 使用 JSON.stringify 深度复制丢失方法,此处勿用
      // const titleInfo = JSON.parse(JSON.stringify(this.colList))
      const titleInfo = deepClone(this.cols).map((item) => {
        const { labelWidth } = item
        return {
          ...item,
          labelWidth: labelWidth || /* this.$formTableOptions?.labelWidth || */ this.labelWidth
        }
      })
      if (titleInfo.some((item) => !!item.span)) {
        // NOTE 如何用户有设置每个标题的宽度,就不适配最后一个
        return titleInfo
      }
      const labelNumPreRow = this.labelNumPreRow
      const remainder = titleInfo.length % labelNumPreRow
      if (remainder === 1) {
        titleInfo[titleInfo.length - 1].span = labelNumPreRow
      }
      if (remainder > 1 && remainder < labelNumPreRow) {
        titleInfo[titleInfo.length - 1].span = labelNumPreRow - remainder + 1
      }
      return titleInfo
    },
    hasTitleSlot() {
      return this.$slots.title
    },
    updateKey() {
      return JSON.stringify(deepClone(this.data))
    }
  },
  methods: {
    setTile(el, titleValue) {
      const textContent = el.textContent
      const label = textContent.trim() || '暂无数据'
      el.title = typeof titleValue === 'string' ? titleValue : label
    }
  }
}
</script>

<template>
  <div :key="updateKey" class="component form-table">
    <ul v-if="cols.length" class="item-list">
      <li
        v-for="(item, index) in titleInfo"
        :key="index"
        v-title="item?.labelTips"
        :style="{ width: ((item.span || 1) / labelNumPreRow) * 100 + '%' }"
        class="item"
      >
        <div class="item-label" :class="item.labelClassName" :style="`width: ${item.labelWidth};`">
          <Container v-if="typeof item.label === 'function'" :render="item.label" :data="data" />
          <span v-else>
            {{ item.label }}
          </span>
        </div>
        <div
          v-copy="item?.enableCopy ?? true"
          class="item-value"
          :class="item.valueClassName"
          :style="`width:calc(100% - ${item.labelWidth});`"
        >
          <Container
            v-if="typeof item.render === 'function'"
            :render="item.render"
            :data="data ?? {}"
          />
          <span v-else>
            {{ data[item.prop] ?? '--' }}
          </span>
        </div>
      </li>
    </ul>
    <div v-else class="form-table-no-data">暂无数据</div>
  </div>
</template>

<style lang="scss">
// NOTE 不加 scoped 方便在父组件使用 es-form-table 修改内部样式
.component.form-table {
  --item-height: 39px;
  --label-padding: 0 10px;

  div,
  ul,
  li {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  margin: 20px 0;
  background-color: #fff;

  .item-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    border-top: 1px solid#ebeef5;
    border-left: 1px solid #ebeef5;

    .item {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;

      &-label {
        display: flex;
        display: inline-block;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
        height: 100%;
        min-height: var(--item-height);
        padding: var(--label-padding);
        border-right: 1px solid#ebeef5;
        border-bottom: 1px solid #ebeef5;
        font-size: 14px;
        font-weight: 700;
        line-height: var(--item-height);
        text-align: right;
        word-wrap: break-word;
        color: #606266;
        background-color: #cdcdcd3f;
      }

      &-value {
        display: inline-block;
        box-sizing: border-box;
        height: 100%;
        min-height: var(--item-height);
        overflow: hidden;
        padding: 0 10px;
        border-right: 1px solid#ebeef5;
        border-bottom: 1px solid #ebeef5;
        font-size: 14px;
        line-height: var(--item-height);
        white-space: nowrap;
        text-overflow: ellipsis;
        word-wrap: break-word;
      }
    }
  }

  &-no-data {
    height: var(--item-height + 1px);
    margin-bottom: 20px;
    border: 1px solid #ebeef5;
    line-height: var(--item-height + 1px);
    text-align: center;
  }

  .zm-copy {
    cursor: copy;
  }
}
</style>
