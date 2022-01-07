import { Form, FloatingLabel, Button } from "react-bootstrap";
import "../scss/SignInUpForm.scss";

export default function SignUpForm() {
  return (
    <div id="formWrapper" className="text-white">
      <video src="./video/black-cubes.mp4" autoPlay muted loop></video>

      <main>
        <Form id="signUpForm">
          <h2>Sign-up</h2>

          <FloatingLabel label="Username">
            <Form.Control type="text" placeholder="Username" />
          </FloatingLabel>

          <FloatingLabel label="E-mail">
            <Form.Control type="email" placeholder="E-mail" />
          </FloatingLabel>

          <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>

          <FloatingLabel label="Repeat password">
            <Form.Control type="password" placeholder="Repeat password" />
          </FloatingLabel>

          <Button variant="primary">Continue</Button>

        </Form>
      </main>

    </div>
  )
}
