import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  MessageSquare, 
  Settings, 
  Receipt, 
  UserPlus, 
  Wallet,
  RefreshCcw,
  ChevronRight
} from 'lucide-react';

const Dashboard: React.FC = () => {

  return (
    <div className="flex h-full bg-[#F8F9FA] font-sans text-slate-800 flex-1">
      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <span>Affiliate</span>
            <ChevronRight size={16} />
            <span className="text-[#3A643B] font-medium">Dashboard</span>
          </div>

          {/* Time Filter Tabs */}
          <div className="bg-white rounded-lg border-2 border-blue-400 p-0 mb-8 overflow-hidden shadow-sm max-w-4xl mx-auto lg:mx-0">
             <div className="grid grid-cols-4 divide-x divide-slate-100">
               <TabButton label="Today So Far" />
               <TabButton label="Week So Far" />
               <TabButton label="Month So Far" active />
               <TabButton label="Custom" />
             </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard 
              title="Total Coupons clicks" 
              value="255" 
              suffix="/month" 
              icon={<Receipt size={24} className="text-[#3A643B]" />} 
            />
            <StatCard 
              title="Total Orders" 
              value="55" 
              suffix="/month" 
              icon={<RefreshCcw size={24} className="text-[#3A643B]" />} 
            />
            <StatCard 
              title="Total Revenue" 
              value="5,540" 
              suffix="/month" 
              icon={<Wallet size={24} className="text-[#3A643B]" />} 
            />
            <StatCard 
              title="Total Doctors" 
              value="5" 
              suffix="/month" 
              icon={<UserPlus size={24} className="text-[#3A643B]" />} 
            />
          </div>

          {/* Bottom Section: Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            
            {/* Top Affiliate Doctors */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Top Affiliate Doctors</h3>
              <div className="space-y-6">
                <DoctorRow 
                  rank={1} 
                  name="Dr. Meenal" 
                  specialty="Gynecology + 2 others" 
                  img="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  trend="+8%"
                  trendColor="bg-green-100 text-green-600"
                />
                <DoctorRow 
                  rank={2} 
                  name="Dr. Pallav" 
                  specialty="Gynecology + 2 others" 
                  img="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  trend="+1%"
                  trendColor="bg-green-100 text-green-600"
                />
                <DoctorRow 
                  rank={3} 
                  name="Dr. Sapna" 
                  specialty="Gynecology + 2 others" 
                  img="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  trend="-2%"
                  trendColor="bg-red-100 text-red-500"
                />
              </div>
            </div>

            {/* Top Affiliate Products */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative">
              
              <h3 className="text-lg font-bold text-slate-900 mb-6">Top Affiliate Products</h3>
              <div className="space-y-6">
                <ProductRow 
                   rank={1}
                   name="Amrutam Nari Sondarya Malt"
                   img="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                />
                <ProductRow 
                   rank={2}
                   name="Amrutam Bhringraj Hair Therapy"
                   img="https://images.unsplash.com/photo-1556228720-19875c4bbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                />
                <ProductRow 
                   rank={3}
                   name="Amrutam Lozenge Malt"
                   img="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                />
              </div>
            </div>

          </div>

        </main>
    </div>
  );
};

// --- Helper Components ---

interface TabButtonProps {
  label: string;
  active?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active }) => (
  <button className={`py-4 text-center text-sm font-medium transition-colors relative hover:bg-slate-50
    ${active ? 'text-[#3A643B]' : 'text-slate-400'}`}>
    {label}
    {active && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#3A643B] rounded-t-full"></div>}
  </button>
);

interface StatCardProps {
  title: string;
  value: string;
  suffix: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, suffix, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
    <div className="text-slate-600 font-medium text-sm mb-2">{title}</div>
    <div className="flex items-end justify-between">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-[#3A643B]">{value}</span>
        <span className="text-xs text-slate-400 font-medium">{suffix}</span>
      </div>
      <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center overflow-hidden">
        {icon}
      </div>
    </div>
  </div>
);

interface DoctorRowProps {
  rank: number;
  name: string;
  specialty: string;
  img: string;
  trend: string;
  trendColor: string;
}

const DoctorRow: React.FC<DoctorRowProps> = ({ rank, name, specialty, img, trend, trendColor }) => (
  <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
    <div className="flex items-center gap-4">
      <span className="text-slate-400 font-medium w-4">{rank}.</span>
      <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="font-bold text-slate-900">{name}</div>
        <div className="text-xs text-slate-500">{specialty}</div>
      </div>
    </div>
    <div className={`px-2 py-1 rounded-md text-xs font-bold ${trendColor}`}>
      {trend}
    </div>
  </div>
);

interface ProductRowProps {
  rank: number;
  name: string;
  img: string;
}

const ProductRow: React.FC<ProductRowProps> = ({ rank, name, img }) => (
  <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
    <div className="flex items-center gap-4">
      <span className="text-slate-400 font-medium w-4">{rank}.</span>
      <div className="w-12 h-12 rounded-full bg-orange-100 overflow-hidden flex-shrink-0">
        <img src={img} alt={name} className="w-full h-full object-cover mix-blend-multiply" />
      </div>
      <div className="font-bold text-slate-900 text-sm">{name}</div>
    </div>
  </div>
);

export default Dashboard;