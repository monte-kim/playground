import "./App.css";
import Product from "./components/Product";
import Detail from "./components/Detail";
import data from "./data";
import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

function App() {
  let [crayons] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" varian="light">
        <Container>
          <Navbar.Brand href="#home">Crayon Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Detail</Nav.Link>
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
      </Routes>
    </div>
  );
}

export default App;
