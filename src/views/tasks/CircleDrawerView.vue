<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { BaseLayout } from '@/shared/ui/layouts'
import { storeToRefs } from 'pinia'
import { CircleCanvas, circleModel, ContextMenu, RadiusPicker } from '@/features/circle-drawer'
import { ExternalLink } from 'lucide-vue-next'

const store = circleModel.useCircles()
const { circles, selected, menu, showDialog, isUndoDisabled, isRedoDisabled } = storeToRefs(store)

const {
  onCanvasClick,
  openMenuAt,
  closeMenu,
  openAdjustDialog,
  closeAdjustDialog,
  setSelectedRadius,
  handleUndo,
  handleRedo,
} = store
</script>

<template>
  <BaseLayout>
    <template #header>
      <h1 class="text-2xl font-bold">6. Circle Drawer</h1>
      <nav class="text-sm">
        <RouterLink class="text-white hover:text-teal-200 transition-colors" to="/"
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
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
          href="https://eugenkiss.github.io/7guis/"
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

    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div class="flex gap-3 mb-6">
        <button
          :disabled="isUndoDisabled"
          class="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
          @click="handleUndo"
        >
          Undo
        </button>

        <button
          :disabled="isRedoDisabled"
          class="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
          @click="handleRedo"
        >
          Redo
        </button>
      </div>

      <CircleCanvas
        :circles="circles"
        :selected-id="selected?.id ?? null"
        @canvas-click="onCanvasClick"
        @open-menu-at="openMenuAt"
      />
    </div>

    <ContextMenu v-if="menu" :x="menu.x" :y="menu.y" @close="closeMenu">
      <button
        class="w-full text-left px-4 py-2 text-slate-200 hover:bg-slate-600 transition-colors"
        @click="openAdjustDialog"
      >
        Adjust diameter...
      </button>
    </ContextMenu>

    <RadiusPicker
      v-if="showDialog && selected"
      :max="200"
      :min="10"
      :value="selected.radius"
      @change="setSelectedRadius"
      @close="closeAdjustDialog"
    />
  </BaseLayout>
</template>
