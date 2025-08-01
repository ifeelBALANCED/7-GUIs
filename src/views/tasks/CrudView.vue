<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'

const names = ['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman']
const newName = ''
const isCreateEnabled = false
const isUpdateEnabled = false
const isDeleteEnabled = false
</script>

<template>
  <BaseLayout>
    <template #header>
      <nav class="text-sm">
        <RouterLink to="/" class="text-white hover:text-teal-200 transition-colors"
          >Home</RouterLink
        >
        <span class="mx-2 text-white">/</span>
        <span class="text-teal-200">CRUD</span>
      </nav>
    </template>

    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">
        Fifth task of
        <a
          href="https://eugenkiss.github.io/7guis/"
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
        >
          The 7 Tasks from 7GUIs
          <ExternalLink class="w-4 h-4" />
        </a>
      </h2>

      <div class="bg-slate-800 rounded-lg p-4 mt-4">
        <p class="text-slate-300 mb-2">
          <strong>Challenge:</strong> Master-detail, CRUD, user input.
        </p>
        <p class="text-slate-300">
          The task is to build a frame containing the following elements: a textfield "surname", a
          textfield "first name", a button "create", a button "update", a button "delete" and a list
          of persons. The list contains the columns "surname" and "first name". When the user clicks
          on a person in the list the textfields are filled with the corresponding values. When the
          user clicks on "create" the person is added to the list. When the user clicks on "update"
          the person in the list is updated with the values from the textfields. When the user
          clicks on "delete" the person is deleted from the list. When the user clicks on a person
          in the list the textfields are filled with the corresponding values.
        </p>
      </div>
    </div>

    <!-- CRUD UI -->
    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Form Section -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Person Details</h3>

          <div>
            <label class="block text-sm font-medium text-white mb-2">Surname</label>
            <input
              type="text"
              :value="newName"
              placeholder="Enter surname"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-white mb-2">First Name</label>
            <input
              type="text"
              :value="newName"
              placeholder="Enter first name"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400"
            />
          </div>

          <div class="flex gap-3">
            <button
              :disabled="!isCreateEnabled"
              class="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Create
            </button>
            <button
              :disabled="!isUpdateEnabled"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Update
            </button>
            <button
              :disabled="!isDeleteEnabled"
              class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- List Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">People List</h3>
          <div class="bg-slate-700 rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="bg-slate-600">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium text-white">Surname</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-white">First Name</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(name, index) in names"
                  :key="index"
                  class="border-b border-slate-600 hover:bg-slate-600 cursor-pointer transition-colors"
                >
                  <td class="px-4 py-3 text-sm text-white">{{ name.split(', ')[0] }}</td>
                  <td class="px-4 py-3 text-sm text-white">{{ name.split(', ')[1] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
