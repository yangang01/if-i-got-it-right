import { apologyLetter } from './apology'

describe('apology letter content', () => {
  it('contains the complete reading structure', () => {
    expect(apologyLetter.chapters).toHaveLength(5)
    expect(apologyLetter.reflections).toHaveLength(3)
    expect(apologyLetter.promises).toHaveLength(4)
    expect(apologyLetter.closingChoices).toHaveLength(3)
  })
})
