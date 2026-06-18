import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar  from '../components/Navbar.jsx'
import Hero    from '../sections/Hero.jsx'
import About   from '../sections/About.jsx'
import Research from '../sections/Research.jsx'
import Skills  from '../sections/Skills.jsx'
import Contact from '../sections/Contact.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  // Global scroll reveal for all .reveal elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Research />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <p className="footer-text">
          Built by <span>DevZack</span> — Web3 Security Researcher &nbsp;·&nbsp;{' '}
          <span>{'<'}</span>code is law, until it isn't<span>{'/>'}</span>
        </p>
      </footer>
    </>
  )
}
