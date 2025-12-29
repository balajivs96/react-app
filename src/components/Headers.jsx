import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Headers = ({ title, theme, toggleTheme }) => {
  const user = useSelector((state) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token")
  );
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const checkAuth = () => setIsAuthenticated(!!token);
    checkAuth();
  }, [location]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary mb-3"
      data-bs-theme={theme}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {title}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isAuthenticated && user.isLogged && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/checkout">
                    Checkout
                    {cartItems.length > 0 ? `(${cartItems.length})` : ""}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link btn btn-link"
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="form-check form-switch ms-auto">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckDefault"
              data-testid="theme-toggle" 
              onClick={toggleTheme}
            />
            {theme === "dark" ? (
              <i className="bi bi-moon"></i>
            ) : (
              <i className="bi bi-sun"></i>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
