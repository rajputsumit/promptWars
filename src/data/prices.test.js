import { describe, it, expect } from 'vitest'
import { PRICES, ingredientCost, formatQty } from './prices.js'

describe('ingredientCost', () => {
  it('prices per-kg ingredients by the gram', () => {
    // paneer ₹400/kg, 205 g -> ₹82
    expect(ingredientCost('paneer', 205, 'g')).toBeCloseTo(82, 1)
  })
  it('prices per-litre ingredients by the ml', () => {
    // buttermilk ₹40/l, 200 ml -> ₹8
    expect(ingredientCost('buttermilk', 200, 'ml')).toBeCloseTo(8, 2)
  })
  it('prices per-dozen ingredients by the piece', () => {
    // egg ₹84/dozen, 2 pc -> ₹14
    expect(ingredientCost('egg', 2, 'pc')).toBeCloseTo(14, 2)
  })
  it('prices per-piece ingredients directly', () => {
    // bread ₹3/pc, 2 pc -> ₹6
    expect(ingredientCost('bread', 2, 'pc')).toBe(6)
  })
  it('returns 0 for an unknown ingredient', () => {
    expect(ingredientCost('unobtainium', 100, 'g')).toBe(0)
  })
})

describe('price list integrity', () => {
  it('every entry has a label, numeric price and valid unit', () => {
    for (const [key, p] of Object.entries(PRICES)) {
      expect(p.label, key).toBeTruthy()
      expect(typeof p.inr, key).toBe('number')
      expect(['kg', 'l', 'dozen', 'pc'], key).toContain(p.per)
    }
  })
})

describe('formatQty', () => {
  it('rounds grams to the nearest 5 and switches to kg above 1000', () => {
    expect(formatQty(123, 'g')).toBe('125 g')
    expect(formatQty(1500, 'g')).toBe('1.5 kg')
  })
  it('rounds millilitres to the nearest 10', () => {
    expect(formatQty(205, 'ml')).toBe('210 ml')
  })
  it('rounds pieces to the nearest half', () => {
    expect(formatQty(2, 'pc')).toBe('2')
    expect(formatQty(1.6, 'pc')).toBe('1.5')
  })
})
