export function AudioToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return <button className="audio-toggle" onClick={onToggle} aria-pressed={enabled} aria-label={enabled ? '关闭环境音' : '打开环境音'}><span className={enabled ? 'sound-bars is-playing' : 'sound-bars'}><i /><i /><i /></span>{enabled ? '声音已开' : '环境音关闭'}</button>
}
