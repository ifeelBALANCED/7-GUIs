<script setup lang="ts">
import { ArrowRightLeft } from 'lucide-vue-next'
import { useConverterStore } from '../model'
import { storeToRefs } from 'pinia'
import { Input } from '@/shared/ui/input'

const converterStore = useConverterStore()
const { celsius, fahrenheit } = storeToRefs(converterStore)
</script>

<template>
  <div class="bg-slate-800 rounded-lg p-6 border border-slate-700 w-full">
    <div class="flex items-center gap-4">
      <div class="flex-1 space-y-2">
        <label for="celsius" class="block text-sm font-medium text-white"> Celsius </label>
        <Input id="celsius" type="number" v-model.number="celsius" placeholder="0" class="w-full" />
      </div>

      <div class="flex items-center justify-center pt-6">
        <ArrowRightLeft class="h-6 w-6 text-slate-400" />
      </div>

      <div class="flex-1 space-y-2">
        <label for="fahrenheit" class="block text-sm font-medium text-white"> Fahrenheit </label>
        <Input
          id="fahrenheit"
          type="number"
          v-model.number="fahrenheit"
          placeholder="0"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>
