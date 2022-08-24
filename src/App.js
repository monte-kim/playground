// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let logo = "ReactBlog";
  let [title, setTitle] = useState([
    "Man's Outdoor",
    "Woman's Outdoor",
    "Children Outdoor",
  ]);
  let [likes, setLikes] = useState(0);
  let [modal, setModal] = useState(false); //modal visibility false/true

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
      <div className="list">
        <h4>
          {title[0]} &nbsp;&nbsp;{" "}
          <span
            onClick={() => {
              setLikes(likes++);
            }}
          >
            👍
          </span>
          {likes}
        </h4>
        <p>August 19th 2022</p>
      </div>
      <div className="list">
        <h4 onClick={() => {
          setModal(!modal);
        }}>{title[1]}</h4>
        <p>August 20th 2022</p>
      </div>
      <div className="list">
        <h4 onClick={() => {
          setModal(!modal);
        }}>{title[2]}</h4>
        <p>August 22nd 2022</p>
      </div>

      {modal === true ? <Modal /> : null}
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h4>Title</h4>
      <p>Date</p>
      <p>Detail</p>
    </div>
  );
}

export default App;
