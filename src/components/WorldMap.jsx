import { useEffect, useRef, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from 'react-simple-maps'
import { geoCentroid } from 'd3-geo'
import geoData from 'world-atlas/countries-110m.json'
import { cn } from '../data/books'

function lerpColor(a, b, t) {
  const ah = a.match(/\w\w/g).map((x) => parseInt(x, 16))
  const bh = b.match(/\w\w/g).map((x) => parseInt(x, 16))
  const r = ah.map((av, i) => Math.round(av + (bh[i] - av) * t))
  return `#${r.map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

const EMPTY = '#20344a'
const LOW = '#3f6a86'
const HIGH = '#e8bc4a'

function fillFor(count, maxCount) {
  if (!count) return EMPTY
  const t = maxCount > 1 ? (count - 1) / (maxCount - 1) : 1
  return lerpColor(LOW, HIGH, t)
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
// 经度差取最短路径，避免绕远
function shortLon(from, to) {
  let d = to - from
  while (d > 180) d -= 360
  while (d < -180) d += 360
  return from + d
}

export default function WorldMap({ byCountry, maxCount, selected, onSelect }) {
  const [tooltip, setTooltip] = useState(null)
  const [rotate, setRotate] = useState([-15, -18])
  const [scale, setScale] = useState(255)

  const dragging = useRef(false)
  const hovering = useRef(false)
  const moved = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const anim = useRef(null)
  const rotateRef = useRef(rotate)
  rotateRef.current = rotate

  // 平滑旋转到目标角度（点击国家时把它转到正中）
  const animateTo = (target) => {
    if (anim.current) cancelAnimationFrame(anim.current)
    const start = rotateRef.current
    const end = [shortLon(start[0], target[0]), target[1]]
    const dur = 620
    let t0 = null
    const step = (ts) => {
      if (t0 === null) t0 = ts
      const p = Math.min(1, (ts - t0) / dur)
      const e = 1 - Math.pow(1 - p, 3) // ease-out cubic
      setRotate([start[0] + (end[0] - start[0]) * e, start[1] + (end[1] - start[1]) * e])
      if (p < 1) anim.current = requestAnimationFrame(step)
      else anim.current = null
    }
    anim.current = requestAnimationFrame(step)
  }

  // 自动自转（无人交互、无动画时缓慢旋转）
  useEffect(() => {
    let raf
    let frame = 0
    const tick = () => {
      frame++
      if (!dragging.current && !hovering.current && !anim.current && frame % 2 === 0) {
        setRotate((r) => [r[0] + 0.16, r[1]])
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onPointerDown = (e) => {
    if (anim.current) {
      cancelAnimationFrame(anim.current)
      anim.current = null
    }
    dragging.current = true
    moved.current = false
    last.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current = { x: e.clientX, y: e.clientY }
    if (Math.abs(dx) + Math.abs(dy) > 3) moved.current = true
    setRotate((r) => [r[0] + dx * 0.35, clamp(r[1] - dy * 0.35, -85, 85)])
  }
  const endDrag = () => {
    dragging.current = false
  }
  const onWheel = (e) => {
    setScale((s) => clamp(s - e.deltaY * 0.35, 170, 560))
  }

  const handleCountry = (geo, name, count) => {
    if (moved.current) return
    const c = geoCentroid(geo)
    if (c && !Number.isNaN(c[0])) animateTo([-c[0], -c[1]])
    if (count) onSelect(name)
  }

  return (
    <div
      className="map-wrap"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={() => {
        hovering.current = false
        endDrag()
        setTooltip(null)
      }}
      onPointerEnter={() => (hovering.current = true)}
      onWheel={onWheel}
      style={{ cursor: dragging.current ? 'grabbing' : 'grab' }}
    >
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{ rotate: [rotate[0], rotate[1], 0], scale }}
        width={800}
        height={800}
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="ocean" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#12283b" />
            <stop offset="100%" stopColor="#081521" />
          </radialGradient>
        </defs>
        <Sphere id="globe-sphere" fill="url(#ocean)" stroke="#2a4c66" strokeWidth={0.8} />
        <Graticule stroke="#22405a" strokeWidth={0.4} />
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name
              const info = byCountry[name]
              const count = info ? info.count : 0
              const isSel = selected === name
              const base = fillFor(count, maxCount)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => setTooltip({ name, count, x: e.clientX, y: e.clientY })}
                  onMouseMove={(e) =>
                    setTooltip((tt) => (tt ? { ...tt, x: e.clientX, y: e.clientY } : tt))
                  }
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => handleCountry(geo, name, count)}
                  style={{
                    default: {
                      fill: isSel ? '#f4cf5e' : base,
                      stroke: '#0a141e',
                      strokeWidth: 0.35,
                      outline: 'none',
                      cursor: count ? 'pointer' : 'grab',
                    },
                    hover: {
                      fill: count ? '#f4cf5e' : base,
                      stroke: '#0a141e',
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: count ? 'pointer' : 'grab',
                    },
                    pressed: { fill: '#f4cf5e', outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      <div className="globe-controls">
        <button onClick={() => setScale((s) => clamp(s + 40, 170, 560))} title="放大">＋</button>
        <button onClick={() => setScale((s) => clamp(s - 40, 170, 560))} title="缩小">－</button>
      </div>

      {tooltip && (
        <div className="map-tooltip" style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}>
          <span className="tt-name">{cn(tooltip.name)}</span>
          {tooltip.count ? (
            <span className="tt-count">{tooltip.count} 本好书 · 点击查看</span>
          ) : (
            <span className="tt-empty">暂无收录</span>
          )}
        </div>
      )}
    </div>
  )
}
