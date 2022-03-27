import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePostContent from "./SinglePostContent";
import NotFound from "../NotFound";
import { Container } from "react-bootstrap";
import axios from "axios";
import "./SinglePost.scss"

export default function SinglePost() {
  const
    [post, setPost] = useState({}),
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    { postId } = useParams();
  

  useEffect(() => {
    axios.get(`${baseUrl}/api/detail/${postId}/`)
    .then(res => setPost(res.data))
  }, []);

  return (
    <main className="text-white my-4 single-post">
      <Container className="p-0 pb-4 bg-dark rounded">
        {post.title ? <SinglePostContent postInfo={post} /> : <NotFound />}
      </Container>
    </main>
  )
}
