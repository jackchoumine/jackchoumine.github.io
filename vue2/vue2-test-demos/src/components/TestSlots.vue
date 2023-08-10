<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-10 16:20:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-10 16:31:31
 * @Description : 
-->
<template>
  <div>
    <h1>TestSlots</h1>
    <slot name="header"></slot>
    <slot :jack="jack"></slot>
    <slot name="footer" :age="jack.age"></slot>
  </div>
</template>

<script>
export default {
    name: 'TestSlots',
    data: () => {
        return {
            jack: {
                name: 'slot',
                age:19
            }
        }
    }
}
</script>
