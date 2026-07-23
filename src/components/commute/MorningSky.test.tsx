import { render } from '@testing-library/react'
import { MorningSky } from './MorningSky'

describe('MorningSky', () => {
  it('exposes reveal progress for the shared sky and street foreground', () => {
    const { container } = render(<MorningSky reveal={0.6} />)
    const sky = container.querySelector('.morning-sky')
    expect(sky).toHaveStyle({ '--morning-reveal': '0.6' })
    expect(container.querySelector('.morning-sun')).toBeInTheDocument()
    expect(container.querySelector('.morning-street')).toBeInTheDocument()
  })
})
