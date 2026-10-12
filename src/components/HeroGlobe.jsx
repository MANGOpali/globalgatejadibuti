import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DESTINATIONS } from '../data/site'

// Realistic 3D Earth drawn on a 2D canvas: NASA Blue Marble texture (public domain) mapped per pixel,
// Natural Earth borders for Nepal and every destination, and planes flying each route from Kathmandu.
// No 3D library — the whole thing is this file plus a 190 KB texture and 126 KB of borders.

const TEXTURE = '/globe/earth.webp'
const BORDERS = '/globe/countries.json'
const TILT = 0.32

const CITIES = {
  NP: { label: 'KATHMANDU · NEPAL', lat: 27.7, lon: 85.3, color: '#EF4444' },
  UK: { label: 'LONDON · UK', lat: 51.5, lon: -0.1 },
  US: { label: 'NEW YORK · USA', lat: 40.7, lon: -74.0 },
  CA: { label: 'TORONTO · CANADA', lat: 43.7, lon: -79.4 },
  AU: { label: 'SYDNEY · AUSTRALIA', lat: -33.9, lon: 151.2 },
  NZ: { label: 'AUCKLAND · NZ', lat: -36.8, lon: 174.8 },
  JP: { label: 'TOKYO · JAPAN', lat: 35.7, lon: 139.7 },
  KR: { label: 'SEOUL · KOREA', lat: 37.6, lon: 127.0 },
}

// lat/lon -> unit vector; east appears to the right when viewed from outside
const ll = (lat, lon) => {
  const a = lat * Math.PI / 180, b = lon * Math.PI / 180
  return [Math.cos(a) * Math.cos(b), Math.sin(a), -Math.cos(a) * Math.sin(b)]
}

const project = (rot, cx, cy, R) => {
  const ca = Math.cos(rot), sa = Math.sin(rot), cb = Math.cos(TILT), sb = Math.sin(TILT)
  return (v) => {
    const x = v[0] * ca + v[2] * sa, z = -v[0] * sa + v[2] * ca
    const y = v[1] * cb - z * sb, z2 = v[1] * sb + z * cb
    return [cx + x * R, cy - y * R, z2]
  }
}

const hexRgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

function buildRoutes() {
  const a = ll(CITIES.NP.lat, CITIES.NP.lon)
  return DESTINATIONS.map((d, i) => {
    const b = ll(CITIES[d.code].lat, CITIES[d.code].lon)
    const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2], w = Math.acos(Math.max(-1, Math.min(1, dot))), sw = Math.sin(w)
    const arc = []
    for (let s = 0; s <= 80; s++) {
      const f = s / 80, k1 = Math.sin((1 - f) * w) / sw, k2 = Math.sin(f * w) / sw, lift = 1 + (0.05 + 0.2 * w / Math.PI) * Math.sin(Math.PI * f)
      arc.push([(a[0] * k1 + b[0] * k2) * lift, (a[1] * k1 + b[1] * k2) * lift, (a[2] * k1 + b[2] * k2) * lift])
    }
    return { ...d, v: b, arc, offset: i / DESTINATIONS.length }
  })
}

// Equirectangular id map of every country (same size as the texture) for tinting and click hit-testing.
function buildMask(json, codes) {
  const W = 2048, H = 1024, c = document.createElement('canvas')
  c.width = W; c.height = H
  const x = c.getContext('2d')
  codes.forEach((code, k) => {
    const rings = json[code]; if (!rings) return
    x.fillStyle = `rgb(${(k + 1) * 28},0,0)`
    for (const ring of rings) {
      let prev = null, off = 0
      const pts = ring.map(p => {
        let L = p[0] + off
        if (prev !== null) { if (L - prev > 180) { off -= 360; L -= 360 } else if (L - prev < -180) { off += 360; L += 360 } }
        prev = L
        return [L, p[1]]
      })
      for (const shift of [-360, 0, 360]) {
        x.beginPath()
        pts.forEach((p, i) => { const px = (p[0] + shift + 180) / 360 * W, py = (90 - p[1]) / 180 * H; if (i) x.lineTo(px, py); else x.moveTo(px, py) })
        x.closePath(); x.fill()
      }
    }
  })
  const d = x.getImageData(0, 0, W, H).data, ids = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) if (d[i * 4 + 3] > 128) ids[i] = Math.round(d[i * 4] / 28)
  return { w: W, h: H, ids }
}

