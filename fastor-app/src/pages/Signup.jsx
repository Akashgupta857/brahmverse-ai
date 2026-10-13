import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

const KEYS = [
  ['1', 'ABC'], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['', ''], ['0', ''], ['⌫', ''],
]

export default function Signup() {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const handleKey = (key) => {
    if (key === '⌫') {
      setPhone(p => p.slice(0, -1))
    } else if (key !== '' && phone.length < 10) {
      setPhone(p => p + key)
    }
  }

  const handleGetOTP = () => {
    if (phone.length === 10) {
      navigate('/otp', { state: { phone } })
    }
  }

  return (
    <div className="phone">
      <StatusBar />
      <div className="page">
        <button className="back-btn" onClick={() => {}}>←</button>
        <h1 className="signup-title">Sign Up to Fastor</h1>
        <p className="signup-subtitle">
          Let us know your mobile number and we will send you an OTP for verification.
        </p>

        <div className="phone-input-wrapper">
          <span className="country-code">+91</span>
          <div className="divider-line"></div>
          <input
            type="text"
            placeholder="- 00000"
            value={phone}
            readOnly
          />
        </div>

        <button
          id="get-otp-btn"
          className="btn-primary"
          onClick={handleGetOTP}
          style={{ opacity: phone.length === 10 ? 1 : 0.7 }}
        >
          Get OTP
        </button>

        <p className="terms-text">
          By clicking, I accept the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
        </p>
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
