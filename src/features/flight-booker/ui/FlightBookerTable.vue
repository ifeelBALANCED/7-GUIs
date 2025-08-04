<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

interface FlightDetails {
  startDate?: DateValue
  endDate?: DateValue
  tripType: 'one-way' | 'return'
}

defineProps<{
  flightDetails: FlightDetails
}>()

const formatDate = (date: DateValue) => {
  return date.toDate('UTC').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <Table class="w-full">
    <TableHeader>
      <TableRow class="border-b border-gray-600">
        <TableHead class="text-white font-medium">FLIGHT</TableHead>
        <TableHead class="text-white font-medium">DATE</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow class="border-b border-gray-600">
        <TableCell class="text-white">Traveling</TableCell>
        <TableCell class="text-white">
          {{ flightDetails.startDate ? formatDate(flightDetails.startDate) : 'N/A' }}
        </TableCell>
      </TableRow>
      <TableRow v-if="flightDetails.tripType === 'return' && flightDetails.endDate">
        <TableCell class="text-white">Return</TableCell>
        <TableCell class="text-white">
          {{ formatDate(flightDetails.endDate) }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
