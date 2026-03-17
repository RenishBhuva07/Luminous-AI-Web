import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple front-end auth — navigate to home
    navigate('/home')
  }

  return (
    <div className="login-root">
      <div className="login-card">
        <button className="login-back" onClick={() => navigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="login-header">
          <h1 className="login-title">Log In</h1>
          <p className="login-subtitle">Welcome back to chat GPT 👋</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {/* Email */}
          <div className={`input-group ${emailFocused ? 'focused' : ''}`}>
            <label className="input-label">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className={`input-group ${passwordFocused ? 'focused' : ''}`}>
            <label className="input-label">Password</label>
            <div className="password-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#9ca3af" strokeWidth="2"/></svg>
                )}
              </button>
            </div>
            <button type="button" className="forgot-link">Forgot password?</button>
          </div>

          <button id="login-submit-btn" type="submit" className="btn-primary login-btn">
            Log In
          </button>
        </form>

        <p className="login-signup-text">
          Don't have an account?{' '}
          <button className="teal-link" onClick={() => navigate('/login')}>Create account</button>
        </p>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">OR</span>
          <div className="divider-line" />
        </div>

        <div className="social-btns">
          <button id="google-login-btn" className="social-btn social-google">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.3 9 3.4l6.7-6.7C35.6 2.5 30.1 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6.1C12.4 13.3 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.5c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 6.5-9.4 6.5-16.7z"/>
              <path fill="#FBBC05" d="M10.5 28.6c-.6-1.8-.9-3.6-.9-5.6s.3-3.8.9-5.6l-7.8-6.1C.9 14.5 0 19.1 0 24s.9 9.5 2.7 13.7l7.8-6.1-.5-.9z"/>
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7-5.4c-2.2 1.5-5 2.4-8.9 2.4-6.3 0-11.6-3.7-13.5-9.1l-7.8 6.1C6.6 42.6 14.6 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <button id="facebook-login-btn" className="social-btn social-facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>

          <button id="apple-login-btn" className="social-btn social-apple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M16.125 1c.088 1.338-.381 2.668-1.088 3.631-.762.994-2 1.756-3.212 1.662-.113-1.294.475-2.606 1.15-3.456C13.75 1.806 15.1 1.062 16.125 1zM20.5 8.219c-2.163-1.275-3.563-.463-4.525-.463-.919 0-2.194.45-3.25.45-1.169 0-2.657-.5-3.656-.5C6.494 7.706 3 10.813 3 16.094c0 5.106 3.931 10.906 6.594 10.906.95 0 1.687-.456 2.787-.456 1.256 0 1.838.45 3.1.45 1.25 0 2.138-.806 3.294-.806C21 26.188 24 20.781 24 16.094c0-.081-.006-.163-.006-.244-1.288-.644-3.494-2.194-3.494-7.631z"/>
            </svg>
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  )
}
