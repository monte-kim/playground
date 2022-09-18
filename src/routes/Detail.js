import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { addCart } from "../store/itemsSlice";
import { useDispatch } from "react-redux";
// import styled from "styled-components";

function Detail(props) {
  let dispatch = useDispatch();
  let [num, setNum] = useState(""); //input number alert
  let [event, setEvent] = useState(true);
  let [tab, setTab] = useState(0); //tab state 0~2
  let [fade, setFade] = useState("end"); //Detail page fade in
  let { id } = useParams(); //get url parameter (~/:id)
  let getCrayon = props.crayons.find(function (x) {
    return x.id === Number(id);
  });

  useEffect(() => {
    let fader = setTimeout(() => {
      setFade("end");
    }, 10);
    let timer = setTimeout(() => {
      setEvent(false);
    }, 2000);
    if (isNaN(num)) alert("Only numbers available");
    return () => {
      //execute once when unmounted
      setFade("");
      clearTimeout(fader);
      clearTimeout(timer);
    };
  }, [num]); //execute once when mounted

  return (
    <div className={`container start ${fade}`}>
      {event ? <div className="alert alert-warning">Buy in 2 seconds, get 50% discount!</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img src={getCrayon.image} height="300px" alt="detail" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{getCrayon.company}</h4>
          <p>{getCrayon.content}</p>
          <p>{getCrayon.price} ₩</p>
          <button
            className="btn btn-dark"
            style={{ marginBottom: "10px" }}
            onClick={() => {
              dispatch(addCart({ id: getCrayon.id, company: getCrayon.company, count: 1 }));
            }}
          >
            Order
          </button>
          <br />
          {/* <input
            onChange={(e) => {
              setNum(e.target.value);
            }}
          ></input> */}
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            Button 0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            Button 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            Button 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} crayons={props.crayons}></TabContent>
    </div>
  );
}

function TabContent({ tab, crayons }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [tab]);
  return <div className={`start ${fade}`}>{[<div>{crayons[0].company}</div>, <div>{crayons[1].company}</div>, <div>{crayons[2].company}</div>][tab]}</div>;
}

export default Detail;
