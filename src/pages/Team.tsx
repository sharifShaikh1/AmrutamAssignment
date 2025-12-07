import React from 'react'

const Team: React.FC = () => {
  return (
    <div className="page team">
      <section className="section">
        <h2>Team</h2>
        <p>Profiles for the core team members with short bios.</p>
        <div className="team-grid">
          {["Alex","Sam","Priya","Chen"].map((name) => (
            <div className="card person" key={name}>
              <div className="avatar">👤</div>
              <h4>{name}</h4>
              <p>Short bio or role</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Team
