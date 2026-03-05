import React, { useContext } from "react";
import "./CartItem.css";
import { AppContext } from '../../Context/AppContext'


const CartItem = () => {

  const { cartItems, removeFromCart, setCartItems } = useContext(AppContext)

  const handleRemove = (itemId) => {
    removeFromCart(itemId)
  }

  const decreseQuantity = (itemId) => {
    setCartItems((prevItem) =>
      prevItem.map((cartItem) => cartItem.itemId === itemId ? {
        ...cartItem, quantity: cartItem.quantity - 1
      } : cartItem)
    ).filter((cartItem) => cartItem.quantity > 0)
  }

  const increaseQuantity = (itemId) => {
    setCartItems((prevItem) =>
      prevItem.map((cartItem) => cartItem.itemId === itemId ? {
        ...cartItem, quantity: cartItem.quantity + 1
      } : cartItem)
    )
  }

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p className="empty-cart">No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item-card">

            {/* Left */}
            <div className="cart-item-info">
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-price">
                ₹{item.price * item.quantity}
              </span>
            </div>

            {/* Middle */}
            <div className="cart-item-qty">
              <button className="qty-btn" onClick={() => decreseQuantity(item.itemId)} disabled={item.quantity === 1}>-</button>
              <span className="qty-value">{item.quantity}</span>
              <button className="qty-btn" onClick={() => increaseQuantity(item.itemId)}>+</button>
            </div>

            <button
              className="btn btn-sm btn-danger delete-btn"
              onClick={() => handleRemove(item.itemId)}
            >
              <i className="bi bi-trash"></i>
            </button>

          </div>
        ))
      )}
    </div>
  );
};

export default CartItem;
