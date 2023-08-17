/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 20:27:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-17 17:59:54
 * @Description :
 */
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import { DialogDemo } from '@/components/DialogDemo'
import type { Dialog } from '@/stores/plugin_dialog'

export default defineComponent({
  components: {
    DialogDemo,
  },
  props: {
    dialogs: Array as PropType<Dialog['items']>,
    frontDialog: Object as PropType<Dialog['frontDialog']>,
    zIndex: Number as PropType<Dialog['zIndex']>,
  },
  setup(props) {
    return () => (
      <div>
        {props.dialogs.map(dialog => {
          return <DialogDemo />
        })}
      </div>
    )
  },
})
