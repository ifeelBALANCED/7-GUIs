import { celsiusToFahrenheit, fahrenheitToCelsius } from '../lib'

describe('celsiusToFahrenheit', () => {
  it('should convert 0°C to 32°F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
  })

  it('should convert 100°C to 212°F', () => {
    expect(celsiusToFahrenheit(100)).toBe(212)
  })

  it('should convert -40°C to -40°F', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40)
  })

  it('should convert 37°C to 98.6°F', () => {
    expect(celsiusToFahrenheit(37)).toBeCloseTo(98.6, 1)
  })
})

describe('fahrenheitToCelsius', () => {
  it('should convert 32°F to 0°C', () => {
    expect(fahrenheitToCelsius(32)).toBe(0)
  })

  it('should convert 212°F to 100°C', () => {
    expect(fahrenheitToCelsius(212)).toBe(100)
  })

  it('should convert -40°F to -40°C', () => {
    expect(fahrenheitToCelsius(-40)).toBe(-40)
  })

  it('should convert 98.6°F to 37°C', () => {
    expect(fahrenheitToCelsius(98.6)).toBeCloseTo(37, 1)
  })
})
