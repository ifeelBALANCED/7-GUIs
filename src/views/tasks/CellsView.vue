<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'

const cells = ref<string[][]>([
  ['', 'A', 'B', 'C', 'D', 'E'],
  ['1', '1', '2', '3', '4', '5'],
  ['2', '2', '4', '6', '8', '10'],
  ['3', '3', '6', '9', '12', '15'],
  ['4', '4', '8', '12', '16', '20'],
  ['5', '5', '10', '15', '20', '25'],
])

const selectedCell = ref<string | null>(null)
</script>

<template>
  <BaseLayout>
    <template #header>
      <nav class="text-sm">
        <RouterLink to="/" class="text-white hover:text-teal-200 transition-colors">
          Home
        </RouterLink>
        <span class="mx-2 text-white">/</span>
        <span class="text-teal-200">Cells</span>
      </nav>
    </template>

    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">
        Seventh task of
        <a
          href="https://eugenkiss.github.io/7guis/"
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
          target="_blank"
        >
          The 7 Tasks from 7GUIs
          <ExternalLink class="w-4 h-4" />
        </a>
      </h2>

      <div class="bg-slate-800 rounded-lg p-4 mt-4">
        <p class="text-slate-300 mb-2"><strong>Challenge:</strong> Spreadsheet, user input.</p>
        <p class="text-slate-300">
          Build a frame containing a grid of cells. Each cell should support editing. When the user
          changes the value in a cell, the values that depend on it are updated automatically.
          Determine the dependencies yourself and be able to explain your decisions.
        </p>
      </div>
    </div>

    <!-- Cells UI -->
    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <tbody>
            <tr v-for="(row, rowIndex) in cells" :key="rowIndex" class="border-b border-slate-600">
              <td
                v-for="(cell, colIndex) in row"
                :key="colIndex"
                class="border-r border-slate-600 p-2 min-w-[100px] h-10"
                :class="{
                  'bg-slate-600': rowIndex === 0 || colIndex === 0,
                  'bg-slate-700': rowIndex > 0 && colIndex > 0,
                  'bg-teal-600': selectedCell === `${rowIndex}-${colIndex}`,
                }"
              >
                <input
                  v-if="rowIndex > 0 && colIndex > 0"
                  type="text"
                  :value="cell"
                  class="w-full h-full bg-transparent text-white text-center focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                  placeholder="Enter formula or value"
                  @focus="selectedCell = `${rowIndex}-${colIndex}`"
                  @blur="selectedCell = null"
                />
                <span
                  v-else
                  class="w-full h-full flex items-center justify-center text-sm font-medium text-slate-300"
                >
                  {{ cell }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Instructions -->
      <div class="mt-6 p-4 bg-slate-700 rounded-lg">
        <h4 class="font-semibold mb-2">Instructions:</h4>
        <ul class="text-sm text-slate-300 space-y-1 list-disc list-inside">
          <li>
            Enter values directly (e.g., <code>5</code>) or formulas (e.g., <code>=A1+B1</code>)
          </li>
          <li>
            Formulas support basic arithmetic: <code>+</code>, <code>-</code>, <code>*</code>,
            <code>/</code>
          </li>
          <li>
            Cell references use column letter + row number (e.g., <code>A1</code>, <code>B2</code>)
          </li>
          <li>
            Example setup:
            <ul class="list-decimal list-inside ml-4">
              <li><code>A1 = "=B1+C1"</code></li>
              <li><code>B1 = "=C1*2"</code></li>
              <li><code>C1 = "=D1*3"</code></li>
              <li><code>D1 = "1"</code></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </BaseLayout>
</template>
