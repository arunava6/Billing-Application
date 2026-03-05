import React from "react";
import "./ReceiptPopup.css";

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {

  if (!orderDetails) return null;

  const {
    orderId,
    customerName,
    mobileNumber,
    orderItems,
    subTotal,
    tax,
    grandTotal,
    paymentMethod,
    paymentDetails
  } = orderDetails;

  return (
    <div className="receipt-overlay">
      <div className="receipt-container card shadow-lg">

        {/* Header */}
        <div className="card-header text-center bg-dark text-white">
          <h4 className="mb-0">Order Receipt</h4>
        </div>

        {/* Body */}
        <div className="card-body receipt-body">

          {/* Order Info */}
          <div className="mb-3">
            <p><strong>Order ID :</strong> {orderId}</p>
            <p><strong>Name :</strong> {customerName}</p>
            <p><strong>Mobile :</strong> {mobileNumber}</p>
            <p><strong>Payment :</strong> {paymentMethod}</p>
          </div>

          {/* Items Table */}
          <h5 className="mt-3">Items Ordered</h5>

          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Item Name</th>
                <th className="text-center">Qty</th>
              </tr>
            </thead>

            <tbody>
              {orderItems?.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td className="text-center">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Price Section */}
          <div className="receipt-summary mt-3">
            <p className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹ {subTotal}</span>
            </p>

            <p className="d-flex justify-content-between">
              <span>Tax</span>
              <span>₹ {tax}</span>
            </p>

            <p className="d-flex justify-content-between fw-bold fs-5">
              <span>Grand Total</span>
              <span className="text-success">₹ {grandTotal}</span>
            </p>
          </div>

          {/* UPI Payment Details */}
          {paymentMethod === "UPI" && paymentDetails && (
            <div className="upi-details mt-3">
              <h6 className="text-success">UPI Payment Details</h6>
              <p>
                <strong>Razorpay Order ID :</strong>
                {paymentDetails.razorpayOrderId}
              </p>
              <p>
                <strong>Razorpay Payment ID :</strong>
                {paymentDetails.razorpayPaymentId}
              </p>
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="card-footer text-center">

          <button
            className="btn btn-warning me-2"
            onClick={onPrint}
          >
            <i className="bi bi-printer me-1"></i>
            Print Receipt
          </button>

          <button
            className="btn btn-danger"
            onClick={onClose}
          >
            <i className="bi bi-x-circle me-1"></i>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPopup;
