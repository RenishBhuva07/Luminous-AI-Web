import { useNavigate, useLocation } from 'react-router-dom'
import robotImg from '../assets/robot.png'
import './Sidebar.css'

const navItems = [
  {
    id: 'home',
    path: '/home',
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={active ? '#1DB584' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={active ? 'rgba(29,181,132,0.15)' : 'none'}/>
        <polyline points="9 22 9 12 15 12 15 22" stroke={active ? '#1DB584' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'history',
    path: '/home',
    label: 'History',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={active ? '#1DB584' : '#9ca3af'} strokeWidth="2"/>
        <polyline points="12 6 12 12 16 14" stroke={active ? '#1DB584' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'news',
    path: '/home',
    label: 'News',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" stroke={active ? '#1DB584' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" stroke={active ? '#1DB584' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'settings',
    path: '/home',
    label: 'Settings',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke={active ? '#1DB584' : '#9ca3af'} strokeWidth="2"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={active ? '#1DB584' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="sidebar" id="main-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={robotImg} alt="Luminous AI" className="sidebar-logo-img" />
        <span className="sidebar-logo-text">Luminous<span className="sidebar-logo-accent">AI</span></span>
      </div>

      {/* Nav items */}
      <div className="sidebar-nav">
        {navItems.slice(0, 2).map(item => {
          const active = location.pathname === item.path && item.id === 'home' && location.pathname === '/home'
            || location.pathname === item.path && item.id === 'history'
          return (
            <button
              key={item.id}
              id={`sidebar-${item.id}`}
              className={`sidebar-nav-item ${location.pathname === '/home' && item.id === 'home' ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              title={item.label}
            >
              {item.icon(location.pathname === '/home' && item.id === 'home')}
              <span className="sidebar-nav-label">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Center FAB */}
      <button
        id="sidebar-chat-fab"
        className={`sidebar-fab ${location.pathname === '/chat' ? 'sidebar-fab-active' : ''}`}
        onClick={() => navigate('/chat')}
        title="New Chat"
      >
        <img src={robotImg} alt="Chat" width="28" height="28" style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
      </button>

      {/* Nav items (bottom) */}
      <div className="sidebar-nav">
        {navItems.slice(2).map(item => (
          <button
            key={item.id}
            id={`sidebar-${item.id}`}
            className="sidebar-nav-item"
            onClick={() => navigate(item.path)}
            title={item.label}
          >
            {item.icon(false)}
            <span className="sidebar-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
