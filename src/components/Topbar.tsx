import React from 'react'
import { Menu, Search, Bell, MessageSquare, Settings } from 'lucide-react'
import logo from '../asset/logo.png';
import admin from '../asset/Admin.png';

interface TopbarProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick, isSidebarOpen }) => {
  return (
    <div className={`fixed top-0 right-0 z-50 transition-all w-full`}>
      <div className="flex items-center justify-between bg-white h-20 shadow-sm px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-slate-100 text-[#3A643B]"><Menu size={22} /></button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="AMRUTAM" className="w-8 h-8" />
            </div>
            <div className="font-bold tracking-widest">AMRUTAM</div>
          </div>

          <div className="hidden md:flex items-center bg-[#F3F4F6] rounded-full px-4 py-2.5 w-80 ml-6">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            <Search size={18} className="text-slate-400 mr-2" />
            <input placeholder="Search here" className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400 text-slate-700" />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="relative p-1 text-slate-400 hover:text-[#3A643B]">
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            <MessageSquare size={20} className="text-slate-300" />
          </button>
          <button className="relative p-1 text-slate-400 hover:text-[#3A643B]">
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            <Bell size={20} className="text-slate-300" />
          </button>

          <div className="flex items-center gap-3 pl-2">
            <div className={`text-right hidden md:block ${isSidebarOpen ? 'opacity-80' : ''}`}>
              <div className="text-sm font-bold text-slate-800">Liam Michael</div>
              <div className="text-xs text-slate-500">Admin</div>
            </div>
            <img src={admin} alt="avatar" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
          </div>

          <button className="text-slate-400 hover:text-[#3A643B]"><Settings size={20} /></button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
