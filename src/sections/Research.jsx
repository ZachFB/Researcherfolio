import React, { useState } from 'react'
import { pocData } from '../data/research.js'

function Terminal({ lines }) {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <div className="terminal-dot dot-red" />
        <div className="terminal-dot dot-yellow" />
        <div className="terminal-dot dot-green" />
        <span className="terminal-title">exploit.sh — PoC trace</span>
      </div>
      <div className="terminal-body">
        {lines.map((l, i) => (
          <span key={i} className={`term-line term-${l.type}`}>
            {l.text}
          </span>
        ))}
      </div>
    </div>
  )
}

function PocCard({ poc }) {
  const [open, setOpen] = useState(false)

  const severityClass = {
    critical: 'severity-critical',
    high: 'severity-high',
    medium: 'severity-medium',
  }[poc.severity]

  return (
    <div className="poc-card reveal" onClick={() => setOpen(!open)}>
      {poc.badge && (
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
          color: '#020C1B',
          fontSize: '0.62rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: '700',
          padding: '0.25rem 0.65rem',
          borderRadius: '0 8px 0 8px',
          letterSpacing: '0.1em',
          zIndex: 1,
        }}>
          ✦ REAL AUDIT
        </div>
      )}
      <div className="poc-header">
        <span className={`poc-severity ${severityClass}`}>{poc.severity}</span>
        <span className="poc-status">{poc.status}</span>
      </div>
      <h3 className="poc-title">{poc.title}</h3>
      <div className="poc-target">📍 {poc.target}</div>
      <p className="poc-desc">{poc.description}</p>
      <div className="poc-tags">
        {poc.tags.map((t) => (
          <span className="poc-tag" key={t}>{t}</span>
        ))}
      </div>
      {open && <Terminal lines={poc.terminal} />}
      <div style={{
        marginTop: '1rem',
        fontSize: '0.72rem',
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--accent)',
        opacity: 0.7,
        position: 'relative'
      }}>
        {open ? '▲ hide exploit trace' : '▼ show exploit trace'}
      </div>
    </div>
  )
}

export default function Research() {
  return (
    <section id="research" className="research-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">// 02 — Research</p>
          <h2 className="section-title">Confirmed PoCs</h2>
        </div>
        <p className="reveal" style={{
          color: 'var(--text-mid)',
          marginBottom: '3rem',
          maxWidth: '600px',
          fontSize: '0.95rem',
          lineHeight: '1.8'
        }}>
          Each finding below includes a working exploit trace. Click any card to reveal the
          terminal output from the PoC run on a forked environment.
        </p>
        <div className="research-grid">
          {pocData.map((poc) => (
            <PocCard key={poc.id} poc={poc} />
          ))}
        </div>
      </div>
    </section>
  )
}
