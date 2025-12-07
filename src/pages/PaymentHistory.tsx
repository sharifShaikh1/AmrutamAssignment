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

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Header & Toolbar */}
          <div className="p-6 border-b border-slate-50 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
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
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-800 font-bold border-b border-slate-50 sticky top-0 z-10">
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

          {/* Pagination */}
          <div className="p-6 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-sm font-medium">
            <div className="text-xs sm:text-sm">Rows per page: 7</div>
            <div className="flex items-center gap-6">
              <span className="text-xs sm:text-sm">1-7 of 80</span>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50">
                  <ChevronLeft size={18} />
                </button>
                <button className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-600 transition-colors">
                  <ChevronRight size={18} />
                </button>
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