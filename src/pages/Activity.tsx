import React from 'react'

const Activity: React.FC = () => {
  const items = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    text: `User ${i + 1} updated Project ${((i%3)+1)}`,
    time: `${i + 1}h ago`
  }))

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 lg:py-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 page activity">
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
    </div>
  )
}

export default Activity
