import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import "../scss/Header.scss";

export default function Header() {
  return (
    <header id="mainHeader" className="bg-dark text-white p-4">
      <Container>
        <Row>
          <Col className="d-flex align-items-baseline">
            <FontAwesomeIcon icon={faBlog} className="me-2 h1 mb-0" />
            <h1 className="mb-0">Internet Blog</h1>
          </Col>
        </Row>
      </Container>
    </header>
  )
}
