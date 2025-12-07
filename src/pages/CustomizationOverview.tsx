import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const OverviewCard: React.FC<{title:string, value:string, subtitle?:string}> = ({ title, value, subtitle }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-2">
    <div className="text-xs text-slate-400 font-semibold">{title}</div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    {subtitle && <div className="text-sm text-slate-500">{subtitle}</div>}
  </div>
)

export default function CustomizationOverview() {
  const location = useLocation()
  const origin = location.pathname.includes('/customization/web') ? 'Web' : 'App'

  // These numbers are placeholders — use real data eventually
  const stats = {
    banners: '12',
    perPageProducts: '6',
    ingredients: '340',
    faqs: '24'
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
          <span className="text-[#3A643B]">Overview</span>
          <ChevronRight size={16} />
          <span>{origin}</span>
          <ChevronRight size={16} />
          <span className="text-slate-400">Customization</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
          <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Customization Overview — {origin}</h2>
              <div className="mt-2 text-sm text-slate-500 max-w-xl">A quick summary of important customization items for the {origin.toLowerCase()} platform. Use the cards and links to jump into specific sections like Banners, Products, Ingredients and FAQ.</div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors">Preview {origin}</button>
              <button className="px-4 py-2 rounded-xl bg-[#3A643B] text-white text-sm font-medium hover:bg-[#2d462e] transition-colors shadow-sm">Add New Item</button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <OverviewCard title="Banners" value={stats.banners} subtitle="Active rotation banners" />
            <OverviewCard title="Per Page Products" value={stats.perPageProducts} subtitle="Pages with featured products" />
            <OverviewCard title="Ingredients" value={stats.ingredients} subtitle="Total ingredients in DB" />
            <OverviewCard title="FAQ" value={stats.faqs} subtitle="Platform FAQs" />
          </div>
        </div>

        {/* Quick actions / recent items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Changes / Drafts */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Recent changes</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start justify-between gap-4 text-sm">
                <div>
                  <div className="font-medium text-slate-800">Homepage banner updated</div>
                  <div className="text-xs text-slate-400">2 hours ago • by UI Team</div>
                </div>
                <button className="text-sm text-[#3A643B] font-medium">View</button>
              </li>
              <li className="flex items-start justify-between gap-4 text-sm">
                <div>
                  <div className="font-medium text-slate-800">3 FAQ items edited</div>
                  <div className="text-xs text-slate-400">Yesterday • by Content</div>
                </div>
                <button className="text-sm text-[#3A643B] font-medium">View</button>
              </li>
              <li className="flex items-start justify-between gap-4 text-sm">
                <div>
                  <div className="font-medium text-slate-800">Ingredient taxonomy cleanup</div>
                  <div className="text-xs text-slate-400">3 days ago • by Ops</div>
                </div>
                <button className="text-sm text-[#3A643B] font-medium">Open</button>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick links</h3>
            <div className="flex flex-col gap-3 text-sm">
              <button className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">Manage Banners</button>
              <button className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">Per Page Products</button>
              <button className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">Ingredients</button>
              <button className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">FAQs</button>
            </div>
          </div>

          {/* Insights / Tips */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Tips & insights</h3>
            <div className="text-sm text-slate-600 space-y-3">
              <div>Keep banner sizes consistent for predictable layout across platforms.</div>
              <div>Use per-page product lists sparingly — only highlight hero products.</div>
              <div>Review FAQs monthly and archive outdated items to keep support volume low.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
