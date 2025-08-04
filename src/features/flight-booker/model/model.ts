import type { DateValue } from '@internationalized/date'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFlightBookerStore = defineStore('flight-booker', () => {
  const tripType = ref<'one-way' | 'return'>('one-way')
  const startDate = ref<DateValue>()
  const endDate = ref<DateValue>()

  const isOneWay = computed(() => tripType.value === 'one-way')
  const isReturn = computed(() => tripType.value === 'return')

  const isBookEnabled = computed(
    () => startDate.value && (isOneWay.value || (isReturn.value && endDate.value)),
  )

  const flightDetails = computed(() => ({
    tripType: tripType.value,
    startDate: startDate.value,
    endDate: endDate.value,
  }))

  const clearSelection = () => {
    startDate.value = undefined
    endDate.value = undefined
    tripType.value = 'one-way'
  }

  return {
    tripType,
    startDate,
    endDate,
    isBookEnabled,
    flightDetails,
    isOneWay,
    isReturn,
    clearSelection,
  }
})
