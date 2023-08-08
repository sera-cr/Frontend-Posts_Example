import { createBioStore, updateBioStore } from "@/lib/bio.functions";
import { Bio, insertBio } from "@/store/bioSlice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function ProfileCard({
  name,
  email,
  bio,
  uid,
  profileId
}: {
  name: string,
  email: string,
  bio: string,
  uid: number,
  profileId: number
}) {

  const [showModal, setShowModal] = useState(false);
  const [bioForm, setBioForm] = useState(bio);

  const handleShowModal = () => setShowModal(true);
  const handleSubmitModal = () => {
    setShowModal(false);
    onSubmit()
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setBioForm(bio);
  }

  const handleBioForm = (bio: any) => setBioForm(bio);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async() => {
    let result: Bio;
    if (profileId === -1) {
      result = await createBioStore(uid, bioForm);
    } else {
      result = await updateBioStore(uid, bioForm);
    }
    dispatch(insertBio(result));
  }

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
        show={showModal}a
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
            onChange={event => handleBioForm(event.target.value)}
            value={bioForm}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal} className="mx-2">
            Close
          </Button>
          <Button type="submit" variant="outline-primary" onClick={handleSubmitModal}>
            Change Bio
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}