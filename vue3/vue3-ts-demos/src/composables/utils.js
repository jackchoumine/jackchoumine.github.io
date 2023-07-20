import { ref, isRef } from 'vue'

export const wrap = (v) => (isRef(v) ? v : ref(v))
export const unwrap = (v) => (isRef(v) ? v.value : v)
