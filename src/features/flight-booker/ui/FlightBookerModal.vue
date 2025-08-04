<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import FlightBookerTable from './FlightBookerTable.vue'

interface FlightDetails {
  startDate?: DateValue
  endDate?: DateValue
  tripType: 'one-way' | 'return'
}

defineProps<{
  isOpen: boolean
  flightDetails: FlightDetails
}>()

const emit = defineEmits<{
  close: []
}>()

function handleClose() {
  emit('close')
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleClose">
    <DialogContent class="bg-slate-800 border-slate-700 text-white max-w-md">
      <DialogHeader>
        <DialogTitle class="text-white font-bold">Flight Booker</DialogTitle>
      </DialogHeader>

      <div class="space-y-4">
        <p class="text-white">Your flight has been booked:</p>

        <FlightBookerTable :flight-details="flightDetails" />

        <div class="text-center">
          <button class="text-white underline hover:text-gray-300">Flight details</button>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <Button @click="handleClose" class="bg-emerald-400 text-gray-900 hover:bg-emerald-300">
          Close
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
