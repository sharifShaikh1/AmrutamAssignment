
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  RotateCw,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ChevronDown,
  GripVertical
} from 'lucide-react'
import AddFaq from './AddFaq'
import FaqLimitModal from '../components/FaqLimitModal'

const ALL_FAQS = [
  { id: 1, question: "What types of consultations are available?", answer: "We offer video, audio, and chat consultations with certified Ayurvedic doctors. You can choose the mode that suits your convenience and needs." },
  { id: 2, question: "Can I get refund for the wallet money?", answer: "Wallet money is generally non-refundable. However, in exceptional cases where a technical error occurred during transaction, please contact support." },
  { id: 3, question: "What is the Amrutam Forum?", answer: "The Amrutam Forum is a community space where you can discuss health, wellness, and Ayurveda with experts and like-minded individuals." },
  { id: 4, question: "Can I pause the audio consultation?", answer: "Yes, you can pause the consultation if needed, but it's recommended to complete it in one go to ensure continuity of care." },
  { id: 5, question: "Is there a minimum duration for an audio consultation?", answer: "The minimum duration is 15 minutes. This ensures the doctor has enough time to understand your concerns." },
  { id: 6, question: "How do I reset my password?", answer: "Use the 'Forgot password' link on the login screen. You'll receive an OTP or reset link as configured." },
  { id: 7, question: "How can I update my profile details?", answer: "Go to Settings → Profile to update personal details and contact information." },
  { id: 8, question: "What payment methods are supported?", answer: "We accept cards, netbanking, UPI and wallets. Availability may vary by region." },
  { id: 9, question: "Can I cancel an appointment?", answer: "Yes — appointments can be cancelled up to 1 hour before the scheduled start time." },
  { id: 10, question: "Is my data secure?", answer: "We follow industry-standard encryption and data protection; sensitive information is never stored in plain text." },
  { id: 11, question: "How do I contact support?", answer: "Open the Help section or email support@example.com for assistance." },
  { id: 12, question: "Are there follow-up calls?", answer: "Follow-ups are available as part of premium consultations. See pricing for details." },
]

