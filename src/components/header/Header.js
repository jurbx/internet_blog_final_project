import { Container, Row, Col } from "react-bootstrap";
import Menu from "./Menu";

export default function Header({title}) {
  return (
    <header id="mainHeader" className="bg-dark text-light p-4">
      <Container>
        <Row>
          <Col>
            <h1>{title}</h1>
          </Col>
          <Col xs="auto">
            <Menu />
          </Col>
        </Row>
      </Container>
    </header>
  )
}