<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'
import { FlightBookerCard } from '@/features/flight-booker'
</script>

<template>
  <BaseLayout>
    <template #header>
      <nav class="text-sm">
        <RouterLink to="/" class="text-white hover:text-teal-200 transition-colors"
          >Home</RouterLink
        >
        <span class="mx-2 text-white">/</span>
        <span class="text-teal-200">Flight Booker</span>
      </nav>
    </template>

    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">
        Third task of
        <a
          href="https://eugenkiss.github.io/7guis/"
          class="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
        >
          The 7 Tasks from 7GUIs
          <ExternalLink class="w-4 h-4" />
        </a>
      </h2>

      <div class="bg-slate-800 rounded-lg p-4 mt-4">
        <p class="text-slate-300 mb-2"><strong>Challenge:</strong> Constraints, user input.</p>
        <p class="text-slate-300">
          The task is to build a frame containing a combobox "type of flight" with the two options
          "one-way flight" and "return flight", two textfields representing the start and return
          date, respectively, and a button "book". For "one-way flight" the return date textfield is
          disabled. When a date is entered in the start date textfield and it is not a valid date
          (e.g. 30/02/2007) the return date textfield is disabled. When a date is entered in the
          return date textfield and it is not a valid date or it is not strictly after the start
          date the button "book" is disabled. When all inputs are valid the button "book" is enabled
          and clicking it shows a message "You have booked a [type] flight on [start date] [return
          date]." where the last part is omitted for one-way flights.
        </p>
      </div>
    </div>

    <FlightBookerCard />
  </BaseLayout>
</template>
