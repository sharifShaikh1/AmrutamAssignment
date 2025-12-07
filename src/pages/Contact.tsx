import React from 'react'

const Contact: React.FC = () => {
  return (
    <div className="page contact">
      <section className="section">
        <h2>Contact</h2>
        <p>Contact form and contact details (email / address).</p>
        <form className="card contact-form">
          <label>Name<br /><input type="text" name="name" /></label>
          <label>Email<br /><input type="email" name="email" /></label>
          <label>Message<br /><textarea name="message" /></label>
          <button className="btn primary">Send</button>
        </form>
      </section>
    </div>
  )
}

export default Contact
