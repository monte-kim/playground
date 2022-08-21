// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let logo = "ReactBlog";
  let [title, a] = useState([
    "남자 코트 추천",
    "여자 코트 추천",
    "공용 코트 추천",
  ]);
  let [likes, b] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>
      <div className="list">
        <h4>{title[0]} <span>👍</span> {likes} </h4>
        <p>8월 19일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>8월 20일 발행</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>8월 22일 발행</p> 
      </div>
    </div>
  );
}

export default App;
