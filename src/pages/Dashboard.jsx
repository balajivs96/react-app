import { useState, useEffect, useMemo } from 'react';
import { Card } from '../components/Card';
import { apiURL } from '../api/apiUrl';

export const Dashboard = () => {
  const [products, setproduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiURL.products) //https://dummyjson.com/products
      .then((res) => res.json())
      .then((data) => setproduct(data))
      .finally(() => setLoading(false));
  }, []);

  const productCards = useMemo(() => {
    return products?.map((product) => (
      <div key={product?._id} className="col-md-2 mb-4 d-flex">
        <Card item={product} />
      </div>
    ));
  }, [products]); // only recompute if products change

  if (loading) return <p>Loading...</p>;

  return <div className="row">{productCards}</div>;
};
