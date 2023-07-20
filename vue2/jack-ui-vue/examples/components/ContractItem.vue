<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 19:28:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-20 20:16:09
 * @Description : 
-->
<script>
export default {
  name: 'ContractItem',
  props: {
    name: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>

<template>
  <section>
    <div class="header">
      <img :src="img" :alt="name + '的头像'" />
      {{ name }}
    </div>
    <div class="detail">
      {{ city }}
      {{ company }}
      {{ position }}
      <span>
        <a :href="twitter">我的推特</a>
      </span>
      {{ phone }}
      {{ twitter }}
    </div>
  </section>
</template>
