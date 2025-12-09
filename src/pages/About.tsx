import React from 'react'

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto page about">
        <section className="section">
        <h2>About Us</h2>
        <p>Mission, vision and a short history about the company or product.</p>
        <div className="content card p-4 sm:p-6">
          <p>We build delightful products that help teams ship faster.</p>
        </div>
      </section>
      </div>
    </div>
  )
}

export default About
