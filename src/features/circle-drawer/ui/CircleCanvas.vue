<script lang="ts" setup>
import type { Circle } from '../model'

defineProps<{
  circles: Circle[]
  selectedId: string | null
}>()

defineEmits<{
  (e: 'canvas-click', ev: MouseEvent): void
  (e: 'open-menu-at', ev: MouseEvent): void
}>()
</script>

<template>
  <div
    class="bg-slate-700 rounded-lg border-2 border-dashed border-slate-600 h-96 relative overflow-hidden cursor-crosshair"
    @click.left="$emit('canvas-click', $event)"
    @contextmenu.prevent="$emit('open-menu-at', $event)"
  >
    <div
      v-for="circle in circles"
      :key="circle.id"
      :class="{
        'bg-slate-400 border-slate-200': circle.id === selectedId,
        'bg-transparent hover:bg-slate-600/20': circle.id !== selectedId,
      }"
      :style="{
        left: `${circle.x - circle.radius}px`,
        top: `${circle.y - circle.radius}px`,
        width: `${circle.radius * 2}px`,
        height: `${circle.radius * 2}px`,
      }"
      aria-label="circle"
      class="absolute rounded-full border-2 border-slate-300 cursor-pointer transition-all"
    />
    <div v-if="circles.length === 0" class="absolute inset-0 flex items-center justify-center">
      <div class="text-center text-slate-400">
        <p class="text-lg mb-2">Click to add circles</p>
        <p class="text-sm">Right-click circles to adjust diameter</p>
      </div>
    </div>
  </div>
</template>
