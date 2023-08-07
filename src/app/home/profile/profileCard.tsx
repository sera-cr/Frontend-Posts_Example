import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ProfileCard({
  name,
  email,
  bio
}: {
  name: string,
  email: string,
  bio: string,
}) {

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // w-100 p-3" style={{height: "84vh"}}

  return (
    <div className="mt-8 d-flex justify-content-center align-items-center flex-row"
      style={{ minHeight: "80vh" }}
    >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{email}</h6>
          <p className="card-text">{bio}</p>
          <Button variant="outline-primary" onClick={handleShowModal}>
            Change bio
          </Button>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change bio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            Bio content:
          </Form.Label>
          <Form.Control
            maxLength={250}
            size="lg"
            as="textarea"
            rows={3}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal} className="mx-2">
            Close
          </Button>
          <Button variant="outline-primary" onClick={handleCloseModal}>
            Change Bio
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}