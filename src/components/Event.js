import { Outlet } from "react-router-dom";

function Event() {
  return (
    <div>
      <h1>Today's Event!</h1>
      <Outlet></Outlet>
    </div>
  );
}

export default Event;
