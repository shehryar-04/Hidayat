import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRole } from './RoleProvider'
import Logo from './Logo'

function Icon({ name, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>
}

export default function PublicTopNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { role } = useRole()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleCurriculumClick = (e) => {
    e.preventDefault()
    navigate(role ? '/short-courses' : '/login')
    setMobileOpen(false)
  }

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Darse Nizami', href: '/#programs' },
    { label: 'Hifz & Nazrah', href: '/#programs' },
    { label: 'Short Courses', href: '#', onClick: handleCurriculumClick },
    { label: 'Darul Ifta', href: '/darul-ifta' },
    { label: 'Research Center', href: '#' },
  ]

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/'
    if (href.startsWith('/')) return location.pathname.startsWith(href)
    return false
  }

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-outline bg-background/95 backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-4 sm:px-8 py-3 sm:py-4 max-w-7xl mx-auto">
        <a href="/" className="flex items-center"><Logo size="md" /></a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {links.map(({ label, href, onClick }) => (
            <a key={label} href={href}
              onClick={(e) => { onClick?.(e); setMobileOpen(false) }}
              className={`font-serif font-medium text-sm cursor-pointer transition-colors whitespace-nowrap ${
                isActive(href) ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-slate-600 hover:text-primary'
              }`}>
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')}
            className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg font-serif font-medium text-sm hover:opacity-90 transition-all active:scale-95">
            Login
          </button>
          {/* Hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden p-2 rounded-lg hover:bg-surface-high transition-colors" aria-label="Menu">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-outline bg-background px-4 py-3 space-y-1">
          {links.map(({ label, href, onClick }) => (
            <a key={label} href={href}
              onClick={(e) => { onClick?.(e); setMobileOpen(false) }}
              className={`block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors ${
                isActive(href) ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-surface-high hover:text-primary'
              }`}>
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
