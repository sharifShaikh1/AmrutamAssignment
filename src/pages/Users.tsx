import React from 'react'
import { Link } from 'react-router-dom'

const Users: React.FC = () => {
  const users = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: ['Alex','Sam','Priya','Chen','Rui','Lina'][i % 6],
    role: ['Admin','Member'][i % 2],
  }))

  return (
    <div className="page users">
      <section className="section header-row">
        <div>
          <h2>Users</h2>
          <p className="muted">Team and account users</p>
        </div>
        <div>
          <Link to="/users/new" className="btn primary">Invite</Link>
        </div>
      </section>

      <section className="card table-card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Role</th><th></th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td className="actions"><Link to={`/users/${u.id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Users
