import React from 'react'

const links = [
  { 
    icon: '📨', 
    label: 'Email', 
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=justemignon3@gmail.com' 
  },
  { icon: '🐙', label: 'GitHub', href: 'https://github.com/ZachFB' },
  { icon: '🐦', label: 'Twitter / X', href: 'https://x.com/DZack69922' },
]

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-inner">
          <div className="reveal">
            <p className="section-eyebrow" style={{ marginBottom: '1.5rem' }}>// 04 — Contact</p>
            <h2 className="contact-title">
              Let's <span>Work</span> Together
            </h2>
            <p className="contact-desc">
              Looking for a private audit, bug bounty collaboration, or security review?
              I respond to serious inquiries only. No intermediaries — direct contact.
            </p>
            <div className="contact-links">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{l.icon}</span>
                  <span>{l.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
