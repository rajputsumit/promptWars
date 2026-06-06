// Nutrition math — BMI, BMR (Mifflin-St Jeor), TDEE, macro split.
// All inputs metric: height cm, weight kg, age years.

export const ACTIVITY = {
  sedentary: { label: 'Sedentary (desk job, little exercise)', factor: 1.2 },
  light: { label: 'Lightly active (1–3 days/week)', factor: 1.375 },
  moderate: { label: 'Moderately active (3–5 days/week)', factor: 1.55 },
  active: { label: 'Very active (6–7 days/week)', factor: 1.725 },
}

export const GOALS = {
  lose: { label: 'Lose weight', delta: -400 },
  maintain: { label: 'Maintain weight', delta: 0 },
  gain: { label: 'Build muscle', delta: 300 },
}

export function bmi(heightCm, weightKg) {
  const m = heightCm / 100
  return weightKg / (m * m)
}

export function bmiCategory(value) {
  if (value < 18.5) return { label: 'Underweight', color: 'secondary', note: 'Below healthy range' }
  if (value < 25) return { label: 'Normal', color: 'primary', note: 'Healthy range' }
  if (value < 30) return { label: 'Overweight', color: 'tertiary', note: 'Above healthy range' }
  return { label: 'Obese', color: 'error', note: 'Well above healthy range' }
}

// Mifflin-St Jeor
export function bmr({ heightCm, weightKg, age, sex }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  if (sex === 'male') return base + 5
  if (sex === 'female') return base - 161
  return base - 78 // neutral midpoint for other / unspecified
}

export function tdee(profile) {
  const factor = ACTIVITY[profile.activity]?.factor ?? 1.2
  return bmr(profile) * factor
}

export function calorieTarget(profile) {
  const delta = GOALS[profile.goal]?.delta ?? 0
  return Math.round((tdee(profile) + delta) / 10) * 10
}

// Macro split tuned for an Indian balanced diet:
// protein 25%, carbs 50%, fat 25%. Protein floored at 1.6 g/kg for muscle goal.
export function macroTargets(profile) {
  const kcal = calorieTarget(profile)
  let proteinG = Math.round((kcal * 0.25) / 4)
  if (profile.goal === 'gain') {
    proteinG = Math.max(proteinG, Math.round(1.6 * profile.weightKg))
  }
  const proteinKcal = proteinG * 4
  const fatG = Math.round((kcal * 0.25) / 9)
  const carbsG = Math.round((kcal - proteinKcal - fatG * 9) / 4)
  return { kcal, proteinG, carbsG, fatG }
}

// Recommended daily micros (simplified RDA, Indian ICMR-NIN aligned).
export const MICRO_RDA = {
  fiber: { label: 'Fiber', unit: 'g', rda: 30, icon: 'grass' },
  iron: { label: 'Iron', unit: 'mg', rda: 18, icon: 'bloodtype' },
  calcium: { label: 'Calcium', unit: 'mg', rda: 1000, icon: 'skeleton' },
  vitaminC: { label: 'Vitamin C', unit: 'mg', rda: 80, icon: 'nutrition' },
}
