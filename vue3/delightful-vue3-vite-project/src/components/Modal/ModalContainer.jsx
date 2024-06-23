/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 20:27:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-23 20:12:12
 * @Description :
 */
import { defineComponent } from 'vue'

import { DialogDemo } from '@/components/DialogDemo'

import useModal from './useModal'

// import { useTodosStore } from '@/stores'

export default defineComponent({
  name: 'ModalContainer',
  components: {
    DialogDemo,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    frontModal: {
      type: [String, Number],
    },
  },
  setup(props) {
    const modal = useModal()
    function onClose({ id }) {
      modal.close(id)
    }
    return () => (
      <div class="dialog-container" style={{ zIndex: props.zIndex }}>
        {props.items.map(dialog => {
          return <DialogDemo key={dialog.id} {...dialog} onClose={onClose} />
        })}
      </div>
    )
  },
})
