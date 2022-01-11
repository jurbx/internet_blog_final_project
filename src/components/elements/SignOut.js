import { Alert } from "react-bootstrap";
import Cookies from "universal-cookie/es6"

export default function SignOut() {
  const cookies = new Cookies();
  document.cookies = "";
  Object.keys(cookies.getAll()).forEach(key => cookies.remove(key));
  console.log(cookies.getAll());

  return <Alert variant="Warning">Please wait, we're singing you out</Alert>
}
