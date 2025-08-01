<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'

const circles = [
  { x: 100, y: 100, radius: 20 },
  { x: 200, y: 150, radius: 30 },
  { x: 300, y: 200, radius: 25 },
]
</script>

<template>
  <BaseLayout>
    <template #header>
      <h1 class="text-2xl font-bold">6. Circle Drawer</h1>
      <nav class="text-sm">
        <RouterLink to="/" class="text-white hover:text-teal-200 transition-colors"
          >Home</RouterLink
        >
        <span class="mx-2 text-white">/</span>
        <span class="text-teal-200">Circle Drawer</span>
      </nav>
    </template>

    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">
        Sixth task of
        <a
          href="https://eugenkiss.github.io/7guis/"
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
        >
          The 7 Tasks from 7GUIs
          <ExternalLink class="w-4 h-4" />
        </a>
      </h2>

      <div class="bg-slate-800 rounded-lg p-4 mt-4">
        <p class="text-slate-300 mb-2"><strong>Challenge:</strong> Mouse handling, user input.</p>
        <p class="text-slate-300">
          The task is to build a frame containing an undo and redo button as well as a canvas area
          below. Left-clicking inside an empty area inside the canvas will create an unfilled circle
          with a 10 pixel random radius. Left-clicking inside an existing circle will select it (and
          others will be deselected). If no circle is selected (anymore) the undo button is
          disabled. When a circle is selected redo is disabled. Clicking undo will undo the last
          circle which was added. Clicking redo will redo the previously undone circle.
          Right-clicking a selected circle will make a popup menu appear with one entry "adjust
          diameter..". Clicking the entry will open another frame with a slider inside.
        </p>
      </div>
    </div>

    <!-- Circle Drawer UI -->
    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <!-- Controls -->
      <div class="flex gap-3 mb-6">
        <button
          class="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Undo
        </button>
        <button
          class="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Redo
        </button>
      </div>

      <!-- Canvas Area -->
      <div
        class="bg-slate-700 rounded-lg border-2 border-dashed border-slate-600 h-96 relative overflow-hidden"
      >
        <!-- Sample circles for demonstration -->
        <div
          v-for="(circle, index) in circles"
          :key="index"
          class="absolute w-10 h-10 bg-teal-500 rounded-full border-2 border-teal-300 cursor-pointer hover:bg-teal-400 transition-colors"
          :style="{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.radius * 2}px`,
            height: `${circle.radius * 2}px`,
          }"
        ></div>

        <!-- Instructions overlay -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-slate-400">
            <p class="text-lg mb-2">Click to add circles</p>
            <p class="text-sm">Right-click circles to adjust diameter</p>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="mt-4 text-sm text-slate-400">
        <p>• Left-click empty area to create a circle</p>
        <p>• Left-click circle to select it</p>
        <p>• Right-click selected circle to adjust diameter</p>
      </div>
    </div>
  </BaseLayout>
</template>
