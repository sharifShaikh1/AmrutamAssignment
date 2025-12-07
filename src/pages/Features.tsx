import React from 'react'

const Features: React.FC = () => {
  return (
    <div className="page features">
      <section className="section">
        <h2>Features</h2>
        <p>Grid of feature cards with icons and short descriptions.</p>
        <div className="cards grid-3">
          {["Fast","Secure","Scalable"].map((t) => (
            <div key={t} className="card feature">
              <div className="icon">🔹</div>
              <h4>{t}</h4>
              <p>Short description of the feature and its value.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Features
