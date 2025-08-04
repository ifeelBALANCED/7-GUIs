<script setup lang="ts">
import { computed } from 'vue'
import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import type { CalendarRootProps } from 'reka-ui'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

const props = defineProps<{
  modelValue?: DateValue
  disabled?: boolean
  minValue?: CalendarRootProps['minValue']
  maxValue?: CalendarRootProps['maxValue']
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: DateValue): void
}>()

const datePickerValue = computed<DateValue | undefined>({
  get: () => props.modelValue,
  set: (v) => v && emit('update:modelValue', v),
})

const df = new DateFormatter('en-US', { dateStyle: 'long' })
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :disabled="props.disabled"
        :class="
          cn(
            'w-full justify-start text-left font-normal bg-white text-gray-900 border-gray-300 hover:bg-gray-50',
            !datePickerValue && 'text-gray-500',
            props.disabled && 'opacity-50 cursor-not-allowed',
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span v-if="datePickerValue">
          {{ df.format(datePickerValue.toDate(getLocalTimeZone())) }}
        </span>
        <span v-else>Pick a date</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0 bg-white">
      <Calendar
        v-model="datePickerValue"
        initial-focus
        :min-value="props.minValue"
        :max-value="props.maxValue"
      />
    </PopoverContent>
  </Popover>
</template>
