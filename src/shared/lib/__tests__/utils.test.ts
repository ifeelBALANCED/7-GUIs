import { describe, it, expect } from 'vitest'
import { toTitleCase } from '../utils'

describe('Unit Test Example', () => {
  it('should convert string to title case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World')
    expect(toTitleCase('vue.js framework')).toBe('Vue.js Framework')
  })
})
