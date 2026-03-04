import React from 'react'
import './CustomerForm.css'

const CustomerForm = ({customerName,mobileNumber,setCustomerName,setMobileNumber}) => {
  return (
    <div className="customer-form-container">

      <div className="mb-3">
        <label className="form-label">Customer Name</label>
        <input
          type="text"
          className="form-control"
          name="customerName"
          onChange={(event)=>setCustomerName(event.target.value)}
          value={customerName}
          placeholder="Enter customer name"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mobile Number</label>
        <input
          type="text"
          className="form-control"
          name="mobileNumber"
          onChange={(event)=>setMobileNumber(event.target.value)}
          value={mobileNumber}
          placeholder="Enter mobile number"
        />
      </div>

    </div>
  )
}

export default CustomerForm


