<script setup>
import { clone as deepClone } from 'petite-utils'
import { computed } from 'vue'

import RenderContainer from './RenderContainer'

const props = defineProps({
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
  }
})

const colList = computed(() => {
  return toColList(props.cols, props.labelWidth, props.labelNumPreRow)
})

function toColList(cols, labelWidth, labelNumPreRow) {
  console.log('cols:', cols)
  const titleInfo = deepClone(cols).map((item) => {
    const { labelWidth: itemLabelWidth } = item
    return {
      ...item,
      labelWidth: itemLabelWidth || /* this.$formTableOptions?.labelWidth || */ labelWidth
    }
  })
  if (titleInfo.some((item) => !!item.span)) {
    // NOTE 如何用户有设置每个标题的宽度,就不适配最后一个
    return titleInfo
  }
  const remainder = titleInfo.length % labelNumPreRow
  if (remainder === 1) {
    titleInfo[titleInfo.length - 1].span = labelNumPreRow
  }
  if (remainder > 1 && remainder < labelNumPreRow) {
    titleInfo[titleInfo.length - 1].span = labelNumPreRow - remainder + 1
  }
  return titleInfo
}
</script>

<template>
  <div class="component form-table">
    <ul v-if="colList.length" class="item-list">
      <li
        v-for="(item, index) in colList"
        :key="index"
        :style="{ width: ((item.span || 1) / props.labelNumPreRow) * 100 + '%' }"
        class="item"
      >
        <div class="item-label" :style="`width: ${item.labelWidth};`">
          <RenderContainer
            v-if="typeof item.label === 'function'"
            :render="item.label"
            :data="data"
          />
          <span v-else>
            {{ item.label }}
          </span>
        </div>
        <div class="item-value" :style="`width:calc(100% - ${item.labelWidth});`">
          <RenderContainer
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
}
</style>
