/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 20:27:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-23 19:25:33
 * @Description :
 */
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import { DialogDemo } from '@/components/DialogDemo'
import { useTodosStore } from '@/stores'
import type { Dialog } from '@/stores/plugin_dialog'

export default defineComponent({
  name: 'DialogContainer',
  components: {
    DialogDemo,
  },
  props: {
    dialogs: Array as PropType<Dialog['items']>,
    frontDialog: Object as PropType<Dialog['frontDialog']>,
    zIndex: Number as PropType<Dialog['zIndex']>,
  },
  setup(props) {
    const todosStore = useTodosStore()
    function onClose({ id }) {
      todosStore.dialog.close(id)
    }
    return () => (
      <div class="dialog-container" style={{ zIndex: props.zIndex }}>
        {props.dialogs.map(dialog => {
          return <DialogDemo key={dialog.id} {...dialog} onClose={onClose} />
        })}
      </div>
    )
  },
})
