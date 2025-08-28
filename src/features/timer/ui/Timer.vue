<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted } from 'vue'
import { Card, CardContent } from '@/shared/ui/card'
import { Slider } from '@/shared/ui/slider'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { useTimerStore } from '../model'
import { formatTime } from '../lib'

const timer = useTimerStore()
const { elapsed, duration, progress, isRunning } = storeToRefs(timer)

const durationArr = computed({
  get: () => [duration.value],
  set: ([v]: number[]) => {
    duration.value = v ?? 0
  },
})

onMounted(() => {
  if (duration.value > 0) timer.start()
})

onUnmounted(() => {
  timer.stop()
})
</script>

<template>
  <Card class="max-w-xl mx-auto bg-slate-900 border border-slate-600">
    <CardContent class="p-6 space-y-4">
      <div
        class="w-full rounded-md px-4 py-3 text-center font-bold text-white ring-1 ring-teal-400/80 bg-slate-800"
      >
        {{ formatTime(elapsed) }}s / {{ formatTime(duration) }}s
      </div>

      <div class="relative h-2 w-full rounded bg-slate-700/80 overflow-hidden">
        <div
          class="h-full rounded-l transition-[width] duration-100 linear striped"
          :style="{ width: `${Math.max(0, Math.min(100, Math.round((progress || 0) * 100)))}%` }"
        />
      </div>

      <div class="space-y-2">
        <Label for="duration" class="text-white">Set duration:</Label>
        <Slider id="duration" v-model="durationArr" :max="30_000" :step="100" class="w-full" />
      </div>

      <div class="flex gap-2">
        <Button class="bg-teal-500 text-slate-900 hover:bg-teal-400" @click="timer.reset()">
          Reset
        </Button>

        <Button
          variant="outline"
          :disabled="duration === 0"
          @click="isRunning ? timer.stop() : timer.start()"
        >
          {{ isRunning ? 'Pause' : 'Start' }}
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
@keyframes stripeMove {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 40px 0;
  }
}

.striped {
  background: repeating-linear-gradient(
    45deg,
    rgba(45, 212, 191, 0.85) 0 12px,
    rgba(20, 184, 166, 0.85) 12px 24px
  );
  animation: stripeMove 1s linear infinite;
  box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.3);
}
</style>
