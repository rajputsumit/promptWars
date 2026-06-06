// Meal-plan generator: pick meals, scale portions to hit the calorie target,
// derive cost from ingredient prices, build grocery list + budget feasibility.
import { MEALS, SUBSTITUTIONS } from '../data/meals.js'
import { ingredientCost, formatQty, PRICES } from '../data/prices.js'
import { macroTargets, MICRO_RDA } from './nutrition.js'

const SLOT_SHARE = { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.10 }
const MICRO_KEYS = Object.keys(MICRO_RDA)
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n))

// Cost of one meal at a given portion scale, in INR.
export function mealCost(meal, scale = 1) {
  return meal.ingredients.reduce(
    (sum, ing) => sum + ingredientCost(ing.key, ing.amt * scale, ing.unit),
    0
  )
}

function eligible(slot, prefs) {
  return MEALS.filter((m) => {
    if (m.slot !== slot) return false
    if (prefs.diet === 'veg' && !m.veg) return false
    return true
  })
}

// Pick the meal closest to the slot's calorie share, lightly penalising cost.
function pickMeal(slot, prefs, targetKcal, slotBudget) {
  const pool = eligible(slot, prefs)
  if (!pool.length) return null
  const wantKcal = targetKcal * SLOT_SHARE[slot]

  const scored = pool.map((m) => {
    const kcalGap = Math.abs(m.kcal - wantKcal) / wantKcal
    const cost = mealCost(m, 1)
    const overBudget = cost > slotBudget ? (cost - slotBudget) / slotBudget : 0
    const proteinBonus = prefs.goal === 'gain' ? -(m.protein / 100) : 0
    return { m, score: kcalGap + overBudget * 0.5 + proteinBonus }
  })
  scored.sort((a, b) => a.score - b.score)
  return scored[0].m
}

// Portion scale per slot so the day's calories land on target.
// Pass 1: scale each meal toward its calorie share (clamped to sane portions).
// Pass 2: nudge by a global factor to close the remaining gap.
function portionScales(meals, targetKcal) {
  const slots = Object.keys(meals).filter((s) => meals[s])
  const scales = {}
  for (const s of slots) {
    scales[s] = clamp((targetKcal * SLOT_SHARE[s]) / meals[s].kcal, 0.6, 2.5)
  }
  const sum = slots.reduce((a, s) => a + scales[s] * meals[s].kcal, 0)
  const factor = targetKcal / sum
  for (const s of slots) {
    scales[s] = Math.round(clamp(scales[s] * factor, 0.5, 3) * 20) / 20 // 0.05 steps
  }
  return scales
}

// Produce a "plated" meal: macros, micros, cost and ingredient amounts scaled.
function plate(meal, scale) {
  const r = (n) => Math.round(n)
  return {
    ...meal,
    scale,
    kcal: r(meal.kcal * scale),
    protein: r(meal.protein * scale),
    carbs: r(meal.carbs * scale),
    fat: r(meal.fat * scale),
    micros: Object.fromEntries(MICRO_KEYS.map((k) => [k, r((meal.micros[k] || 0) * scale)])),
    price: Math.round(mealCost(meal, scale)),
    ingredients: meal.ingredients.map((ing) => ({
      ...ing,
      scaledAmt: ing.amt * scale,
      display: formatQty(ing.amt * scale, ing.unit),
      label: PRICES[ing.key]?.label ?? ing.key,
    })),
  }
}

export function buildPlan(profile) {
  const targets = macroTargets(profile)
  const dailyBudget = profile.budget
  const prefs = { diet: profile.diet, goal: profile.goal }
  const slots = ['breakfast', 'lunch', 'dinner', 'snack']

  // 1. choose a meal per slot
  const picked = {}
  for (const slot of slots) {
    picked[slot] = pickMeal(slot, prefs, targets.kcal, dailyBudget * SLOT_SHARE[slot])
  }

  // 2. scale portions to hit the calorie target
  const scales = portionScales(picked, targets.kcal)

  // 3. plate
  const meals = {}
  for (const slot of slots) {
    if (picked[slot]) meals[slot] = plate(picked[slot], scales[slot])
  }
  const chosen = slots.map((s) => meals[s]).filter(Boolean)

  const totals = chosen.reduce(
    (acc, m) => {
      acc.kcal += m.kcal
      acc.protein += m.protein
      acc.carbs += m.carbs
      acc.fat += m.fat
      acc.price += m.price
      for (const k of MICRO_KEYS) acc.micros[k] += m.micros[k] || 0
      return acc
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0, price: 0, micros: { fiber: 0, iron: 0, calcium: 0, vitaminC: 0 } }
  )

  return {
    targets,
    meals,
    chosen,
    totals,
    budget: budgetFeasibility(totals.price, dailyBudget),
    grocery: groceryList(chosen),
    substitutions: substitutionsFor(chosen),
  }
}

export function budgetFeasibility(cost, budget) {
  const remaining = budget - cost
  const pct = Math.round((cost / budget) * 100)
  let status, message
  if (cost <= budget) {
    status = 'ok'
    message = `Within budget — ₹${remaining} to spare.`
  } else if (cost <= budget * 1.1) {
    status = 'tight'
    message = `Slightly over by ₹${Math.abs(remaining)}. Swap one meal or trim a portion to fit.`
  } else {
    status = 'over'
    message = `Over budget by ₹${Math.abs(remaining)}. See cheaper swaps below, or raise your budget.`
  }
  return { cost, budget, remaining, pct, status, message }
}

// Aggregate scaled ingredients across meals into a costed grocery list.
export function groceryList(chosen) {
  const map = new Map()
  for (const m of chosen) {
    for (const ing of m.ingredients) {
      if (!map.has(ing.key)) {
        map.set(ing.key, { key: ing.key, label: ing.label, unit: ing.unit, amt: 0 })
      }
      map.get(ing.key).amt += ing.scaledAmt
    }
  }
  return [...map.values()]
    .map((e) => ({
      ...e,
      display: formatQty(e.amt, e.unit),
      cost: Math.round(ingredientCost(e.key, e.amt, e.unit)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Substitutions relevant to the ingredient keys actually used.
export function substitutionsFor(chosen) {
  const keys = new Set(chosen.flatMap((m) => m.ingredients.map((i) => i.key)))
  return SUBSTITUTIONS.filter((s) => keys.has(s.match))
}
