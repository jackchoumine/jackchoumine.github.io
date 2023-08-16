<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 20:27:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-16 21:06:25
 * @Description : 
-->
<script setup lang="ts">
import { DialogTest } from '@/components/PiniaDemos'
import type { Dialog } from '@/stores/plugin_dialog'

const props = defineProps<{
  dialogs: Dialog['items']
  frontDialog: Dialog['frontDialog']
  zIndex: Dialog['zIndex']
}>()
</script>

<template>
  <div class="dialog-container">
    <DialogTest
      v-for="(dialog, index) in dialogs"
      :key="index"
      :id="dialog.id"
      :offset="dialog.props.offset" />
  </div>
</template>
