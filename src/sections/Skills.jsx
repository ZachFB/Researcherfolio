import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillsData } from '../data/research.js'

gsap.registerPlugin(ScrollTrigger)

function SkillCategory({ cat }) {
  const ref = useRef(null)

  useEffect(() => {
    const bars = ref.current.querySelectorAll('.skill-bar-fill')
    bars.forEach((bar, i) => {
      const pct = cat.skills[i].pct
      gsap.to(bar, {
        width: `${pct}%`,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.15,
      })
    })
  }, [])

  return (
    <div className="skill-category reveal" ref={ref}>
      <div className="skill-cat-header">
        <span className="skill-cat-icon">{cat.icon}</span>
        <span className="skill-cat-name">{cat.name}</span>
      </div>
      <div className="skill-bars">
        {cat.skills.map((s) => (
          <div className="skill-bar-item" key={s.name}>
            <div className="skill-bar-label">
              <span className="skill-bar-name">{s.name}</span>
              <span className="skill-bar-pct">{s.pct}%</span>
            </div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">// 03 — Skills</p>
          <h2 className="section-title">Technical Stack</h2>
        </div>
        <div className="skills-categories">
          {skillsData.map((cat) => (
            <SkillCategory key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
