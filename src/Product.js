// import data from "./data";
// import { useState } from "react";

function Product(props) {
  // let [props.crayons] = useState(data);

  return (
    <div className="col-md-4">
      <img height="300px" src={props.crayons.image} />
      <h4>{props.crayons.company}</h4>
      <p>{props.crayons.price}</p>
    </div>
  );
}

export default Product;
