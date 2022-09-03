import "./App.css";
import Product from "./Product";
import data from "./data";
import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

function App() {
  let [crayons] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" varian="light">
        <Container>
          <Navbar.Brand href="#home">Crayon Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg container">
        <div className="row">
          {crayons.map(function (a, i) {
            return <Product crayons={crayons[i]}></Product>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
