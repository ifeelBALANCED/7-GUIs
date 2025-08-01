import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment(): void {
    count.value++
  }

  function reset(): void {
    count.value = 0
  }

  return { count, increment, reset }
})
