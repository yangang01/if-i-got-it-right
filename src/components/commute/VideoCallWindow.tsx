import { HomeOfficeScene } from './HomeOfficeScene'

export function VideoCallWindow({ progress }: { progress: number }) {
  const homeState = progress >= 3 / 7 ? 'dressed' : 'resting'
  return <div className="video-call-window">
    <div className="call-status"><i />视频通话中</div>
    <HomeOfficeScene state={homeState} />
  </div>
}
