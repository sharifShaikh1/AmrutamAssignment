import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectForm: React.FC = () => {
  const nav = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 lg:py-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 page project-form">
        <section className="section">
        <div className="header-row">
          <div>
            <h2>New Project</h2>
            <p className="muted">Create a new project</p>
          </div>
          <div>
            <button className="btn outline" onClick={() => nav(-1)}>Cancel</button>
            <button className="btn primary">Create</button>
          </div>
        </div>

        <form className="card form-card">
          <label>Project name<br /><input name="name" /></label>
          <label>Description<br /><textarea name="desc" /></label>
          <label>Owner<br /><input name="owner" /></label>
        </form>
        </section>
      </div>
    </div>
  )
}

export default ProjectForm
