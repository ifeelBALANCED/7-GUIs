import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TemperatureConverter from '../TemperatureConverter.vue'
import { useConverterStore } from '../../model'
import { setupPiniaForTesting } from '@/shared/test-utils'

describe('TemperatureConverter', () => {
  setupPiniaForTesting()

  describe('rendering', () => {
    it('should render component with celsius and fahrenheit inputs', () => {
      const wrapper = mount(TemperatureConverter)

      expect(wrapper.find('input[id="celsius"]').exists()).toBe(true)
      expect(wrapper.find('input[id="fahrenheit"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('Celsius')
      expect(wrapper.text()).toContain('Fahrenheit')
    })
  })

  describe('store integration', () => {
    it('should initialize with store values', () => {
      const wrapper = mount(TemperatureConverter)

      const celsiusInput = wrapper.find('input[id="celsius"]')
      const fahrenheitInput = wrapper.find('input[id="fahrenheit"]')

      expect((celsiusInput.element as HTMLInputElement).value).toBe('0')
      expect((fahrenheitInput.element as HTMLInputElement).value).toBe('32')
    })

    it('should update when store values change', async () => {
      const converterStore = useConverterStore()
      const wrapper = mount(TemperatureConverter)

      converterStore.celsius = 100
      await nextTick()

      const celsiusInput = wrapper.find('input[id="celsius"]')
      const fahrenheitInput = wrapper.find('input[id="fahrenheit"]')

      expect((celsiusInput.element as HTMLInputElement).value).toBe('100')
      expect((fahrenheitInput.element as HTMLInputElement).value).toBe('212')
    })
  })

  describe('user interactions', () => {
    it('should update celsius when celsius input changes', async () => {
      const converterStore = useConverterStore()
      const wrapper = mount(TemperatureConverter)

      const celsiusInput = wrapper.find('input[id="celsius"]')
      await celsiusInput.setValue(25)

      expect(converterStore.celsius).toBe(25)
      expect(converterStore.fahrenheit).toBeCloseTo(77, 1)
    })

    it('should update fahrenheit when fahrenheit input changes', async () => {
      const converterStore = useConverterStore()
      const wrapper = mount(TemperatureConverter)

      const fahrenheitInput = wrapper.find('input[id="fahrenheit"]')
      await fahrenheitInput.setValue(98.6)

      expect(converterStore.fahrenheit).toBe(98.6)
      expect(converterStore.celsius).toBeCloseTo(37, 1)
    })
  })

  describe('conversion accuracy', () => {
    it('should convert 0°C to 32°F', async () => {
      const converterStore = useConverterStore()
      const wrapper = mount(TemperatureConverter)

      const celsiusInput = wrapper.find('input[id="celsius"]')
      await celsiusInput.setValue(0)

      expect(converterStore.fahrenheit).toBe(32)
    })

    it('should convert 100°C to 212°F', async () => {
      const converterStore = useConverterStore()
      const wrapper = mount(TemperatureConverter)

      const celsiusInput = wrapper.find('input[id="celsius"]')
      await celsiusInput.setValue(100)

      expect(converterStore.fahrenheit).toBe(212)
    })

    it('should convert 32°F to 0°C', async () => {
      const converterStore = useConverterStore()
      const wrapper = mount(TemperatureConverter)

      const fahrenheitInput = wrapper.find('input[id="fahrenheit"]')
      await fahrenheitInput.setValue(32)

      expect(converterStore.celsius).toBe(0)
    })
  })

  describe('edge cases', () => {
    it('should handle empty input gracefully', async () => {
      const converterStore = useConverterStore()
      const wrapper = mount(TemperatureConverter)

      const celsiusInput = wrapper.find('input[id="celsius"]')
      await celsiusInput.setValue('')

      expect(converterStore.fahrenheit).toBe(32)
    })

    it('should handle invalid input gracefully', async () => {
      const converterStore = useConverterStore()
      const wrapper = mount(TemperatureConverter)

      const celsiusInput = wrapper.find('input[id="celsius"]')
      await celsiusInput.setValue('abc')

      expect(converterStore.fahrenheit).toBe(32)
    })
  })

  describe('accessibility', () => {
    it('should have proper label associations', () => {
      const wrapper = mount(TemperatureConverter)

      const celsiusLabel = wrapper.find('label[for="celsius"]')
      const fahrenheitLabel = wrapper.find('label[for="fahrenheit"]')
      const celsiusInput = wrapper.find('input[id="celsius"]')
      const fahrenheitInput = wrapper.find('input[id="fahrenheit"]')

      expect(celsiusLabel.exists()).toBe(true)
      expect(fahrenheitLabel.exists()).toBe(true)
      expect(celsiusInput.exists()).toBe(true)
      expect(fahrenheitInput.exists()).toBe(true)
    })
  })
})
