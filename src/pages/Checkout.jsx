import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../stores/cartSlice";

export const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.count || 1),
    0
  );

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      {cartItems.length < 1 ? (
        <h1>Cart is empty :-)</h1>
      ) : (
        <div className="container">
          <div className="d-flex justify-content-end mb-3">
            <h5>Total: {totalPrice.toFixed(2)}₹</h5>
          </div>

          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} className="col-12 mb-3">
                <div className="card d-flex flex-column flex-md-row align-items-center">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-fluid mb-2 mb-md-0"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        maxWidth: "150px",
                        height: "auto",
                      }}
                    />
                  )}

                  <div className="card-body d-flex flex-column justify-content-center">
                    <h3 className="card-title">
                      {item.title} - {item.price}₹
                    </h3>
                    {item.count && item.count > 1 && (
                      <p className="card-title">
                        {item.price}₹ x {item.count} = {item.price * item.count}
                        ₹
                      </p>
                    )}

                    <p className="card-text">{item.description}</p>
                    <button
                      className="btn btn-danger align-self-start align-self-md-end"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
