import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import "./UserAccount.scss";
import PostCard from "../Home/PostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function UserAccount() {
  const baseUrl = "https://projectwithrestapi.herokuapp.com";
  let { userName } = useParams();
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    if(cookies.get("user") && cookies.get("user").username === userName) {
      // Get Private Info
      axios.get(`${baseUrl}/authentication/account/${cookies.get("user").username}/`, {headers: {
        Authorization: `Token ${cookies.get("user").token}`
      }})
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        setErrMsg("We cannot find this user");
      })
    } else {
      // Get Public Info
      axios.get(`${baseUrl}/authentication/account/public/${userName}/`)
      .then(res => setUser(res.data))
      .catch(err => {
        setErrMsg("We cannot find this user");
      })
    }
  }, []);

  useEffect(() => {
    // Get user posts
    axios.get(`${baseUrl}/api/list/`)
      .then(res => {
        setPosts(res.data.filter(post => post.author.username === userName))
      })
  }, [])

  return (
    errMsg ?
    <Alert variant="danger" className="my-4">{errMsg}</Alert> :
    <main className="py-4">
    <Container className="bg-dark p-4">
      <Card className="user-card border-0" bg="dark" text="white">
        <Col sm="auto">
          <div className="user-avatar-wrapper me-4">
            <img src={`${user.avatar}`} alt="User Avatar" />
          </div>
        </Col>
        <Col className="card-main-info">
        <header>
          <h3>{user.first_name || "Jack"} {user.last_name || "Friday"}</h3>
          <p className="text-muted">{user.username}</p>
        </header>
        <div>
          <Button variant="success"><FontAwesomeIcon icon={faEdit} /> Edit</Button>
          &nbsp;
          <Link to="/create-post" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Post
          </Link>
        </div>
        </Col>
      </Card>
      <section className="text-white mt-4">
        <h2 className="section-title">Your posts</h2>
        {posts.map((post, idx) => <PostCard postInfo={post} key={idx} />)}
      </section>
    </Container>
    </main>
  )
}
