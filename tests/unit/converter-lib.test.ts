import { celsiusToFahrenheit, fahrenheitToCelsius } from '@/features/converter'

describe('Converter library', () => {
  describe('celsiusToFahrenheit', () => {
    it('converts 0°C to 32°F', () => {
      expect(celsiusToFahrenheit(0)).toBe(32)
    })

    it('converts 100°C to 212°F', () => {
      expect(celsiusToFahrenheit(100)).toBe(212)
    })

    it('converts -40°C to -40°F', () => {
      expect(celsiusToFahrenheit(-40)).toBe(-40)
    })

    it('converts 37°C to ~98.6°F', () => {
      expect(celsiusToFahrenheit(37)).toBeCloseTo(98.6, 1)
    })
  })

  describe('fahrenheitToCelsius', () => {
    it('converts 32°F to 0°C', () => {
      expect(fahrenheitToCelsius(32)).toBe(0)
    })

    it('converts 212°F to 100°C', () => {
      expect(fahrenheitToCelsius(212)).toBe(100)
    })

    it('converts -40°F to -40°C', () => {
      expect(fahrenheitToCelsius(-40)).toBe(-40)
    })

    it('converts 98.6°F to ~37°C', () => {
      expect(fahrenheitToCelsius(98.6)).toBeCloseTo(37, 1)
    })
  })
})
