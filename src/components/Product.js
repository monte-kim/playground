function Product(props) {
  return (
    <div className="col-md-4">
      <img height="300px" src={props.crayons.image} alt="product" />
      <h4>{props.crayons.company}</h4>
      <p>{props.crayons.price}</p>
    </div>
  );
}

export default Product;
