<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../model'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

const counterStore = useCounterStore()
const { increment, reset } = counterStore
const { count } = storeToRefs(counterStore)
</script>

<template>
  <div class="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-md">
    <div class="space-y-4">
      <div>
        <label for="count" class="block text-sm font-medium text-white mb-2"> Count </label>
        <Input
          id="count"
          type="number"
          class="w-full px-3 py-2 text-center text-lg font-mono"
          v-model="count"
        />
      </div>

      <div class="flex gap-3">
        <Button @click="increment" class="flex-1"> Increment </Button>
        <Button variant="secondary" @click="reset" class="flex-1"> Reset </Button>
      </div>
    </div>
  </div>
</template>
