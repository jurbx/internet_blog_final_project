import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faEdit, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import PostComment from "./PostComment";
import moment from "moment";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import ToastAlert from "../ToastAlert";
import CommentForm from "./CommentForm";

export default function SinglePostContent({postInfo}) {
  const [alertMsg, setAlertMsg] = useState({}),
    [liked, setLiked] = useState(0),
    [toastVisible, setToastVisible] = useState(true),
    [post, setPost] = useState(postInfo),
    cookies = new Cookies(),
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    user = cookies.get("user")

  function likePost() {
    if (user && user.token) {
      axios.post(`${baseUrl}/api/like/${post.id}/`, "", {
        headers: { "Authorization": `Token ${user.token}` }
      })
        .then(res => {
          setLiked(res.status - 200)
          axios.get(`${baseUrl}/api/detail/${post.id}/`)
            .then(res => {
              setPost(res.data)
            })
        })
    } else {
      setToastVisible(true)
      setAlertMsg({
        variant: "danger",
        title: "You can't do this",
        msg: "You must be signed in to like this post"
      })
    }
  }

  useEffect(() => {
    if (user && post.likes.filter(like => like.author === user.username).length) {
      setLiked(1)
    }
  }, [])

  function deletePost() {
    axios.delete(`${baseUrl}/api/edit/${post.id}/`, {
      headers: {
        "Authorization": `Token ${user.token}`
      }
    })
    .then(res => {
      setToastVisible(true)
      setAlertMsg({
        variant: "success",
        title: "That's good",
        msg: "Your post has been successfully deleted. You'll be redirected in 3s"
      })

      setTimeout(() => {
        window.location.pathname = ``
      }, 3000)
    })
    .catch(err => {
      setToastVisible(true)
      setAlertMsg({
        variant: "danger",
        title: "Something went wrong",
        msg: "We cannot delete this post"
      })
    })
  }

  return (<>
    <header className="p-4">
      <div className="left-side">
        <Link to={`/users/${post.author.username}/`} className="text-reset text-decoration-none">
          <img src={post.author.avatar} className="rounded-circle post-user-avatar" />
          {post.author.username}
        </Link>&nbsp;
        <Button variant="dark" className="me-2" onClick={likePost}>
          {post.likes.length}&nbsp;
          <FontAwesomeIcon icon={liked ? faThumbsUp : farThumbsUp} />
        </Button>
        <a href="#comments" className="btn btn-dark">
          {post.comments.length}&nbsp;
          <FontAwesomeIcon icon={faComments} />
        </a>
      </div>
      <div className="right-side">
        <span className="text-secondary">{moment(post.created).fromNow()}</span>
        {
          user && post.author.username === user.username
          ? <><Link to={`/edit-post/${post.id}/`} className="ms-2 btn btn-success">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Link>
          &nbsp;
          <Button variant="danger" onClick={deletePost}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button></>
          : ""
        }
      </div>
    </header>
    <h2 className="section-title mx-4">{post.title}</h2>
    {
      post.sections.length
      ? post.sections.map(section => (
        <section key={section.id} className="px-4">
          <h3>{section.title}</h3>
          {section.content}
        </section>
      ))
      : <p className="mx-4">No content</p>
    }
    {user && user.token
      ? <CommentForm
          postInfo={post}
          toastVisible={toastVisible}
          setToastVisible={setToastVisible}
          alertMsg={alertMsg}
          setAlertMsg={setAlertMsg}
        />
      : ""}
    <h4 className="section-title mx-4" id="comments">Comments</h4>
    {
      post.comments.length
      ? post.comments.map(comment => <PostComment key={comment.id} comment={comment} />)
      : <p className="mx-4 my-0">No comments yet. Be the first!</p>
    }
    {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}
  </>)
}
