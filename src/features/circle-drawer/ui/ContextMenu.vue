<script lang="ts" setup>
defineProps<{ x: number; y: number }>()
defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <div
    class="fixed inset-0 z-50"
    tabindex="-1"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <div
      :style="{ left: x + 'px', top: y + 'px' }"
      class="absolute bg-slate-700 border border-slate-600 rounded-md shadow-lg py-1"
      role="menu"
    >
      <slot />
    </div>
  </div>
</template>
