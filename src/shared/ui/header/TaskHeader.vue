<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink, ChevronDown } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui'

interface Props {
  currentTask?: string
}

defineProps<Props>()

const tasks = [
  { id: 'counter', name: 'Counter', path: '/counter' },
  { id: 'temperature-converter', name: 'Temperature Converter', path: '/temperature-converter' },
  { id: 'flight-booker', name: 'Flight Booker', path: '/flight-booker' },
  { id: 'timer', name: 'Timer', path: '/timer' },
  { id: 'crud', name: 'CRUD', path: '/crud' },
  { id: 'circle-drawer', name: 'Circle Drawer', path: '/circle-drawer' },
  { id: 'cells', name: 'Cells', path: '/cells' },
]
</script>

<template>
  <nav class="flex items-center gap-6">
    <RouterLink
      to="/"
      class="text-white hover:text-teal-200 transition-colors font-medium px-3 py-2 rounded-md"
    >
      Home
    </RouterLink>

    <DropdownMenu>
      <DropdownMenuTrigger
        class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-teal-700 transition-colors text-white font-medium"
      >
        <span>Tasks</span>
        <ChevronDown class="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-64 bg-slate-800 border-slate-700 shadow-xl">
        <div class="p-2">
          <div class="text-xs font-medium text-slate-400 mb-2 px-2">7 GUI Tasks</div>
          <DropdownMenuItem
            v-for="(task, index) in tasks"
            :key="task.id"
            as-child
            class="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer rounded-md"
          >
            <RouterLink :to="task.path" class="flex items-center gap-3 w-full p-2">
              <span class="text-slate-400 text-sm font-mono w-6">{{ index + 1 }}.</span>
              <span class="flex-1">{{ task.name }}</span>
              <span class="text-slate-500 text-xs">→</span>
            </RouterLink>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>

    <a
      href="https://eugenkiss.github.io/7guis/"
      target="_blank"
      rel="noopener noreferrer"
      class="text-white hover:text-teal-200 transition-colors font-medium flex items-center gap-1 px-3 py-2 rounded-md"
    >
      <span>About</span>
      <ExternalLink class="w-3 h-3" />
    </a>

    <div v-if="currentTask" class="flex items-center gap-2 text-white">
      <span class="text-slate-300">/</span>
      <span class="text-teal-200 font-medium">{{ currentTask }}</span>
    </div>
  </nav>
</template>
