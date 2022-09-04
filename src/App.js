import "./App.css";
import Product from "./components/Product";
import Event from "./components/Event";
import Detail from "./routes/Detail";
import data from "./data";
import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  let [crayons] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" varian="light">
        <Container>
          <Navbar.Brand href="#home">Crayon Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              Event
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-bg container">
              <div className="row">
                {crayons.map(function (a, i) {
                  return <Product crayons={crayons[i]}></Product>;
                })}
              </div>
            </div>
          }
        />
        <Route path="/detail" element={<Detail></Detail>} />
        <Route path="/event" element={<Event></Event>}>
          <Route
            path="one"
            element={
              <div>
                <h4>First order, get two.</h4>
              </div>
            }
          ></Route>
          <Route
            path="two"
            element={
              <div>
                <h4>Get a birthday discount coupon.</h4>
              </div>
            }
          ></Route>
        </Route>
        <Route path="*" element={<h1>404 Non Existing Page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
