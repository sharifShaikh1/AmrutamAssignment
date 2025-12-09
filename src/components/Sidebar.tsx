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
import logo from '../asset/logo.png';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  useEffect(() => {
    if (location.pathname.startsWith('/payment')) {
      setOpenMenus(prev => ({ ...prev, affiliate: true, payment: true }));
    }
    if (location.pathname.startsWith('/affiliate')) {
      setOpenMenus(prev => ({ ...prev, affiliate: true }));
    }
    if (location.pathname.startsWith('/customization')) {
      setOpenMenus(prev => ({ ...prev, customization: true }));
    }
    if (location.pathname.startsWith('/customization/web')) {
      setOpenMenus(prev => ({ ...prev, web: true, customization: true }));
    }
    if (location.pathname.startsWith('/customization/app')) {
      setOpenMenus(prev => ({ ...prev, app: true, customization: true }));
    }
  }, [location.pathname]);

  const mainMenuItems = [
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
    <>
      {isOpen && (
        <div
          onClick={() => onClose && onClose()}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          aria-hidden
        />
      )}

      <aside
        className={`bg-white shadow-lg flex-shrink-0 flex flex-col transition-transform duration-300 overflow-hidden transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 fixed left-0 top-0 bottom-0 z-40`}
      >
        <div className="flex items-center justify-center h-20 border-b">
          <img src={logo} alt="Amrutam Logo" className="h-10" /> 
        </div>
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="flex items-center justify-end mb-2 md:hidden">
          <button onClick={() => onClose && onClose()} className="p-2 rounded-full hover:bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4 pl-3">Main</h3>
          <nav className="space-y-1">
            <NavItem
              key="top-dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              isActive={false}
            />

            {mainMenuItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                isActive={isPathActive(item.path)}
                onClick={() => navigate(item.path)}
              />
            ))}

            <div className="pt-2">
              <button
                onClick={() => toggleMenu('affiliate')}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                    openMenus.affiliate ? 'text-[#3A643B] font-medium bg-green-50' : 'text-slate-500 hover:text-[#3A643B] hover:bg-green-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <span>Affiliate</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${openMenus.affiliate ? 'rotate-0' : '-rotate-90'}`} />
              </button>

              {openMenus.affiliate && (
                <div className="ml-9 mt-1 space-y-1">
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

                  <div>
                    <button
                      onClick={() => toggleMenu('payment')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                        location.pathname.startsWith('/payment')
                          ? 'text-[#3A643B] font-medium'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span>Payment</span>
                      <ChevronDown size={14} className={`transition-transform ${openMenus.payment ? 'rotate-0' : '-rotate-90'}`} />
                    </button>
                    
                    {openMenus.payment && (
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

            <div className="pt-2">
              <button
                onClick={() => toggleMenu('customization')}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                    openMenus.customization ? 'text-[#3A643B] font-medium bg-green-50' : 'text-slate-500 hover:text-[#3A643B] hover:bg-green-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <MessageSquare size={20} /> 
                  </div>
                  <span>Customization</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${openMenus.customization ? 'rotate-0' : '-rotate-90'}`} />
              </button>

              {openMenus.customization && (
                <div className="ml-9 mt-1 space-y-1">
                  <div>
                    <button
                      onClick={() => toggleMenu('web')}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                        isPathActive('/customization/web')
                          ? 'text-[#3A643B] font-medium'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <ChevronDown size={14} className={`transition-transform ${openMenus.web ? 'rotate-0' : '-rotate-90'}`} />
                      <span>Web</span>
                    </button>

                    {openMenus.web && (
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
                      onClick={() => toggleMenu('app')}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                        isPathActive('/customization/app')
                          ? 'text-[#3A643B] font-medium'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <ChevronDown size={14} className={`transition-transform ${openMenus.app ? 'rotate-0' : '-rotate-90'}`} />
                      <span>App</span>
                    </button>

                    {openMenus.app && (
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
    </>
  );
};

export default Sidebar;