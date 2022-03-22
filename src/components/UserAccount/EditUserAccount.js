import { Link, useParams } from "react-router-dom"
import Cookies from "universal-cookie/es6"
import { useState, useEffect } from "react"
import { Alert, Container, Card, Col, Form, FloatingLabel, Button } from "react-bootstrap"
import axios from "axios"
import "./EditUserAccount.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import ToastAlert from "../ToastAlert"

export default function EditUserAccount() {
  const
    { userName } = useParams(),
    cookies = new Cookies(),
    [errMsg, setErrMsg] = useState(""),
    [alertMsg, setAlertMsg] = useState({}),
    [toastVisible, setToastVisible] = useState(true),
    [user, setUser] = useState({}),
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    [userAvatar, setUserAvatar] = useState("")

  useEffect(() => {
    if(cookies.get("user") && cookies.get("user").username === userName) {
      axios.get(`${baseUrl}/authentication/account/${cookies.get("user").username}/`,
        {
          headers: {
            Authorization: `Token ${cookies.get("user").token}`
          }
        })
        .then(res => {
          setUser(res.data)
          setUserAvatar(res.data.avatar)
        })
        .catch(err => {
          setErrMsg("We cannot find this user");
        })
    } else {
      setErrMsg("You cannot edit this account")
    }
  }, [userName])

  function submitForm(e) {
    e.preventDefault()
    const form = e.target

    let data = {
      avatar: form.avatar.value,
      first_name: form.first_name.value,
      last_name: form.last_name.value
    }
    if (form.password.value) {
      data.password = form.password.value
      data.password2 = form.password.value
    }

    let config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${cookies.get("user").token}`
      }
    }

    axios.put(baseUrl + `/authentication/account/${user.username}/`, JSON.stringify(data), config)
    .then(res => {
      setTimeout(() => {
        // window.location.pathname = `/users/${user.username}`
      }, 2000)
      setAlertMsg({
        title: "That's Good",
        msg: "Your account has been successfully edited",
        variant: "success"
      })
    })
    .catch(err => {
      setAlertMsg({
        title: "Something went wrong",
        msg: "We cannot edit this account",
        variant: "danger"
      })
    })
  }
  
  return (
      errMsg
      ? <Alert variant="danger">{errMsg}</Alert>
      : <main className="py-4">
        <Container className="bg-dark p-4 text-white">
          <Form id="userAccountForm" onSubmit={submitForm}>
            
              <div className="user-avatar-wrapper mb-3">
                <img src={userAvatar} alt="User avatar" />
              </div>
              <FloatingLabel label="Avatar">
                <Form.Control
                  type="text"
                  defaultValue={user.avatar}
                  placeholder="Avatar"
                  name="avatar"
                  onChange={e => setUserAvatar(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel label="First Name">
                <Form.Control
                  type="text"
                  defaultValue={user.first_name}
                  placeholder="First Name"
                  name="first_name"
                />
              </FloatingLabel>
              <FloatingLabel label="Last Name">
                <Form.Control
                  type="text"
                  defaultValue={user.last_name}
                  placeholder="Last Name"
                  name="last_name"
                />
              </FloatingLabel>

              <FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  defaultValue={user.password}
                  placeholder="Password"
                  name="password"
                />
              </FloatingLabel>

              <Button type="submit" variant="success">
                <FontAwesomeIcon icon={faCheck} /> Submit
              </Button>
              <Link to={`/users/${userName}`} className="btn btn-danger ms-2">
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </Link>
          </Form>
        </Container>
        {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}
      </main>
  )
}
