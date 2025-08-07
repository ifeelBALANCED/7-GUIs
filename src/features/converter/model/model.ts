import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { celsiusToFahrenheit, fahrenheitToCelsius } from '../lib'

export const useConverterStore = defineStore('converter', () => {
  const _celsius = ref(0)

  const celsius = computed({
    get() {
      return _celsius.value
    },
    set(value: number) {
      if (isNaN(value)) {
        _celsius.value = 0
      } else {
        _celsius.value = value
      }
    },
  })

  const fahrenheit = computed({
    get() {
      const c = celsius.value

      if (isNaN(c)) {
        return 32
      }

      return parseFloat(celsiusToFahrenheit(c).toFixed(2))
    },
    set(f) {
      if (isNaN(f)) {
        celsius.value = 0
        return
      }

      celsius.value = parseFloat(fahrenheitToCelsius(f).toFixed(2))
    },
  })

  return { celsius, fahrenheit }
})
