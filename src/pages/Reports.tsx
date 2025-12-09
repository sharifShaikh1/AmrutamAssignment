import React from 'react'

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 lg:py-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 page reports">
      <section className="section">
        <h2>Reports</h2>
        <p className="muted">Exportable reports and metrics</p>
      </section>

      <section className="card">
        <div className="grid cards">
          <div className="card">Monthly report (placeholder)</div>
          <div className="card">Team activity (placeholder)</div>
          <div className="card">Billing overview (placeholder)</div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Reports
