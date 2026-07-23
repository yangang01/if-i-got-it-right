import { commuteNarrative } from './commute'

describe('commute narrative', () => {
  it('contains only the three real anchors from 09:40 to 10:50', () => {
    expect(commuteNarrative.stages).toHaveLength(3)
    expect(commuteNarrative.stages.map((stage) => stage.time)).toEqual(['09:40', '10:10', '10:50'])
    expect(commuteNarrative.stages.map((stage) => stage.id)).toEqual(['leave-home', 'station', 'arrive'])
  })

  it('describes the call as starting immediately after going out', () => {
    expect(commuteNarrative.stages[0].title).toBe('一出门，我就先拨通你的视频。')
    expect(JSON.stringify(commuteNarrative)).not.toContain('门一关上')
  })

  it('keeps her at home while the sender walks and takes the metro', () => {
    const story = JSON.stringify(commuteNarrative)
    expect(commuteNarrative.facts.her).toContain('躺在床上')
    expect(commuteNarrative.passages[0].copy).not.toContain('办公')
    expect(commuteNarrative.passages[0].copy).not.toContain('露肩')
    expect(commuteNarrative.passages.find((item) => item.at === 3 / 7)?.copy).toContain('换好')
    expect(story).toContain('露肩上衣')
    expect(story).toContain('我在走路')
    expect(story).toContain('地铁')
    expect(story).toContain('我们都没有骑车')
    expect(story).not.toContain('陪你走到地铁站')
  })

  it('includes observations throughout the continuous journey', () => {
    expect(commuteNarrative.passages.length).toBeGreaterThanOrEqual(5)
    expect(commuteNarrative.passages.some((passage) => passage.copy.includes('消息'))).toBe(true)
    expect(commuteNarrative.coreApology).toContain('一整个早晨')
  })

  it('adds four process beats without changing the three factual stages', () => {
    expect(commuteNarrative.stages).toHaveLength(3)
    expect(commuteNarrative.processBeats.map((beat) => beat.time)).toEqual(['09:50', '10:00', '10:25', '10:40'])
    expect(commuteNarrative.timeline).toHaveLength(7)
    expect(commuteNarrative.timeline.filter((item) => item.kind === 'major')).toHaveLength(3)
    expect(commuteNarrative.timeline.filter((item) => item.kind === 'minor')).toHaveLength(4)
  })

  it('ends with five concrete commitments and no obsolete reply request', () => {
    expect(commuteNarrative.commitments).toEqual([
      '约好的时间，我会提前留出来，不再让你的期待落空。',
      '我会主动联系你，让你一开始就知道：这段时间，我也同样期待。',
      '和你通话的时候，我会认真在场，不让你感觉自己总是在给其他事情让路。',
      '我不会再把你的体谅当成理所当然，也不会因为你不要求，就以为你不需要被珍惜。',
      '你表达委屈时，我先听完，不急着解释自己；做错的地方，我会承认，也会真的改。',
    ])
    const story = JSON.stringify(commuteNarrative)
    expect(story).not.toContain('不得不中断时')
    expect(story).not.toContain('有其他消息时')
    expect(story).not.toContain('不用现在回复')
    expect(story).not.toContain('原谅我好吗')
    expect('closing' in commuteNarrative).toBe(false)
  })
})
