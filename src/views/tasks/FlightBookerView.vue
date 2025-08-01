<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink } from 'lucide-vue-next'
import { BaseLayout } from '@/shared/ui/layouts'

// This would be the actual flight booking logic, but we're only implementing UI
const tripType = 'one-way'
const departureDate = ''
const returnDate = ''
const isBookEnabled = false
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

    <!-- Flight Booker UI -->
    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-md">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white mb-2">Type of Flight</label>
          <select
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
          >
            <option value="one-way">One-way flight</option>
            <option value="return">Return flight</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-2">Start Date</label>
          <input
            type="date"
            :value="departureDate"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-2">Return Date</label>
          <input
            type="date"
            :value="returnDate"
            :disabled="tripType === 'one-way'"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          :disabled="!isBookEnabled"
          class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Book
        </button>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers */
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
