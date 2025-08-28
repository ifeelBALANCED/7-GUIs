<script setup lang="ts">
import { BaseLayout, TaskDescription } from '@/shared/ui'
import { FlightBookerCard } from '@/features/flight-booker'
</script>

<template>
  <BaseLayout current-task="Flight Booker">
    <TaskDescription
      :task-number="3"
      task-name="Flight Booker"
      challenge="Constraints, user input."
      description="The task is to build a frame containing a combobox 'type of flight' with the two options 'one-way flight' and 'return flight', two textfields representing the start and return date, respectively, and a button 'book'. For 'one-way flight' the return date textfield is disabled. When a date is entered in the start date textfield and it is not a valid date (e.g. 30/02/2007) the return date textfield is disabled. When a date is entered in the return date textfield and it is not a valid date or it is not strictly after the start date the button 'book' is disabled. When all inputs are valid the button 'book' is enabled and clicking it shows a message 'You have booked a [type] flight on [start date] [return date].' where the last part is omitted for one-way flights."
    />

    <FlightBookerCard />
  </BaseLayout>
</template>
