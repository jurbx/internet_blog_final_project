import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import PostCard from "./PostCard";

export default function Home() {
  const
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    [postList, setPostList] = useState([]),
    [havePostList, setHavePostList] = useState(false)

  useEffect(() => {
    axios.get(`${baseUrl}/api/list/`)
    .then(res => setPostList(res.data))
    .catch(err => console.warn(err))
    .finally(() => setHavePostList(true))
  }, [])

  return (
    <main className="text-white py-4">
      <Container className="bg-dark p-4 rounded">
        <h2 className="section-title">Recent Posts</h2>
        {
          !havePostList ? <div className="text-center"><Spinner animation="border" /></div>
          : postList.length ? postList.map(post => <PostCard key={`post${post.id}`} postInfo={post} />)
          : "No any posts yet. Be the first!"
        }
      </Container>
    </main>
  )
}
