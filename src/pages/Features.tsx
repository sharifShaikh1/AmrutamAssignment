import React from 'react'

const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto page features">
        <section className="section">
        <h2>Features</h2>
        <p>Grid of feature cards with icons and short descriptions.</p>
        <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Fast","Secure","Scalable"].map((t) => (
            <div key={t} className="card feature p-4">
              <div className="icon">🔹</div>
              <h4>{t}</h4>
              <p>Short description of the feature and its value.</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}

export default Features
