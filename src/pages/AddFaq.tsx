import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

interface AddFaqProps {
  onClose?: () => void
  showBreadcrumb?: boolean
  onSubmit?: (payload: { id: number; platform: string; title: string; question: string; answer: string }) => void
}

const AddFaq: React.FC<AddFaqProps> = ({ onClose, showBreadcrumb = true, onSubmit }) => {
  const [addToHomepage, setAddToHomepage] = useState(true)
  const [platform, setPlatform] = useState('')
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const location = useLocation()
  const origin = location.pathname.includes('/customization/web') ? 'Web' : 'App'

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      {showBreadcrumb && (
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-slate-500">
            FAQ ▸ {origin} ▸ Customization ▸ <span className="text-[#3A643B] font-medium">Add New FAQ</span>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-sm text-slate-400 hover:text-slate-700">
              Close
            </button>
          )}
        </div>
      )}

      <h3 className="text-lg font-bold text-slate-800 mb-6">Add New FAQ</h3>

      {/* --- Row 1: Platform & Title --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Select Platform */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Select Platform <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select 
              className="border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-[#3A643B] bg-white text-slate-600 appearance-none"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="" disabled>Select Platform</option>
              <option value="Consumer Web">Consumer Web</option>
              <option value="Consumer App">Consumer App</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Select Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Select Title <span className="text-red-500">*</span>
          </label>
          <input 
            className="border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-[#3A643B]" 
            placeholder="Enter title here" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      {/* --- Row 2: Homepage Toggle --- */}
      <div 
        className="flex items-center gap-3 mb-6 cursor-pointer w-fit" 
        onClick={() => setAddToHomepage(!addToHomepage)}
      >
        <div 
          className={`w-5 h-5 rounded-full border-2 border-[#3A643B] flex items-center justify-center transition-colors ${
            addToHomepage ? 'bg-[#3A643B]' : 'bg-white'
          }`}
        >
          {addToHomepage && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <span className="text-sm font-semibold text-slate-700">Add to homepage as well</span>
      </div>

      {/* --- Row 3: Question & Answer (Side by Side) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Question */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Add Question <span className="text-red-500">*</span>
          </label>
          <textarea 
            rows={5} 
            className="w-full rounded-xl border border-slate-200 p-4 text-sm bg-white outline-none focus:border-[#3A643B] resize-none" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Add Answer <span className="text-red-500">*</span>
          </label>
          <textarea 
            rows={5} 
            className="w-full rounded-xl border border-slate-200 p-4 text-sm bg-white outline-none focus:border-[#3A643B] resize-none" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>

      {/* --- Footer Buttons --- */}
        <div className="flex justify-end gap-3">
        <button 
          onClick={() => {
            // reset form then close
            setPlatform('')
            setTitle('')
            setQuestion('')
            setAnswer('')
            onClose && onClose()
          }} 
          className="px-6 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Clear all
        </button>
        <button
          onClick={() => {
            if (!platform || !title || !question || !answer) return
            onSubmit && onSubmit({ id: Date.now(), platform, title, question, answer })
            // reset and close
            setPlatform('')
            setTitle('')
            setQuestion('')
            setAnswer('')
            onClose && onClose()
          }}
          className="px-6 py-2 rounded-xl bg-[#3A643B] text-white text-sm font-medium hover:bg-[#2d462e] transition-colors shadow-sm"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default AddFaq