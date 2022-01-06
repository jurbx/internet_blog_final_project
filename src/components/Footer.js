import { Col, Container, Row } from "react-bootstrap";
import "../scss/Footer.scss";

export default function Footer() {
  return (
    <footer id="mainFooter" className="bg-dark text-white p-4">
      <Container>
        <Row>
          <Col>
            <h3>Just Footer</h3>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
