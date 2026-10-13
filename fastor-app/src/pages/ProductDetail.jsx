import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

const portions = [
  { label: 'Personal (4 Slides)', price: '$0.00' },
  { label: 'Medium (8 Slides)', price: '$3.00' },
  { label: 'Familiar (10 Slides)', price: '$6.00' },
  { label: 'Jumbo (12 Slides)', price: '$10.00' },
]

export default function ProductDetail() {
  const [qty, setQty] = useState(3)
  const [selected, setSelected] = useState(3)
  const navigate = useNavigate()
  const location = useLocation()
  const item = location.state || {
    name: 'Lorem ipsum dolor sit amet',
    price: '₹14.00',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  }

  return (
    <div className="phone">
      <StatusBar />
      <div className="page product-detail" style={{ padding: 0 }}>

        {/* Image with back button */}
        <div className="product-img-wrap">
          <img src={item.img} alt={item.name} />
          <button className="product-back" onClick={() => navigate(-1)}>←</button>
        </div>

        <div className="product-body">
          {/* Price + Quantity */}
          <div className="product-price-row">
            <span className="product-price">{item.price || '₹14.00'}</span>
            <div className="quantity-ctrl">
              <button className="qty-btn minus" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Name */}
          <div className="product-name">{item.name}</div>

          {/* Description */}
          <p className="product-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>

          {/* Portion options */}
          <div className="section-label">Personal portion</div>
          <div className="portion-list">
            {portions.map((p, i) => (
              <div className="portion-row" key={i} onClick={() => setSelected(i)}>
                <span className="portion-name">{p.label}</span>
                <div className="portion-right">
                  <span className="portion-price">{p.price}</span>
                  <div className={`radio-btn ${selected === i ? 'selected' : ''}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Add to Cart */}
          <button id="add-to-cart-btn" className="add-to-cart-btn">
            Add to cart
          </button>
        </div>

      </div>
    </div>
  )
}
