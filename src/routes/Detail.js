import { useParams } from "react-router-dom";
import styled from "styled-components";

function Detail(props) {
  let { id } = useParams(); //get url parameter (~/:id)
  let getCrayon = props.crayons.find(function (x) {
    return x.id === Number(id);
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={getCrayon.image} height="300px" alt="detail" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{getCrayon.company}</h4>
          <p>{getCrayon.content}</p>
          <p>{getCrayon.price} ₩</p>
          <button className="btn btn-dark">Order</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
