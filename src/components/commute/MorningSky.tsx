import type { CSSProperties } from 'react'

export function MorningSky({ reveal }: { reveal: number }) {
  const value = Math.min(1, Math.max(0, reveal))
  return <div className="morning-sky" style={{ '--morning-reveal': value } as CSSProperties} aria-hidden="true">
    <div className="morning-sun" />
    <div className="morning-horizon" />
    <div className="morning-street"><i /><i /></div>
  </div>
}
