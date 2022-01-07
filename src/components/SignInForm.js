import { Form, FloatingLabel, Button } from "react-bootstrap";
import "../scss/SignInUpForm.scss";

export default function SignInForm() {
  return (
    <div id="formWrapper" className="text-white">
      <video src="./video/black-cubes.mp4" autoPlay muted loop></video>

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
