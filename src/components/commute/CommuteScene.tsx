import type { CSSProperties } from 'react'
import { HomeOfficeScene } from './HomeOfficeScene'
import { MorningSky } from './MorningSky'
import { SenderRouteScene } from './SenderRouteScene'
import type { Perspective } from './perspective'

export function CommuteScene({ progress, perspective = 'sender' }: { progress: number; perspective?: Perspective }) {
  const homeState = progress >= 3 / 7 ? 'dressed' : 'resting'
  return <div className={`commute-scene is-${perspective}-view`} style={{ '--progress': progress } as CSSProperties} aria-hidden="true">
    {perspective === 'sender'
      ? <><SenderRouteScene progress={progress} /><MorningSky reveal={1} /></>
      : <div className="home-perspective-scene"><HomeOfficeScene state={homeState} /></div>}
    <div className="scene-copy-shade" />
    <div className="scene-noise" />
  </div>
}
