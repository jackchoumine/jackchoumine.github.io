<script>
import { h, ref, reactive, watch, computed } from 'vue'
export default {
  name: 'MyHead',
  inheritAttrs: false,
  props: ['h'],
  setup(props, { emit, attrs, slots }) {
    // console.log(attrs)
    // console.log(slots)

    let children = `this is H${props.h}`
    let dataObj = null

    if (slots.default) {
      children = slots.default()
      dataObj = {
        onClick: () => {
          emit('my-event', Math.random().toString(36))
        },
      }
    }
    return () => h(`h${props.h}`, dataObj, children)
  },
}
</script>
