import React from 'react'

const Testimonials: React.FC = () => {
  return (
    <div className="page testimonials">
      <section className="section">
        <h2>Testimonials</h2>
        <p>Customer quotes and success stories showcasing value.</p>
        <div className="testimonials-grid">
          {[1,2,3].map((n)=> (
            <blockquote key={n} className="testimonial card">
              <p>“This product transformed our workflow — 10/10”</p>
              <cite>- Happy Customer {n}</cite>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Testimonials
