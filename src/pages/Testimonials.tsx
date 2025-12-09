import React from 'react'

const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto page testimonials">
        <section className="section">
        <h2>Testimonials</h2>
        <p>Customer quotes and success stories showcasing value.</p>
        <div className="testimonials-grid grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {[1,2,3].map((n)=> (
            <blockquote key={n} className="testimonial card">
              <p>“This product transformed our workflow — 10/10”</p>
              <cite>- Happy Customer {n}</cite>
            </blockquote>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}

export default Testimonials
