import React from 'react'

const LandingHero: React.FC = () => {
  return (
    <div className="page landing-hero">
      <section className="hero">
        <h2>Landing / Hero</h2>
        <p>Large eye-catching hero with headline, subhead and primary CTA.</p>
        <div className="hero-ctas">
          <button className="btn primary">Get started</button>
          <button className="btn outline">Learn more</button>
        </div>
      </section>
    </div>
  )
}

export default LandingHero
