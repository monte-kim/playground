import "./App.css";
import { useState } from "react";
import data from "./data";
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
            return (
              <div className="col-md-4">
                <img height="300px" src={crayons[i].image} />
                <h4>{crayons[i].Company}</h4>
                <p>{crayons[i].price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
