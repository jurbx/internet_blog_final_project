import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PostComment({comment}) {
  return (
    <Card bg="dark" className="post-comment">
      <Card.Header className="pb-0">
        <Link to={`/users/${comment.author.username}`} className="text-reset text-decoration-none">
          <img src={comment.author.avatar} className="rounded-circle comment-user-avatar" />
          {comment.author.username}
        </Link>
      </Card.Header>
      <Card.Body>{comment.message}</Card.Body>
    </Card>
  )
}
