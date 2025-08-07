<script setup lang="ts">
import { ArrowRightLeft } from 'lucide-vue-next'
import { useConverterStore } from '../model'
import { storeToRefs } from 'pinia'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

const converterStore = useConverterStore()
const { celsius, fahrenheit } = storeToRefs(converterStore)
</script>

<template>
  <div
    data-testid="temperature-converter"
    class="bg-slate-800 rounded-lg p-6 border border-slate-700 w-full"
  >
    <div class="flex items-center gap-4">
      <div class="flex-1 space-y-2">
        <Label
          for="celsius"
          data-testid="celsius-label"
          class="block text-sm font-medium text-white"
        >
          Celsius
        </Label>
        <Input
          id="celsius"
          data-testid="celsius-input"
          type="number"
          v-model="celsius"
          placeholder="0"
          class="w-full"
        />
      </div>

      <div class="flex items-center justify-center pt-6">
        <ArrowRightLeft data-testid="conversion-icon" class="h-6 w-6 text-slate-400" />
      </div>

      <div class="flex-1 space-y-2">
        <Label
          for="fahrenheit"
          data-testid="fahrenheit-label"
          class="block text-sm font-medium text-white"
        >
          Fahrenheit
        </Label>
        <Input
          id="fahrenheit"
          data-testid="fahrenheit-input"
          type="number"
          v-model="fahrenheit"
          placeholder="0"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>
