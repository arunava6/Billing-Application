import React, { useEffect, useState } from "react";
import { fetchOrder } from "../../Services/OrderService";
import toast from "react-hot-toast";
import "./OrderHistory.css";

const OrderHistory = () => {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchOrder();
                if (response.status === 200) {
                    setOrderData(response.data);
                }
            } catch (error) {
                console.log(error);
                toast.error("Server error");
            }
        };
        fetchData();
    }, []);

    const formatItems = (items) => {
        return items?.map((item) => `${item.name} × ${item.quantity}`).join(", ");
    };

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const getPaymentStatusBadge = (status) => {
        if (!status) return <span className="badge bg-secondary">Unknown</span>;

        switch (status) {
            case "COMPLETED":
                return <span className="badge bg-success">Completed</span>;
            case "PENDING":
                return <span className="badge bg-warning text-dark">Pending</span>;
            case "FAILED":
                return <span className="badge bg-danger">Failed</span>;
            default:
                return <span className="badge bg-secondary">Unknown</span>;
        }
    };

    return (
        <div className="order-container text-light">
            <div className="order-left">
                <h4 className="mb-3">
                    <i className="bi bi-clock-history me-2"></i>
                    Order History
                </h4>

                <table className="table table-hover align-middle table-dark order-history-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Grand Total</th>
                            <th>Payment Method</th>
                            <th>Payment Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center text-muted">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orderData.map((order) => (
                                <tr key={order.orderId}>
                                    <td className="fw-semibold">
                                        {order.orderId}
                                    </td>
                                    <td>
                                        <div>{order.customerName}</div>
                                        <small className="text-muted">
                                            {order.mobileNumber}
                                        </small>
                                    </td>
                                    <td>
                                        {formatItems(order.cartItemResponse)}
                                    </td>
                                    <td className="fw-bold text-success">
                                        ₹{order.grandTotal}
                                    </td>
                                    <td>
                                        <span className="badge bg-primary">
                                            {order.paymentMethod}
                                        </span>
                                    </td>
                                    <td>
                                        {getPaymentStatusBadge(order.paymentDetails?.paymentstatus)}
                                    </td>
                                    <td className="text-light small">
                                        {formatDate(order.createdAt)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default OrderHistory;
