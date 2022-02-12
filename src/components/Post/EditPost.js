import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import Cookies from "universal-cookie/es6";
import "./EditPost.scss";
import PostSection from "./PostSection"
import axios from "axios";
import ToastAlert from "../ToastAlert";

let id = 0;
export default function EditPost({postInfo, type}) {
  const
    cookies = new Cookies(),
    [post, setPost] = useState(type === "edit" ? postInfo : {}),
    [sections, setSections] = useState(type === "edit" ? postInfo.sections : []),
    [user, setUser] = useState(cookies.get("user")),
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    [alertMsg, setAlertMsg] = useState({}),
    [toastVisible, setToastVisible] = useState(true)

  useEffect(() => {
    if(sections.length === 0) { setSections([{id: "section" + id}]) }
  }, [])
  
  function addSection() {
    id++
    setSections([...sections, {id: "section" + id}])
  }

  function removeSection(removedSection) {
    setSections(sections.filter(section => section.id !== removedSection.id))
  }

  function editSection(editedSection) {
    // console.log(editedSection, sections.find(section => section.id === editedSection.id))

    setSections(sections.map(section => section.id === editedSection.id ? editedSection : section))
  }
  // console.log(sections)

  function sendForm(e) {
    e.preventDefault()
    const form = e.target

    let data = {
      title: form.postTitleInput.value,
      sections: sections
    }

    axios.post(`${baseUrl}/api/create/`, JSON.stringify(data), {
      headers: {
        "Authorization": `Token ${user.token}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      setAlertMsg({
        title: "That's good",
        msg: "Your post has been successfully published",
        variant: "success"
      })
      setToastVisible(true)
    })
    .catch(err => {
      setAlertMsg({
        title: "Something went wrong",
        msg: "We couldn't publish your post",
        variant: "danger"
      })
      setToastVisible(true)
    })
  }

  return (
    <main className="text-white my-4 single-post">
      <Container className="p-4 bg-dark rounded">
        
        <Form id="editPostForm" onSubmit={sendForm}>
          <FloatingLabel label="Post Title" controlId="postTitleInput" className="mb-3">
            <Form.Control type="text" placeholder="Post Title" defaultValue={post.title} />
          </FloatingLabel>

          {
            sections.map(section => (
              <PostSection
                section={section}
                key={section.id}
                removeSection={removeSection}
                editSection={editSection}
              />
            ))
          }

          <Button variant="primary" className="me-2" onClick={addSection}>
            <FontAwesomeIcon icon={faPlus} /> Section
          </Button>
          <Button variant="success" type="submit">
            {type === "edit" ? "Submit edit" : "Create the Post"}
          </Button>
        </Form>

        {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}

      </Container>
    </main>
  )
}
