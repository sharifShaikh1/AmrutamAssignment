import React, { useState } from 'react'
import { ChevronRight, Search, Plus, RotateCw, Download } from 'lucide-react'

const PaymentPending: React.FC = () => {
  const rows = Array.from({ length: 7 }).map((_, i) => ({
    id: i + 1,
    name: ['Isabel Wiza','Soumya Maheswari','Margie O\'Reilley','Lucas Legros'][i%4],
    email: 'alinamath@gmail.com',
    mobile: '+91 8805322849',
    amount: '4,290',
    requested: '1 Feb 2024',
    wallet: '30,000'
  }))

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) setSelectedRows([])
    else setSelectedRows(rows.map(r => r.id))
  }

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) setSelectedRows(selectedRows.filter(x => x !== id))
    else setSelectedRows([...selectedRows, id])
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-[1600px] mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span>Affiliate</span>
          <ChevronRight size={14} />
          <span>Payment</span>
          <ChevronRight size={14} />
          <span className="text-[#3A643B] font-medium">Pending Payment</span>
        </div>

        {/* Main Card Container - match PaymentHistory sizing & style */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <h2 className="text-xl font-bold text-slate-800 flex-shrink-0">Pending Payment</h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
              <div className="relative group w-full sm:w-80">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3A643B] transition-colors">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search here" 
                  className="bg-[#F8F9FA] border-none rounded-full pl-11 pr-4 py-3 text-sm w-full focus:ring-2 focus:ring-[#3A643B]/20 focus:bg-white transition-all outline-none text-slate-600 placeholder-slate-400 font-medium"
                />
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button onClick={toggleSelectAll} className={`p-2.5 rounded-xl transition-all ${selectedRows.length === rows.length ? 'bg-green-50 text-[#3A643B]' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}>
                  Select
                </button>
                <button className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-shadow shadow-sm"><RotateCw size={18} /></button>
                <button className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-shadow shadow-sm"><Download size={18} /></button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-800 font-bold border-b border-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-5 w-12">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-[#3A643B] focus:ring-[#3A643B]"
                      checked={selectedRows.length === rows.length && rows.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-5">Doctor Name</th>
                  <th className="px-6 py-5">Email-Id</th>
                  <th className="px-6 py-5">Mobile</th>
                  <th className="px-6 py-5">Amount Withdrawal</th>
                  <th className="px-6 py-5">Requested Date</th>
                  <th className="px-6 py-5">Wallet Amount</th>
                  <th className="px-6 py-5 text-center">Details</th>
                  <th className="px-6 py-5">Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-5">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-[#3A643B] focus:ring-[#3A643B]"
                        checked={selectedRows.includes(r.id)}
                        onChange={() => toggleRow(r.id)}
                      />
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-700">{r.name}</td>
                    <td className="px-6 py-5 text-slate-500 font-medium">{r.email}</td>
                    <td className="px-6 py-5 text-slate-600 font-medium">{r.mobile}</td>
                    <td className="px-6 py-5 text-slate-800 font-bold">{r.amount}</td>
                    <td className="px-6 py-5 text-slate-500">{r.requested}</td>
                    <td className="px-6 py-5 text-slate-800 font-bold">{r.wallet}</td>
                    <td className="px-6 py-5 text-center">
                      <button className="text-[#3A643B] hover:text-[#2d502e] font-bold text-xs hover:underline transition-all">View All</button>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`font-bold text-xs text-green-500`}>Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (small) */}
          <div className="p-6 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-sm font-medium">
            <div className="text-xs sm:text-sm">Rows per page: {rows.length}</div>
            <div className="flex items-center gap-6">
              <span className="text-xs sm:text-sm">1-{rows.length} of 80</span>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50">
                  {/* empty left */}
                </button>
                <button className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-600 transition-colors">
                  {/* empty right */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPending
