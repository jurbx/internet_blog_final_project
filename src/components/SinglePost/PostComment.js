import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Card, Col, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import ToastAlert from "../ToastAlert";
import EditComment from "./EditComment";

export default function PostComment({ comment }) {
  const
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    cookies = new Cookies(),
    [user, setUser] = useState(cookies.get("user") || {}),
    [alertMsg, setAlertMsg] = useState({}),
    [toastVisible, setToastVisible] = useState(true),
    [editMode, setEditMode] = useState(false)

  function deleteComment(e) {
    const axiosConfig = {
      headers: { "Authorization": `Token ${user.token}` }
    }

    axios.delete(baseUrl + `/api/update/comment/${comment.id}/`, axiosConfig)
    .then(res => {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
      setToastVisible(true)
      setAlertMsg({
        variant: "success",
        title: "That's good",
        msg: "Your comment has been successfully deleted"
      })
    })
    .catch(err => {
      setToastVisible(true)
      setAlertMsg({
        variant: "danger",
        title: "Something went wrong",
        msg: "We cannot delete this comment"
      })
    })
  }

  return (
    <Card bg="dark" className="post-comment">
      <Card.Header className="pb-0 d-flex">
        <Col>
        <Link to={`/users/${comment.author.username}`} className="text-reset text-decoration-none">
          <img src={comment.author.avatar} className="rounded-circle comment-user-avatar" />
          {comment.author.username}
        </Link>
        </Col>
        <Col xs="auto">
          {
            comment.author.username === user.username
              ? (<>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => {setEditMode(true)}}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
                <Button variant="danger" onClick={deleteComment}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </>)
              : ""
          }
        </Col>
      </Card.Header>
      <Card.Body>
        {
          user.username === comment.author.username
            ? editMode
            ? <EditComment comment={comment} editMode={editMode} setEditMode={setEditMode} />
            : <ReactMarkdown children={comment.message} />
            : <ReactMarkdown children={comment.message} />
        }
      </Card.Body>
      {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}
    </Card>
  )
}
