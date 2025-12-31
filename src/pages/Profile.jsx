import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* User Info Card */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              User Profile
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          {/* Cart Info Card */}
          <div className="card">
            <div className="card-header bg-success text-white">
              Cart Details
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Items in Cart:</strong> {cart.items.length}
              </p>
              {cart.items.length > 0 && (
                <ul className="list-group list-group-flush">
                  {cart.items.map((item, index) => (
                    <li key={index} className="list-group-item">
                      {item.title} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
