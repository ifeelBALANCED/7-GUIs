<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'

interface Props {
  taskNumber: number
  taskName: string
  challenge: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="mb-6">
    <h2 class="text-2xl font-bold mb-2">
      {{
        taskNumber === 1
          ? 'First'
          : taskNumber === 2
            ? 'Second'
            : taskNumber === 3
              ? 'Third'
              : taskNumber === 4
                ? 'Fourth'
                : taskNumber === 5
                  ? 'Fifth'
                  : taskNumber === 6
                    ? 'Sixth'
                    : 'Seventh'
      }}
      task of
      <a
        href="https://eugenkiss.github.io/7guis/"
        class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        The 7 Tasks from 7GUIs
        <ExternalLink class="w-4 h-4" />
      </a>
    </h2>

    <div class="bg-slate-800 rounded-lg p-4 mt-4">
      <p class="text-slate-300 mb-2"><strong>Challenge:</strong> {{ challenge }}</p>
      <p class="text-slate-300">
        {{ description }}
      </p>
    </div>
  </div>
</template>
