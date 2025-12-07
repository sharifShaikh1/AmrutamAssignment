import React from 'react'
import { useParams, Link } from 'react-router-dom'

const UserDetail: React.FC = () => {
  const { id } = useParams()

  return (
    <div className="page user-detail">
      <section className="section header-row">
        <div>
          <h2>User #{id}</h2>
          <p className="muted">User profile and settings</p>
        </div>
        <div>
          <Link to="/users" className="btn outline">Back</Link>
        </div>
      </section>

      <section className="card">
        <h4>Profile</h4>
        <p>Role, email and other information.</p>
      </section>
    </div>
  )
}

export default UserDetail
