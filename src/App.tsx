import { AudioToggle } from './components/AudioToggle'
import { CommuteExperience } from './components/commute/CommuteExperience'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import './styles/letter.css'

export default function App() {
  const music = useBackgroundMusic()
  return <div className="site-shell">
    <AudioToggle enabled={music.isPlaying} onToggle={music.toggle} />
    <CommuteExperience onStartRewind={music.play} />
  </div>
}
