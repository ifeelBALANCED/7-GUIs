import type { DateValue } from '@internationalized/date'

export const formatDate = (date: DateValue) => {
  return date.toDate('UTC').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
