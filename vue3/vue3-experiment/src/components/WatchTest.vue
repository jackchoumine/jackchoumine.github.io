<template>
	<div>
		<span>{{ count }}</span>
		<br />
		<span>商品价格{{ prod.price }},商品数量：{{ prod.num }}</span>
		<br />
		<span>总价：{{ total }}</span>
	</div>
</template>
<script>
import { defineComponent, ref, reactive, watch, computed, watchEffect } from 'vue'
export default defineComponent({
	name: 'WatchTest',
	setup(props, { emit, attrs, slots }) {
		// 监听基本数据
		const count = ref(0)
		const unWatch = watch(count, (value, oldValue) => {
			if (value === 6) {
				unWatch()
				console.log(timer)
				clearInterval(timer)
			}
			console.log(value, oldValue)
		})
		const timer = setInterval(() => {
			count.value = count.value + 2
			if (count.value === 10) {
				unWatch()
			}
		}, 2000)
		// 监听对象
		const prod = reactive({ price: 0 })
		// 有警告
		// watch(prod.price, (newValue) => {
		// 	console.log(prod)
		// 	console.log('prod.price', newValue)
		// })
		// 监听对象的属性，监视源变成一个函数，返回需要监听的属性
		// watch(
		// 	() => prod.price,
		// 	(newValue) => {
		// 		console.log(prod)
		// 		console.log('prod.price', newValue)
		// 	}
		// )
		// watch(prod, (newValue) => {
		// 	console.log(prod)
		// 	console.log('prod', newValue)
		// })
		setInterval(() => {
			prod.price += 10
			num.value += 1
			if (prod.price === 50) {
				console.log('添加对象属性')
				// NOTE 给响应式对象添加属性，vue能监听到，vue2 中 this.$set(obj,key,value)
				prod.num = 20
			}
		}, 3000)

		const total = ref(0)
		const num = ref(0)
		const resultWatchEffect = watchEffect(() => {
			total.value = prod.num || 1 * prod.price * num.value
		})
		// console.log(resultWatchEffect)
		return { count, prod, total, num }
	},
})
</script>
<style scoped lang="scss"></style>
