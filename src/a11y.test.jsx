import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import Onboarding from './components/Onboarding.jsx'
import BmiResult from './components/BmiResult.jsx'
import DietPlan from './components/DietPlan.jsx'

const profile = {
  name: 'Aarav', heightCm: 178, weightKg: 75, age: 27, sex: 'male',
  activity: 'moderate', goal: 'maintain', diet: 'veg', budget: 300,
}

// jsdom can't compute layout, so colour-contrast can't be evaluated here;
// it is verified in the browser. Everything else (names, roles, labels,
// structure) is asserted automatically.
const rules = { 'color-contrast': { enabled: false } }

describe('accessibility (axe)', () => {
  it('Onboarding has no violations', async () => {
    const { container } = render(<Onboarding onSubmit={() => {}} />)
    expect(await axe(container, { rules })).toHaveNoViolations()
  })

  it('BmiResult has no violations', async () => {
    const { container } = render(
      <BmiResult profile={profile} onBack={() => {}} onContinue={() => {}} />
    )
    expect(await axe(container, { rules })).toHaveNoViolations()
  })

  it('DietPlan has no violations', async () => {
    const { container } = render(<DietPlan profile={profile} onBack={() => {}} />)
    expect(await axe(container, { rules })).toHaveNoViolations()
  })
})
