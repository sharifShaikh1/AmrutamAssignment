import React from 'react'
import { useParams, Link } from 'react-router-dom'

const UserDetail: React.FC = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 lg:py-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 page user-detail">
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
    </div>
  )
}

export default UserDetail
