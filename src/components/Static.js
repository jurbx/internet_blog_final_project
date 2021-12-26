import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Container } from "react-bootstrap";

export default function Static(props) {

  return (<>
    <Header title={props.title} />
    <main className="my-3">
      <Container className="bg-dark text-light">
        {props.children}
      </Container>
      </main>
    <Footer />
    </>)
}