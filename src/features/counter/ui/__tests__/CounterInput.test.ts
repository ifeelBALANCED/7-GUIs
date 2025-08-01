import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue'
import CounterInput from '../CounterInput.vue'
import { useCounterStore } from '../../model'

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

describe('CounterInput', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('rendering', () => {
    it('should render component with input and buttons', () => {
      const wrapper = mount(CounterInput)

      expect(wrapper.findComponent({ name: 'Input' }).exists()).toBe(true)
      expect(wrapper.findAllComponents({ name: 'Button' })).toHaveLength(2)
    })
  })

  describe('store integration', () => {
    it('should initialize with store count value', () => {
      const wrapper = mount(CounterInput)
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props('modelValue')).toBe(0)
    })

    it('should update when store count changes', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      counterStore.increment()
      await nextTick()

      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props('modelValue')).toBe(1)
    })
  })

  describe('user interactions', () => {
    it('should increment count when increment button is clicked', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const incrementButton = wrapper.findAllComponents({ name: 'Button' })[0]
      await incrementButton.trigger('click')

      expect(counterStore.count).toBe(1)
    })

    it('should reset count when reset button is clicked', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      counterStore.increment()
      counterStore.increment()
      const resetButton = wrapper.findAllComponents({ name: 'Button' })[1]
      await resetButton.trigger('click')

      expect(counterStore.count).toBe(0)
    })

    it('should allow direct input value changes', async () => {
      const counterStore = useCounterStore()
      const wrapper = mount(CounterInput)

      const input = wrapper.findComponent({ name: 'Input' })
      await input.vm.$emit('update:modelValue', 42)

      expect(counterStore.count).toBe(42)
    })
  })
})
