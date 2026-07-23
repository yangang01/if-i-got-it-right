import type { CSSProperties } from 'react'
import { HomeOfficeScene } from './HomeOfficeScene'
import { MorningSky } from './MorningSky'
import { SenderRouteScene } from './SenderRouteScene'
import type { Perspective } from './perspective'

export function VideoCallWindow({
  progress,
  perspective = 'sender',
  onToggle,
}: {
  progress: number
  perspective?: Perspective
  onToggle?: () => void
}) {
  const homeState = progress >= 3 / 7 ? 'dressed' : 'resting'
  const showingHer = perspective === 'sender'
  return <div className={`video-call-window perspective-switch is-showing-${showingHer ? 'her' : 'sender'}`}>
    <span className="call-status"><i />{showingHer ? '视频通话中' : '我的画面'}</span>
    {showingHer
      ? <HomeOfficeScene state={homeState} />
      : <span className="compact-sender-scene" style={{ '--progress': progress } as CSSProperties}>
          <span className="compact-sender-frame">
            <MorningSky reveal={1} />
            <SenderRouteScene progress={progress} />
          </span>
        </span>}
    <span className="perspective-switch-hint">{showingHer ? '轻触，看她的此刻' : '轻触，回到我的这边'} <i>↗</i></span>
    <button
      type="button"
      className="perspective-switch-hit-area"
      onClick={onToggle}
      aria-label={showingHer ? '切换到她的视角' : '切换回我的视角'}
    />
  </div>
}
