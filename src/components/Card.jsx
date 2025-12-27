import { useDispatch } from "react-redux";
import { addItem } from "../stores/cartSlice";
import { Link } from "react-router";

export const Card = ({ item }) => {
  let { title, description, thumbnail, id, price } = item;
  const dispatch = useDispatch();

  const addTochart = (data = {}) => {
    dispatch(addItem(data));
  };
  return (
    <>
      <div className="card h-100 d-flex flex-column" id={id}>
        <Link to={`/product/${id}`}>
          <img src={thumbnail} className="card-img-top" alt={title} />
        </Link>
        <div className="card-body d-flex flex-column flex-grow-1">
          <h5 className="card-title">{title}</h5>
          <h5 className="mt-auto text-success">₹ {price}</h5>
          <p className="card-text flex-grow-1">{description}</p>
          <a
            className="btn btn-primary mt-auto"
            onClick={() =>
              addTochart({ id, title, price, description, thumbnail })
            }
          >
            Add to cart
          </a>
        </div>
      </div>
    </>
  );
};
