import { Outlet, useNavigate } from "react-router-dom";

function Event() {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Today's Event!</h1>
      <button
        onClick={() => {
          navigate("one"); // /event/one 해도 됨
        }}
      >
        Event 1.
      </button>
      <button
        onClick={() => {
          navigate("two");
        }}
      >
        Event 2.
      </button>
      <Outlet></Outlet>
    </div>
  );
}

export default Event;
