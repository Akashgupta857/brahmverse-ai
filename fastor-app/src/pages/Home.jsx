import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

const bestSellers = [
  { id: 1, name: 'Sushi Roll', price: '₹50.0', img: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=200&q=80' },
  { id: 2, name: 'Fried Rice', price: '₹66.0', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&q=80' },
  { id: 3, name: 'Berry Bowl', price: '₹38.0', img: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=200&q=80' },
  { id: 4, name: 'Burger', price: '₹45.0', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
]

const popularItems = [
  {
    id: 1,
    name: 'Strawberry Shake',
    date: '29 Nov, 01:20 pm',
    price: '₹20.00',
    items: '2 Items',
    img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200&q=80',
  },
  {
    id: 2,
    name: 'Chicken Burger',
    date: '17 Oct, 01:20 pm',
    price: '₹20.00',
    items: '1 Item',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="phone">
      <StatusBar />
      <div className="page home-page" style={{ padding: 0 }}>

        {/* Header */}
        <div className="home-header">
          <div className="location-label">Current Location</div>
          <div className="location-name">
            <span>📍</span> Model Town, New Delhi
          </div>
        </div>

        {/* Search */}
        <div className="search-bar">
          <span>🔍</span>
          <input type="text" placeholder="Karan" readOnly />
          <span style={{ fontSize: 20 }}>📞</span>
          <span style={{ fontSize: 20 }}>🗓️</span>
        </div>

        {/* Best Sellers */}
        <div className="section-header">
          <span className="section-title">Best Seller</span>
          <span className="see-all">See All</span>
        </div>

        <div className="bestseller-scroll">
          {bestSellers.map(item => (
            <div
              key={item.id}
              className="bestseller-card"
              onClick={() => navigate(`/product/${item.id}`, { state: item })}
            >
              <img src={item.img} alt={item.name} />
              <div className="bestseller-info">
                <div className="bestseller-price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="promo-banner">
          <div>
            <div className="promo-text-top">Experience our delicious new dish</div>
            <div className="promo-text-pct">30%</div>
            <div className="promo-text-off">OFF</div>
          </div>
          <img
            className="promo-img"
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80"
            alt="promo pizza"
          />
        </div>

        {/* Popular Items */}
        <div className="section-header">
          <span className="section-title">Popular Items</span>
          <span className="see-all">See All</span>
        </div>

        <div className="popular-list">
          {popularItems.map(item => (
            <div
              key={item.id}
              className="popular-card"
              onClick={() => navigate(`/product/${item.id}`, { state: item })}
            >
              <img src={item.img} alt={item.name} />
              <div className="popular-info">
                <div className="popular-name">{item.name}</div>
                <div className="popular-date">{item.date}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="popular-actions">
                    <button className="btn-cancel">Cancel Order</button>
                    <button className="btn-track">Track Driver</button>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="popular-price">{item.price}</div>
                <div className="items-count">{item.items}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
