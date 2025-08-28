<script setup lang="ts">
import { BaseLayout, TaskDescription } from '@/shared/ui'
import { CrudCard } from '@/features/crud'
</script>

<template>
  <BaseLayout current-task="CRUD">
    <TaskDescription
      :task-number="5"
      task-name="CRUD"
      challenge="Master-detail, CRUD, user input."
      description="The task is to build a frame containing the following elements: a textfield 'surname', a textfield 'first name', a button 'create', a button 'update', a button 'delete' and a list of persons. The list contains the columns 'surname' and 'first name'. When the user clicks on a person in the list the textfields are filled with the corresponding values. When the user clicks on 'create' the person is added to the list. When the user clicks on 'update' the person in the list is updated with the values from the textfields. When the user clicks on 'delete' the person is deleted from the list."
    />

    <CrudCard />
  </BaseLayout>
</template>
