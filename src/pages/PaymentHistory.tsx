import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  RotateCw, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown
} from 'lucide-react';

export default function PaymentHistoryPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // pagination state (simulated server-side dataset)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 7
  const totalCount = 80
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  // Toggle Selection Logic
  const toggleSelectAll = () => {
    if (selectedRows.length === mockHistoryData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockHistoryData.map(d => d.id));
    }
  };

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1))
  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1))
  const goTo = (p: number) => setCurrentPage(() => Math.max(1, Math.min(totalPages, p)))

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 lg:py-8 font-sans text-slate-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Header & Toolbar */}
          <div className="sticky top-0 z-30 bg-white p-6 border-b border-slate-50 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <h2 className="text-xl font-bold text-slate-800 flex-shrink-0">Payment History</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
              {/* Search Bar */}
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

              {/* Toolbar Actions */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <ToolbarButton icon={<Plus size={20} />} active />
                <ToolbarButton icon={<RotateCw size={20} />} active />
                <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block"></div>
                <ToolbarButton icon={<ArrowUpDown size={18} />} />
                <ToolbarButton icon={<Download size={18} />} />
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

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-800 font-bold border-b border-slate-50 sticky top-28 z-20">
                <tr>
                  <th className="px-6 py-5 w-12">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-[#3A643B] focus:ring-[#3A643B]"
                      checked={selectedRows.length === mockHistoryData.length && mockHistoryData.length > 0}
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
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Approval Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockHistoryData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-5">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-[#3A643B] focus:ring-[#3A643B]"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={row.img} 
                          alt={row.name} 
                          className="w-9 h-9 rounded-full object-cover shadow-sm border border-slate-100" 
                        />
                        <span className="font-semibold text-slate-700">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 font-medium">{row.email}</td>
                    <td className="px-6 py-5 text-slate-600 font-medium">{row.mobile}</td>
                    <td className="px-6 py-5 text-slate-800 font-bold">{row.withdrawal}</td>
                    <td className="px-6 py-5 text-slate-500">{row.date}</td>
                    <td className="px-6 py-5 text-slate-800 font-bold">{row.wallet}</td>
                    <td className="px-6 py-5 text-center">
                      <button className="text-[#3A643B] hover:text-[#2d502e] font-bold text-xs hover:underline transition-all">
                        View All
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`font-bold text-xs ${
                        row.status === 'Paid' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 font-medium">
                      {row.approvalDate}
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
  );
}

// --- Helper Components ---

const ToolbarButton = ({ icon, active }: { icon: React.ReactNode, active?: boolean }) => (
  <button className={`p-2.5 rounded-xl transition-all duration-200 ${active 
    ? 'bg-green-50 text-[#3A643B] hover:bg-green-100 hover:shadow-sm' 
    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
  }`}>
    {icon}
  </button>
);

// --- Mock Data ---
const mockHistoryData = [
  {
    id: 1,
    name: "Isabel Wiza",
    email: "alinamath@gmail.com",
    mobile: "+91 8805322849",
    withdrawal: "4,290",
    date: "1 Feb 2024",
    wallet: "30,000",
    status: "Paid",
    approvalDate: "1st October, 2023",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 2,
    name: "Soumya Maheswari",
    email: "alinamath@gmail.com",
    mobile: "+91 8805322849",
    withdrawal: "5,290",
    date: "1 Feb 2024",
    wallet: "30,000",
    status: "Decline",
    approvalDate: "2nd July, 2023",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 3,
    name: "Margie O'Reilly",
    email: "alinamath@gmail.com",
    mobile: "+91 8805322849",
    withdrawal: "4,290",
    date: "1 Feb 2024",
    wallet: "30,000",
    status: "Decline",
    approvalDate: "14th November, 2023",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 4,
    name: "Lucas Legros",
    email: "alinamath@gmail.com",
    mobile: "+91 8805322849",
    withdrawal: "4,290",
    date: "1 Feb 2024",
    wallet: "30,000",
    status: "Decline",
    approvalDate: "14th November, 2023",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 5,
    name: "Shanelle Ziemann",
    email: "alinamath@gmail.com",
    mobile: "+91 8805322849",
    withdrawal: "5,290",
    date: "1 Feb 2024",
    wallet: "30,000",
    status: "Paid",
    approvalDate: "15th December, 2023",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 6,
    name: "William Stephan",
    email: "alinamath@gmail.com",
    mobile: "+91 8805322849",
    withdrawal: "5,290",
    date: "1 Feb 2024",
    wallet: "30,000",
    status: "Paid",
    approvalDate: "15th December, 2023",
    img: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: 7,
    name: "Smith Birkin",
    email: "alinamath@gmail.com",
    mobile: "+91 8805322849",
    withdrawal: "5,290",
    date: "1 Feb 2024",
    wallet: "30,000",
    status: "Paid",
    approvalDate: "", 
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
  }
];