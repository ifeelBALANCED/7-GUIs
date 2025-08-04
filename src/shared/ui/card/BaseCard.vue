<script setup lang="ts">
import { cn } from '@/shared/lib/cn'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const classes = computed(() =>
  cn(
    'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
    props.class,
  ),
)
</script>

<template>
  <div data-slot="card" :class="classes">
    <slot />
  </div>
</template>
