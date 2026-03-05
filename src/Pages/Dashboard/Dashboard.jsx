import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../../Services/DashboardService";
import toast from "react-hot-toast";
import "./Dashboard.css";

const Dashboard = () => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRecentData = async () => {
      try {
        setLoading(true);
        let response = await fetchDashboard();
        setData(response.data);
      } catch (error) {
        toast.error("Server error");
      } finally {
        setLoading(false);
      }
    };

    getRecentData();
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
    <div className="dashboard-container">
      {/* Top Cards */}
      <div className="row g-3 mb-4">

        {/* Total Sales */}
        <div className="col-md-6">
          <div className="card dashboard-card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Today's Sales</h6>
              <h3 className="text-success">
                ₹ {data.todaySales ? data.todaySales.toFixed(2) : "0.00"}
              </h3>
            </div>
          </div>
        </div>

        {/* Order Count */}
        <div className="col-md-6">
          <div className="card dashboard-card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Today's Orders</h6>
              <h3 className="text-primary">
                {data.todayOrderCount || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="dashboard-table-container">

        <h5 className="text-light mb-3">
          <i className="bi bi-clock-history me-2"></i>
          Recent Orders
        </h5>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle dashboard-table">

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

              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : data.recentOrder?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No orders today
                  </td>
                </tr>
              ) : (
                data.recentOrder?.map((order) => (

                  <tr key={order.orderId}>

                    <td className="fw-semibold">
                      {order.orderId}
                    </td>

                    <td>
                      <div>{order.customerName}</div>
                      <small className="text-light">
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
    </div>
  );
};

export default Dashboard;
