import { formatDate } from '@/features/flight-booker'
import { CalendarDate } from '@internationalized/date'

describe('FlightBooker library', () => {
  it('formats a date to "Month Day, Year"', () => {
    const date = new CalendarDate(2024, 6, 1)
    expect(formatDate(date)).toBe('June 1, 2024')
  })

  it('respects en-US locale and UTC normalization', () => {
    const date = new CalendarDate(1999, 12, 31)
    expect(formatDate(date)).toBe('December 31, 1999')
  })

  it('handles single-digit days and months without leading zeros', () => {
    const date = new CalendarDate(2025, 1, 5)
    expect(formatDate(date)).toBe('January 5, 2025')
  })
})
