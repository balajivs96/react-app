import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { addItem } from "../stores/cartSlice";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`https://dummyjson.com/products/${id}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();

        if (isMounted) {
          setProduct(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger text-center shadow-sm">
              <h4 className="alert-heading">Product Not Found</h4>
              <p>
                The product you are looking for does not exist or may have been
                removed.
              </p>
              <button
                className="btn btn-outline-danger mt-2"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="row g-0">
              <div className="col-md-5 text-center p-3">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="img-fluid rounded"
                />
              </div>

              <div className="col-md-7">
                <div className="card-body d-flex flex-column h-100">
                  <h3 className="card-title">{product.title}</h3>

                  <p className="card-text text-muted">{product.description}</p>

                  <h4 className="mt-auto text-success">₹ {product.price}</h4>

                  <button
                    className="btn btn-primary mt-3"
                    onClick={() =>
                      dispatch(
                        addItem({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          description: product.description,
                          thumbnail: product.thumbnail,
                        })
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
