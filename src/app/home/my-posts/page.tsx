'use client'

import { useState } from "react";
import Card from "../card/card";
import styles from "../page.module.scss";
import LoadingCard from "../card/loadingCard";
import { Button, Form, Modal } from "react-bootstrap";


export default function MyPosts() {

  const [loadingCards, setLoadingCards] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const cardsLoading = Array.from({length: 5}, (_, index) => {
    return (
      <Card
        name="Name"
        user="email@email.com"
        title="titulooo"
        content="contenido"
        canEdit={true}
        canDelete={false}
        published={false}
        postId={1}
      />
    )
  })

  return (
    <div className="mt-8 container" style={{ overflow: "hidden"}}>
      {loadingCards ?
        cardsLoading
        :
        <LoadingCard />
      }
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            Content:
          </Form.Label>
          <Form.Control
            maxLength={250}
            size="lg"
            as="textarea"
            rows={3}
          />
          <Form.Text muted>
            The content of the post must be 250 characters long. Can contain letters, numbers, spaces and special characters.
          </Form.Text>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-between">
          <Form>
            <Form.Check
              type="switch"
              label="Publish?"
            />
          </Form>
          <div>
            <Button variant="outline-secondary" onClick={handleCloseModal} className="mx-2">
              Close
            </Button>
            <Button variant="outline-primary" onClick={handleCloseModal}>
              Post!
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}