<script setup lang="ts">
import { BaseLayout, TaskDescription } from '@/shared/ui'
import { CounterInput } from '@/features/counter'
</script>

<template>
  <BaseLayout current-task="Counter">
    <TaskDescription
      :task-number="1"
      task-name="Counter"
      challenge="Understanding the basic ideas of a language/toolkit."
      description="The task is to build a frame containing a label or read-only textfield T and a button B. Initially, the value in T is '0' and each click of B increases the value in T by one."
    />

    <counter-input />
  </BaseLayout>
</template>
