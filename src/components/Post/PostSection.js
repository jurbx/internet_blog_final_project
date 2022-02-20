import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";

export default function PostSection({section, removeSection, editSection}) {

  return (
    <section>
      <div className="d-flex">
        <FloatingLabel label="Section Title" className="me-2 flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Section Title"
            defaultValue={section.title}
            onChange={e => editSection({...section, title: e.target.value})}
          />
        </FloatingLabel>
        <Button variant="danger" onClick={() => removeSection(section)}>
          <FontAwesomeIcon icon={faTrash} /> Section
        </Button>
      </div>

      <FloatingLabel label="Section Content" className="section-content">
        <Form.Control
          as="textarea"
          placeholder="Section Content"
          defaultValue={section.desc || section.content}
          onChange={e => editSection({...section, desc: e.target.value})}
        />
      </FloatingLabel>
    </section>
  )
}
