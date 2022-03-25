import { Container } from "react-bootstrap"
import "./About.scss"
import AuthorCard from "./AuthorCard"

export default function About() {
  const authors = [
    {
      nickname: "Object_417",
      avatar: "https://i.pinimg.com/originals/bb/18/8e/bb188e0bec649d84873aa871d2529436.jpg",
      occupation: "Front-End Developer",
      link: "https://github.com/Object417",
      description: [
        `Just a man who likes bring things to life. It's not difficult to me to learn something new,
        but only if it makes sense. Useless and meaningless things (IMHO)
        I'll never be able to master and like.`
      ]
    },
    {
      nickname: "Jurb",
      avatar: "https://i.pinimg.com/550x/ed/cf/cc/edcfcceee274c98a860cfe2be92e047f.jpg",
      occupation: "Back-End Developer",
      link: "https://github.com/jurbx",
      description: ["This wonderful developer was too lazy to leave a comment."]
    }
  ]

  return (
    <main className="text-white py-4">
      <Container className="py-4 bg-dark rounded">
        <section>
          <h2 className="section-title">The Team</h2>
          {authors.map((author, idx) => <AuthorCard key={"authorCard" + idx} author={author} />)}
        </section>
      </Container>
    </main>
  )
}