export default function FAQPage() {
  const location = useLocation();
  const origin = location.pathname.includes('/customization/web') ? 'Web' : 'App';
  const [showAddByOrigin, setShowAddByOrigin] = useState<Record<string, boolean>>({ Web: false, App: false })
  const showAdd = showAddByOrigin[origin] ?? false
  const setShowAdd = (v: boolean | ((prev:boolean)=>boolean)) => setShowAddByOrigin(prev => ({ ...prev, [origin]: typeof v === 'function' ? (v as any)(prev[origin] ?? false) : v }))

  const [showLimitModalByOrigin, setShowLimitModalByOrigin] = useState<Record<string, boolean>>({ Web: false, App: false })
  const showLimitModal = showLimitModalByOrigin[origin] ?? false
  const setShowLimitModal = (v: boolean | ((prev:boolean)=>boolean)) => setShowLimitModalByOrigin(prev => ({ ...prev, [origin]: typeof v === 'function' ? (v as any)(prev[origin] ?? false) : v }))
  const MAX_FAQS = 5

  const PAGE_SIZE = 5
  const totalPages = Math.ceil(ALL_FAQS.length / PAGE_SIZE)

  const [currentPageByOrigin, setCurrentPageByOrigin] = useState<Record<string, number>>({ Web: 1, App: 1 })
  

  // Simulated homepage selection (max 5). Start with first 5 items on homepage
  const [homepageFaqsByOrigin, setHomepageFaqsByOrigin] = useState<Record<string, any[]>>({
    Web: ALL_FAQS.slice(0, MAX_FAQS),
    App: ALL_FAQS.slice(MAX_FAQS, MAX_FAQS * 2),
  })
  const [activeListViewByOrigin, setActiveListViewByOrigin] = useState<Record<string, 'home'|'all'>>({ Web: 'home', App: 'all' })
  const [pendingDirectReplaceIdByOrigin, setPendingDirectReplaceIdByOrigin] = useState<Record<string, number | null>>({ Web: null, App: null })
  const pendingDirectReplaceId = pendingDirectReplaceIdByOrigin[origin] ?? null
  const setPendingDirectReplaceId = (v: number | null) => setPendingDirectReplaceIdByOrigin(prev => ({ ...prev, [origin]: v }))
  
  const [activeMainTab, setActiveMainTab] = useState('FAQ');
  const [activeUserType, setActiveUserType] = useState('Consumer');
  const [activeCategory, setActiveCategory] = useState('Consultation');
  const [expandedItemsByOrigin, setExpandedItemsByOrigin] = useState<Record<string, number[]>>({ Web: [], App: [] })
  const [selectedRowsByOrigin, setSelectedRowsByOrigin] = useState<Record<string, number[]>>({ Web: [], App: [] })

  const homepageFaqs = homepageFaqsByOrigin[origin] ?? []
  const setHomepageFaqsForOrigin = (updater: (prev: any[]) => any[] | any[]) => setHomepageFaqsByOrigin(prev => ({ ...prev, [origin]: typeof updater === 'function' ? (updater as any)(prev[origin]) : updater }))

  const activeListView = activeListViewByOrigin[origin] ?? 'all'
  const setActiveListView = (v: 'home'|'all') => setActiveListViewByOrigin(prev => ({ ...prev, [origin]: v }))

  const currentPage = currentPageByOrigin[origin] ?? 1
  const paginatedFaqs = ALL_FAQS.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const setCurrentPage = (pOrUpdater: number | ((p:number)=>number)) => setCurrentPageByOrigin(prev => ({ ...prev, [origin]: typeof pOrUpdater === 'function' ? (pOrUpdater as any)(prev[origin] ?? 1) : pOrUpdater }))

  const expandedItems = expandedItemsByOrigin[origin] ?? []
  const setExpandedItems = (arr: number[]) => setExpandedItemsByOrigin(prev => ({ ...prev, [origin]: arr }))

  const selectedRows = selectedRowsByOrigin[origin] ?? []
  const setSelectedRows = (arr: number[]) => setSelectedRowsByOrigin(prev => ({ ...prev, [origin]: arr }))

  const toggleAccordion = (id: number) => {
    if (expandedItems.includes(id)) setExpandedItems(expandedItems.filter(i => i !== id))
    else setExpandedItems([...expandedItems, id])
  };

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) setSelectedRows(selectedRows.filter(i => i !== id))
    else setSelectedRows([...selectedRows, id])
  };

  // If user clicked Add — show only the Add view (no table/list visible)
  if (showAdd) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8 font-sans text-slate-800">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
            <span className="text-[#3A643B]">FAQ</span>
            <ChevronRight size={16} />
            <span>{origin}</span>
            <ChevronRight size={16} />
            <span className="text-slate-400">Customization</span>
          </div>

          
          <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-8">
            {['Banners', 'Per Page Products', 'Ingredients', 'FAQ'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMainTab(tab)}
                className={`text-sm font-bold transition-all relative pb-1 ${activeMainTab === tab ? 'text-[#3A643B]' : 'text-slate-400 hover:text-slate-600'}`}>
                {tab}
                {activeMainTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3A643B] rounded-full translate-y-4"></div>
                )}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-6">
            <AddFaq
              onClose={() => setShowAdd(false)}
              showBreadcrumb={false}
              onSubmit={(payload) => setHomepageFaqsForOrigin(prev => [...prev, payload])}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
          <span className="text-[#3A643B]">FAQ</span>
          <ChevronRight size={16} />
          <span>{origin}</span>
          <ChevronRight size={16} />
          <span className="text-slate-400">Customization</span>
        </div>

        {/* Level 1 Tabs: Banners, Products, etc. */}
        <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-8">
          {['Banners', 'Per Page Products', 'Ingredients', 'FAQ'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={`text-sm font-bold transition-all relative pb-1 ${activeMainTab === tab ? 'text-[#3A643B]' : 'text-slate-400 hover:text-slate-600'}`}>
              {tab}
              {activeMainTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3A643B] rounded-full translate-y-4"></div>
              )}
            </button>
          ))}
        </div>


        {/* Level 2 toggle row — Web shows Home Page FAQ's / All (taller), App shows Consumer / Doctor */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-8 flex overflow-hidden">
          {origin === 'Web' ? (
            ['Home Page FAQ\'s', 'All'].map((label) => (
              <button
                key={label}
                onClick={() => setActiveListView(label === "Home Page FAQ's" ? 'home' : 'all')}
                className={`flex-1 py-6 text-sm font-bold transition-all relative ${activeListView === (label === "Home Page FAQ's" ? 'home' : 'all') ? 'text-[#3A643B]' : 'text-slate-300 hover:text-slate-500'}`}>
                {label}
                {activeListView === (label === "Home Page FAQ's" ? 'home' : 'all') && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#3A643B] rounded-t-full"></div>
                )}
              </button>
            ))
          ) : (
            ['Consumer', 'Doctor'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveUserType(type)}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeUserType === type ? 'text-[#3A643B]' : 'text-slate-300 hover:text-slate-500'}`}>
                {type}
                {activeUserType === type && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#3A643B] rounded-t-full"></div>
                )}
              </button>
            ))
          )}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

          {/* Header Toolbar */}
          <div className="p-6 pb-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <h2 className="text-xl font-bold text-slate-800">FAQ List</h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative group w-full sm:w-72">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3A643B] transition-colors">
                  <Search size={18} />
                </div>
                <input type="text" placeholder="Search here" className="bg-[#F8F9FA] border-none rounded-xl pl-11 pr-4 py-3 text-sm w-full focus:ring-1 focus:ring-[#3A643B]/30 focus:bg-white transition-all outline-none text-slate-600 placeholder-slate-400 font-medium" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <button className="p-3 rounded-xl bg-[#F0FDF4] text-[#3A643B] hover:bg-green-100 transition-colors"><RotateCw size={18} /></button>

                <button
                  onClick={() => {
                    // if there are selected rows -> trigger the limit modal (pre select single id if exactly one)
                    if (selectedRows.length > 0) {
                      setPendingDirectReplaceId(selectedRows.length === 1 ? selectedRows[0] : null)
                      setShowLimitModal(true)
                      return
                    }

                    // no selection -> open Add form
                    setShowAdd(true)
                  }}
                  className="bg-[#3A643B] hover:bg-[#2d462e] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Add New FAQ
                </button>

                <div className="flex gap-2">
                  <button className="p-3 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"><ArrowUpDown size={18} /></button>
                  <button className="p-3 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"><Download size={18} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Level 3 Tabs */}
          <div className="px-6 mt-6 border-b border-slate-100">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
              {['Consultation', 'Shop', 'Wallet', 'Forum', 'Additional'].map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeCategory === cat ? 'text-[#3A643B]' : 'text-slate-400 hover:text-slate-600'}`}>
                  {cat}
                  {activeCategory === cat && (<div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3A643B] rounded-t-full"></div>)}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-slate-50">
            { (activeListView === 'home' && origin === 'Web' ? homepageFaqs : paginatedFaqs).map(item => (
              <div key={item.id} className="group hover:bg-slate-50/50 transition-colors bg-white">
                <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => toggleAccordion(item.id)}>
                  <div className="text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-500 p-1"><GripVertical size={20} /></div>
                  <div onClick={(e) => e.stopPropagation()} className="flex items-center"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#3A643B] focus:ring-[#3A643B] cursor-pointer accent-[#3A643B]" checked={selectedRows.includes(item.id)} onChange={() => toggleRow(item.id)} /></div>
                  <div className="flex-1 font-medium text-slate-700 text-sm select-none">{item.question}</div>
                  <div className={`text-slate-400 transition-transform duration-300 ${expandedItems.includes(item.id) ? 'rotate-180 text-[#3A643B]' : ''}`}><ChevronDown size={20} /></div>
                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${expandedItems.includes(item.id) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="px-16 pb-6 pt-0 text-sm text-slate-500 leading-relaxed pr-8">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100"><p>{item.answer}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-slate-50 flex items-center justify-between text-slate-400 text-sm font-medium">
            <div>Rows per page: {PAGE_SIZE}</div>
            <div className="flex items-center gap-4">
              <span>{(currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, ALL_FAQS.length)} of {ALL_FAQS.length}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-600 transition-colors"><ChevronLeft size={16} /></button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-600 transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>

        </div>

        {/* Limit modal: show when attempting to add beyond MAX_FAQS */}
        <FaqLimitModal
          isOpen={showLimitModal}
          onClose={() => { setShowLimitModal(false); setPendingDirectReplaceId(null); }}
          existingFaqs={ALL_FAQS.filter(a => !homepageFaqs.some(h => h.id === a.id))}
          directReplaceId={pendingDirectReplaceId ?? undefined}
          onReplace={(selectedId) => {
            // instead of opening a form, directly add the selected candidate to homepage
            const candidate = ALL_FAQS.find(a => a.id === selectedId)
            if (!candidate) return
            // replace the last item on homepage with the selected candidate (keeps count at MAX_FAQS)
            setHomepageFaqsForOrigin(prev => {
              const copy = [...prev]
              copy[copy.length - 1] = candidate
              return copy
            })
            setShowLimitModal(false)
            // do not open add form — requirement satisfied
          }}
        />
      </div>
    </div>
  )
}


