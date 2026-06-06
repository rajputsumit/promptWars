import { useMemo, useState } from 'react'
import { buildPlan } from '../lib/planner.js'
import { MICRO_RDA } from '../lib/nutrition.js'
import { Icon } from './Shell.jsx'

const SLOT_META = {
  breakfast: { label: 'Breakfast', icon: 'wb_twilight' },
  lunch: { label: 'Lunch', icon: 'lunch_dining' },
  dinner: { label: 'Dinner', icon: 'dinner_dining' },
  snack: { label: 'Snack', icon: 'bakery_dining' },
}

export default function DietPlan({ profile, onBack }) {
  const plan = useMemo(() => buildPlan(profile), [profile])
  const [done, setDone] = useState({})
  const toggle = (id) => setDone((d) => ({ ...d, [id]: !d[id] }))

  const { targets, totals, budget, grocery, substitutions } = plan
  const slots = ['breakfast', 'lunch', 'dinner', 'snack']
  const completed = plan.chosen.filter((m) => done[m.id]).length

  return (
    <main className="flex-grow w-full max-w-[1100px] mx-auto px-container-margin py-xl space-y-xl">
      <button onClick={onBack} className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-body-sm">
        <Icon name="arrow_back" className="text-[18px]" /> Back to snapshot
      </button>

      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="text-headline-md font-semibold text-on-surface">{profile.name}'s cooking to-do for today</h1>
          <p className="text-body-lg text-on-surface-variant">
            {completed}/{plan.chosen.length} meals done · {profile.diet === 'veg' ? 'Vegetarian' : 'Non-veg'} · Indian, everyday ingredients
          </p>
        </div>
        <div className="flex gap-sm">
          <Stat label="Calorie target" value={`${targets.kcal.toLocaleString()} kcal`} tone="primary" />
          <Stat
            label="Day's cost"
            value={`₹${totals.price} / ₹${budget.budget}`}
            tone={budget.status === 'over' ? 'error' : 'secondary'}
          />
        </div>
      </section>

      {/* Budget banner */}
      <div
        className={`rounded-xl p-md flex items-center gap-md border ${
          budget.status === 'ok'
            ? 'bg-primary-container/10 border-primary-container/30 text-on-surface'
            : budget.status === 'tight'
            ? 'bg-tertiary-container/15 border-tertiary-container/40 text-on-surface'
            : 'bg-error-container/40 border-error/30 text-on-surface'
        }`}
      >
        <Icon
          name={budget.status === 'ok' ? 'check_circle' : budget.status === 'tight' ? 'info' : 'warning'}
          fill={1}
          className={budget.status === 'ok' ? 'text-primary' : budget.status === 'tight' ? 'text-tertiary' : 'text-error'}
        />
        <div className="flex-grow">
          <span className="font-label-md text-label-md uppercase text-on-surface-variant">Budget check</span>
          <p className="text-body-lg">{budget.message}</p>
        </div>
        <span className="text-title-lg font-bold">{budget.pct}%</span>
      </div>

      {/* Meal cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {slots.map((slot) => {
          const m = plan.meals[slot]
          if (!m) return null
          const checked = !!done[m.id]
          return (
            <div
              key={slot}
              className={`flex flex-col bg-surface-container-lowest rounded-xl card-shadow p-lg transition-all ${
                checked ? 'opacity-60' : 'hover:-translate-y-1'
              }`}
            >
              <div className="flex items-center justify-between mb-md">
                <span className="inline-flex items-center gap-xs font-label-md text-label-md text-primary uppercase">
                  <Icon name={SLOT_META[slot].icon} className="text-[18px]" fill={1} />
                  {SLOT_META[slot].label}
                </span>
                <button
                  onClick={() => toggle(m.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                    checked ? 'bg-primary border-primary text-on-primary' : 'border-outline-variant text-transparent hover:border-primary'
                  }`}
                  aria-label="mark cooked"
                >
                  <Icon name="check" className="text-[18px]" />
                </button>
              </div>

              <div className="flex items-center gap-sm mb-sm">
                <h3 className={`text-title-lg text-on-surface ${checked ? 'line-through' : ''}`}>{m.name}</h3>
                {Math.abs(m.scale - 1) >= 0.05 && (
                  <span className="px-sm py-xs rounded-full bg-tertiary-container/20 text-tertiary font-label-md text-label-md whitespace-nowrap">
                    {m.scale}× portion
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-x-md gap-y-xs text-body-sm text-on-surface-variant mb-md">
                <span className="inline-flex items-center gap-xs"><Icon name="local_fire_department" className="text-[18px]" />{m.kcal} kcal</span>
                <span className="inline-flex items-center gap-xs"><Icon name="fitness_center" className="text-[18px]" />{m.protein}g P</span>
                <span className="inline-flex items-center gap-xs"><Icon name="schedule" className="text-[18px] text-primary" />{m.time} min</span>
              </div>

              <ul className="space-y-xs text-body-sm text-on-surface-variant flex-grow">
                {m.ingredients.map((ing) => (
                  <li key={ing.key} className="flex justify-between gap-sm">
                    <span>{ing.label}</span>
                    <span className="text-outline whitespace-nowrap">{ing.display}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-md pt-md border-t border-surface-variant flex items-center justify-between">
                <span className="text-body-lg font-bold text-on-surface">₹{m.price}</span>
                <div className="flex gap-xs">
                  {m.tags.slice(0, 1).map((t) => (
                    <span key={t} className="px-sm py-xs rounded-full bg-primary-container/15 text-primary font-label-md text-label-md uppercase">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Nutrition totals */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2 bg-surface-container-low p-xl rounded-xl border border-surface-variant">
          <h2 className="text-title-lg text-on-surface mb-lg">Today's nutrition vs target</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
            <Bar label="Calories" have={totals.kcal} target={targets.kcal} unit="kcal" color="bg-primary" />
            <Bar label="Protein" have={totals.protein} target={targets.proteinG} unit="g" color="bg-primary" />
            <Bar label="Carbs" have={totals.carbs} target={targets.carbsG} unit="g" color="bg-secondary-container" />
            <Bar label="Fat" have={totals.fat} target={targets.fatG} unit="g" color="bg-tertiary" />
          </div>
          <h3 className="text-body-lg font-semibold text-on-surface mt-lg mb-sm">Micronutrients</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
            {Object.entries(MICRO_RDA).map(([k, meta]) => {
              const pct = Math.min(100, Math.round((totals.micros[k] / meta.rda) * 100))
              return (
                <div key={k} className="bg-surface-container-lowest rounded-lg p-md text-center">
                  <Icon name={meta.icon} className="text-primary" />
                  <div className="text-body-lg font-bold text-on-surface">{totals.micros[k]}{meta.unit}</div>
                  <div className="font-label-md text-label-md text-on-surface-variant uppercase">{meta.label}</div>
                  <div className="text-body-sm text-on-surface-variant">{pct}% RDA</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Substitutions */}
        <div className="bg-surface-container-low p-xl rounded-xl border border-surface-variant">
          <h2 className="text-title-lg text-on-surface mb-lg flex items-center gap-sm">
            <Icon name="swap_horiz" className="text-primary" /> Smart swaps
          </h2>
          {substitutions.length === 0 ? (
            <p className="text-body-sm text-on-surface-variant">No swaps needed — plan already fits your preferences.</p>
          ) : (
            <ul className="space-y-md">
              {substitutions.map((s) => (
                <li key={s.match} className="text-body-sm">
                  <div className="text-on-surface font-semibold capitalize">{s.match} → {s.to}</div>
                  <div className="text-on-surface-variant">{s.reason}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Grocery list */}
      <section className="bg-surface-container-low p-xl rounded-xl border border-surface-variant">
        <div className="flex items-end justify-between mb-lg gap-md flex-wrap">
          <h2 className="text-title-lg text-on-surface flex items-center gap-sm">
            <Icon name="shopping_cart" className="text-primary" /> Grocery list ({grocery.length} items)
          </h2>
          <span className="text-body-sm text-on-surface-variant">
            Estimated total <span className="text-on-surface font-bold text-body-lg">₹{totals.price}</span>
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-xl gap-y-sm">
          {grocery.map((g) => (
            <label key={g.key} className="flex items-start gap-sm text-body-lg cursor-pointer group">
              <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary border-outline-variant" />
              <span className="flex-grow">
                <span className="flex justify-between gap-sm">
                  <span className="text-on-surface group-has-[:checked]:line-through group-has-[:checked]:text-outline">{g.label}</span>
                  <span className="text-on-surface-variant whitespace-nowrap">₹{g.cost}</span>
                </span>
                <span className="block text-body-sm text-on-surface-variant">{g.display}</span>
              </span>
            </label>
          ))}
        </div>
        <p className="text-body-sm text-on-surface-variant mt-lg pt-md border-t border-surface-variant">
          Prices are typical Indian metro retail averages (2025); pantry spices &amp; oil costed by the gram. Actual produce rates vary by season &amp; city.
        </p>
      </section>

      <button
        onClick={() => window.print()}
        className="w-full sm:w-auto px-xl bg-surface-container text-on-surface text-body-lg font-semibold py-md rounded-xl hover:bg-surface-container-high transition-all flex items-center justify-center gap-sm mx-auto"
      >
        <Icon name="print" /> Print / save plan
      </button>
    </main>
  )
}

function Stat({ label, value, tone }) {
  const tones = {
    primary: 'bg-primary-container/10 border-primary-container/30 text-primary',
    secondary: 'bg-secondary-container/10 border-secondary-container/30 text-secondary',
    error: 'bg-error-container/40 border-error/30 text-error',
  }
  return (
    <div className={`px-md py-sm rounded-xl border ${tones[tone]}`}>
      <span className="font-label-md text-label-md uppercase block">{label}</span>
      <span className="text-title-lg text-on-surface font-bold">{value}</span>
    </div>
  )
}

function Bar({ label, have, target, unit, color }) {
  const pct = Math.min(100, Math.round((have / target) * 100))
  return (
    <div>
      <div className="flex justify-between text-body-sm mb-xs">
        <span className="text-on-surface-variant">{label}</span>
        <span className="font-semibold text-on-surface">{Math.round(have)} / {target} {unit}</span>
      </div>
      <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
