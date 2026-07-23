import homeOfficeBed from '../../assets/home-office-bed.png'
import homeOfficeChibi from '../../assets/home-office-chibi.png'

export type HomeState = 'resting' | 'dressed'

export function HomeOfficeScene({ state }: { state: HomeState }) {
  const resting = state === 'resting'
  return <div className={`home-office-scene is-${state}`} aria-hidden="true">
    <div className="home-window"><i /><i /><i /></div>
    <div className="home-plant"><i /><i /><i /></div>
    <div className="home-desk"><span className="home-laptop" /><span className="home-cup" /></div>
    <img className={`home-character home-bed ${resting ? 'is-visible' : ''}`} src={homeOfficeBed} alt="长发女孩躺在床上接视频" />
    <img className={`home-character home-chibi ${resting ? '' : 'is-visible'}`} src={homeOfficeChibi} alt="长发女孩换好夏装继续视频" />
    <p>她的此刻<br /><span>{resting ? '在家 · 刚醒不久' : '在家 · 换好衣服'}</span></p>
  </div>
}
