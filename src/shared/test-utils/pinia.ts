import { setActivePinia, createPinia } from 'pinia'
import { beforeEach } from 'vitest'

/**
 * Test utility for Pinia store tests
 * Provides proper setup for testing Pinia stores
 */
export const setupPiniaForTesting = () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
}

/**
 * Create a fresh Pinia instance for testing
 * Useful when you need a custom Pinia instance
 */
export const createTestPinia = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}
