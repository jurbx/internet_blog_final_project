import { Nav } from "react-bootstrap";
import { FileTextFill, FileXFill, House, HouseFill, KeyFill, PersonFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <Nav variant="pills" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link eventKey="/">
          <Link to="/"><HouseFill /> Home</Link>
        </Nav.Link>
        {/* <Nav.Link href="/"><HouseFill /> Home</Nav.Link> */}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="login">
          <Link to="/login"><KeyFill /> Sign in</Link>
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link href="/account"><PersonFill /> Account</Nav.Link>
      </Nav.Item> */}
      <Nav.Item>
        <Nav.Link eventKey="recent-posts">
          <Link to="/recent-posts"><FileTextFill /> Recent posts</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="404">
          <Link to="/404"><FileXFill /> Not found</Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}