import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styled from "styled-components";

function Detail(props) {
  let [num, setNum] = useState(""); //input number alert

  useEffect(() => {
    let timer = setTimeout(() => {
      setEvent(false);
    }, 2000);
    if (isNaN(num)) alert("Only numbers available");
    return () => {
      //execute once when unmounted
      clearTimeout(timer);
    };
  }, [num]); //execute once when mounted

  let [event, setEvent] = useState(true);
  let { id } = useParams(); //get url parameter (~/:id)
  let getCrayon = props.crayons.find(function (x) {
    return x.id === Number(id);
  });

  return (
    <div className="container">
      {event ? <div className="alert alert-warning">Buy in 2 seconds, get 50% discount!</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img src={getCrayon.image} height="300px" alt="detail" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{getCrayon.company}</h4>
          <p>{getCrayon.content}</p>
          <p>{getCrayon.price} ₩</p>
          <button className="btn btn-dark" style={{ marginBottom: "10px" }}>
            Order
          </button>
          <br />
          <input
            onChange={(e) => {
              setNum(e.target.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Detail;
