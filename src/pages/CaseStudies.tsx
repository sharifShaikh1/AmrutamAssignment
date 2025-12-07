import React from 'react'

const CaseStudies: React.FC = () => {
  return (
    <div className="page case-studies">
      <section className="section">
        <h2>Case Studies</h2>
        <p>In-depth stories of customers who achieved great results.</p>
        <div className="cards grid-2">
          {["Acme","BetaCorp"].map((c) => (
            <article className="card case" key={c}>
              <h4>{c}</h4>
              <p>Results and metrics from their deployment.</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CaseStudies
