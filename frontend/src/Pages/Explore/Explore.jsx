import React, { useContext, useState } from 'react'
import './Explore.css'
import { AppContext } from '../../Context/AppContext'
import CustomerForm from '../../Components/CustomerForm/CustomerForm';
import CartSummary from '../../Components/CartSummary/CartSummary';
import CartItem from '../../Components/CartItems/CartItem'
import DisplayCategory from '../../Components/DisplayCategory/DisplayCategory'
import DisplayItems from '../../Components/DisplayItems/DisplayItems'

const Explore = () => {

  const { categories ,items } = useContext(AppContext);

  const [customerName,setCustomerName] = useState("")
  const [mobileNumber,setMobileNumber] = useState("")

  return (
    <div className="explore-container">
      <div className="explore-left">

        {/* Categories Section */}
        <div className="explore-card categories-section">
          <h5>Categories</h5>
          <DisplayCategory categories={categories}/>
        </div>

        {/* Items Section */}
        <div className="explore-card items-section">
          <h5>Items</h5>
          <DisplayItems items={items}/>
        </div>

      </div>

      <div className="explore-right">
        <div className="explore-card customer-section">
          <CustomerForm
            customerName={customerName}
            setCustomerName={setCustomerName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
          />
        </div>

        {/* Cart Items */}
        <div className="explore-card cart-items-section">
          <CartItem/>
        </div>

        {/* Cart Summary */}
        <div className="explore-card cart-summary-section">
          <h5>Cart Summary</h5>
          <CartSummary/>
        </div>

      </div>

    </div>
  )
}

export default Explore
