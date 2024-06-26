<script lang="ts">
import { QBtn } from 'quasar'
import { provide } from 'vue'

export default {
  name: 'DialogDemo',
  components: {
    QBtn,
  },
  props: {
    id: {
      type: [String, Number],
      default: 'dialog',
    },
    title: {
      type: String,
      default: '这是弹窗标题',
    },
    size: {
      type: Object,
      default: () => ({ width: '100px', height: '100px' }),
    },
    position: {
      type: Object,
      default: () => ({ left: '100px', top: '100px' }),
    },
    zIndex: {
      type: Number,
      default: 101,
    },
    /**
     * 设置dialog是否可以移动，可选值：
     * <li>header: 仅当拖拽header时可以移动</li>
     * <li>content: 拖拽dialog任何地方都可以移动</li>
     * <li>false: 禁止移动</li>
     */
    movable: {
      type: [Boolean, String],
      default: 'header',
      validator(value) {
        return value === false || value === 'header' || value === 'body'
      },
    },
    // 是否显示最大化按钮
    maximum: {
      type: Boolean,
      default: true,
    },
    // 是否显示关闭按钮
    closer: {
      type: Boolean,
      default: true,
    },
    // 设置是否显示header
    header: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['submit', 'cancel', 'close'],
  setup(props, context) {
    const switcher =
      props.maximum === false
        ? false
        : {
            true: {
              image: 'mdi-window-restore', // options['modal.maximum.image'],
              color: 'transparent', // options['modal.maximum.color'],
            },
            false: {
              image: 'mdi-window-maximize', // options['modal.minimum.image'],
              color: 'transparent', // options['modal.minimum.color'],
            },
          }
    const innerCloser =
      props.closer === false
        ? false
        : {
            image: 'mdi-close', // options['modal.closer.image'],
            color: 'transparent', // options['modal.closer.color'],
          }

    const onClose = () => context.emit('close', { id: props.id })

    const positionStyle = computed(() => {
      if (props.position.bottom && props.position.right) {
        return {
          position: 'fixed',
          bottom: props.position.bottom,
          right: props.position.right,
          zIndex: props.zIndex,
        }
      }
      return {
        position: 'fixed',
        left: props.position.left,
        top: props.position.top,
        zIndex: props.zIndex,
      }
    })
    const sizeStyle = computed(() => {
      return {
        width: props.size.width,
        height: props.size.height,
      }
    })

    provide('dialog', {
      close: () => onClose(),
    })

    return {
      switcher,
      innerCloser,
      onClose,
      positionStyle,
      sizeStyle,
    }
  },
}
</script>

<template>
  <!-- style="position: fixed; top: 11rem; left: 27.5rem; z-index: 1001" -->
  <div class="component modal dialog" :style="positionStyle">
    <!-- 
      :enter-active-class="animation?.enter || 'window--enter-active'"
      :leave-active-class="animation?.leave || 'window--leave-active'"
     -->
    <transition appear>
      <div ref="body" class="modal--container" :style="sizeStyle">
        <div v-if="!!header" class="header">
          <slot name="header">
            <div class="header--left">
              <slot name="left">
                <!-- <ElButton @click.stop="onClose">左侧按钮1</ElButton> -->
              </slot>
            </div>
            <div class="header--title">
              <slot name="title">{{ title }}</slot>
            </div>
            <ElButton @click.stop="onClose">关闭按钮</ElButton>
            <div v-if="!!switcher || !!innerCloser" class="header--control">
              <QBtn
                v-if="!!switcher"
                :icon="switcher['' + maximum].image"
                :color="switcher['' + maximum].color"
                unelevated
                dense />
              <!-- @click.stop="onSwitch" -->
              <QBtn
                v-if="!!innerCloser"
                :icon="innerCloser.image"
                :color="innerCloser.color"
                unelevated
                dense />
              <!-- @click.stop="onCancel" -->
            </div>
          </slot>
        </div>
        <div class="modal--body">
          <slot>
            <p>modal body</p>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.component.modal {
  $modal-border-radius: 0.3rem;

  .modal--container {
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    color: white;
    background: linear-gradient(270deg, #1359a9 7%, #13c0e4 51%, #1359a9 93%);
    user-select: none;
    border-radius: $modal-border-radius $modal-border-radius 0 0;

    .header--left {
      padding: 0 10px;
    }

    .header--title {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-family: SourceHanSansCN-Bold;
      font-size: 20px;
      font-weight: bold;
      text-indent: 10px;
      cursor: default;
    }

    .header--control {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      padding: 0 0.5rem;
    }

    .header--control > button {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }

    .header--control > button:not(:first-child) {
      margin-left: 0.5rem;
    }
  }

  .modal--body {
    flex: 1;
    overflow: hidden;
    padding: 10px;
    border-radius: 0 0 $modal-border-radius $modal-border-radius;
    background-color: #f5f5f5;
  }

  .html-content {
    padding: 1rem;
    font-size: 1.5rem;
  }

  .dialog--progresser {
    margin-right: 5px;
  }
}
</style>
