import { calculateSizes } from './sizes'

describe('components/atom/SmartImg', () => {
  describe('calculateSizes', () => {
    it('handles min value correctly', () => {
      const result1 = calculateSizes({ min: 100 })
      expect(result1).toMatchSnapshot()

      const result2 = calculateSizes({ min: 1000 })
      expect(result2).toMatchSnapshot()

      const result3 = calculateSizes({ min: 4000 })
      expect(result3).toMatchSnapshot()
    })

    it('handles max value correctly', () => {
      const result1 = calculateSizes({ max: 100 })
      expect(result1).toMatchSnapshot()

      const result2 = calculateSizes({ max: 1280 })
      expect(result2).toMatchSnapshot()

      const result3 = calculateSizes({ max: 1800 })
      expect(result3).toMatchSnapshot()

      const result4 = calculateSizes({ max: 4000 })
      expect(result4).toMatchSnapshot()
    })

    it('handles min and max values correctly', () => {
      const result1 = calculateSizes({
        min: 0,
        max: 100,
      })
      expect(result1).toMatchSnapshot()

      const result2 = calculateSizes({
        min: 300,
        max: 1300,
      })
      expect(result2).toMatchSnapshot()

      const result3 = calculateSizes({
        min: 800,
        max: 4000,
      })
      expect(result3).toMatchSnapshot()
    })
  })
})
