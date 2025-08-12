import { converterModel } from '@/features/converter'
import { setupPiniaForTesting } from '../shared'

describe('useConverterStore', () => {
  setupPiniaForTesting()

  it('should initialize celsius to 0', () => {
    const converterStore = converterModel.useConverterStore()
    expect(converterStore.celsius).toBe(0)
  })

  it('should initialize fahrenheit to 32 when celsius is 0', () => {
    const converterStore = converterModel.useConverterStore()
    expect(converterStore.fahrenheit).toBe(32)
  })

  it('should convert celsius to fahrenheit', () => {
    const converterStore = converterModel.useConverterStore()
    converterStore.celsius = 100
    expect(converterStore.fahrenheit).toBe(212)
  })

  it('should convert fahrenheit to celsius', () => {
    const converterStore = converterModel.useConverterStore()
    converterStore.fahrenheit = 100
    expect(converterStore.celsius).toBe(37.78)
  })

  it('should coerce NaN celsius input to 0', () => {
    const converterStore = converterModel.useConverterStore()
    converterStore.celsius = Number.NaN
    expect(converterStore.celsius).toBe(0)
    expect(converterStore.fahrenheit).toBe(32)
  })

  it('should coerce NaN fahrenheit input to set celsius to 0 and report fahrenheit 32', () => {
    const converterStore = converterModel.useConverterStore()
    converterStore.fahrenheit = Number.NaN
    expect(converterStore.celsius).toBe(0)
    expect(converterStore.fahrenheit).toBe(32)
  })
})
