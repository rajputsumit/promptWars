import { useEffect, useState } from 'react'
import { Header, Footer } from './components/Shell.jsx'
import Onboarding from './components/Onboarding.jsx'
import BmiResult from './components/BmiResult.jsx'
import DietPlan from './components/DietPlan.jsx'

const STEPS = { onboarding: 'Step 1 of 3', bmi: 'Step 2 of 3', plan: 'Step 3 of 3' }

export default function App() {
  const [stage, setStage] = useState('onboarding')
  const [profile, setProfile] = useState(null)

  // On screen change, scroll up and move focus to the new heading so keyboard
  // and screen-reader users land on the fresh content instead of the top of DOM.
  useEffect(() => {
    window.scrollTo(0, 0)
    const heading = document.getElementById('page-heading')
    if (heading) heading.focus()
  }, [stage])

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary focus:text-on-primary focus:px-md focus:py-sm focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Header step={STEPS[stage]} />

      <div id="main-content" className="flex-grow flex flex-col">
        {stage === 'onboarding' && (
          <Onboarding
            onSubmit={(p) => {
              setProfile(p)
              setStage('bmi')
            }}
          />
        )}

        {stage === 'bmi' && profile && (
          <BmiResult
            profile={profile}
            onBack={() => setStage('onboarding')}
            onContinue={() => setStage('plan')}
          />
        )}

        {stage === 'plan' && profile && (
          <DietPlan profile={profile} onBack={() => setStage('bmi')} />
        )}
      </div>

      <Footer />
    </div>
  )
}
