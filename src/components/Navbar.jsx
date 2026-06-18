import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav-logo">
        <span>{'<'}</span>DevZack<span>{'/>'}</span>
      </div>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} onClick={(e) => scrollTo(e, l.href)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="mailto:devzack@proton.me"
        className="nav-cta"
        onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
      >
        Hire Me
      </a>
    </nav>
  )
}
