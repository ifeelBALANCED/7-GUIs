<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'

// This would be the actual timer logic, but we're only implementing UI
const elapsed = 0
const duration = 10
const isRunning = false
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

    <!-- Timer UI -->
    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-md">
      <div class="space-y-6">
        <!-- Gauge -->
        <div class="text-center">
          <div class="relative w-32 h-32 mx-auto">
            <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <!-- Background circle -->
              <circle cx="60" cy="60" r="54" fill="none" stroke="#475569" stroke-width="12" />
              <!-- Progress circle -->
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#14b8a6"
                stroke-width="12"
                stroke-dasharray="339.292"
                :stroke-dashoffset="339.292 - (elapsed / duration) * 339.292"
                stroke-linecap="round"
                class="transition-all duration-300"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-bold">{{ Math.round((elapsed / duration) * 100) }}%</span>
            </div>
          </div>
        </div>

        <!-- Elapsed Time Display -->
        <div class="text-center">
          <label class="block text-sm font-medium text-white mb-2">Elapsed Time</label>
          <div class="text-3xl font-mono text-teal-400">{{ elapsed.toFixed(1) }}s</div>
        </div>

        <!-- Duration Slider -->
        <div>
          <label class="block text-sm font-medium text-white mb-2">Duration: {{ duration }}s</label>
          <input
            type="range"
            :value="duration"
            min="1"
            max="60"
            step="0.1"
            class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <!-- Controls -->
        <div class="flex gap-3">
          <button
            class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {{ isRunning ? 'Pause' : 'Start' }}
          </button>
          <button
            class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
/* Custom slider styles */
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
