import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
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
      axios.post(`${baseUrl}/post/like/${post.id}/`, "", {
        headers: { "Authorization": `Token ${user.token}` }
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
          {post.comments.length}
          <FontAwesomeIcon icon={faComments} />
        </a>
      </div>
      <div className="right-side">
        <span className="text-secondary">{moment(post.created).fromNow()}</span>
      </div>
    </header>
    <h2 className="section-title mx-4">{post.title}</h2>
    {post.sections.map(section => (
      <section key={section.id} className="px-4">
        <h3>{section.title}</h3>
        {section.content}
      </section>
    ))}
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
    {post.comments.map(comment => <PostComment key={comment.id} comment={comment} />)}
    {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}
  </>)
}
