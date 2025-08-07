<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Label } from '@/shared/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { DatePicker } from '@/shared/ui/date-picker'
import FlightBookerModal from './FlightBookerModal.vue'
import { useModal } from '@/shared/lib/composables'
import { useFlightBookerStore } from '../model'
import { getLocalTimeZone, today } from '@internationalized/date'

const flightBookerModal = useModal()
const flightBookerStore = useFlightBookerStore()

const { tripType, startDate, endDate, isBookEnabled, flightDetails, isOneWay } =
  storeToRefs(flightBookerStore)

function onFlightDetailsClose() {
  flightBookerStore.clearSelection()
  flightBookerModal.close()
}
</script>

<template>
  <div
    data-testid="flight-booker-card"
    class="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-md mx-auto"
  >
    <div class="space-y-4">
      <div>
        <Label
          for="flightType"
          data-testid="flight-type-label"
          class="block text-sm font-medium text-white mb-2"
          >Type of Flight</Label
        >
        <Select id="flightType" data-testid="flight-type-select" v-model="tripType">
          <SelectTrigger data-testid="flight-type-trigger" class="w-full bg-white text-gray-900">
            <SelectValue placeholder="Select flight type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="one-way">One-way flight</SelectItem>
              <SelectItem value="return">Return flight</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          for="startDate"
          data-testid="start-date-label"
          class="block text-sm font-medium text-white mb-2"
          >Start Date</Label
        >
        <DatePicker
          data-testid="start-date-picker"
          id="startDate"
          v-model="startDate"
          :min-value="today(getLocalTimeZone())"
        />
      </div>

      <div>
        <Label
          for="endDate"
          data-testid="end-date-label"
          class="block text-sm font-medium text-white mb-2"
          >Return Date</Label
        >
        <DatePicker
          data-testid="end-date-picker"
          id="endDate"
          v-model="endDate"
          :disabled="isOneWay || !startDate"
          :class="{ 'opacity-50': isOneWay || !startDate }"
          :min-value="startDate"
        />
      </div>

      <Button
        data-testid="book-button"
        class="w-full"
        :disabled="!isBookEnabled"
        @click="flightBookerModal.open"
        :class="{ 'opacity-50 cursor-not-allowed': !isBookEnabled }"
      >
        Book
      </Button>
    </div>

    <FlightBookerModal
      :is-open="flightBookerModal.isOpen.value"
      :flight-details="flightDetails"
      @close="onFlightDetailsClose"
    />
  </div>
</template>
