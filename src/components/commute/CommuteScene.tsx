import type { CSSProperties } from 'react'
import { MorningSky } from './MorningSky'
import { SenderRouteScene } from './SenderRouteScene'

export function CommuteScene({ progress }: { progress: number }) {
  return <div className="commute-scene" style={{ '--progress': progress } as CSSProperties} aria-hidden="true">
    <SenderRouteScene progress={progress} />
    <MorningSky reveal={1} />
    <div className="scene-copy-shade" />
    <div className="scene-noise" />
  </div>
}
