import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Calendar,
  Star,
  Receipt,
  FileText,
  MessageSquare,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors group ${
      isActive ? 'text-[#3A643B] font-medium bg-green-50' : 'text-slate-500 hover:text-[#3A643B] hover:bg-green-50'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
    <ChevronRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100" />
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for collapsible menus
  const [affiliateOpen, setAffiliateOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);

  // Auto-expand menus based on current active route
  useEffect(() => {
    if (location.pathname.startsWith('/payment')) {
      setPaymentOpen(true);
      setAffiliateOpen(true);
    }
    if (location.pathname.startsWith('/affiliate')) {
      setAffiliateOpen(true);
    }
    if (location.pathname.startsWith('/customization')) {
      setCustomizationOpen(true);
    }
    if (location.pathname.startsWith('/customization/web')) {
      setWebOpen(true);
    }
    if (location.pathname.startsWith('/customization/app')) {
      setAppOpen(true);
    }
  }, [location.pathname]);

  const mainMenuItems = [
    // Top-level "Dashboard" should not map to any route per UX: keep the Dashboard available
    // via the Affiliate submenu instead. So we no longer include a clickable top-level Dashboard entry.
    { label: 'Doctors', icon: <UserPlus size={20} />, path: '/doctors' },
    { label: 'Patients', icon: <Users size={20} />, path: '/patients' },
    { label: 'Appointments', icon: <Calendar size={20} />, path: '/appointments' },
    { label: 'Speciality', icon: <Star size={20} />, path: '/speciality' },
    { label: 'Coupons', icon: <Receipt size={20} />, path: '/coupons' },
    { label: 'Concerns', icon: <FileText size={20} />, path: '/concerns' },
    { label: 'Referral', icon: <MessageSquare size={20} />, path: '/referral' },
  ];

  const isPathActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`bg-white shadow-sm flex-shrink-0 flex flex-col transition-all duration-300 overflow-hidden ${isOpen ? 'w-64' : 'w-0'}`}>
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4 pl-3">Main</h3>
          <nav className="space-y-1">
            {/* Top-level label "Dashboard" remains visible but intentionally not clickable.
                The real dashboard route is under the Affiliate submenu (/affiliate/dashboard). */}
            <NavItem
              key="top-dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              isActive={false}
            />

            {/* Standard Menu Items */}
            {mainMenuItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                isActive={isPathActive(item.path)}
                onClick={() => navigate(item.path)}
              />
            ))}

            {/* Affiliate Section */}
            <div className="pt-2">
              <button
                onClick={() => setAffiliateOpen(!affiliateOpen)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                    affiliateOpen ? 'text-[#3A643B] font-medium bg-green-50' : 'text-slate-500 hover:text-[#3A643B] hover:bg-green-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <span>Affiliate</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${affiliateOpen ? 'rotate-0' : '-rotate-90'}`} />
              </button>

              {affiliateOpen && (
                <div className="ml-9 mt-1 space-y-1">
                  {/* Affiliate > Dashboard */}
                  <button
                    onClick={() => navigate('/affiliate/dashboard')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      isPathActive('/affiliate/dashboard')
                        ? 'text-[#3A643B] font-medium' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    Dashboard
                  </button>

                  {/* Affiliate > Commission */}
                  <button
                    onClick={() => navigate('/commission')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      isPathActive('/commission')
                        ? 'text-[#3A643B] font-medium'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    Commission
                  </button>

                  {/* Affiliate > Coupons */}
                  <button
                    onClick={() => navigate('/coupons')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      isPathActive('/coupons')
                        ? 'text-[#3A643B] font-medium'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    Coupons
                  </button>

                  {/* Affiliate > Payment (Nested) */}
                  <div>
                    <button
                      onClick={() => setPaymentOpen(!paymentOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                        location.pathname.startsWith('/payment')
                          ? 'text-[#3A643B] font-medium'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span>Payment</span>
                      <ChevronDown size={14} className={`transition-transform ${paymentOpen ? 'rotate-0' : '-rotate-90'}`} />
                    </button>
                    
                    {paymentOpen && (
                      <div className="ml-3 mt-1 space-y-1">
                        <button
                          onClick={() => navigate('/payment/pending')}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors pl-6 ${
                            location.pathname === '/payment/pending'
                              ? 'text-[#3A643B] font-medium bg-green-50'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          Pending Payment
                        </button>
                        <button
                          onClick={() => navigate('/payment/history')}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors pl-6 ${
                            location.pathname === '/payment/history'
                              ? 'text-[#3A643B] font-medium bg-green-50'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          Payment History
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Affiliate > Doctors */}
                  <button
                    onClick={() => navigate('/doctors')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      isPathActive('/doctors')
                        ? 'text-[#3A643B] font-medium'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    Doctors
                  </button>
                </div>
              )}
            </div>

            {/* Customization Section (Moved to Bottom) */}
            <div className="pt-2">
              <button
                onClick={() => setCustomizationOpen(!customizationOpen)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                    customizationOpen ? 'text-[#3A643B] font-medium bg-green-50' : 'text-slate-500 hover:text-[#3A643B] hover:bg-green-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {/* Using MessageSquare to match the icon in your screenshot */}
                    <MessageSquare size={20} /> 
                  </div>
                  <span>Customization</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${customizationOpen ? 'rotate-0' : '-rotate-90'}`} />
              </button>

              {customizationOpen && (
                <div className="ml-9 mt-1 space-y-1">
                  <div>
                    <button
                      onClick={() => setWebOpen(!webOpen)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                        isPathActive('/customization/web')
                          ? 'text-[#3A643B] font-medium'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <ChevronDown size={14} className={`transition-transform ${webOpen ? 'rotate-0' : '-rotate-90'}`} />
                      <span>Web</span>
                    </button>

                    {webOpen && (
                      <div className="ml-3 mt-1 space-y-1">
                        <button
                          onClick={() => navigate('/customization/web')}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors pl-6 ${
                            location.pathname === '/customization/web'
                              ? 'text-[#3A643B] font-medium bg-green-50'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          Overview
                        </button>

                        {/* Web -> FAQ uses its own path so only Web will be highlighted when visited */}
                        <button
                          onClick={() => navigate('/customization/web/faq')}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors pl-6 ${
                            location.pathname === '/customization/web/faq'
                              ? 'text-[#3A643B] font-medium bg-green-50'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          FAQ
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => setAppOpen(!appOpen)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                        isPathActive('/customization/app')
                          ? 'text-[#3A643B] font-medium'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <ChevronDown size={14} className={`transition-transform ${appOpen ? 'rotate-0' : '-rotate-90'}`} />
                      <span>App</span>
                    </button>

                    {appOpen && (
                      <div className="ml-3 mt-1 space-y-1">
                        <button
                          onClick={() => navigate('/customization/app')}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors pl-6 ${
                            location.pathname === '/customization/app'
                              ? 'text-[#3A643B] font-medium bg-green-50'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          Overview
                        </button>

                        <button
                          onClick={() => navigate('/customization/app/faq')}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors pl-6 ${
                            location.pathname === '/customization/app/faq'
                              ? 'text-[#3A643B] font-medium bg-green-50'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          FAQ
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;