import { describe, it, expect } from 'vitest'
import {
  bmi, bmiCategory, bmr, tdee, calorieTarget, macroTargets, ACTIVITY, GOALS,
} from './nutrition.js'

const male = { heightCm: 178, weightKg: 75, age: 27, sex: 'male', activity: 'moderate', goal: 'maintain' }

describe('bmi', () => {
  it('computes weight / height^2', () => {
    expect(bmi(180, 81)).toBeCloseTo(25, 2) // 81 / 1.8^2 = 25
  })
  it('matches a known value', () => {
    expect(bmi(178, 75)).toBeCloseTo(23.67, 1)
  })
})

describe('bmiCategory', () => {
  it.each([
    [17, 'Underweight'],
    [22, 'Normal'],
    [27, 'Overweight'],
    [32, 'Obese'],
  ])('classifies %d as %s', (value, label) => {
    expect(bmiCategory(value).label).toBe(label)
  })
  it('uses the 18.5 / 25 / 30 boundaries inclusively on the low side', () => {
    expect(bmiCategory(18.5).label).toBe('Normal')
    expect(bmiCategory(25).label).toBe('Overweight')
    expect(bmiCategory(30).label).toBe('Obese')
  })
})

describe('bmr (Mifflin-St Jeor)', () => {
  it('adds +5 for male', () => {
    // 10*75 + 6.25*178 - 5*27 + 5 = 1732.5
    expect(bmr(male)).toBeCloseTo(1732.5, 1)
  })
  it('subtracts 161 for female', () => {
    const base = 10 * 75 + 6.25 * 178 - 5 * 27
    expect(bmr({ ...male, sex: 'female' })).toBeCloseTo(base - 161, 1)
  })
  it('uses a neutral offset for other', () => {
    const base = 10 * 75 + 6.25 * 178 - 5 * 27
    expect(bmr({ ...male, sex: 'other' })).toBeCloseTo(base - 78, 1)
  })
})

describe('tdee', () => {
  it('multiplies bmr by the activity factor', () => {
    expect(tdee(male)).toBeCloseTo(bmr(male) * ACTIVITY.moderate.factor, 1)
  })
})

describe('calorieTarget', () => {
  it('applies the goal delta and rounds to 10', () => {
    const maintain = calorieTarget(male)
    expect(maintain % 10).toBe(0)
    expect(calorieTarget({ ...male, goal: 'lose' })).toBe(
      Math.round((tdee(male) + GOALS.lose.delta) / 10) * 10
    )
    expect(calorieTarget({ ...male, goal: 'gain' })).toBeGreaterThan(maintain)
  })
})

describe('macroTargets', () => {
  it('splits calories into protein/carbs/fat that reconcile to kcal', () => {
    const m = macroTargets(male)
    const reconstructed = m.proteinG * 4 + m.carbsG * 4 + m.fatG * 9
    // within rounding tolerance of the calorie target
    expect(Math.abs(reconstructed - m.kcal)).toBeLessThan(20)
  })
  it('floors protein at 1.6 g/kg for muscle-gain goal', () => {
    const m = macroTargets({ ...male, goal: 'gain' })
    expect(m.proteinG).toBeGreaterThanOrEqual(Math.round(1.6 * male.weightKg))
  })
})
