import { useState } from 'react'
import { ACTIVITY, GOALS } from '../lib/nutrition.js'
import { Icon } from './Shell.jsx'

const field =
  'w-full bg-surface p-md rounded-xl border border-transparent focus:border-primary focus:ring-2 focus:ring-primary text-body-lg transition-all placeholder:text-outline'
const labelCls = 'font-label-md text-label-md text-on-surface-variant px-sm uppercase'

// Accessible pill toggle backed by a real radio input (keyboard + SR support).
function PillRadio({ name, value, checked, onChange, children }) {
  return (
    <label
      className={`p-md rounded-xl text-body-sm font-semibold text-center cursor-pointer transition-all block has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2 ${
        checked ? 'bg-primary text-on-primary soft-elevation' : 'bg-surface text-on-surface-variant hover:bg-surface-container'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  )
}

export default function Onboarding({ onSubmit }) {
  const [f, setF] = useState({
    name: '', heightCm: '', weightKg: '', age: '', sex: '',
    activity: 'moderate', goal: 'maintain', diet: 'veg', budget: 250,
  })
  const [attempted, setAttempted] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const ready =
    f.heightCm && f.weightKg && f.age && f.sex &&
    Number(f.heightCm) > 0 && Number(f.weightKg) > 0 && Number(f.age) > 0

  function submit(e) {
    e.preventDefault()
    if (!ready) {
      setAttempted(true)
      return
    }
    onSubmit({
      name: f.name.trim() || 'there',
      heightCm: Number(f.heightCm),
      weightKg: Number(f.weightKg),
      age: Number(f.age),
      sex: f.sex,
      activity: f.activity,
      goal: f.goal,
      diet: f.diet,
      budget: Number(f.budget),
    })
  }

  return (
    <main className="flex-grow flex flex-col items-center px-container-margin py-xl">
      <div className="w-full max-w-[520px] mb-xl flex gap-xs" aria-hidden="true">
        <div className="h-1 flex-grow bg-primary rounded-full" />
        <div className="h-1 flex-grow bg-surface-variant rounded-full" />
        <div className="h-1 flex-grow bg-surface-variant rounded-full" />
      </div>

      <section className="w-full max-w-[520px] space-y-xl">
        <div>
          <h1 id="page-heading" tabIndex={-1} className="text-display-lg-mobile font-bold text-on-surface mb-sm focus:outline-none">
            Let's get started
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Tell us about yourself so we can calculate your BMI and a balanced Indian diet for the day.
          </p>
        </div>

        <form className="space-y-md" onSubmit={submit} noValidate>
          <div className="flex flex-col gap-xs">
            <label htmlFor="name" className={labelCls}>Full name (optional)</label>
            <input id="name" className={field} placeholder="e.g. Aarav Sharma" value={f.name} onChange={set('name')} />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label htmlFor="heightCm" className={labelCls}>Height (cm)</label>
              <input id="heightCm" className={field} type="number" inputMode="numeric" min="50" max="250" required
                placeholder="172" value={f.heightCm} onChange={set('heightCm')} />
            </div>
            <div className="flex flex-col gap-xs">
              <label htmlFor="weightKg" className={labelCls}>Weight (kg)</label>
              <input id="weightKg" className={field} type="number" inputMode="numeric" min="20" max="300" required
                placeholder="68" value={f.weightKg} onChange={set('weightKg')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label htmlFor="age" className={labelCls}>Age</label>
              <input id="age" className={field} type="number" inputMode="numeric" min="2" max="120" required
                placeholder="26" value={f.age} onChange={set('age')} />
            </div>
            <div className="flex flex-col gap-xs">
              <label htmlFor="sex" className={labelCls}>Sex</label>
              <div className="relative">
                <select id="sex" required className={`${field} appearance-none bg-none cursor-pointer`} value={f.sex} onChange={set('sex')}>
                  <option value="" disabled>Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                <Icon name="expand_more" className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="activity" className={labelCls}>Activity level</label>
            <div className="relative">
              <select id="activity" className={`${field} appearance-none bg-none cursor-pointer`} value={f.activity} onChange={set('activity')}>
                {Object.entries(ACTIVITY).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
              <Icon name="expand_more" className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
            </div>
          </div>

          <fieldset className="flex flex-col gap-xs border-0 p-0 m-0">
            <legend className={`${labelCls} mb-xs`}>Your goal</legend>
            <div className="grid grid-cols-3 gap-sm">
              {Object.entries(GOALS).map(([k, v]) => (
                <PillRadio key={k} name="goal" value={k} checked={f.goal === k} onChange={() => setF({ ...f, goal: k })}>
                  {v.label}
                </PillRadio>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-2 gap-md">
            <fieldset className="flex flex-col gap-xs border-0 p-0 m-0">
              <legend className={`${labelCls} mb-xs`}>Diet</legend>
              <div className="grid grid-cols-2 gap-sm">
                {[['veg', 'Veg'], ['nonveg', 'Non-veg']].map(([k, lbl]) => (
                  <PillRadio key={k} name="diet" value={k} checked={f.diet === k} onChange={() => setF({ ...f, diet: k })}>
                    {lbl}
                  </PillRadio>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col gap-xs">
              <label htmlFor="budget" className={labelCls}>Food budget / day (₹)</label>
              <input id="budget" className={field} type="number" inputMode="numeric" min="50" step="10"
                placeholder="250" value={f.budget} onChange={set('budget')} />
            </div>
          </div>

          {attempted && !ready && (
            <p role="alert" className="text-body-sm text-error flex items-center gap-xs">
              <Icon name="error" className="text-[18px]" />
              Please fill in your height, weight, age and sex with valid numbers.
            </p>
          )}

          <div className="pt-md">
            <button
              type="submit"
              aria-disabled={!ready}
              className={`w-full bg-primary text-on-primary text-title-lg py-md rounded-xl transition-all soft-elevation flex items-center justify-center gap-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                ready ? 'hover:opacity-90 active:scale-[0.98]' : 'opacity-40 cursor-not-allowed'
              }`}
            >
              Calculate my plan
              <Icon name="arrow_forward" />
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
