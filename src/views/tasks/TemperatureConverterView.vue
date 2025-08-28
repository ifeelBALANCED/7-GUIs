<script setup lang="ts">
import { BaseLayout, TaskDescription } from '@/shared/ui'
import { TemperatureConverter } from '@/features/converter'
</script>

<template>
  <BaseLayout current-task="Temperature Converter">
    <TaskDescription
      :task-number="2"
      task-name="Temperature Converter"
      challenge="Bidirectional data flow, user input."
      description="The task is to build a frame containing two textfields TC and TF representing the temperature in Celsius and Fahrenheit, respectively. Initially, both TC and TF are empty. When the user enters a numerical value into TC the corresponding value in TF is automatically updated and vice versa. When the user enters a non-numerical string into TC the value in TF is not updated and vice versa. The formula for converting a temperature C in Celsius into a temperature F in Fahrenheit is C = (F - 32) * (5/9) and the dual direction is F = C * (9/5) + 32."
    />

    <TemperatureConverter />
  </BaseLayout>
</template>
