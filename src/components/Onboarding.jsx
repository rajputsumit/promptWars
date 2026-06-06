import { useState } from 'react'
import { ACTIVITY, GOALS } from '../lib/nutrition.js'
import { Icon } from './Shell.jsx'

const field =
  'w-full bg-surface p-md rounded-xl border-none focus:ring-2 focus:ring-primary text-body-lg transition-all placeholder:text-outline-variant'
const label = 'font-label-md text-label-md text-on-surface-variant px-sm uppercase'

export default function Onboarding({ onSubmit }) {
  const [f, setF] = useState({
    name: '', heightCm: '', weightKg: '', age: '', sex: '',
    activity: 'moderate', goal: 'maintain', diet: 'veg', budget: 250,
  })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const ready =
    f.heightCm && f.weightKg && f.age && f.sex &&
    Number(f.heightCm) > 0 && Number(f.weightKg) > 0 && Number(f.age) > 0

  function submit(e) {
    e.preventDefault()
    if (!ready) return
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
      <div className="w-full max-w-[520px] mb-xl flex gap-xs">
        <div className="h-1 flex-grow bg-primary rounded-full" />
        <div className="h-1 flex-grow bg-surface-variant rounded-full" />
        <div className="h-1 flex-grow bg-surface-variant rounded-full" />
      </div>

      <section className="w-full max-w-[520px] space-y-xl">
        <div>
          <h1 className="text-display-lg-mobile font-bold text-on-surface mb-sm">Let's get started</h1>
          <p className="text-body-lg text-on-surface-variant">
            Tell us about yourself so we can calculate your BMI and a balanced Indian diet for the day.
          </p>
        </div>

        <form className="space-y-md" onSubmit={submit}>
          <div className="flex flex-col gap-xs">
            <label className={label}>Full name (optional)</label>
            <input className={field} placeholder="e.g. Aarav Sharma" value={f.name} onChange={set('name')} />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className={label}>Height (cm)</label>
              <input className={field} type="number" placeholder="172" value={f.heightCm} onChange={set('heightCm')} />
            </div>
            <div className="flex flex-col gap-xs">
              <label className={label}>Weight (kg)</label>
              <input className={field} type="number" placeholder="68" value={f.weightKg} onChange={set('weightKg')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className={label}>Age</label>
              <input className={field} type="number" placeholder="26" value={f.age} onChange={set('age')} />
            </div>
            <div className="flex flex-col gap-xs">
              <label className={label}>Sex</label>
              <div className="relative">
                <select className={`${field} appearance-none bg-none cursor-pointer`} value={f.sex} onChange={set('sex')}>
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
            <label className={label}>Activity level</label>
            <div className="relative">
              <select className={`${field} appearance-none bg-none cursor-pointer`} value={f.activity} onChange={set('activity')}>
                {Object.entries(ACTIVITY).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
              <Icon name="expand_more" className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className={label}>Your goal</label>
            <div className="grid grid-cols-3 gap-sm">
              {Object.entries(GOALS).map(([k, v]) => (
                <button
                  type="button"
                  key={k}
                  onClick={() => setF({ ...f, goal: k })}
                  className={`p-md rounded-xl text-body-sm font-semibold transition-all ${
                    f.goal === k
                      ? 'bg-primary text-on-primary soft-elevation'
                      : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className={label}>Diet</label>
              <div className="grid grid-cols-2 gap-sm">
                {[['veg', 'Veg'], ['nonveg', 'Non-veg']].map(([k, lbl]) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => setF({ ...f, diet: k })}
                    className={`p-md rounded-xl text-body-sm font-semibold transition-all ${
                      f.diet === k ? 'bg-primary text-on-primary soft-elevation' : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-xs">
              <label className={label}>Food budget / day (₹)</label>
              <input className={field} type="number" placeholder="250" value={f.budget} onChange={set('budget')} />
            </div>
          </div>

          <div className="pt-md">
            <button
              type="submit"
              disabled={!ready}
              className="w-full bg-primary text-on-primary text-title-lg py-md rounded-xl hover:opacity-90 active:scale-[0.98] transition-all soft-elevation flex items-center justify-center gap-sm disabled:opacity-40 disabled:cursor-not-allowed"
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
