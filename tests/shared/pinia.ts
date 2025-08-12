import { createPinia, setActivePinia } from 'pinia'

export const setupPiniaForTesting = () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
}
