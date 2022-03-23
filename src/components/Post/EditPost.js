import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Alert } from "react-bootstrap";
import Cookies from "universal-cookie/es6";
import "./EditPost.scss";
import PostSection from "./PostSection"
import axios from "axios";
import ToastAlert from "../ToastAlert";
import { Link, useParams } from "react-router-dom";

let id = 0;
export default function EditPost({type}) {
  const
    cookies = new Cookies(),
    [post, setPost] = useState({}),
    [sections, setSections] = useState([]),
    [user, setUser] = useState(cookies.get("user")),
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    [alertMsg, setAlertMsg] = useState({}),
    [toastVisible, setToastVisible] = useState(true),
    { postId } = useParams(),
    [errMsg, setErrMsg] = useState("")
    

  useEffect(() => {

    if(type === "edit" && postId) {
      axios.get(`${baseUrl}/api/detail/${postId}/`)
      .then(res => {

        if(user.username === res.data.author.username) {
          setPost(res.data)
          setSections(res.data.sections)
        } else {
          setErrMsg("You cannot edit this post")
        }
      })
      .catch(err => {
        setErrMsg("We cannot find post with this id")
      })
    }

    if(sections.length === 0) { setSections([{id: "section" + id}]) }
  }, [])

  let sectionsForSend = []
  
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

  function sendForm(e) {
    e.preventDefault()
    const form = e.target

    let addedSections = sections.filter(localSection => post.sections.every(sectionFromBase => sectionFromBase.id !== localSection.id))
    let removedSections = post.sections.filter(sectionFromBase => sections.every(localSection => localSection.id !== sectionFromBase.id))
    let editedSections = sections.filter(localSection => post.sections.some(sectionFromBase => sectionFromBase.id === localSection.id && (sectionFromBase.title !== localSection.title || sectionFromBase.content !== localSection.content)))

    addedSections.forEach(section => delete section.id)
    removedSections.forEach(section => section.delete = "delete")

    console.log(sections, post.sections)
    console.log("Added", addedSections)
    console.log("Removed", removedSections)
    console.log("Edited", editedSections)

    let data = {
      title: form.postTitleInput.value,
      sections: [...addedSections, ...removedSections, ...editedSections]
    },
    url = `${baseUrl}/api/${type === "edit" ? `edit/${postId}/` : `create/`}`,
    axiosConfig = {
      headers: {
        "Authorization": `Token ${user.token}`,
        "Content-Type": "application/json"
      }
    }


    axios[type === "edit" ? "put" : "post"](url, JSON.stringify(data), axiosConfig)
      .then(res => {
        setTimeout(() => {
          // window.location.pathname = `/post${ type === "edit" ? postId : res.data.id }`
          console.log(res, res.data)
        }, 2000)
        setAlertMsg({
          title: "That's good",
          msg: `Your post has been successfully ${type === "edit" ? "edited" : "published"}`,
          variant: "success"
        })
        setToastVisible(true)
      })
      .catch(err => {
        setAlertMsg({
          title: "Something went wrong",
          msg: `We couldn't ${type === "edit" ? "edit" : "publish"} your post`,
          variant: "danger"
        })
        setToastVisible(true)
      })

  }

  return (
    <main className="text-white my-4 single-post">
      <Container className="p-4 bg-dark rounded">
        {
        errMsg ? <Alert variant="danger">{errMsg}</Alert>
        : <>
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
            <FontAwesomeIcon icon={faPlus} />&nbsp;
            Section
          </Button>
          <Button variant="success" type="submit" className="me-2">
            <FontAwesomeIcon icon={faCheck} />&nbsp;
            { type === "edit" ? "Submit edit" : "Create the Post"}
          </Button>
          <Link to={type === "edit" ? `/post${postId}` : `/users/${user.username}`} className="btn btn-danger">
            <FontAwesomeIcon icon={faTimes} />&nbsp;
            Cancel
          </Link>
        </Form>

        {alertMsg.msg ? <ToastAlert alert={alertMsg} visible={toastVisible} setVisible={setToastVisible} /> : ""}
        </>
        }
      </Container>
    </main>
  )
}
