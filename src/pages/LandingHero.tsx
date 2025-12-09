import React from 'react'

const LandingHero: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto page landing-hero">
        <section className="hero">
        <h2>Landing / Hero</h2>
        <p>Large eye-catching hero with headline, subhead and primary CTA.</p>
        <div className="hero-ctas flex flex-wrap gap-3 mt-4">
          <button className="btn primary">Get started</button>
          <button className="btn outline">Learn more</button>
        </div>
      </section>
      </div>
    </div>
  )
}

export default LandingHero
