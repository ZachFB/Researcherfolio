import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(selector = '.reveal', options = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])
}
