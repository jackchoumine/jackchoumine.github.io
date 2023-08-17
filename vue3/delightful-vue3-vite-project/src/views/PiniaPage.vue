<!--
 * @Description : 
 * @Date        : 2023-01-05 01:33:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-08-17 15:57:44
 * @LastEditors : ZhouQiJun
-->
<script setup lang="ts">
import {
  CounterDemo,
  DialogDemo, // NativeDialog,
  PetsDemo,
  SignupDemo,
  TodosDemo,
} from '@/components/PiniaDemos'
</script>

<template>
  <div class="page">
    <CounterDemo />
    <hr />
    <TodosDemo />
    <!-- <hr /> -->
    <!-- <PetsDemo /> -->
    <hr />
    <SignupDemo />
    <DialogDemo />
    <!-- <NativeDialog /> -->
  </div>
</template>

<style scoped lang="scss"></style>
