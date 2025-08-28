<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'

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
  <BaseLayout>
    <h2 class="text-4xl font-bold mb-6">Seven GUI Tasks</h2>

    <div class="space-y-6 text-slate-300">
      <p>
        7 GUIs is a popular list of seven user interface development tasks. These tasks try to cover
        many challenges faced in UI development.
      </p>

      <blockquote class="border-l-4 border-teal-500 pl-4 italic">
        "There are countless GUI toolkits in different languages and with diverse approaches to GUI
        development. However, diligent comparisons between them are rare. Whereas in a traditional
        benchmark competing implementations are compared in terms of their resource consumption,
        here implementations are compared in terms of their notation. 7GUIs defines seven tasks that
        represent typical challenges in GUI programming."
        <footer class="mt-2 text-sm">— the author of tasks list</footer>
      </blockquote>

      <p>
        <a
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
          href="https://eugenkiss.github.io/7guis/"
        >
          The 7 Tasks from 7GUIs Homepage
          <ExternalLink class="w-4 h-4" />
        </a>
      </p>

      <p>
        The tasks have implementations in various programming languages like JAVA, Clojure, Elm,
        Kotlin etc.
      </p>

      <div>
        <p class="mb-2">This, web browser based, solution uses:</p>
        <ul class="list-disc list-inside space-y-1 ml-4">
          <li>
            <a
              class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
              href="https://vuejs.org"
            >
              Vue.js: UI framework
              <ExternalLink class="w-4 h-4" />
            </a>
          </li>
          <li>
            <a
              class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
              href="https://pinia.vuejs.org"
            >
              Pinia: State management
              <ExternalLink class="w-4 h-4" />
            </a>
          </li>
          <li>
            <a
              class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
              href="https://ui.shadcn.com"
            >
              Shadcn Vue: Component library
              <ExternalLink class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </div>

      <p>
        The goal of this activity was to learn using
        <a
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
          href="https://en.wikipedia.org/wiki/Finite-state_machine"
        >
          finite state machines
          <ExternalLink class="w-4 h-4" />
        </a>
        for building reactive UIs.
        <a
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
          href="https://xstate.js.org"
        >
          XState
          <ExternalLink class="w-4 h-4" />
        </a>
        is a popular library that implements finite state machines and statecharts in JavaScript. It
        adheres to the
        <a
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
          href="https://www.w3.org/TR/scxml/"
        >
          State Chart XML (SCXML) specification
          <ExternalLink class="w-4 h-4" /> </a
        >.
      </p>
    </div>

    <div class="mt-12">
      <h3 class="text-2xl font-semibold mb-4">The 7 Tasks</h3>
      <div class="bg-slate-800 rounded-lg p-6">
        <div class="grid gap-2">
          <RouterLink
            v-for="(task, index) in tasks"
            :key="task.id"
            :to="task.path"
            class="flex items-center justify-between p-3 rounded-md hover:bg-slate-700 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <span class="text-slate-400 text-sm font-mono">{{ index + 1 }}.</span>
              <span class="text-white group-hover:text-teal-300 transition-colors">{{
                task.name
              }}</span>
            </div>
            <span class="text-slate-500 group-hover:text-slate-300 transition-colors">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
