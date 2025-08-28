<script setup lang="ts">
import { BaseLayout, TaskDescription } from '@/shared/ui'
import { Timer } from '@/features/timer'
</script>

<template>
  <BaseLayout current-task="Timer">
    <TaskDescription
      :task-number="4"
      task-name="Timer"
      challenge="Concurrency, user input."
      description="The task is to build a frame containing a gauge G for the elapsed time e, a label which shows the elapsed time as a numerical value, a slider S by which the duration d of the timer can be adjusted while the timer is running and a reset button R. Adjusting S must immediately reflect on d and not only when S is released. It follows that while moving S the filled amount of G will (usually) change immediately. When e ≥ d (i.e. the time is up) then the timer stops (and the gauge G will be full). If, thereafter, S is moved such that d > e then the timer restarts to tick until e ≥ d again. Clicking R resets e to zero."
    />

    <Timer />
  </BaseLayout>
</template>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #14b8a6;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #14b8a6;
  cursor: pointer;
  border: none;
}
</style>
