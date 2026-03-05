import React, { useContext, useState } from 'react'
import './CartSummary.css'
import { AppContext } from '../../Context/AppContext'
import { createOrder, deleteOrder } from '../../Services/OrderService'
import toast from 'react-hot-toast'
import { createRazorpayOrder, verifyPayment } from '../../Services/PaymentService'
import ReceiptPopup  from '../ReceiptPopUp/ReceiptPopup'


const CartSummary = ({ customerName, setCustomerName, mobileNumber, setMobileNumber }) => {

  const { cartItems, clearCart } = useContext(AppContext)
  const [processing, setProcessing] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const [showPopup, setShowPopup] = useState(false)


  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const tax = totalPrice * 0.01;
  const grandTotal = totalPrice + tax

  const clearAll = () => {
    setCustomerName("")
    setMobileNumber("")
    clearCart()
  }

  const placeOrder = () => {

    setShowPopup(true);
    clearAll()
  }

  const handlePrintReceipt = () => {
    window.print();
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => reject(false)
      document.body.appendChild(script)
    })
  }

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
    }
  }

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Enter customer details")
      return
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!!")
      return
    }
    const orderData = {
      customerName: customerName,
      mobileNumber: mobileNumber,
      subTotal: totalPrice,
      tax: tax,
      grandTotal: grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
      cartItems: cartItems
    }
    setProcessing(true)
    try {
      let response = await createOrder(orderData)
      const savedData = response.data
      if (response.status === 201 && paymentMode === "cash") {
        toast.success("Cash Received")
        setOrderDetails(savedData)
      } else if (response.status === 201 && paymentMode === 'upi') {
        const razorpayLoad = await loadRazorpayScript()
        if (!razorpayLoad) {
          toast.error("Unable to load razorpay")
          await deleteOrderOnFailure(savedData.orderId)
          return
        }

        const razorpayResponse = await createRazorpayOrder({ amount: grandTotal, currency: "INR" })
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          order_id: razorpayResponse.data.id,
          name: "My retail shop",
          description: "Order payment",
          handler: async function (response) {
            await verifyPaymentHandler(response, savedData)
          },
          prefill: {
            name: customerName,
            contact: mobileNumber
          },
          theme: {
            color: '#3399cc'
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId)
              toast.error("payment cancelled")
            }
          }
        }

        const rzp = new window.Razorpay(options)
        rzp.on("payment.failed", async (response) => {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("payment failed")
          console.log(response.error.description);
        })
        rzp.open()
      }
    } catch (error) {
      console.log(error);

    } finally {
      setProcessing(false)
    }
  }


  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      signature: response.razorpay_signature,
      orderId: savedOrder.orderId
    }

    try {
      let res = await verifyPayment(paymentData);
      if (res.status === 201) {
        toast.success("Payment Successful")
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: paymentData.razorpayOrderId,
            razorpayPaymentId: paymentData.razorpayPaymentId,
            signature: paymentData.signature,
            orderId: savedOrder.orderId
          },

        })
      } else {
        toast.error("Payment processing failed")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container ">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-3">

          {/* Price Section */}
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>₹ {totalPrice.toFixed(2)}</strong>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Tax (1%)</span>
              <strong>₹ {tax.toFixed(2)}</strong>
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <span className="fw-bold">Grand Total</span>
              <strong className="text-success fs-5">
                ₹ {grandTotal.toFixed(2)}
              </strong>
            </li>
          </ul>

          {/* Payment Buttons (Horizontal) */}
          <div className="d-flex justify-content-between gap-3 mb-3">
            <button className="btn btn-success w-50"
              onClick={() => completePayment("cash")}
              disabled={processing}
            >
              <i className="bi bi-cash-coin me-2"></i>
              {processing ? "processing..." : "Cash"}
            </button>

            <button className="btn btn-primary w-50"
              onClick={() => completePayment("upi")}
              disabled={processing}
            >
              <i className="bi bi-phone-fill me-2"></i>
              {processing ? "Processing..." : "UPI"}
            </button>
          </div>

          {/* Receipt Button */}
          <button className="btn btn-warning w-100"
            onClick={placeOrder}
            disabled={processing || !orderDetails}

          >
            <i className="bi bi-receipt-cutoff me-2"></i>
            Place Order
          </button>
        </div>
        {
          showPopup && (
            <ReceiptPopup orderDetails={{
              ...orderDetails,
              razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
              razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
            }}
              onClose={() => setShowPopup(false)}
              onPrint={handlePrintReceipt}
            />
          )
        }
      </div>
    </div>
  )
}

export default CartSummary