<script>
import { defineComponent, ref, reacti, h } from 'vue'
export default defineComponent({
	name: 'SetupTwo',
	props: {
		mark: Number,
	},
	setup(props) {
		const count = ref(0)
		return () => h('div', [count.value, '--', h('span', [props.mark])])
		// NOTE 还不支持JSX
		// return () => (
		// 	<div>
		// 		{count.value}--<span>{props.mark}</span>
		// 	</div>
		// )
	},
})
</script>
<style scoped lang="scss"></style>
