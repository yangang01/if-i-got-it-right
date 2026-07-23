/// <reference types="node" />
import { readFileSync } from 'node:fs'

const css = readFileSync('src/styles/letter.css', 'utf8')
const rule = (selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return css.match(new RegExp(`(?:^|\\n)\\s*${escaped}\\s*\\{([^}]*)\\}`))?.[1] ?? ''
}

describe('letter visual system', () => {
  it('defines the shared dawn palette used by the commute scene', () => {
    expect(css).toContain('--dawn-mist: #91b3bd')
    expect(css).toContain('--dawn-haze: #c7c6b3')
    expect(css).toContain('--dawn-apricot: #efc397')
    expect(css).toContain('--dawn-earth: #b87961')
    expect(css).toContain('--dawn-deep: #242d36')
  })

  it('uses the dawn palette on the opening and rewind screens', () => {
    const opening = rule('.reality-intro')
    const rewind = rule('.rewind-stage')
    const orbit = rule('.rewind-orbit')

    expect(opening).toContain('var(--dawn-mist)')
    expect(opening).toContain('var(--dawn-apricot)')
    expect(opening).toContain('var(--dawn-deep)')
    expect(rewind).toContain('var(--dawn-mist)')
    expect(rewind).toContain('var(--dawn-apricot)')
    expect(rewind).toContain('var(--dawn-deep)')
    expect(orbit).toContain('var(--dawn-apricot)')
  })

  it('keeps the resting character inside the video frame', () => {
    expect(rule('.home-bed')).toContain('right:1%')
    expect(rule('.home-bed')).toContain('bottom:7%')
    expect(rule('.home-bed')).toContain('width:98%')
    expect(css).toMatch(/@media \(max-width:700px\)[\s\S]*\.home-bed\s*\{[^}]*right:2%[^}]*bottom:7%[^}]*width:96%/)
  })

  it('gives her main perspective a separate full-screen composition', () => {
    const mainBed = rule('.commute-scene.is-her-view .home-bed')
    expect(mainBed).toContain('width:min(60rem,94vw)')
    expect(rule('.home-bed')).toContain('width:98%')
  })

  it('keeps the final card usable on short landscape phones', () => {
    expect(css).toMatch(/@media \(max-height:520px\) and \(max-width:700px\)[\s\S]*\.has-arrived \.present-closing\s*\{[^}]*inset:4\.1rem 7\.8rem 7\.5rem 0[^}]*max-height:none/)
  })
})
