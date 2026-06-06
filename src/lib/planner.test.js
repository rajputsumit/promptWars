import { describe, it, expect } from 'vitest'
import { buildPlan, mealCost, budgetFeasibility } from './planner.js'
import { MEALS } from '../data/meals.js'

const base = {
  heightCm: 178, weightKg: 75, age: 27, sex: 'male',
  activity: 'moderate', goal: 'maintain', diet: 'veg', budget: 300,
}

describe('mealCost', () => {
  it('scales linearly with portion size', () => {
    const meal = MEALS[0]
    expect(mealCost(meal, 2)).toBeCloseTo(mealCost(meal, 1) * 2, 5)
  })
})

describe('buildPlan — portion scaling', () => {
  it('lands the day total within 5% of the calorie target', () => {
    const plan = buildPlan(base)
    const gap = Math.abs(plan.totals.kcal - plan.targets.kcal) / plan.targets.kcal
    expect(gap).toBeLessThan(0.05)
  })

  it('hits the target for a very high calorie need too', () => {
    const plan = buildPlan({ ...base, activity: 'active', goal: 'gain', budget: 600 })
    const gap = Math.abs(plan.totals.kcal - plan.targets.kcal) / plan.targets.kcal
    expect(gap).toBeLessThan(0.07)
  })

  it('keeps portion scales within sane bounds', () => {
    const plan = buildPlan({ ...base, activity: 'active', goal: 'gain' })
    for (const m of plan.chosen) {
      expect(m.scale).toBeGreaterThanOrEqual(0.5)
      expect(m.scale).toBeLessThanOrEqual(3)
    }
  })
})

describe('buildPlan — diet preference', () => {
  it('never includes non-veg meals for a vegetarian', () => {
    const plan = buildPlan({ ...base, diet: 'veg' })
    expect(plan.chosen.every((m) => m.veg)).toBe(true)
  })
})

describe('buildPlan — cost consistency', () => {
  it('day total equals the sum of grocery line costs (±rounding)', () => {
    const plan = buildPlan(base)
    const grocerySum = plan.grocery.reduce((s, g) => s + g.cost, 0)
    expect(Math.abs(plan.totals.price - grocerySum)).toBeLessThanOrEqual(plan.grocery.length)
  })

  it('builds one grocery line per distinct ingredient', () => {
    const plan = buildPlan(base)
    const keys = new Set(plan.chosen.flatMap((m) => m.ingredients.map((i) => i.key)))
    expect(plan.grocery.length).toBe(keys.size)
  })
})

describe('budgetFeasibility', () => {
  it('reports ok within budget', () => {
    expect(budgetFeasibility(200, 300).status).toBe('ok')
  })
  it('reports tight just over budget', () => {
    expect(budgetFeasibility(315, 300).status).toBe('tight')
  })
  it('reports over well past budget', () => {
    expect(budgetFeasibility(400, 300).status).toBe('over')
  })
})
