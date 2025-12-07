import React from 'react'

const Activity: React.FC = () => {
  const items = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    text: `User ${i + 1} updated Project ${((i%3)+1)}`,
    time: `${i + 1}h ago`
  }))

  return (
    <div className="page activity">
      <section className="section">
        <h2>Activity Log</h2>
        <p className="muted">Recent user activity and system events.</p>
      </section>

      <section className="card">
        <ul className="activity-list">
          {items.map(it => (
            <li key={it.id}><strong>{it.text}</strong> <span className="muted">{it.time}</span></li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Activity
