import React from 'react'

const aboutSkills = [
  'Solidity', 'EVM Internals', 'Foundry', 'Hardhat',
  'Slither', 'Echidna', 'Flash Loans', 'Proxy Patterns',
  'Rust (basic)', 'Python', 'Cast / Anvil', 'Git',
]

const certs = [
  { icon: '🏅', name: 'Certified Smart Contract Auditor', org: 'In Progress — Cyfrin Updraft' },
  { icon: '⚔️',  name: 'CTF Participant', org: 'Ethernaut · Damn Vulnerable DeFi' },
  { icon: '🔬', name: 'Independent Security Researcher', org: 'Web3 DeFi Protocols' },
]

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">// 01 — About</p>
          <h2 className="section-title">Who I Am</h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I'm <span>DevZack</span>, a Web3 security researcher focused on smart contract
              vulnerabilities and DeFi attack vectors. My work is PoC-first — I don't flag
              theoretical issues, I demonstrate working exploits.
            </p>
            <p>
              I specialize in <span>Solidity audits</span>, <span>flash loan attack paths</span>,
              and <span>proxy pattern vulnerabilities</span>. Every finding in my research section
              includes a terminal trace of the exploit passing in a forked environment.
            </p>
            <p>
              Currently pursuing private audit engagements and bug bounty programs on Web3-native
              platforms. I operate independently — no CV, no gatekeeping. My code speaks.
            </p>
            <div className="skills-grid">
              {aboutSkills.map((s) => (
                <div className="skill-item" key={s}>{s}</div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="about-card">
              <div className="about-card-title">// CREDENTIALS & ACTIVITY</div>
              {certs.map((c) => (
                <div className="cert-item" key={c.name}>
                  <span className="cert-icon">{c.icon}</span>
                  <div>
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-org">{c.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
