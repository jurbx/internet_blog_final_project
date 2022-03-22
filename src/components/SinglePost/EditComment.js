import { Form, FloatingLabel, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import "./EditComment.scss"
import axios from "axios"
import { useState } from "react"
import ToastAlert from "../ToastAlert"
import Cookies from "universal-cookie";

export default function EditComment({ comment, editMode, setEditMode }) {
  const
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    cookies = new Cookies(),
    [user, setUser] = useState(cookies.get("user") || {}),
    [alertMsg, setAlertMsg] = useState({}),
    [toastVisible, setToastVisible] = useState(true)

  function sendEditedComment(e) {
    e.preventDefault()
    const form = e.target

    let data = { message: form.message.value },
    axiosConfig = {
      headers: {
        "Authorization": `Token ${user.token}`,
        "Content-Type": "application/json"
      }
    }

    console.log(form, form.message.value, axiosConfig)

    axios.put(baseUrl + `/api/update/comment/${comment.id}/`, JSON.stringify(data), axiosConfig)
    .then(res => {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
      setToastVisible(true)
      setAlertMsg({
        variant: "success",
        title: "That's good",
        msg: "Your comment has been successfully edited"
      })
    })
    .catch(err => {
      setToastVisible(true)
      setAlertMsg({
        variant: "danger",
        title: "Something went wrong",
        msg: "We cannot edit this comment"
      })
    })
  }

  return (
    <Form id="singleCommentForm" hidden={!editMode} onSubmit={sendEditedComment}>
      <FloatingLabel label="Comment message" className="mb-3">
        <Form.Control
          as="textarea"
          type="text"
          name="message"
          placeholder="Comment message"
          defaultValue={comment.message}
        />
      </FloatingLabel>
      <Button variant="success" type="submit" className="me-2">
        <FontAwesomeIcon icon={faCheck} /> Save
      </Button>
      <Button variant="danger" type="reset" onClick={() => setEditMode(false)}>
        <FontAwesomeIcon icon={faTimes} /> Cancel
      </Button>
      {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}
    </Form>
  )
}