function drawPlane(ctx, x, y, ang, s, col) {
  ctx.save()
  ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s)
  ctx.beginPath()
  ctx.moveTo(10, 0); ctx.quadraticCurveTo(9, -1.4, 6, -1.4); ctx.lineTo(1.5, -1.4); ctx.lineTo(-3, -8.5); ctx.lineTo(-5.4, -8.5); ctx.lineTo(-2.4, -1.4)
  ctx.lineTo(-6.6, -1.4); ctx.lineTo(-8.6, -4.2); ctx.lineTo(-10.2, -4.2); ctx.lineTo(-8.8, 0)
  ctx.lineTo(-10.2, 4.2); ctx.lineTo(-8.6, 4.2); ctx.lineTo(-6.6, 1.4); ctx.lineTo(-2.4, 1.4); ctx.lineTo(-5.4, 8.5); ctx.lineTo(-3, 8.5); ctx.lineTo(1.5, 1.4)
  ctx.lineTo(6, 1.4); ctx.quadraticCurveTo(9, 1.4, 10, 0); ctx.closePath()
  ctx.shadowColor = col; ctx.shadowBlur = 10
  ctx.fillStyle = '#FFFFFF'; ctx.fill()
  ctx.shadowBlur = 0; ctx.lineWidth = 1.3 / s; ctx.strokeStyle = col; ctx.stroke()
  ctx.restore()
}

