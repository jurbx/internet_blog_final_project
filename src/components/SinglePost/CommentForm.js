import { Button, FloatingLabel, Form } from "react-bootstrap";
import "./CommentForm.scss"
import { useState } from "react";
import ToastAlert from "../ToastAlert";
import Cookies from "universal-cookie/es6";
import axios from "axios";

export default function CommentForm({postInfo, alertMsg, setAlertMsg, toastVisible, setToastVisible}) {
  const
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    cookies = new Cookies,
    [user, setUser] = useState(cookies.get("user")),
    [post, setPost] = useState(postInfo)
  
  /*function validateComment(val) {
    console.log(val)
  }*/

  function addAComment(e) {
    e.preventDefault()

    /*if(!validateComment(e.target.commentText.value)) {
      return
    }*/

    if(user && user.token) {
      let data = {
        message: e.target.commentText.value
      }

      axios.post(`${baseUrl}/post/add/comment/${post.id}/`, JSON.stringify(data), {
        headers: {
          "Authorization": `Token ${user.token}`,
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        setAlertMsg({
          title: "That's good",
          msg: "Your comment has been successfully published",
          variant: "success"
        })
        setToastVisible(true)
      })
      .catch(err => {
        setAlertMsg({
          title: "Something went wrong",
          msg: "We cannot publish your comment",
          variant: "danger"
        })
        setToastVisible(true)
      })
    } else {
      setAlertMsg({
        title: "You can't do this",
        msg: "You must be signed in to comment this post",
        variant: "danger"
      })
      setToastVisible(true)
    }
  }


  return (<>
    <h4 className="section-title mx-4">Add a comment</h4>
    <Form id="commentForm" onSubmit={addAComment} className="px-4">
      <FloatingLabel label="What do you think about this?">
        <Form.Control
          as="textarea"
          className="mb-3"
          id="commentText"
          placeholder="What do you think about this?"
        ></Form.Control>
      </FloatingLabel>
      <Button variant="success" type="submit">Reply</Button>
    </Form>
  </>)
}
