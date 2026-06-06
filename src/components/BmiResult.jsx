import { bmi, bmiCategory, tdee, macroTargets, ACTIVITY, GOALS } from '../lib/nutrition.js'
import { Icon } from './Shell.jsx'

const colorMap = {
  primary: 'text-primary bg-primary-container/15 border-primary-container/30',
  secondary: 'text-secondary bg-secondary-container/15 border-secondary-container/30',
  tertiary: 'text-tertiary bg-tertiary-container/20 border-tertiary-container/40',
  error: 'text-error bg-error-container/40 border-error/30',
}

// BMI scale 15–35 mapped to 0–100% for the marker position.
function markerPct(value) {
  return Math.min(100, Math.max(0, ((value - 15) / 20) * 100))
}

export default function BmiResult({ profile, onContinue, onBack }) {
  const value = bmi(profile.heightCm, profile.weightKg)
  const cat = bmiCategory(value)
  const macros = macroTargets(profile)
  const maintenance = Math.round(tdee(profile))

  return (
    <main className="flex-grow w-full max-w-[760px] mx-auto px-container-margin py-xl space-y-lg">
      <button onClick={onBack} className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-body-sm rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        <Icon name="arrow_back" className="text-[18px]" /> Edit details
      </button>

      <div>
        <h1 id="page-heading" tabIndex={-1} className="text-headline-md font-semibold text-on-surface focus:outline-none">Hi {profile.name}, here's your snapshot</h1>
        <p className="text-body-lg text-on-surface-variant">Based on your height, weight, age and activity.</p>
      </div>

      {/* BMI card */}
      <section className="bg-surface-container-lowest rounded-xl card-shadow p-xl">
        <div className="flex items-end justify-between mb-md">
          <div>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase">Your BMI</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-display-lg-mobile font-bold text-on-surface">{value.toFixed(1)}</span>
              <span className={`px-sm py-xs rounded-full text-body-sm font-semibold border ${colorMap[cat.color]}`}>
                {cat.label}
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mt-xs">{cat.note} · healthy BMI is 18.5–24.9</p>
          </div>
        </div>

        {/* BMI bar (visual; value is conveyed in text above) */}
        <div className="relative h-3 rounded-full overflow-hidden flex" aria-hidden="true">
          <div className="flex-grow bg-secondary-container/60" style={{ flexGrow: 3.5 }} />
          <div className="flex-grow bg-primary-container/70" style={{ flexGrow: 6.5 }} />
          <div className="flex-grow bg-tertiary-container/70" style={{ flexGrow: 5 }} />
          <div className="flex-grow bg-error/50" style={{ flexGrow: 5 }} />
        </div>
        <div
          className="relative -mt-[18px] mb-xs"
          style={{ marginLeft: `calc(${markerPct(value)}% - 6px)` }}
        >
          <div className="w-3 h-3 rounded-full bg-on-surface border-2 border-white shadow" />
        </div>
        <div className="flex justify-between text-body-sm text-on-surface-variant" aria-hidden="true">
          <span>15</span><span>18.5</span><span>25</span><span>30</span><span>35</span>
        </div>
      </section>

      {/* Calorie + macro targets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
        <div className="bg-surface-container-low rounded-xl border border-surface-variant p-lg">
          <span className="font-label-md text-label-md text-primary uppercase">Daily calorie target</span>
          <div className="text-headline-md font-bold text-on-surface mt-xs">{macros.kcal.toLocaleString()} kcal</div>
          <p className="text-body-sm text-on-surface-variant mt-xs">
            Maintenance ≈ {maintenance.toLocaleString()} kcal · goal: {GOALS[profile.goal].label.toLowerCase()}
          </p>
          <p className="text-body-sm text-on-surface-variant">{ACTIVITY[profile.activity].label}</p>
        </div>

        <div className="bg-surface-container-low rounded-xl border border-surface-variant p-lg">
          <span className="font-label-md text-label-md text-primary uppercase">Balanced macro split</span>
          <div className="space-y-sm mt-sm">
            <MacroRow label="Protein" grams={macros.proteinG} kcal={macros.proteinG * 4} total={macros.kcal} color="bg-primary" />
            <MacroRow label="Carbs" grams={macros.carbsG} kcal={macros.carbsG * 4} total={macros.kcal} color="bg-secondary-container" />
            <MacroRow label="Fat" grams={macros.fatG} kcal={macros.fatG * 9} total={macros.kcal} color="bg-tertiary" />
          </div>
        </div>
      </section>

      <div className="bg-primary-container/10 border border-primary-container/30 rounded-xl p-lg flex gap-md items-start">
        <Icon name="restaurant" className="text-primary" fill={1} />
        <p className="text-body-lg text-on-surface-variant">
          Next we'll turn these targets into a <span className="font-semibold text-on-surface">cooking to-do list</span> —
          breakfast, lunch, dinner & a snack from everyday Indian ingredients, with a grocery list and budget check.
        </p>
      </div>

      <button
        onClick={onContinue}
        className="w-full bg-primary text-on-primary text-title-lg py-md rounded-xl hover:opacity-90 active:scale-[0.98] transition-all soft-elevation flex items-center justify-center gap-sm"
      >
        Build my cooking to-do list
        <Icon name="arrow_forward" />
      </button>
    </main>
  )
}

function MacroRow({ label, grams, kcal, total, color }) {
  const pct = Math.round((kcal / total) * 100)
  return (
    <div>
      <div className="flex justify-between text-body-sm mb-xs">
        <span className="text-on-surface-variant" id={`macro-${label}`}>{label}</span>
        <span className="font-semibold text-on-surface">{grams} g · {pct}%</span>
      </div>
      <div
        className="w-full bg-surface h-2 rounded-full overflow-hidden"
        role="progressbar"
        aria-labelledby={`macro-${label}`}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${label}: ${grams} grams, ${pct}% of daily calories`}
      >
        <div className={`${color} h-full rounded-full`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
