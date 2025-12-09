import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, Search, Plus, RotateCw, Download } from 'lucide-react'

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
  // pagination state (simulated server-side dataset of totalCount)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 7
  const totalCount = 80
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) setSelectedRows([])
    else setSelectedRows(rows.map(r => r.id))
  }

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) setSelectedRows(selectedRows.filter(x => x !== id))
    else setSelectedRows([...selectedRows, id])
  }

  const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1))
  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1))
  const goTo = (p: number) => setCurrentPage(() => Math.max(1, Math.min(totalPages, p)))

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 lg:py-8 font-sans text-slate-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

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
          <div className="sticky top-0 z-30 bg-white p-6 border-b border-slate-50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
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
            {/* Top pagination - visible on small screens and tablet */}
            <div className="mt-3 xl:mt-0 flex items-center gap-2 justify-end w-full xl:w-auto">
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * pageSize + 1}</span>-<span className="font-semibold text-slate-700">{Math.min(currentPage * pageSize, totalCount)}</span> of <span className="font-semibold text-slate-700">{totalCount}</span></div>
              <div className="flex items-center gap-2">
                <button onClick={goPrev} disabled={currentPage === 1} className="sm:hidden p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50">
                  <ChevronLeft size={18} />
                </button>
                <div className="hidden sm:flex items-center gap-1 rounded-lg bg-white border border-slate-100">
                  <button onClick={goPrev} disabled={currentPage === 1} className="px-3 py-2 rounded-l-lg text-sm text-slate-600 disabled:opacity-50">Prev</button>
                  <div className="px-3 text-sm text-slate-700 font-semibold">{currentPage}/{totalPages}</div>
                  <button onClick={goNext} disabled={currentPage === totalPages} className="px-3 py-2 rounded-r-lg text-sm text-slate-600 disabled:opacity-50">Next</button>
                </div>
                <button onClick={goNext} disabled={currentPage === totalPages} className="sm:hidden p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-800 font-bold border-b border-slate-50 sticky top-28 z-20">
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
          <div className="p-4 sm:p-6 border-t border-slate-50 text-slate-400 text-sm font-medium">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <div className="text-xs sm:text-sm">Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * pageSize + 1}</span>-<span className="font-semibold text-slate-700">{Math.min(currentPage * pageSize, totalCount)}</span> of <span className="font-semibold text-slate-700">{totalCount}</span></div>
                {/* page size / other info for larger screens - hidden on very small */}
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">Per page: <span className="font-semibold text-slate-700">{pageSize}</span></div>
              </div>

              {/* Desktop / tablet page controls */}
              <div className="hidden sm:flex items-center gap-2">
                <button onClick={goPrev} disabled={currentPage === 1} className="px-3 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50">Prev</button>

                {/* small page list (up to 5 pages visible) */}
                <div className="flex items-center gap-1 bg-white border border-slate-100 rounded-lg px-1 py-1">
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                    // create a small window centered around currentPage when many pages exist
                    const start = Math.max(1, Math.min(currentPage - 2, Math.max(1, totalPages - 4)) )
                    const page = start + idx
                    return (
                      <button key={page} onClick={() => goTo(page)} className={`px-3 py-1 rounded ${page === currentPage ? 'bg-[#E6F6EA] text-[#13431b] font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                        {page}
                      </button>
                    )
                  })}
                </div>

                <button onClick={goNext} disabled={currentPage === totalPages} className="px-3 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50">Next</button>
              </div>

              {/* Mobile: large easy-to-tap controls */}
              <div className="sm:hidden w-full flex items-center gap-2 justify-between mt-2">
                <button onClick={goPrev} disabled={currentPage === 1} className="flex-1 p-3 rounded-xl bg-slate-50 text-slate-700 font-semibold disabled:opacity-50">Prev</button>
                <div className="text-sm text-slate-700 font-semibold">{currentPage}/{totalPages}</div>
                <button onClick={goNext} disabled={currentPage === totalPages} className="flex-1 p-3 rounded-xl bg-[#3A643B] text-white font-semibold disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPending
