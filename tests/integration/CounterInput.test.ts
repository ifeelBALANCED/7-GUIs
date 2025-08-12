import { mount, VueWrapper } from '@vue/test-utils'
import { CounterInput, counterModel } from '@/features/counter'
import { createPinia, setActivePinia } from 'pinia'

describe('CounterInput', () => {
  let pinia: ReturnType<typeof createPinia>
  let wrapper: VueWrapper<InstanceType<typeof CounterInput>>
  let store: ReturnType<typeof counterModel.useCounterStore>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    wrapper = mount(CounterInput, {
      global: {
        plugins: [pinia],
      },
    })

    store = counterModel.useCounterStore()
  })

  it('renders label and input with initial value 0', () => {
    const label = wrapper.get('[data-testid="count-label"]')
    const input = wrapper.get<HTMLInputElement>('[data-testid="count-input"]')

    expect(label.text()).toBe('Count')
    expect(input.element.value).toBe('0')
  })

  it('Clicking "Increment" updates store and value', async () => {
    const incButton = wrapper.get('[data-testid="increment-button"]')
    const input = wrapper.get<HTMLInputElement>('[data-testid="count-input"]')

    expect(store.count).toBe(0)

    await incButton.trigger('click')
    await incButton.trigger('click')

    expect(store.count).toBe(2)
    expect(input.element.value).toBe('2')
  })

  it('clicking “Reset” zeroes out store and input', async () => {
    store.count = 10

    await wrapper.vm.$nextTick()

    const resetButton = wrapper.get('[data-testid="reset-button"]')
    const input = wrapper.get<HTMLInputElement>('[data-testid="count-input"]')

    await resetButton.trigger('click')

    expect(store.count).toBe(0)
    expect(input.element.value).toBe('0')
  })

  it('typing into the input updates the reactive store via v-model', async () => {
    const input = wrapper.get<HTMLInputElement>('[data-testid="count-input"]')

    await input.setValue(42)

    expect(store.count).toBe(42)
  })

  it('increment after manual input uses the newly typed value', async () => {
    const incrementButton = wrapper.get('[data-testid="increment-button"]')
    const input = wrapper.get<HTMLInputElement>('[data-testid="count-input"]')

    await input.setValue(42)

    await incrementButton.trigger('click')

    expect(store.count).toBe(43)
    expect(input.element.value).toBe('43')
  })
})
