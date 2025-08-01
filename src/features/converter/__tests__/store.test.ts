import { useConverterStore } from '../model'
import { setupPiniaForTesting } from '@/shared/test-utils'

describe('Converter Store', () => {
  setupPiniaForTesting()

  it('increments', () => {
    const converterStore = useConverterStore()
    expect(converterStore.celsius).toBe(0)
    converterStore.celsius = 10
    expect(converterStore.celsius).toBe(10)
  })

  it('increments by amount', () => {
    const converterStore = useConverterStore()
    converterStore.celsius = 10
    expect(converterStore.celsius).toBe(10)
  })
})