export default function HeroGlobe() {
  const canvasRef = useRef(null)
  const pillRefs = useRef({})
  const navigate = useNavigate()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const routes = buildRoutes()
    const codes = ['NP', ...routes.map(r => r.code)]
    const rgb = [null, hexRgb(CITIES.NP.color), ...routes.map(r => hexRgb(r.color))]
    const colorOf = { NP: CITIES.NP.color }
    routes.forEach(r => { colorOf[r.code] = r.color })
    const nepal = ll(CITIES.NP.lat, CITIES.NP.lon)

    const st = { rot: -2.85, drag: null, hover: 0, tex: null, mask: null, shapes: null, geo: null, view: null, visible: true, raf: 0 }
    let reduced = false
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { /* default motion */ }

    // texture + borders load after first paint so the hero text is never held up
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      try {
        const c = document.createElement('canvas')
        c.width = img.width; c.height = img.height
        const x = c.getContext('2d')
        x.drawImage(img, 0, 0)
        st.tex = { w: img.width, h: img.height, data: new Uint32Array(x.getImageData(0, 0, img.width, img.height).data.buffer) }
        st.geo = null
      } catch { /* keep the ocean fallback */ }
    }
    const loadTimer = setTimeout(() => { img.src = TEXTURE }, 150)
    fetch(BORDERS).then(r => r.json()).then(j => {
      st.shapes = Object.keys(j).map(code => ({ code, rings: j[code].map(ring => ring.map(p => ll(p[1], p[0]))) }))
      st.mask = buildMask(j, codes)
    }).catch(() => {})

    const hit = (e) => {
      const g = st.view, m = st.mask
      if (!g || !m) return 0
      const rect = canvas.getBoundingClientRect()
      const vx = (e.clientX - rect.left - g.cx) / g.R, vy = -(e.clientY - rect.top - g.cy) / g.R, r2 = vx * vx + vy * vy
      if (r2 > 1) return 0
      const cb = Math.cos(TILT), sb = Math.sin(TILT), vz = Math.sqrt(1 - r2), y = vy * cb + vz * sb, z = -vy * sb + vz * cb
      let u = (Math.atan2(-z, vx) + Math.PI) / (Math.PI * 2) - st.rot / (Math.PI * 2); u -= Math.floor(u)
      const v = (Math.PI / 2 - Math.asin(Math.max(-1, Math.min(1, y)))) / Math.PI
      return m.ids[Math.min(m.h - 1, (v * m.h) | 0) * m.w + Math.min(m.w - 1, (u * m.w) | 0)]
    }

    const onDown = (e) => { st.drag = { x: e.clientX, y: e.clientY, r: st.rot, moved: false }; try { canvas.setPointerCapture(e.pointerId) } catch { /* ignore */ } }
    const onMove = (e) => {
      if (st.drag) {
        const dx = e.clientX - st.drag.x
        if (Math.abs(dx) + Math.abs(e.clientY - st.drag.y) > 5) st.drag.moved = true
        st.rot = st.drag.r + dx * 0.006
        return
      }
      st.hover = hit(e)
      canvas.style.cursor = st.hover > 1 ? 'pointer' : 'grab'
    }
    const onUp = (e) => {
      const d = st.drag; st.drag = null
      if (d && !d.moved) {
        const id = hit(e), route = routes[id - 2]
        if (route) navigate(route.to)
      }
    }
    const onLeave = () => { st.drag = null; st.hover = 0 }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointerleave', onLeave)

    const earth = (Rd) => {
      const t = st.tex
      if (!st.geo || st.geo.R !== Rd) {
        const size = Rd * 2, n = size * size, U = new Float32Array(n), ROW = new Int32Array(n), S = new Float32Array(n), M = new Uint8Array(n)
        const cb = Math.cos(TILT), sb = Math.sin(TILT), TWO = Math.PI * 2, lx = -0.5, ly = 0.42, lz = 0.76
        for (let py = 0; py < size; py++) {
          for (let px = 0; px < size; px++) {
            const i = py * size + px, vx = (px + 0.5 - Rd) / Rd, vy = -(py + 0.5 - Rd) / Rd, r2 = vx * vx + vy * vy
            if (r2 > 1) continue
            const vz = Math.sqrt(1 - r2), y = vy * cb + vz * sb, z = -vy * sb + vz * cb
            U[i] = (Math.atan2(-z, vx) + Math.PI) / TWO
            const v = (Math.PI / 2 - Math.asin(Math.max(-1, Math.min(1, y)))) / Math.PI
            ROW[i] = Math.min(t.h - 1, (v * t.h) | 0) * t.w
            S[i] = 0.22 + Math.pow(Math.max(0, vx * lx + vy * ly + vz * lz), 0.9)
            M[i] = 1
          }
        }
        const cnv = document.createElement('canvas')
        cnv.width = size; cnv.height = size
        const ctx = cnv.getContext('2d'), out = ctx.createImageData(size, size)
        st.geo = { R: Rd, U, ROW, S, M, cnv, ctx, out, buf: new Uint32Array(out.data.buffer) }
      }
      const g = st.geo, out = g.buf, data = t.data, tw = t.w, shift = st.rot / (Math.PI * 2)
      const ids = st.mask && st.mask.w === t.w && st.mask.h === t.h ? st.mask.ids : null, hov = st.hover
      for (let i = 0; i < g.M.length; i++) {
        if (!g.M[i]) { out[i] = 0; continue }
        let u = g.U[i] - shift; u -= Math.floor(u)
        const ti = g.ROW[i] + ((u * tw) | 0), c = data[ti], s = g.S[i]
        let r = c & 255, gr = (c >> 8) & 255, b = (c >> 16) & 255
        const id = ids ? ids[ti] : 0
        if (id) {
          const col = rgb[id], al = id === hov ? 0.85 : (id === 1 ? 0.72 : 0.6), ia = 1 - al
          r = r * ia + col[0] * al; gr = gr * ia + col[1] * al; b = b * ia + col[2] * al
        }
        r = Math.min(255, r * s); gr = Math.min(255, gr * s); b = Math.min(255, b * s * 1.04)
        out[i] = 0xFF000000 | (b << 16) | (gr << 8) | r
      }
      g.ctx.putImageData(g.out, 0, 0)
      return g.cnv
    }

    const draw = (t) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) return
      if (canvas._w !== w || canvas._h !== h) { canvas.width = w * dpr; canvas.height = h * dpr; canvas._w = w; canvas._h = h }
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const R = Math.min(w * 0.37, h * 0.4), cx = w / 2, cy = h / 2
      st.view = { cx, cy, R }
      const P = project(st.rot, cx, cy, R)

      const halo = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.18)
      halo.addColorStop(0, 'rgba(96,165,250,0.55)'); halo.addColorStop(0.35, 'rgba(96,165,250,0.18)'); halo.addColorStop(1, 'rgba(96,165,250,0)')
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2); ctx.fill()

      ctx.save()
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip()
      if (st.tex) {
        ctx.drawImage(earth(Math.max(80, Math.min(Math.round(R * dpr), 360))), cx - R, cy - R, R * 2, R * 2)
      } else {
        const sea = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4, R * 0.1, cx, cy, R)
        sea.addColorStop(0, '#2C6BA8'); sea.addColorStop(1, '#0B2545')
        ctx.fillStyle = sea; ctx.fillRect(cx - R, cy - R, R * 2, R * 2)
      }
      const rim = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R)
      rim.addColorStop(0, 'rgba(120,180,255,0)'); rim.addColorStop(1, 'rgba(140,195,255,0.38)')
      ctx.fillStyle = rim; ctx.fillRect(cx - R, cy - R, R * 2, R * 2)
      ctx.restore()

      if (st.shapes) {
        for (const s of st.shapes) {
          const path = new Path2D()
          for (const ring of s.rings) {
            let pen = false
            for (const v of ring) {
              const p = P(v)
              if (p[2] < 0.03) { pen = false; continue }
              if (!pen) { path.moveTo(p[0], p[1]); pen = true } else path.lineTo(p[0], p[1])
            }
          }
          ctx.lineJoin = 'round'
          ctx.lineWidth = s.code === 'NP' ? 3 : 2.2; ctx.strokeStyle = 'rgba(8,14,30,0.5)'; ctx.stroke(path)
          ctx.lineWidth = s.code === 'NP' ? 1.6 : 1.2; ctx.strokeStyle = s.code === 'NP' ? '#FFFFFF' : (colorOf[s.code] || '#FFFFFF'); ctx.stroke(path)
        }
      }

      const labels = []
      for (const d of routes) {
        const pp = d.arc.map(P), prog = (t * 0.00007 + d.offset) % 1, k = Math.floor(prog * (pp.length - 2))
        ctx.lineCap = 'round'
        for (let s = 1; s < pp.length; s++) {
          const z = (pp[s][2] + pp[s - 1][2]) / 2; if (z < -0.12) continue
          const flown = s <= k + 1
          ctx.strokeStyle = d.color; ctx.globalAlpha = (flown ? 0.95 : 0.35) * (0.45 + 0.55 * Math.max(0, z))
          ctx.lineWidth = flown ? 2.2 : 1.4
          ctx.setLineDash(flown ? [] : [3, 5])
          ctx.beginPath(); ctx.moveTo(pp[s - 1][0], pp[s - 1][1]); ctx.lineTo(pp[s][0], pp[s][1]); ctx.stroke()
        }
        ctx.setLineDash([]); ctx.globalAlpha = 1
        const q = pp[k], q2 = pp[k + 1]
        if (q[2] > -0.05) drawPlane(ctx, q[0], q[1], Math.atan2(q2[1] - q[1], q2[0] - q[0]), 0.95 + 0.35 * Math.max(0, q[2]), d.color)
        const end = P(d.v)
        if (end[2] > 0.1) {
          ctx.fillStyle = d.color; ctx.beginPath(); ctx.arc(end[0], end[1], 4, 0, Math.PI * 2); ctx.fill()
          ctx.strokeStyle = '#0E1424'; ctx.lineWidth = 1.5; ctx.stroke()
          labels.push({ x: end[0], y: end[1], code: d.code })
        }
      }

      const k = P(nepal)
      if (k[2] > -0.05) {
        ctx.fillStyle = 'rgba(239,68,68,0.35)'; ctx.beginPath(); ctx.arc(k[0], k[1], 10 + 4 * Math.sin(t * 0.004), 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#C8202F'; ctx.beginPath(); ctx.arc(k[0], k[1], 5.5, 0, Math.PI * 2); ctx.fill()
        ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2; ctx.stroke()
        if (k[2] > 0.1) labels.push({ x: k[0], y: k[1], code: 'NP' })
      }

      // destination labels are real links positioned over the canvas; Kathmandu is drawn
      labels.sort((p, q) => p.y - q.y)
      let lastL = -1e9, lastR = -1e9
      const shown = {}
      for (const L of labels) {
        const right = L.x >= cx, el = pillRefs.current[L.code]
        ctx.font = '600 11px "Geist Mono", monospace'
        const tw = L.code === 'NP' ? Math.ceil(ctx.measureText(CITIES.NP.label).width) + 24 : (el && el.offsetWidth) || 130
        const ly = Math.max(L.y - 11, (right ? lastR : lastL) + 28)
        if (right) lastR = ly; else lastL = ly
        const lx = Math.max(4, Math.min(right ? L.x + 16 : L.x - 16 - tw, w - tw - 4))   // keep labels inside the canvas
        ctx.strokeStyle = 'rgba(14,20,36,0.5)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(L.x, L.y); ctx.lineTo(right ? lx : lx + tw, ly + 11); ctx.stroke()
        if (L.code === 'NP') {
          ctx.fillStyle = '#C8202F'; ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(lx, ly, tw, 22, 11); else ctx.rect(lx, ly, tw, 22); ctx.fill()
          ctx.fillStyle = '#FFFFFF'; ctx.fillText(CITIES.NP.label, lx + 12, ly + 15)
        } else if (el) {
          el.style.transform = `translate(${Math.round(lx)}px,${Math.round(ly)}px)`
          el.style.visibility = 'visible'
          shown[L.code] = true
        }
      }
      for (const code in pillRefs.current) {
        const el = pillRefs.current[code]
        if (el && !shown[code]) el.style.visibility = 'hidden'
      }
    }

    const loop = (ts) => {
      st.raf = requestAnimationFrame(loop)
      if (!st.visible || document.hidden) return
      if (!st.drag && !reduced && !st.hover) st.rot += 0.0016
      try { draw(reduced ? 0 : ts) } catch { /* never break the page */ }
    }
    st.raf = requestAnimationFrame(loop)

    // pause when the hero is off screen
    let io
    try {
      io = new IntersectionObserver(([e]) => { st.visible = e.isIntersecting }, { rootMargin: '100px' })
      io.observe(canvas)
    } catch { /* always visible */ }

    return () => {
      cancelAnimationFrame(st.raf)
      clearTimeout(loadTimer)
      img.onload = null
      if (io) io.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [navigate])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="globe-canvas"
        role="img"
        aria-label="Rotating 3D Earth with Nepal and our seven destination countries highlighted, and airplanes flying from Kathmandu to London, New York, Toronto, Sydney, Auckland, Tokyo and Seoul"
      />
      {DESTINATIONS.map(d => {
        const setRef = (el) => { pillRefs.current[d.code] = el }
        const inner = <><i style={{ background: d.color }} />{CITIES[d.code].label} ↗</>
        return d.to.startsWith('/#')
          ? <a key={d.code} ref={setRef} className="globe-pill" href={d.to}>{inner}</a>
          : <Link key={d.code} ref={setRef} className="globe-pill" to={d.to}>{inner}</Link>
      })}
    </>
  )
}
