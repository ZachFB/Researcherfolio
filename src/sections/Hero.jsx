import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const roles = [
  'Smart Contract Auditor',
  'Web3 Security Researcher',
  'Bug Bounty Hunter',
  'DeFi Vulnerability Analyst',
]

export default function Hero() {
  const eyebrowRef = useRef(null)
  const nameRef = useRef(null)
  const descRef = useRef(null)
  const actionsRef = useRef(null)
  const statsRef = useRef(null)
  const [displayText, setDisplayText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Hero entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(nameRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to(descRef.current,    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to(statsRef.current,   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.1')
  }, [])

  // Typing effect
  useEffect(() => {
    const current = roles[roleIdx]
    let timeout

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40)
      } else {
        setIsDeleting(false)
        setRoleIdx((i) => (i + 1) % roles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIdx])

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="container">
        <div className="hero-content">
          <p className="hero-eyebrow" ref={eyebrowRef}>
            // Web3 Security Research
          </p>
          <h1 className="hero-name" ref={nameRef}>DevZack</h1>
          <div className="hero-role">
            {displayText}
            <span className="cursor" />
          </div>
          <p className="hero-desc" ref={descRef}>
            I find what protocols miss — reentrancy, oracle manipulation, flash loan exploits,
            access control gaps. Every PoC I write is a vulnerability confirmed, not just suspected.
            Available for private audits, bug bounty programs, and security reviews.
          </p>
          <div className="hero-actions" ref={actionsRef}>
            <button className="btn-primary" onClick={() => scrollTo('#research')}>
              View Research
            </button>
            <button className="btn-outline" onClick={() => scrollTo('#contact')}>
              Get In Touch
            </button>
          </div>
          <div className="hero-stats" ref={statsRef}>
            <div>
              <div className="stat-value">3</div>
              <div className="stat-label">Real Audits</div>
            </div>
            <div>
              <div className="stat-value">2×H</div>
              <div className="stat-label">High Severity</div>
            </div>
            <div>
              <div className="stat-value">Web3</div>
              <div className="stat-label">DeFi Specialized</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
