import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  const elapsed = ref(0)
  const duration = ref(5_000)
  const isRunning = ref(false)

  let rafId = 0
  let startTime = 0

  const tick = (now: number) => {
    elapsed.value = Math.min(now - startTime, duration.value)
    if (elapsed.value < duration.value && isRunning.value) {
      rafId = requestAnimationFrame(tick)
    } else {
      stop()
    }
  }

  const start = () => {
    if (isRunning.value || duration.value <= 0) return
    isRunning.value = true
    startTime = performance.now() - elapsed.value
    rafId = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (!isRunning.value) return
    isRunning.value = false
    cancelAnimationFrame(rafId)
  }

  const reset = () => {
    stop()
    elapsed.value = 0
    start()
  }

  const progress = computed(() => (duration.value > 0 ? elapsed.value / duration.value : 0))

  return { elapsed, duration, progress, isRunning, start, stop, reset }
})
