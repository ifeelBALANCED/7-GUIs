import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { celsiusToFahrenheit, fahrenheitToCelsius } from '../lib'

export const useConverterStore = defineStore('converter', () => {
  const celsius = ref(0)
  const fahrenheit = computed({
    get() {
      const c = celsius.value

      if (isNaN(c)) {
        return 0
      }

      return parseFloat(celsiusToFahrenheit(c).toFixed(2))
    },
    set(f) {
      if (isNaN(f)) {
        celsius.value = 0
      }

      celsius.value = parseFloat(fahrenheitToCelsius(f).toFixed(2))
    },
  })

  return { celsius, fahrenheit }
})
