import { counterModel } from '@/features/counter'
import { setupPiniaForTesting } from '../shared'

describe('useCounterStore', () => {
  setupPiniaForTesting()

  it('should increment the count', () => {
    const counterStore = counterModel.useCounterStore()
    counterStore.increment()
    expect(counterStore.count).toBe(1)
  })

  it('should reset the count', () => {
    const counterStore = counterModel.useCounterStore()
    counterStore.reset()
    expect(counterStore.count).toBe(0)
  })
})