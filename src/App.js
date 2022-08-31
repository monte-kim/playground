import "./App.css";
import { useState } from "react";
import a from "./data";
import { Container, Navbar, Nav } from "react-bootstrap";

function App() {
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
          <div className="col-md-4">
            <img
              height="300px"
              src="https://www.ikea.com/kr/en/images/products/mala-wax-crayon-mixed-colours__1089237_pe861528_s5.jpg?f=s"
            />
            <h4>Title</h4>
            <p>Details</p>
          </div>
          <div className="col-md-4">
            <img
              height="300px"
              src="https://cdn11.bigcommerce.com/s-3stx4pub31/images/stencil/1280x1280/products/5543/14950/crayola-crayons-24units-colors__83433.1650556731.jpg?c=2?imbypass=on"
            />
            <h4>Title</h4>
            <p>Details</p>
          </div>
          <div className="col-md-4">
            <img
              height="300px"
              src="https://www.consumer.go.kr/site/consumer/upload/recall/RCLL_000000000013104_20180522023002482.png"
            />
            <h4>Title</h4>
            <p>Details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
