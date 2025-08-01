import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../model'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should initialize with count as 0', () => {
      const counterStore = useCounterStore()
      expect(counterStore.count).toBe(0)
    })
  })

  describe('increment function', () => {
    it('should increment count by 1', () => {
      const counterStore = useCounterStore()
      counterStore.increment()
      expect(counterStore.count).toBe(1)
    })

    it('should increment multiple times correctly', () => {
      const counterStore = useCounterStore()
      counterStore.increment()
      counterStore.increment()
      counterStore.increment()
      expect(counterStore.count).toBe(3)
    })
  })

  describe('reset function', () => {
    it('should reset count to 0', () => {
      const counterStore = useCounterStore()
      counterStore.increment()
      counterStore.increment()
      counterStore.reset()
      expect(counterStore.count).toBe(0)
    })
  })
})
