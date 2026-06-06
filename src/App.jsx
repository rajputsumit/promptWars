import { useState } from 'react'
import { Header, Footer } from './components/Shell.jsx'
import Onboarding from './components/Onboarding.jsx'
import BmiResult from './components/BmiResult.jsx'
import DietPlan from './components/DietPlan.jsx'

const STEPS = { onboarding: 'Step 1 of 3', bmi: 'Step 2 of 3', plan: 'Step 3 of 3' }

export default function App() {
  const [stage, setStage] = useState('onboarding')
  const [profile, setProfile] = useState(null)

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest">
      <Header step={STEPS[stage]} />

      {stage === 'onboarding' && (
        <Onboarding
          onSubmit={(p) => {
            setProfile(p)
            setStage('bmi')
            window.scrollTo(0, 0)
          }}
        />
      )}

      {stage === 'bmi' && profile && (
        <BmiResult
          profile={profile}
          onBack={() => setStage('onboarding')}
          onContinue={() => {
            setStage('plan')
            window.scrollTo(0, 0)
          }}
        />
      )}

      {stage === 'plan' && profile && (
        <DietPlan profile={profile} onBack={() => setStage('bmi')} />
      )}

      <Footer />
    </div>
  )
}
