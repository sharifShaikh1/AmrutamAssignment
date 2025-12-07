import React from 'react'

const Invoices: React.FC = () => {
  const rows = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 101,
    customer: ['Acme', 'Beta', 'Gamma'][i % 3],
    amount: `$${(i+1)*120}.00`,
    status: ['Paid','Pending','Overdue'][i % 3]
  }))

  return (
    <div className="page invoices">
      <section className="section header-row">
        <div>
          <h2>Invoices</h2>
          <p className="muted">Billing and invoices</p>
        </div>
        <div>
          <button className="btn primary">New Invoice</button>
        </div>
      </section>

      <section className="card table-card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Customer</th><th>Amount</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.customer}</td>
                <td>{r.amount}</td>
                <td><span className={`badge ${r.status.toLowerCase()}`}>{r.status}</span></td>
                <td className="actions">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Invoices
