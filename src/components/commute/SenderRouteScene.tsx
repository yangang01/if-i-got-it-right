export function SenderRouteScene({ progress }: { progress: number }) {
  const place = progress < 3 / 7 ? '走向地铁站' : progress < .92 ? '地铁途中' : '快到公司'
  return <div className="sender-route-scene" aria-hidden="true">
    <div className="route-sun" />
    <div className="route-trees"><i /><i /><i /><i /><i /><i /></div>
    <div className="route-horizon" />
    <div className="route-buildings"><i /><i /><i /><i /><i /></div>
    <div className="route-street"><i /><i /><i /></div>
    <div className="route-train"><span /><span /><span /><span /></div>
    <div className="route-office"><i /><i /><i /><i /><i /><i /></div>
    <div className="walking-presence"><i /><span /></div>
    <p>我的此刻<br /><span>{place}</span></p>
  </div>
}
