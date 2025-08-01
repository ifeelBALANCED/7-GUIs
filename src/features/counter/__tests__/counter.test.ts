import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue'
import { CounterInput } from '../ui'
import { useCounterStore } from '../model'

vi.mock('@/shared/ui/input', () => ({
  Input: {
    name: 'Input',
    template:
      '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
    props: ['modelValue'],
    emits: ['update:modelValue'],
  },
}))

vi.mock('@/shared/ui/button', () => ({
  Button: {
    name: 'Button',
    template: '<button @click="$emit(\'click\')"><slot /></button>',
    props: ['variant'],
    emits: ['click'],
  },
}))

describe('Counter Feature Integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('complete counter workflow', () => {
    it('should handle complete increment and reset workflow', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      expect(counterStore.count).toBe(0)

      const [incrementButton] = wrapper.findAllComponents({ name: 'Button' })
      await incrementButton.trigger('click')
      await incrementButton.trigger('click')
      await incrementButton.trigger('click')

      expect(counterStore.count).toBe(3)

      const resetButton = wrapper.findAllComponents({ name: 'Button' })[1]
      await resetButton.trigger('click')

      expect(counterStore.count).toBe(0)

      await incrementButton.trigger('click')
      expect(counterStore.count).toBe(1)
    })

    it('should maintain state consistency between store and component', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      counterStore.increment()
      counterStore.increment()
      await nextTick()

      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props('modelValue')).toBe(2)

      const incrementButton = wrapper.findAllComponents({ name: 'Button' })[0]
      await incrementButton.trigger('click')

      expect(counterStore.count).toBe(3)
    })
  })

  describe('store and component synchronization', () => {
    it('should sync input value with store count', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const input = wrapper.findComponent({ name: 'Input' })

      await input.vm.$emit('update:modelValue', 25)

      expect(counterStore.count).toBe(25)

      counterStore.count = 100
      await nextTick()

      expect(input.props('modelValue')).toBe(100)
    })

    it('should handle edge cases in value synchronization', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const input = wrapper.findComponent({ name: 'Input' })

      await input.vm.$emit('update:modelValue', -5)
      expect(counterStore.count).toBe(-5)

      await input.vm.$emit('update:modelValue', 0)
      expect(counterStore.count).toBe(0)

      await input.vm.$emit('update:modelValue', 999999)
      expect(counterStore.count).toBe(999999)
    })
  })

  describe('multiple component instances', () => {
    it('should share state between multiple component instances', async () => {
      const counterStore = useCounterStore()
      const wrapper1 = mount(CounterInput)
      const wrapper2 = mount(CounterInput)

      const incrementButton1 = wrapper1.findAllComponents({ name: 'Button' })[0]
      await incrementButton1.trigger('click')
      await incrementButton1.trigger('click')

      expect(counterStore.count).toBe(2)

      const input2 = wrapper2.findComponent({ name: 'Input' })
      expect(input2.props('modelValue')).toBe(2)

      const resetButton2 = wrapper2.findAllComponents({ name: 'Button' })[1]
      await resetButton2.trigger('click')

      const input1 = wrapper1.findComponent({ name: 'Input' })
      expect(input1.props('modelValue')).toBe(0)
      expect(counterStore.count).toBe(0)
    })
  })

  describe('error handling and edge cases', () => {
    it('should handle invalid input values gracefully', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const input = wrapper.findComponent({ name: 'Input' })

      await input.vm.$emit('update:modelValue', 0)
      expect(counterStore.count).toBe(0)

      await input.vm.$emit('update:modelValue', +'abc')
      expect(counterStore.count).toBe(NaN)
    })

    it('should handle rapid state changes without breaking', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const [incrementButton, resetButton] = wrapper.findAllComponents({ name: 'Button' })

      const promises = []
      for (let i = 0; i < 10; i++) {
        promises.push(incrementButton.trigger('click'))
        promises.push(resetButton.trigger('click'))
      }

      await Promise.all(promises)

      expect(counterStore.count).toBe(0)
    })
  })

  describe('performance and reactivity', () => {
    it('should maintain reactivity under load', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const incrementButton = wrapper.findAllComponents({ name: 'Button' })[0]

      const operations = []
      for (let i = 0; i < 50; i++) {
        operations.push(incrementButton.trigger('click'))
      }

      await Promise.all(operations)

      expect(counterStore.count).toBe(50)

      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props('modelValue')).toBe(50)
    })

    it('should handle store state mutations correctly', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      counterStore.count = 42
      await nextTick()

      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props('modelValue')).toBe(42)

      const incrementButton = wrapper.findAllComponents({ name: 'Button' })[0]
      await incrementButton.trigger('click')

      expect(counterStore.count).toBe(43)
    })
  })
})
