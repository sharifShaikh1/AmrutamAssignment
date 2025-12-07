import React, { useState } from 'react'

interface FaqItem {
  id: number
  question: string
}

interface FaqLimitModalProps {
  isOpen: boolean
  onClose: () => void
  onReplace: (selectedId: number) => void
  existingFaqs?: FaqItem[]
  directReplaceId?: number
}

const FaqLimitModal: React.FC<FaqLimitModalProps> = ({ isOpen, onClose, onReplace, existingFaqs, directReplaceId }) => {
  // 'warning' = small modal, 'select' = large list modal
  const [step, setStep] = useState<'warning' | 'select'>('warning')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // fallback data if none supplied by caller
  const defaults: FaqItem[] = [
    { id: 1, question: "What types of consultations are available?" },
    { id: 2, question: "Can I get refund for the wallet money?" },
    { id: 3, question: "What is the Amrutam Forum?" },
    { id: 4, question: "Can I pause the audio consultation?" },
    { id: 5, question: "Is there a minimum duration for an audio consultation?" },
  ]

  const listToShow = existingFaqs ?? defaults

  // Reset internal step/selection whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setStep('warning')
      setSelectedId(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleProceed = () => {
    // Always move to the selection step. If the parent supplied a directReplaceId,
    // pre-select it so the user still sees the warning before replacement.
    if (typeof directReplaceId === 'number') {
      setSelectedId(directReplaceId)
    } else {
      setSelectedId(null)
    }
    setStep('select')
  }

  const handleSelection = (id: number) => {
    // Toggle selection (single select)
    setSelectedId(id === selectedId ? null : id)
  }

  const handleSubmit = () => {
    if (selectedId) {
      onReplace(selectedId)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 transition-all">
      
      {/* ---------------- STEP 1: WARNING MODAL ---------------- */}
      {step === 'warning' && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-[500px] w-full text-center animate-in fade-in zoom-in-95 duration-200">
          <h3 className="text-[#FF4D4F] font-medium mb-3 text-sm tracking-wide">
            Homepage already has maximum number of FAQ's.
          </h3>
          <p className="text-slate-800 font-bold text-lg mb-10">
            Would you like to replace it instead ?
          </p>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={onClose}
              className="px-8 py-2.5 rounded-xl border border-[#3A643B] text-[#3A643B] text-sm font-semibold hover:bg-green-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleProceed}
              className="px-8 py-2.5 rounded-xl bg-[#3A643B] text-white text-sm font-semibold hover:bg-[#2d462e] shadow-lg shadow-green-900/20 transition-all"
            >
              Replace
            </button>
          </div>
        </div>
      )}

      {/* ---------------- STEP 2: SELECTION MODAL ---------------- */}
      {step === 'select' && (
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-8 pb-4 text-center">
            <h3 className="text-lg font-bold text-slate-800">
              Select the question that you would like to replace it with
            </h3>
          </div>

          {/* Scrollable List */}
          <div className="px-8 py-4 overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              {listToShow.map((faq) => (
                <div 
                  key={faq.id}
                  onClick={() => handleSelection(faq.id)}
                  className="flex items-center justify-between py-4 border-b border-slate-100 cursor-pointer group hover:bg-slate-50 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox UI */}
                    <div className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors ${
                      selectedId === faq.id 
                        ? 'bg-[#3A643B] border-[#3A643B]' 
                        : 'border-slate-300 bg-white group-hover:border-slate-400'
                    }`}>
                      {selectedId === faq.id && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    <span className={`text-sm font-medium transition-colors ${
                      selectedId === faq.id ? 'text-slate-900' : 'text-slate-600'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  {/* Dropdown Arrow Icon */}
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 pt-4 flex justify-end items-center gap-6 mt-auto">
            <button 
              onClick={onClose}
              className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!selectedId}
              className={`px-10 py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-lg ${
                selectedId 
                  ? 'bg-[#3A643B] hover:bg-[#2d462e] shadow-green-900/20' 
                  : 'bg-slate-300 cursor-not-allowed shadow-none'
              }`}
            >
              Replace
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FaqLimitModal