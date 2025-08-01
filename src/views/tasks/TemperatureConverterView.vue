<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'

const celsius = 0
const fahrenheit = 32
</script>

<template>
  <BaseLayout>
    <template #header>
      <nav class="text-sm">
        <RouterLink to="/" class="text-white hover:text-teal-200 transition-colors"
          >Home</RouterLink
        >
        <span class="mx-2 text-white">/</span>
        <span class="text-teal-200">Temperature Converter</span>
      </nav>
    </template>

    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">
        Second task of
        <a
          href="https://eugenkiss.github.io/7guis/"
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
        >
          The 7 Tasks from 7GUIs
          <ExternalLink class="w-4 h-4" />
        </a>
      </h2>

      <div class="bg-slate-800 rounded-lg p-4 mt-4">
        <p class="text-slate-300 mb-2">
          <strong>Challenge:</strong> Bidirectional data flow, user input.
        </p>
        <p class="text-slate-300">
          The task is to build a frame containing two textfields TC and TF representing the
          temperature in Celsius and Fahrenheit, respectively. Initially, both TC and TF are empty.
          When the user enters a numerical value into TC the corresponding value in TF is
          automatically updated and vice versa. When the user enters a non-numerical string into TC
          the value in TF is not updated and vice versa. The formula for converting a temperature C
          in Celsius into a temperature F in Fahrenheit is C = (F - 32) * (5/9) and the dual
          direction is F = C * (9/5) + 32.
        </p>
      </div>
    </div>

    <!-- Temperature Converter UI -->
    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-md">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white mb-2">Celsius</label>
          <input
            type="text"
            :value="celsius"
            placeholder="Enter temperature in Celsius"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400"
          />
        </div>

        <div class="flex justify-center">
          <div class="text-slate-400 text-2xl">⇄</div>
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-2">Fahrenheit</label>
          <input
            type="text"
            :value="fahrenheit"
            placeholder="Enter temperature in Fahrenheit"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400"
          />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
