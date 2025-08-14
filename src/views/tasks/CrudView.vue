<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'
import { CrudCard } from '@/features/crud'
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

      <Card class="bg-slate-800 border-slate-700">
        <CardContent class="pt-6 space-y-2 text-slate-300">
          <p><strong>Challenge:</strong> Master-detail, CRUD, user input.</p>
          <p>
            The task is to build a frame containing the following elements: a textfield "surname", a
            textfield "first name", a button "create", a button "update", a button "delete" and a
            list of persons. The list contains the columns "surname" and "first name". When the user
            clicks on a person in the list the textfields are filled with the corresponding values.
            When the user clicks on "create" the person is added to the list. When the user clicks
            on "update" the person in the list is updated with the values from the textfields. When
            the user clicks on "delete" the person is deleted from the list.
          </p>
        </CardContent>
      </Card>
    </div>

    <CrudCard />
  </BaseLayout>
</template>
