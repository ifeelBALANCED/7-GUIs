import { mount, VueWrapper } from '@vue/test-utils'
import { FlightBookerCard, flightBookerModel } from '@/features/flight-booker'
import { createPinia, setActivePinia } from 'pinia'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'

describe('FlightBookerCard', () => {
  let pinia: ReturnType<typeof createPinia>
  let wrapper: VueWrapper<InstanceType<typeof FlightBookerCard>>
  let store: ReturnType<typeof flightBookerModel.useFlightBookerStore>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    wrapper = mount(FlightBookerCard, {
      global: {
        plugins: [pinia],
      },
    })

    store = flightBookerModel.useFlightBookerStore()
  })

  it('renders labels and initial disabled book button', () => {
    const card = wrapper.get('[data-testid="flight-booker-card"]')
    const typeLabel = wrapper.get('[data-testid="flight-type-label"]')
    const startLabel = wrapper.get('[data-testid="start-date-label"]')
    const endLabel = wrapper.get('[data-testid="end-date-label"]')
    const bookBtn = wrapper.get('[data-testid="book-button"]')

    expect(card.isVisible()).toBe(true)
    expect(typeLabel.text()).toBe('Type of Flight')
    expect(startLabel.text()).toBe('Start Date')
    expect(endLabel.text()).toBe('Return Date')
    expect(bookBtn.attributes('disabled')).toBeDefined()
  })

  it('one-way: enabling book by selecting start date', async () => {
    expect(store.tripType).toBe('one-way')

    store.startDate = today(getLocalTimeZone())
    await wrapper.vm.$nextTick()

    const bookBtn = wrapper.get('[data-testid="book-button"]')
    expect(bookBtn.attributes('disabled')).toBeUndefined()
  })

  it('return trip: requires both dates; toggling disables/enables end picker', async () => {
    store.tripType = 'return'
    await wrapper.vm.$nextTick()

    const triggers = wrapper.findAll('[data-slot="popover-trigger"]')
    const endTrigger = triggers[1]
    expect(endTrigger.classes()).toContain('opacity-50')

    const d1: DateValue = today(getLocalTimeZone())
    store.startDate = d1
    await wrapper.vm.$nextTick()

    expect(endTrigger.classes()).not.toContain('opacity-50')

    const d2: DateValue = today(getLocalTimeZone())
    store.endDate = d2
    await wrapper.vm.$nextTick()

    const bookBtn = wrapper.get('[data-testid="book-button"]')
    expect(bookBtn.attributes('disabled')).toBeUndefined()
  })

  it('opens modal with table when booking, then closes and resets state', async () => {
    store.tripType = 'return'
    store.startDate = today(getLocalTimeZone())
    store.endDate = today(getLocalTimeZone())
    await wrapper.vm.$nextTick()

    const bookBtn = wrapper.get('[data-testid="book-button"]')
    await bookBtn.trigger('click')
    await wrapper.vm.$nextTick()

    const tableEl = document.querySelector('[data-testid="flight-booker-table"]')
    if (!tableEl) throw new Error('table not found')

    const closeBtnEl = document.querySelector(
      '[data-testid="modal-close-button"]',
    ) as HTMLElement | null
    if (!closeBtnEl) throw new Error('close button not found')
    await closeBtnEl.click()

    await wrapper.vm.$nextTick()
    expect(store.tripType).toBe('one-way')
    expect(store.startDate).toBeUndefined()
    expect(store.endDate).toBeUndefined()
  })
})
