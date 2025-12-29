import { useState, useEffect, useMemo } from "react";
import { Card } from "../components/Card";

export const Dashboard = () => {
  const [products, setproduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setproduct(data))
      .finally(() => setLoading(false));
  }, []);

  const productCards = useMemo(() => {
    return products?.products?.map((product) => (
      <div key={product.id} className="col-md-2 mb-4 d-flex">
        <Card item={product} />
      </div>
    ));
  }, [products]); // only recompute if products change

  if (loading) return <p>Loading...</p>;

  return <div className="row">{productCards}</div>;
};
