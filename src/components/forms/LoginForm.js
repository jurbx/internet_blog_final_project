import { Form, FloatingLabel, Button } from "react-bootstrap";
import "../../scss/LoginForm.scss";

export default function LoginForm() {
  return (
    <div id="loginFormWrapper" className="text-white">
      <video src="./video/black-cubes.mp4" autoPlay muted loop id="bgVideo"></video>
      <main>
        <Form id="signInForm">
          <h2>Sign-in</h2>
          <FloatingLabel label="Username">
            <Form.Control type="text" placeholder="Username" />
          </FloatingLabel>
          <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Form.Check type="checkbox" label="Remember me" id="rememberMe" className="mb-2" />
          <Button variant="primary">Continue</Button>
        </Form>
      </main>
    </div>
  )
}
