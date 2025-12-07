import React from 'react'
import { Link } from 'react-router-dom'

const Projects: React.FC = () => {
  const rows = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Project ${i + 1}`,
    owner: ['Alex','Sam','Priya','Chen'][i % 4],
    status: ['Active','Paused','Completed'][i % 3],
    updated: `${i + 1}d ago`
  }))

  return (
    <div className="page projects">
      <section className="section header-row">
        <div>
          <h2>Projects</h2>
          <p className="muted">View and manage all projects</p>
        </div>
        <div>
          <Link to="/projects/new" className="btn primary">New Project</Link>
        </div>
      </section>

      <section className="card table-card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.owner}</td>
                <td><span className={`badge ${r.status.toLowerCase()}`}>{r.status}</span></td>
                <td>{r.updated}</td>
                <td className="actions"><Link to={`/projects/${r.id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Projects
