import { faComments, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./PostCard.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import ToastAlert from "../ToastAlert";

export default function PostCard({postInfo}) {
  const [alertMsg, setAlertMsg] = useState({}),
    [liked, setLiked] = useState(0),
    [toastVisible, setToastVisible] = useState(true),
    [post, setPost] = useState(postInfo),
    cookies = new Cookies(),
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    user = cookies.get("user")

  function likePost() {
    if(user && user.token) {
      axios.post(`${baseUrl}/post/like/${post.id}/`, "", {
        headers: { "Authorization": `Token ${user.token}`}
      })
      .then(res => {
        setLiked(res.status - 200)
        axios.get(`${baseUrl}/post/detail/${post.id}/`)
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

  return (<>
    <Card bg="dark" text="white" className="post-card">
      <Card.Header>
        <img src={post.author.avatar} className="rounded-circle" />
        <div className="d-flex justify-content-between">
          <p>
            <Link to={`/users/${post.author.username}`} className="text-reset text-decoration-none">
              {post.author.username}
            </Link>
          </p>
          {/* <span className="text-muted">Publish date</span> */}
        </div>
        <h3 className="post-title">
          <Link to={`/post${post.id}`} className="text-reset">{post.title}</Link>
        </h3>
      </Card.Header>
      <Card.Body>{post.sections.content || post.sections[0].content}</Card.Body>
      <Card.Footer>
        <Button variant="dark" className="me-2" onClick={likePost}>
          {post.likes.length}&nbsp;
          <FontAwesomeIcon icon={liked ? faThumbsUp : farThumbsUp} />
          </Button>
        <Link to={`/post${post.id}#comments`} className="btn btn-dark">
          {post.comments.length}&nbsp;
          <FontAwesomeIcon icon={faComments} />
        </Link>
      </Card.Footer>
    </Card>
    {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}
  </>)
}
