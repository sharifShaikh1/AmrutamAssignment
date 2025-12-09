import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import ProjectForm from './pages/ProjectForm'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import Invoices from './pages/Invoices'
import Activity from './pages/Activity'
import Settings from './pages/Settings'
import Reports from './pages/Reports'
import Dashboard from './pages/Dashboard'
import { Navigate } from 'react-router-dom'
import Doctors from './pages/Doctors'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import Speciality from './pages/Speciality'
import Concerns from './pages/Concerns'
import Referral from './pages/Referral'
import Commission from './pages/Commission'
import SpecialCommisionPage from './pages/SpecialCommisionPage'
import Coupons from './pages/Coupons'
import PaymentPending from './pages/PaymentPending'
import PaymentHistory from './pages/PaymentHistory'
import Faq from './pages/Faq'
import CustomizationOverview from './pages/CustomizationOverview'
import AddFaq from './pages/AddFaq'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import ErrorBoundary from './components/ErrorBoundary'
import './styles.css'

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    // default open on desktop, closed on small screens
    try {
      return window.innerWidth >= 768
    } catch (e) {
      return true
    }
  });

  useEffect(() => {
    const onResize = () => setIsSidebarOpen(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="app-root flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        <Topbar isSidebarOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6 pt-20">
          <ErrorBoundary>
            <Routes>
          <Route path="/" element={<Navigate to="/affiliate/dashboard" replace />} />
          <Route path="/affiliate/dashboard" element={<Dashboard />} />
          <Route path="/affiliate" element={<Navigate to="/affiliate/dashboard" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/speciality" element={<Speciality />} />
          <Route path="/concerns" element={<Concerns />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/commission" element={<Commission />} />
          <Route path="/commission/add" element={<SpecialCommisionPage />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/payment/pending" element={<PaymentPending />} />
          <Route path="/payment/history" element={<PaymentHistory />} />
          <Route path="/faq" element={<Faq />} />
         
          {/* Customization -> App -> FAQ (alias route) */}
          <Route path="/customization/app" element={<CustomizationOverview />} />
          <Route path="/customization/web" element={<CustomizationOverview />} />
          <Route path="/customization/app/faq" element={<Faq />} />
          {/* Customization -> Web -> FAQ (alias route) */}
          <Route path="/customization/web/faq" element={<Faq />} />
          <Route path="/faq/add" element={<AddFaq />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

export default App
