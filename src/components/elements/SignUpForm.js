import axios from "axios";
import Cookies from "universal-cookie/es6";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import "../../scss/SignInUpForm.scss";

export default function SignUpForm() {
  const baseUrl = "https://projectwithrestapi.herokuapp.com",
        cookies = new Cookies();

  function sendTheForm(e) {
    e.preventDefault();
    const form = e.target;

    if( form.password.value !== form.password2.value ) {
      console.log("Password do not match");
      return
    }

    let data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      password2: form.password2.value,
      first_name: "No name",
      last_name: "No name",
      avatar: "https://thumbs.dreamstime.com/b/no-user-profile-picture-24185395.jpg"
    },
    axiosConfig = {
      headers: {
        "content-type": "application/json"
      }
    };

    axios.post(`${baseUrl}/authentication/register/`, JSON.stringify(data), axiosConfig)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.warn(err);
    })
  }

  return (
    <Form id="signUpForm">
      <h2>Sign-up</h2>

      <FloatingLabel label="Username">
        <Form.Control type="text" placeholder="Username" name="username" />
      </FloatingLabel>

      <FloatingLabel label="E-mail">
        <Form.Control type="email" placeholder="E-mail" name="email" />
      </FloatingLabel>

      <FloatingLabel label="Password">
        <Form.Control type="password" placeholder="Password" name="password" />
      </FloatingLabel>

      <FloatingLabel label="Repeat password">
        <Form.Control type="password" placeholder="Repeat password" name="password2" />
      </FloatingLabel>

      <Button variant="primary" type="submit">Continue</Button>

    </Form>
  )
}
