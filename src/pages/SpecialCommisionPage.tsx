import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  Plus, 
  RotateCw, 
  Download, 
  ChevronLeft, 
  ChevronRight as ChevronRightIcon,
  ChevronDown,
  Clapperboard, // Using for the action icon
  Check
} from 'lucide-react';

// Main Component
export default function SPecialCommisionPage() {
  // State for toggles
  const [productCommissionEnabled, setProductCommissionEnabled] = useState(true);
  const [doctorCommissionEnabled, setDoctorCommissionEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Affiliate</span>
            <ChevronRight size={16} />
            <span className="text-slate-500">Commission</span>
            <ChevronRight size={16} />
            <span className="text-[#3A643B] font-medium">Add Special Commission</span>
          </div>
          
          <button className="bg-[#3A643B] hover:bg-[#2d502e] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow-md">
            Add Special Commission
          </button>
        </div>

        {/* 1. Default Product Commission Card */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold text-slate-800">Default Product Commission</h2>
            
            {/* Custom Toggle Switch */}
            <button 
              onClick={() => setProductCommissionEnabled(!productCommissionEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${productCommissionEnabled ? 'bg-[#3A643B]' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${productCommissionEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <SelectInput label="Product" placeholder="Applies to all the products" />
              <SelectInput label="Percentage" placeholder="Please select a Percentage" required />
            </div>

            <div className="flex justify-end">
              <button className="bg-[#3A643B] text-white px-12 py-3 rounded-xl font-bold text-sm hover:bg-[#2d502e] transition-all shadow-sm hover:shadow">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* 2. Default Doctor Commission Card */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold text-slate-800">Default Doctor Commission</h2>
            <button 
              onClick={() => setDoctorCommissionEnabled(!doctorCommissionEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${doctorCommissionEnabled ? 'bg-[#3A643B]' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${doctorCommissionEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <SelectInput label="Doctor" placeholder="Applies to all the Doctors" />
              <SelectInput label="Percentage" placeholder="Please select a Percentage" required />
            </div>

            <div className="flex justify-end">
              <button className="bg-[#3A643B] text-white px-12 py-3 rounded-xl font-bold text-sm hover:bg-[#2d502e] transition-all shadow-sm hover:shadow">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* 3. Special Commission Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-slate-800 pl-2">Special Commission</h3>
            
            <div className="flex items-center gap-3">
              {/* Search Box */}
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3A643B] transition-colors">
                    <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search here" 
                  className="bg-[#F8F9FA] border-none rounded-full pl-10 pr-4 py-2.5 text-sm w-full sm:w-72 focus:ring-2 focus:ring-[#3A643B]/20 focus:bg-white transition-all outline-none text-slate-600 placeholder-slate-400 font-medium"
                />
              </div>
              
              {/* Action Buttons */}
              <ActionButton icon={<Plus size={20} />} active />
              <ActionButton icon={<RotateCw size={20} />} active />
              <ActionButton icon={<Download size={20} />} />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-800 font-bold border-b border-slate-50">
                  <th className="px-8 py-5 w-[25%]">Doctor Name</th>
                  <th className="px-6 py-5 w-[20%] text-center">Doctor's Commission</th>
                  <th className="px-6 py-5 w-[25%]">Product Name</th>
                  <th className="px-6 py-5 w-[20%] text-center">Product's Commission</th>
                  <th className="px-6 py-5 w-[10%] text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <CommissionRow 
                  name="Alina Mathew" 
                  img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  product="Nari Sandariya Malt"
                />
                <CommissionRow 
                  name="Jack Rock" 
                  img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  product="Nari Sandariya Malt"
                />
                <CommissionRow 
                  name="Alina Mathew" 
                  img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  product="Nari Sandariya Malt"
                />
                <CommissionRow 
                  name="Alina Mathew" 
                  img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  product="Nari Sandariya Malt"
                />
                <CommissionRow 
                  name="Jack Rock" 
                  img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  product="Nari Sandariya Malt"
                />
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-slate-50 flex items-center justify-between text-slate-400 text-sm font-medium">
            <div>Rows per page: 5</div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-600 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-800 font-bold shadow-sm">1</button>
              <button className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-600 transition-colors">
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---

const SelectInput = ({ label, placeholder, required }: { label: string, placeholder: string, required?: boolean }) => (
  <div className="relative">
    {/* Floating Label Effect */}
    <label className="absolute -top-2 left-4 bg-white px-1 text-xs font-bold text-slate-900 z-10">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    
    <div className="w-full h-14 border border-slate-200 rounded-2xl px-4 flex items-center justify-between cursor-pointer hover:border-[#3A643B] hover:shadow-sm transition-all group bg-white">
      <span className="text-slate-400 text-sm font-medium group-hover:text-slate-600 transition-colors">{placeholder}</span>
      <ChevronDown size={16} className="text-slate-300 group-hover:text-[#3A643B] transition-colors" />
    </div>
  </div>
);

const ActionButton = ({ icon, active }: { icon: React.ReactNode, active?: boolean }) => (
  <button className={`p-2.5 rounded-xl transition-all duration-200 ${active 
    ? 'bg-green-50 text-[#3A643B] hover:bg-green-100 hover:shadow-sm' 
    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
  }`}>
    {icon}
  </button>
);

const CommissionRow = ({ name, img, product }: { name: string; img: string; product: string }) => (
  <tr className="group hover:bg-slate-50/80 transition-colors">
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">
        <div className="relative">
           <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
           {/* Online indicator just for detail */}
           <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <span className="font-bold text-slate-700">{name}</span>
      </div>
    </td>
    <td className="px-6 py-5 text-center font-medium text-slate-600">30%</td>
    <td className="px-6 py-5 font-medium text-slate-700">{product}</td>
    <td className="px-6 py-5 text-center font-medium text-slate-600">30%</td>
    <td className="px-6 py-5 text-center">
      <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-800">
        <Clapperboard size={18} className="fill-current" />
      </button>
    </td>
  </tr>
);