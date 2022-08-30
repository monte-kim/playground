// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let logo = "ReactBlog";
  let [title, setTitle] = useState(["Man's Outdoor", "Woman's Outdoor", "Children Outdoor"]);
  let [likes, setLikes] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false); //modal visibility false/true
  let [titleIndex, setIndex] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>
      <button
        onClick={() => {
          let copyTitle = [...title];
          copyTitle.sort();
          setTitle(copyTitle);
        }}
      >
        SORT
      </button>
      <button
        onClick={() => {
          let copyTitle = []; //'...title' = 'man's ...' without []
          for (let i = 0; i < title.length; i++) {
            if (i === 0) {
              copyTitle[i] = title[title.length - 1];
            } else {
              copyTitle[i] = title[i - 1];
            }
          }
          setTitle(copyTitle);
        }}
      >
        CHANGE
      </button>

      {title.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(true);
                setIndex(i);
              }}
            >
              {" "}
              {title[i]}{" "}
            </h4>
            <span
              onClick={() => {
                let copyLikes = [...likes];
                copyLikes[i]++;
                setLikes(copyLikes);
              }}
            >
              👍
            </span>
            {likes[i]}
            <p>August 20th 2022</p>
          </div>
        );
      })}
      {modal === true ? (
        <Modal color="orange" title={title} titleIndex={titleIndex} setModal={setModal} setTitle={setTitle} />
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.title[props.titleIndex]}</h4>
      <p>Date</p>
      <p>Detail</p>
      <button
        onClick={() => {
          props.setModal(false);
        }}
      >
        CLOSE
      </button>
    </div>
  );
}

export default App;
