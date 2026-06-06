import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Onboarding from './Onboarding.jsx'

describe('Onboarding', () => {
  it('associates every input with a visible label', () => {
    render(<Onboarding onSubmit={() => {}} />)
    // getByLabelText throws if the label is not programmatically associated
    expect(screen.getByLabelText('Height (cm)')).toBeInTheDocument()
    expect(screen.getByLabelText('Weight (kg)')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
    expect(screen.getByLabelText('Sex')).toBeInTheDocument()
    expect(screen.getByLabelText(/food budget/i)).toBeInTheDocument()
  })

  it('exposes goal and diet as keyboard-accessible radio groups', () => {
    render(<Onboarding onSubmit={() => {}} />)
    expect(screen.getByRole('group', { name: /your goal/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /maintain weight/i })).toBeChecked()
    expect(screen.getByRole('radio', { name: /^veg$/i })).toBeChecked()
  })

  it('shows an alert and does not submit when required fields are missing', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<Onboarding onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: /calculate my plan/i }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/height, weight, age and sex/i)
  })

  it('submits parsed numeric values once the form is valid', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<Onboarding onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Height (cm)'), '178')
    await user.type(screen.getByLabelText('Weight (kg)'), '75')
    await user.type(screen.getByLabelText('Age'), '27')
    await user.selectOptions(screen.getByLabelText('Sex'), 'male')
    await user.click(screen.getByRole('radio', { name: /build muscle/i }))
    await user.click(screen.getByRole('button', { name: /calculate my plan/i }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ heightCm: 178, weightKg: 75, age: 27, sex: 'male', goal: 'gain' })
    )
  })
})
