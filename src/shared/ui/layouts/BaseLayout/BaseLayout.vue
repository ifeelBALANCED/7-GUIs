<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <header
      class="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 shadow-lg border-b border-teal-500/20"
    >
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">Seven GUIs</h1>
        <TaskHeader :current-task="currentTask" />
      </div>
    </header>

    <main class="px-6 py-8 max-w-4xl mx-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { TaskHeader } from '@/shared/ui'

interface Props {
  currentTask?: string
}

defineProps<Props>()
</script>

<style scoped>
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
