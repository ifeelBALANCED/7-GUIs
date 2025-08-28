<script lang="ts" setup>
const props = defineProps<{
  value: number
  min?: number
  max?: number
}>()

defineEmits<{
  (e: 'change', val: number): void
  (e: 'close'): void
}>()

const min = props.min ?? 10
const max = props.max ?? 200

import { ref, watch } from 'vue'

const localRadius = ref(props.value)
watch(
  () => props.value,
  (v) => (localRadius.value = v),
)
</script>

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

<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click="$emit('close')"
  >
    <div class="bg-slate-800 border border-slate-700 rounded-lg p-6 min-w-80" @click.stop>
      <h3 class="text-lg font-semibold text-white mb-4">Adjust Circle Diameter</h3>
      <div class="mb-4">
        <label class="block text-slate-300 text-sm mb-2"> Diameter: {{ localRadius * 2 }}px </label>
        <input
          v-model.number="localRadius"
          :max="max"
          :min="min"
          class="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
          type="range"
          @input="$emit('change', localRadius)"
        />
      </div>
      <div class="flex justify-end gap-3">
        <button
          class="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
