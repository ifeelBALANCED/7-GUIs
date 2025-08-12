import { flightBookerModel } from '@/features/flight-booker'
import { setupPiniaForTesting } from '../shared'
import { getLocalTimeZone, today } from '@internationalized/date'

describe('useFlightBookerStore', () => {
  setupPiniaForTesting()

  it('initializes with defaults', () => {
    const store = flightBookerModel.useFlightBookerStore()

    expect(store.tripType).toBe('one-way')
    expect(store.startDate).toBeUndefined()
    expect(store.endDate).toBeUndefined()
    expect(store.isOneWay).toBe(true)
    expect(store.isReturn).toBe(false)
    expect(store.isBookEnabled).toBe(false)
    expect(store.flightDetails).toEqual({
      tripType: 'one-way',
      startDate: undefined,
      endDate: undefined,
    })
  })

  it('enables booking for one-way when start date is set', () => {
    const store = flightBookerModel.useFlightBookerStore()

    const d = today(getLocalTimeZone())
    store.startDate = d

    expect(store.isOneWay).toBe(true)
    expect(store.isReturn).toBe(false)
    expect(store.isBookEnabled).toBe(true)
    expect(store.flightDetails).toEqual({ tripType: 'one-way', startDate: d, endDate: undefined })
  })

  it('requires both start and end dates for return trips', () => {
    const store = flightBookerModel.useFlightBookerStore()

    store.tripType = 'return'
    expect(store.isOneWay).toBe(false)
    expect(store.isReturn).toBe(true)
    expect(store.isBookEnabled).toBe(false)

    const d1 = today(getLocalTimeZone())
    store.startDate = d1
    expect(store.isBookEnabled).toBe(false)

    const d2 = today(getLocalTimeZone())
    store.endDate = d2
    expect(store.isBookEnabled).toBe(true)

    expect(store.flightDetails).toEqual({ tripType: 'return', startDate: d1, endDate: d2 })
  })

  it('does not enable booking if only end date is set (no start date)', () => {
    const store = flightBookerModel.useFlightBookerStore()

    store.tripType = 'return'
    const d2 = today(getLocalTimeZone())
    store.endDate = d2

    expect(store.startDate).toBeUndefined()
    expect(store.isBookEnabled).toBe(false)
  })

  it('switching trip type updates computed flags and enablement', () => {
    const store = flightBookerModel.useFlightBookerStore()

    const d1 = today(getLocalTimeZone())
    const d2 = today(getLocalTimeZone())
    store.tripType = 'return'
    store.startDate = d1
    store.endDate = d2

    expect(store.isReturn).toBe(true)
    expect(store.isBookEnabled).toBe(true)

    store.tripType = 'one-way'
    expect(store.isOneWay).toBe(true)
    expect(store.isBookEnabled).toBe(true)

    store.startDate = undefined
    expect(store.isBookEnabled).toBe(false)
  })

  it('clearSelection resets dates and trip type', () => {
    const store = flightBookerModel.useFlightBookerStore()

    store.tripType = 'return'
    store.startDate = today(getLocalTimeZone())
    store.endDate = today(getLocalTimeZone())

    store.clearSelection()

    expect(store.tripType).toBe('one-way')
    expect(store.startDate).toBeUndefined()
    expect(store.endDate).toBeUndefined()
    expect(store.isOneWay).toBe(true)
    expect(store.isReturn).toBe(false)
    expect(store.isBookEnabled).toBe(false)
    expect(store.flightDetails).toEqual({
      tripType: 'one-way',
      startDate: undefined,
      endDate: undefined,
    })
  })
})
