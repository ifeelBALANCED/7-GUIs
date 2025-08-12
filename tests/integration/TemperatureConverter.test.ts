import { mount, VueWrapper } from '@vue/test-utils'
import { TemperatureConverter, converterModel } from '@/features/converter'
import { createPinia, setActivePinia } from 'pinia'

describe('TemperatureConverter', () => {
  let pinia: ReturnType<typeof createPinia>
  let wrapper: VueWrapper<InstanceType<typeof TemperatureConverter>>
  let store: ReturnType<typeof converterModel.useConverterStore>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    wrapper = mount(TemperatureConverter, {
      global: {
        plugins: [pinia],
      },
    })

    store = converterModel.useConverterStore()
  })

  it('renders labels, icon, and initial values (0°C → 32°F)', () => {
    const cLabel = wrapper.get('[data-testid="celsius-label"]')
    const cInput = wrapper.get<HTMLInputElement>('[data-testid="celsius-input"]')
    const icon = wrapper.get('[data-testid="conversion-icon"]')
    const fLabel = wrapper.get('[data-testid="fahrenheit-label"]')
    const fInput = wrapper.get<HTMLInputElement>('[data-testid="fahrenheit-input"]')

    expect(cLabel.text()).toBe('Celsius')
    expect(cInput.element.value).toBe('0')

    expect(icon.isVisible()).toBe(true)

    expect(fLabel.text()).toBe('Fahrenheit')
    expect(fInput.element.value).toBe('32')
  })

  it('store initial state matches UI', () => {
    expect(store.celsius).toBe(0)
    expect(store.fahrenheit).toBe(32)
  })

  it('typing into Celsius input updates store.celsius and the Fahrenheit field', async () => {
    const cInput = wrapper.get<HTMLInputElement>('[data-testid="celsius-input"]')
    const fInput = wrapper.get<HTMLInputElement>('[data-testid="fahrenheit-input"]')

    await cInput.setValue('100')
    expect(store.celsius).toBe(100)
    expect(store.fahrenheit).toBeCloseTo(212)
    expect(fInput.element.value).toBe('212')
  })

  it('typing into Fahrenheit input updates store.fahrenheit and the Celsius field', async () => {
    const cInput = wrapper.get<HTMLInputElement>('[data-testid="celsius-input"]')
    const fInput = wrapper.get<HTMLInputElement>('[data-testid="fahrenheit-input"]')

    await fInput.setValue('68')
    expect(store.fahrenheit).toBe(68)
    expect(store.celsius).toBeCloseTo(20)
    expect(cInput.element.value).toBe('20')
  })

  it('handles negative values correctly (−40 ↔ −40)', async () => {
    const cInput = wrapper.get<HTMLInputElement>('[data-testid="celsius-input"]')
    const fInput = wrapper.get<HTMLInputElement>('[data-testid="fahrenheit-input"]')

    await cInput.setValue('-40')
    expect(store.fahrenheit).toBe(-40)
    expect(fInput.element.value).toBe('-40')

    await fInput.setValue('-40')
    expect(store.celsius).toBe(-40)
    expect(cInput.element.value).toBe('-40')
  })

  it('handles decimals properly (37°C → 98.6°F)', async () => {
    const cInput = wrapper.get<HTMLInputElement>('[data-testid="celsius-input"]')
    const fInput = wrapper.get<HTMLInputElement>('[data-testid="fahrenheit-input"]')

    await cInput.setValue('37')
    expect(store.fahrenheit).toBeCloseTo(98.6, 1)
    expect(parseFloat(fInput.element.value)).toBeCloseTo(98.6, 1)
  })
})
