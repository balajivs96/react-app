import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { addItem } from '../stores/cartSlice';
import { apiURL } from '../api/apiUrl';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        // https://dummyjson.com/products/${id}
        const res = await fetch(`${apiURL.products}/${id}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(true);
      } finally {
        setLoading(false); // always set loading to false
      }
    };

    fetchProduct();

    return () => controller.abort();
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
                  src={product.image}
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
                          id: product._id,
                          title: product.title,
                          price: product.price,
                          description: product.description,
                          image: product.image,
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
