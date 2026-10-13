import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

const KEYS = [
  ['1', 'ABC'], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['', ''], ['0', ''], ['⌫', ''],
]

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const navigate = useNavigate()
  const location = useLocation()
  const phone = location.state?.phone || '12345 67890'

  useEffect(() => {
    if (timer === 0) return
    const t = setTimeout(() => setTimer(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timer])

  const handleKey = (key) => {
    if (key === '⌫') {
      setOtp(prev => {
        const next = [...prev]
        const lastFilled = next.map((v, i) => v ? i : -1).filter(i => i !== -1).pop()
        if (lastFilled !== undefined) next[lastFilled] = ''
        return next
      })
    } else if (key !== '') {
      setOtp(prev => {
        const next = [...prev]
        const firstEmpty = next.findIndex(v => v === '')
        if (firstEmpty !== -1) next[firstEmpty] = key
        return next
      })
    }
  }

  const filledCount = otp.filter(v => v !== '').length

  const handleContinue = () => {
    if (filledCount === 6) navigate('/home')
  }

  const formatPhone = (p) => {
    if (!p) return ''
    return `+91 ${p.slice(0, 5)} ${p.slice(5)}`
  }

  return (
    <div className="phone">
      <StatusBar />
      <div className="page">
        <button className="back-btn" onClick={() => navigate('/signup')}>←</button>
        <h1 className="otp-title">6-digit code</h1>
        <p className="otp-subtitle">Please enter the code we've sent to</p>
        <p className="otp-phone">{formatPhone(phone)}</p>

        <div className="otp-boxes">
          {otp.slice(0, 3).map((val, i) => (
            <div
              key={i}
              className={`otp-box ${val ? 'filled' : i === filledCount ? 'active' : ''}`}
            >
              {val}
            </div>
          ))}
          <div className="otp-separator" />
          {otp.slice(3).map((val, i) => (
            <div
              key={i + 3}
              className={`otp-box ${val ? 'filled' : i + 3 === filledCount ? 'active' : ''}`}
            >
              {val}
            </div>
          ))}
        </div>

        <div className="resend-row">
          <span className="resend-text">I didn't receive a code</span>
          <span className="resend-timer">
            ({String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')})
          </span>
        </div>

        <button
          id="continue-btn"
          className="btn-primary"
          onClick={handleContinue}
          style={{ opacity: filledCount === 6 ? 1 : 0.7 }}
        >
          Continue
        </button>
      </div>

      <div className="numpad">
        {Array.from({ length: 4 }, (_, row) => (
          <div className="numpad-row" key={row}>
            {KEYS.slice(row * 3, row * 3 + 3).map(([num, alpha], i) => (
              <div
                key={i}
                className={`numpad-key ${num === '' ? 'empty' : ''} ${num === '⌫' ? 'delete' : ''}`}
                onClick={() => handleKey(num)}
              >
                <span className="key-num">{num}</span>
                {alpha && <span className="key-alpha">{alpha}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
