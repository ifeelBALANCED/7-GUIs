<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'
import { Timer } from '@/features/timer'
</script>

<template>
  <BaseLayout>
    <template #header>
      <nav class="text-sm">
        <RouterLink to="/" class="text-white hover:text-teal-200 transition-colors"
          >Home</RouterLink
        >
        <span class="mx-2 text-white">/</span>
        <span class="text-teal-200">Timer</span>
      </nav>
    </template>

    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">
        Fourth task of
        <a
          href="https://eugenkiss.github.io/7guis/"
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
        >
          The 7 Tasks from 7GUIs
          <ExternalLink class="w-4 h-4" />
        </a>
      </h2>

      <div class="bg-slate-800 rounded-lg p-4 mt-4">
        <p class="text-slate-300 mb-2"><strong>Challenge:</strong> Concurrency, user input.</p>
        <p class="text-slate-300">
          The task is to build a frame containing a gauge G for the elapsed time e, a label which
          shows the elapsed time as a numerical value, a slider S by which the duration d of the
          timer can be adjusted while the timer is running and a reset button R. Adjusting S must
          immediately reflect on d and not only when S is released. It follows that while moving S
          the filled amount of G will (usually) change immediately. When e ≥ d (i.e. the time is up)
          then the timer stops (and the gauge G will be full). If, thereafter, S is moved such that
          d > e then the timer restarts to tick until e ≥ d again. Clicking R resets e to zero.
        </p>
      </div>
    </div>

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
