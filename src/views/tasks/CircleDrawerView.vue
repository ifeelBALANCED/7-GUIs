<script lang="ts" setup>
import { BaseLayout, TaskDescription } from '@/shared/ui'
import { storeToRefs } from 'pinia'
import { CircleCanvas, circleModel, ContextMenu, RadiusPicker } from '@/features/circle-drawer'

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
  <BaseLayout current-task="Circle Drawer">
    <TaskDescription
      :task-number="6"
      task-name="Circle Drawer"
      challenge="Mouse handling, user input."
      description="The task is to build a frame containing an undo and redo button as well as a canvas area below. Left-clicking inside an empty area inside the canvas will create an unfilled circle with a 10 pixel random radius. Left-clicking inside an existing circle will select it (and others will be deselected). If no circle is selected (anymore) the undo button is disabled. When a circle is selected redo is disabled. Clicking undo will undo the last circle which was added. Clicking redo will redo the previously undone circle. Right-clicking a selected circle will make a popup menu appear with one entry 'adjust diameter..'. Clicking the entry will open another frame with a slider inside."
    />

    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div class="flex gap-3 mb-6">
        <button
          :disabled="isUndoDisabled"
          data-testid="undo-button"
          class="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
          @click="handleUndo"
        >
          Undo
        </button>

        <button
          :disabled="isRedoDisabled"
          data-testid="redo-button"
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
