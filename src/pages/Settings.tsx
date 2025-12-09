import React from 'react'

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 lg:py-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 page settings">
      <section className="section header-row">
        <div>
          <h2>Settings</h2>
          <p className="muted">Application configuration and preferences</p>
        </div>
        <div>
          <button className="btn primary">Save settings</button>
        </div>
      </section>

      <section className="card form-card">
        <label>Organization name<br /><input /></label>
        <label>Default currency<br /><select><option>USD</option><option>EUR</option></select></label>
      </section>
      </div>
    </div>
  )
}

export default Settings
