import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import CounterInput from '../CounterInput.vue'
import { useCounterStore } from '../../model'
import { setupPiniaForTesting } from '@/shared/test-utils'

describe('CounterInput', () => {
  setupPiniaForTesting()

  describe('rendering', () => {
    it('should render component with input and buttons', () => {
      const wrapper = mount(CounterInput)

      expect(wrapper.find('input[type="number"]').exists()).toBe(true)
      expect(wrapper.findAll('button')).toHaveLength(2)
      expect(wrapper.text()).toContain('Increment')
      expect(wrapper.text()).toContain('Reset')
    })
  })

  describe('user interactions', () => {
    it('should increment count when increment button is clicked', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const incrementButton = wrapper.find('button:first-child')
      await incrementButton.trigger('click')

      expect(counterStore.count).toBe(1)
    })

    it('should reset count when reset button is clicked', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      counterStore.increment()
      counterStore.increment()
      const resetButton = wrapper.find('button:last-child')
      await resetButton.trigger('click')

      expect(counterStore.count).toBe(0)
    })

    it('should update store when input value changes', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const input = wrapper.find('input[type="number"]')
      await input.setValue(42)

      expect(counterStore.count).toBe(42)
    })
  })

  describe('store integration', () => {
    it('should display current count from store', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      counterStore.increment()
      counterStore.increment()
      await nextTick()

      const input = wrapper.find('input[type="number"]')
      expect((input.element as HTMLInputElement).value).toBe('2')
    })
  })
})
