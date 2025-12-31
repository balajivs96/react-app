import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Orders = () => {
  const user = useSelector((state) => state.user);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserOrders(data))
      .catch(console.error);
  }, [user.token, user.id]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'badge bg-warning text-dark';
      case 'completed':
        return 'badge bg-success';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Orders</h2>

      {userOrders.length === 0 ? (
        <div className="alert alert-info text-center">
          You have no orders yet.
        </div>
      ) : (
        <div className="row">
          {userOrders.map((order) => (
            <div key={order._id} className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span>
                    <strong>Order ID:</strong> {order._id}
                  </span>
                  <span className={getStatusBadgeClass(order.status)}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Total Amount:</strong> {order.totalAmount}₹
                  </p>
                  <p>
                    <strong>Products:</strong>
                  </p>
                  <ul className="list-group list-group-flush">
                    {order.products.map((product) => (
                      <li key={product._id} className="list-group-item">
                        {product.title} - {product.price}₹ x {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer text-muted">
                  Order Date: {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
