import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './LoginPage'
import ProtectedRoute from './ProtectedRoute'
import FeatureFlagGuard from './FeatureFlagGuard'
import HomePage from './HomePage'
import PublicTopNav from './PublicTopNav'

// Module imports
import DarsENizamiModule from '../modules/dars-e-nizami'
import HifzModule from '../modules/hifz'
import NazraModule from '../modules/nazra'
import ShortCoursesModule from '../modules/short-courses'
import DarulIftaModule from '../modules/darul-ifta'
import ResearchCenterModule from '../modules/research-center'
import WazifaModule from '../modules/wazifa'
import StudentReportsModule from '../modules/reports'
import StudentAdminModule from '../modules/student-admin'
import ScholarAdminModule from '../modules/scholar-admin'

/**
 * Shell wrapper — single navbar for all pages (guest + authenticated).
 * Content is rendered below the fixed navbar with top padding.
 */
function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicTopNav />
      <main className="flex-1 pt-[57px] sm:pt-[65px]">
        {children}
      </main>
    </div>
  )
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Home page — always the public landing page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected module routes — all use the same AppShell (PublicTopNav) */}
      <Route path="/dars-e-nizami/*" element={<ProtectedRoute><AppShell><FeatureFlagGuard flagKey="dars_e_nizami"><DarsENizamiModule /></FeatureFlagGuard></AppShell></ProtectedRoute>} />
      <Route path="/hifz/*" element={<ProtectedRoute><AppShell><FeatureFlagGuard flagKey="hifz"><HifzModule /></FeatureFlagGuard></AppShell></ProtectedRoute>} />
      <Route path="/nazra/*" element={<ProtectedRoute><AppShell><FeatureFlagGuard flagKey="nazra"><NazraModule /></FeatureFlagGuard></AppShell></ProtectedRoute>} />
      <Route path="/short-courses/*" element={<ProtectedRoute><AppShell><FeatureFlagGuard flagKey="short_courses"><ShortCoursesModule /></FeatureFlagGuard></AppShell></ProtectedRoute>} />
      <Route path="/wazifa/*" element={<ProtectedRoute><AppShell><FeatureFlagGuard flagKey="wazifa"><WazifaModule /></FeatureFlagGuard></AppShell></ProtectedRoute>} />
      <Route path="/reports/*" element={<ProtectedRoute><AppShell><FeatureFlagGuard flagKey="student_reports"><StudentReportsModule /></FeatureFlagGuard></AppShell></ProtectedRoute>} />
      <Route path="/student-admin/*" element={<ProtectedRoute><AppShell><StudentAdminModule /></AppShell></ProtectedRoute>} />
      <Route path="/scholar-admin/*" element={<ProtectedRoute><AppShell><ScholarAdminModule /></AppShell></ProtectedRoute>} />

      {/* Public routes — accessible without login, same navbar */}
      <Route path="/darul-ifta/*" element={<AppShell><DarulIftaModule /></AppShell>} />
      <Route path="/research-center/*" element={<AppShell><ResearchCenterModule /></AppShell>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
