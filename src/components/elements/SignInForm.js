import axios from "axios";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import "../../scss/SignInUpForm.scss";
import Cookies from "universal-cookie/es6";
import { useState } from "react";

export default function SignInForm() {
  
  const baseUrl = "https://projectwithrestapi.herokuapp.com",
        cookies = new Cookies();

  function validateForm(data) {

    let testName = new RegExp(/\w{3,40}/),
        testPass = new RegExp(/[\w\@\.\+]{8,40}/);

    return testName.test(data.username) && testPass.test(data.password);
  }

  function sendForm(e) {
    e.preventDefault();
    const form = e.target;
    
    let data = {
      username: form.username.value,
      password: form.password.value
    },
    axiosConfig = {
      headers: {
        "content-type": "application/json"
      }
    };

    if(!validateForm(data)) {
      // And say what's wrong
      console.log("Validation error");
      // form.validated = false;
      return
    }

    // Send the form to the server
    axios.post(`${baseUrl}/authentication/login/`, JSON.stringify(data), axiosConfig)
    .then(res => {
      
      // Save user info to the cookies if he/she wants
      if(form.rememberMe) {
        cookies.set("username", data.username);
        cookies.set("password", data.password);
        cookies.set("userid", res.data.user_id);
      }

      // Anyway save user info to the sessionStorage
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("password", data.password);
      sessionStorage.setItem("userid", res.data.user_id);

      // Save the auth token
      cookies.set("token", res.data.token);

    })
    .catch(err => {
      console.warn(err);
    })
  }

  return (
    <Form id="signInForm" onSubmit={sendForm}>
      <h2>Sign-in</h2>

      <Form.Group>
        <FloatingLabel label="Username">
          <Form.Control type="text" placeholder="Username" name="username" required />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <FloatingLabel label="Password">
        <Form.Control type="password" placeholder="Password" name="password" required />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </FloatingLabel>

      {/* <Form.Check type="checkbox" label="Remember me" id="rememberMe" name="rememberMe" className="mb-2" /> */}
      <Button variant="primary" type="submit">Continue</Button>

    </Form>
  )
}
