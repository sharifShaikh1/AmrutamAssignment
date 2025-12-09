import React from 'react'

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto page pricing-page">
        <section className="section">
        <h2>Pricing & Plans</h2>
        <p>Clear tiered pricing with a recommended plan highlighted.</p>
        <div className="pricing-grid flex flex-col sm:flex-row gap-4 mt-4">
          <div className="card pricing recommended">
            <h4>Pro</h4>
            <div className="price">$29 / mo</div>
            <ul>
              <li>Unlimited projects</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
            </ul>
            <button className="btn primary">Choose Pro</button>
          </div>

          <div className="card pricing">
            <h4>Starter</h4>
            <div className="price">$9 / mo</div>
            <ul>
              <li>Small teams</li>
              <li>Basic analytics</li>
            </ul>
            <button className="btn outline">Choose Starter</button>
          </div>

          <div className="card pricing">
            <h4>Enterprise</h4>
            <div className="price">Contact</div>
            <ul>
              <li>Custom SLAs</li>
              <li>Dedicated support</li>
            </ul>
            <button className="btn outline">Contact Sales</button>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Pricing
