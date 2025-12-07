import React from 'react'

const Settings: React.FC = () => {
  return (
    <div className="page settings">
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
  )
}

export default Settings
