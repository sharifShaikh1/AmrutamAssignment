import React from 'react'
import { useParams, Link } from 'react-router-dom'

const ProjectDetail: React.FC = () => {
  const { id } = useParams()

  return (
    <div className="page project-detail">
      <section className="section">
        <div className="header-row">
          <div>
            <h2>Project #{id}</h2>
            <p className="muted">Detailed view and settings for this project</p>
          </div>
          <div>
            <Link to="/projects" className="btn outline">Back</Link>
            <button className="btn primary">Save</button>
          </div>
        </div>

        <div className="card detail-grid">
          <div className="col">
            <h4>Overview</h4>
            <p>Core details of the project: description, status and quick stats.</p>
          </div>

          <div className="col">
            <h4>Members</h4>
            <ul>
              <li>Alex — Owner</li>
              <li>Sam — Developer</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
