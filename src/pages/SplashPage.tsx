import { useNavigate } from 'react-router-dom'
import robotImg from '../assets/robot.png'
import './SplashPage.css'

export default function SplashPage() {
  const navigate = useNavigate()

  return (
    <div className="splash-root">
      {/* Background decorative circles */}
      <div className="splash-circle splash-circle-1" />
      <div className="splash-circle splash-circle-2" />

      {/* Top section — green bg with robot */}
      <div className="splash-top">
        <div className="splash-robot-wrapper">
          <img src={robotImg} alt="AI Robot Mascot" className="splash-robot" />
          <div className="splash-orbit splash-orbit-1" />
          <div className="splash-orbit splash-orbit-2" />
        </div>
        {/* Wireframe hands */}
        <div className="splash-hands">
          <div className="splash-hand splash-hand-left" />
          <div className="splash-hand splash-hand-right" />
        </div>
      </div>

      {/* Bottom section — white with text + buttons */}
      <div className="splash-bottom">
        <div className="splash-content">
          <h1 className="splash-title">
            <span className="splash-title-teal">ChatGPT</span> – Your AI
            <br />Language <span className="splash-title-teal">Partner</span>
          </h1>
          <p className="splash-subtitle">
            Unlock Infinite Conversations: ChatGPT,<br />
            Your AI Companion!
          </p>
        </div>

        <div className="splash-actions">
          <button
            id="splash-login-btn"
            className="btn-primary"
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
          <button
            id="splash-create-btn"
            className="btn-outline"
            onClick={() => navigate('/login')}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}
