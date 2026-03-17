import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import robotImg from '../assets/robot.png'
import './HomePage.css'

const popularPrompts = [
  { icon: '₿', label: 'Crypto' },
  { icon: '📊', label: 'Business' },
  { icon: '📚', label: 'Learning' },
  { icon: '🎨', label: 'Creative' },
  { icon: '💻', label: 'Coding' },
]

const recentChats = [
  {
    id: 1,
    title: 'How do you say "where is the bus stop" in Spanish?',
    preview: 'With these 100+ ChatGPT prompts for language learning!',
  },
  {
    id: 2,
    title: 'What are the best crypto trading strategies?',
    preview: 'Here are the top 10 strategies used by professional traders...',
  },
  {
    id: 3,
    title: 'Explain quantum computing like I\'m 5',
    preview: 'Imagine you have a magic coin that can be heads AND tails at the same time...',
  },
  {
    id: 4,
    title: 'Write a Python function to sort a list',
    preview: 'Here\'s a clean implementation using multiple approaches...',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [search, setSearch] = ([] as any[]).reduce ? [
    '',
    () => {},
  ] : ['', () => {}]

  return (
    <div className="home-root">
      <Sidebar />

      <main className="home-main">
        {/* Header */}
        <header className="home-header">
          <div className="home-avatar-row">
            <div className="home-avatar">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zachery&backgroundColor=b6e3f4"
                alt="User avatar"
                width="44"
                height="44"
              />
            </div>
            <div>
              <p className="home-greeting">Good Morning 👋</p>
              <p className="home-username">Zachery Williamson</p>
            </div>
          </div>
          <button className="home-grid-btn" id="home-menu-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#374151"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#374151"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#374151"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#374151"/>
            </svg>
          </button>
        </header>

        {/* Search bar */}
        <div className="search-bar">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            id="search-prompts-input"
            type="text"
            placeholder="Search for prompts"
            className="search-input"
          />
          <button className="search-filter-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ChatGPT Plus promo card */}
        <div className="plus-card" onClick={() => navigate('/chat')} id="plus-card">
          <div className="plus-card-content">
            <span className="plus-badge">Coming Soon</span>
            <h2 className="plus-title">ChatGPT Plus</h2>
            <ul className="plus-features">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#1DB584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Access to GPT-4, our most capable model
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#1DB584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Faster response speed
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#1DB584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Exclusive access to Browsing, Plugins & more
              </li>
            </ul>
          </div>
          <div className="plus-card-robot">
            <img src={robotImg} alt="Robot" className="plus-robot-img" />
          </div>
        </div>

        {/* Popular Prompts */}
        <section className="section">
          <div className="section-header">
            <h3 className="section-title">Popular Prompts</h3>
            <button className="see-all-btn">See all</button>
          </div>
          <div className="prompts-scroll">
            {popularPrompts.map(p => (
              <button
                key={p.label}
                id={`prompt-${p.label.toLowerCase()}`}
                className="prompt-chip"
                onClick={() => navigate('/chat')}
              >
                <span className="prompt-icon">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Recent Chats */}
        <section className="section">
          <div className="section-header">
            <h3 className="section-title">Recent Chats</h3>
            <button className="see-all-btn">See all</button>
          </div>
          <div className="chats-grid">
            {recentChats.map(chat => (
              <div
                key={chat.id}
                id={`recent-chat-${chat.id}`}
                className="chat-card"
                onClick={() => navigate('/chat')}
              >
                <p className="chat-card-title">{chat.title}</p>
                <p className="chat-card-preview">{chat.preview}</p>
                <div className="chat-card-dots">
                  <span /><span /><span />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '100px' }} />
      </main>
    </div>
  )
}
