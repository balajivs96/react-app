import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../stores/cartSlice';

export const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.count || 1),
    0
  );

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handlePlaceOrder = () => {
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: cartItems,
        totalAmount: totalPrice,
        user: loggedInUser.id,
      }),
    })
      .then((res) => {})
      .catch((err) => {
        console.error('Order placement failed:', err);
      });
  };
  return (
    <>
      {cartItems.length < 1 ? (
        <div className="alert alert-info text-center">
          <h3>Your cart is empty 🙂</h3>
          <p>Add some items to proceed to checkout.</p>
        </div>
      ) : (
        <div className="container">
          <div className="d-flex justify-content-end mb-3">
            <h5>Total: {totalPrice.toFixed(2)}₹</h5>
          </div>

          <div className="row">
            {cartItems.map((item) => (
              <div key={item._id} className="col-12 mb-3">
                <div className="card d-flex flex-column flex-md-row align-items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid mb-2 mb-md-0"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        maxWidth: '150px',
                        height: 'auto',
                      }}
                    />
                  )}

                  <div className="card-body d-flex flex-column justify-content-center">
                    <h3 className="card-title">
                      {item.title} - {item.price}₹
                    </h3>
                    {item.quantity && (
                      <p className="card-title">
                        {item.price}₹ x {item.quantity} = {item.price * item.quantity}
                        ₹
                      </p>
                    )}

                    <p className="card-text">{item.description}</p>
                    <button
                      className="btn btn-danger align-self-start align-self-md-end"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-success" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};
