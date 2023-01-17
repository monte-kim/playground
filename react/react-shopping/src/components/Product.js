import { useNavigate } from "react-router-dom";

function Product(props) {
  let navigate = useNavigate();
  return (
    <div
      className="col-md-4"
      onClick={() => {
        navigate(`/detail/${props.crayons.id}`);
      }}
    >
      <img height="300px" src={props.crayons.image} alt="product" />
      <h4>{props.crayons.company}</h4>
      <p>{props.crayons.price}</p>
    </div>
  );
}

export default Product;
