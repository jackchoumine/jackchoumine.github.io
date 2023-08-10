<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-10 08:55:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-10 10:42:13
 * @Description : 
-->
<template>
  <button @click="fetchResults">{{ value }}</button>
</template>

<script>
import axios from 'axios'

export default {
    name: 'FooComponent',
    data() {
        return {
            value: null
        }
    },

    methods: {
        async fetchResults() {
            // const response = await fetch('mock/service').then(res=>res.json())
            const response = await axios.get('mock/service')
            this.value = response.data
        }
    }
}
</script>
