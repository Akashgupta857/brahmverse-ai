export default function StatusBar() {
  return (
    <div className="status-bar">
      <span className="time">9:41</span>
      <div className="status-icons">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="3" width="3" height="9" rx="1" fill="#1A1A1A"/>
          <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#1A1A1A"/>
          <rect x="9" y="0" width="3" height="12" rx="1" fill="#1A1A1A"/>
          <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#1A1A1A" opacity="0.3"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.5C10.5 2.5 12.7 3.7 14 5.5L15.5 3.8C13.8 1.8 11.1 0.5 8 0.5C4.9 0.5 2.2 1.8 0.5 3.8L2 5.5C3.3 3.7 5.5 2.5 8 2.5Z" fill="#1A1A1A"/>
          <path d="M8 6C9.7 6 11.2 6.8 12.2 8L13.7 6.3C12.3 4.9 10.3 4 8 4C5.7 4 3.7 4.9 2.3 6.3L3.8 8C4.8 6.8 6.3 6 8 6Z" fill="#1A1A1A"/>
          <circle cx="8" cy="10.5" r="1.5" fill="#1A1A1A"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1A1A1A" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill="#1A1A1A"/>
          <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="#1A1A1A" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}
