import { render, screen } from '@testing-library/react'
import { REWIND_TARGET_TIMESTAMP } from '../../utils/timeRewind'
import { RewindClock } from './RewindClock'

describe('RewindClock', () => {
  it('renders a real Shanghai date and time without commute markers', () => {
    render(<RewindClock timestamp={REWIND_TARGET_TIMESTAMP} progress={1} />)
    expect(screen.getByText('2026年7月21日')).toBeInTheDocument()
    expect(screen.getByText('09:40:00')).toBeInTheDocument()
    expect(document.querySelector('.rewind-stage .morning-sky')).toBeInTheDocument()
    expect(document.querySelector('.rewind-stage')).toHaveStyle({ '--morning-reveal': '1' })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
