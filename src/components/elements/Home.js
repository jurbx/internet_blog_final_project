import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostCard from "./PostCard";

export default function Home() {
  const baseUrl = "https://projectwithrestapi.herokuapp.com",
        [postList, setPostList] = useState([]);

  useEffect(() => {
    // Get all posts
    axios.get(`${baseUrl}/post/list/`)
    .then(res => setPostList(res.data))
    .catch(err => console.warn(err))
  }, []);

  return (
    <main>
      <Container className="p-4 text-white" id="postCardCont">
        <h2>Recent Posts</h2>
        { postList.length ? postList.map(post => <PostCard key={`post${post.id}`} post={post} />) : ""}
      </Container>
    </main>
  )
}
