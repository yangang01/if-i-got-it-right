import { render, screen } from '@testing-library/react'
import { HomeOfficeScene } from './HomeOfficeScene'

describe('HomeOfficeScene', () => {
  it('shows her resting in bed before she gets dressed', () => {
    render(<HomeOfficeScene state="resting" />)

    const resting = screen.getByAltText('长发女孩躺在床上接视频')
    const dressed = screen.getByAltText('长发女孩换好夏装继续视频')
    expect(resting).toHaveClass('is-visible')
    expect(resting.getAttribute('src')).toContain('home-office-bed')
    expect(dressed).not.toHaveClass('is-visible')
    expect(screen.getByText('在家 · 刚醒不久')).toBeInTheDocument()
  })

  it('shows her dressed state after she gets up', () => {
    render(<HomeOfficeScene state="dressed" />)

    const dressed = screen.getByAltText('长发女孩换好夏装继续视频')
    expect(dressed).toHaveClass('is-visible')
    expect(dressed.getAttribute('src')).toContain('home-office-chibi')
    expect(screen.getByText('在家 · 换好衣服')).toBeInTheDocument()
  })
})
