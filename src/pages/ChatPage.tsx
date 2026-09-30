import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMessage } from '../controllers/chatController'
import Sidebar from '../components/Sidebar'
import robotImg from '../assets/robot.png'
import './ChatPage.css'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: number
  role: 'user' | 'ai'
  text: string
  sources?: string[]
}

const MOCK_RESPONSES = [
  "That's a great question! Based on what I know, here's a comprehensive answer:\n\nThe concept you're asking about has multiple dimensions worth exploring. Let me break it down for you step by step.\n\nFirstly, consider the foundational principles at play here. Secondly, there are practical applications you can start using immediately. Finally, here are some resources to deepen your understanding.",
  "Interesting! Here's what I can share about that:\n\nThere are several schools of thought on this topic. The most widely accepted view is that context matters enormously. However, recent research suggests there may be nuances we haven't fully explored yet.\n\nWould you like me to dive deeper into any specific aspect?",
  "Great question! Let me provide a thorough response.\n\nThis is a fascinating area with lots of recent developments. The key points to understand are:\n\n1. The fundamentals are straightforward once you grasp the core concept\n2. Real-world applications vary widely depending on your use case\n3. There are both advantages and trade-offs to consider\n\nI hope that helps clarify things! 😊",
  "Sure! Here's a quick overview:\n\nBased on current best practices and the latest information available:\n\n• The main approach involves systematic analysis\n• You'll want to consider multiple perspectives\n• Always validate with reliable sources\n\nLet me know if you need more detail on any of these points!",
]

const SOURCES = [
  ['wikipedia.org', 'britannica.com', 'scholar.google.com'],
  ['medium.com', 'dev.to', 'stackoverflow.com'],
  ['rd.com', 'humorthatworks.com', 'en.wikipedia.org'],
  ['nature.com', 'sciencedirect.com', 'ncbi.nlm.nih.gov'],
]

const SUGGESTIONS = [
  'Tell me more about this',
  'Give me an example',
  'Simplify that explanation',
  'What are the alternatives?',
]

export default function ChatPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'ai',
      text: "Hello! I'm your AI assistant powered by Luminous AI. I'm here to help you with anything you'd like to discuss. What can I help you today? 🤖",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [statusText, setStatusText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const responseIndex = useRef(0)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const fetchAiResponse = async (userMsg: string) => {
    setIsTyping(true)
    setStatusText('Generating answers for you...')

    try {
      const data = await sendMessage(userMsg)
      
      setIsTyping(false)
      setStatusText('')

      const newId = Date.now()
      
      let responseText = ''
      if (data.data?.message?.content) {
        responseText = data.data.message.content
      } else {
        responseText = data.message || data.text || data.response || (typeof data === 'string' ? data : JSON.stringify(data))
      }
      
      const sourcesArr = data.sources || data.data?.sources || []

      // Stream the text word by word
      const words = String(responseText).split(' ')
      let accumulated = ''
      
      setMessages(prev => [...prev, { id: newId, role: 'ai', text: '', sources: sourcesArr }])

      let wordIndex = 0
      const interval = setInterval(() => {
        if (wordIndex < words.length) {
          accumulated += (wordIndex === 0 ? '' : ' ') + words[wordIndex]
          setMessages(prev =>
            prev.map(m => m.id === newId ? { ...m, text: accumulated } : m)
          )
          wordIndex++
        } else {
          clearInterval(interval)
        }
      }, 40)

    } catch (error) {
      setIsTyping(false)
      setStatusText('')
      setMessages(prev => [...prev, { id: Date.now(), role: 'ai', text: 'Sorry, I encountered an error. Please try again later.' }])
      console.error('API Error:', error)
    }
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: trimmed },
    ])
    setInput('')
    fetchAiResponse(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-root">
      <Sidebar />

      <div className="chat-area">
        {/* Chat header */}
        <header className="chat-header">
          <button className="chat-back-btn" onClick={() => navigate('/home')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="chat-header-center">
            <div className="chat-header-avatar">
              <img src={robotImg} alt="AI" width="36" height="36" style={{ objectFit: 'contain' }} />
            </div>
            <div>
              <p className="chat-header-name">Luminous AI</p>
              <p className="chat-header-status">
                <span className="status-dot" />
                Online
              </p>
            </div>
          </div>
          <div className="chat-avatar-row">
            <div className="chat-user-avatar">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zachery&backgroundColor=b6e3f4"
                alt="User"
                width="36"
                height="36"
              />
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="chat-messages" id="chat-messages">
          {messages.map((msg, i) => (
            <div key={msg.id} className={`msg-row msg-row-${msg.role}`}>
              {msg.role === 'ai' && (
                <div className="msg-avatar-ai">
                  <img src={robotImg} alt="AI" width="32" height="32" style={{ objectFit: 'contain' }} />
                </div>
              )}
              <div className={`msg-bubble msg-bubble-${msg.role}`}>
                <div className="msg-text">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="msg-sources">
                    <p className="sources-label">Learn more:</p>
                    <div className="sources-chips">
                      {msg.sources.map((s, idx) => (
                        <span key={s} className="source-chip">{idx + 1}. {s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="msg-avatar-user">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zachery&backgroundColor=b6e3f4"
                    alt="User"
                    width="32"
                    height="32"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="msg-row msg-row-ai">
              <div className="msg-avatar-ai">
                <img src={robotImg} alt="AI" width="32" height="32" style={{ objectFit: 'contain' }} />
              </div>
              <div className="msg-bubble msg-bubble-ai">
                {statusText && <p className="status-text">🔍 {statusText}</p>}
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion pills */}
        <div className="suggestions-bar">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              className="suggestion-pill"
              onClick={() => { setInput(s); inputRef.current?.focus() }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div className="chat-input-bar">
          <div className="chat-input-wrapper">
            <button className="chat-input-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <input
              ref={inputRef}
              id="chat-message-input"
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button className="chat-input-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <button
            id="send-message-btn"
            className={`send-btn ${input.trim() ? 'send-btn-active' : ''}`}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
