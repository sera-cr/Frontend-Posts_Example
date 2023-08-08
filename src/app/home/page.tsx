'use client'

import { useEffect, useState } from "react";
import Card from "./card/card";
import styles from "./page.module.scss";
import LoadingCard from "./card/loadingCard";
import { Button, Form, Modal } from "react-bootstrap";
import { getAllPostsStore } from "@/lib/post.functions";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import postSlice, { Post, insertPost } from "@/store/postSlice";
import { getUserById, getUserByIdStore } from "@/lib/user.functions";

export default function Home() {

  const [loadingCards, setLoadingCards] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postInfo, setPosts] = useState<Array<any>>([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSetPosts = (posts: any[]) => setPosts(posts);

  const handleLoadingCards = (value: boolean) => setLoadingCards(value);

  const allPosts = useAppSelector((state) => state.allReducers.posts.allPosts);

  const currentUser = useAppSelector((state) => state.allReducers.auth.value);

  const dispatch = useDispatch<AppDispatch>();

  const posts: Array<any> = new Array();

  useEffect(() => {
    (async () => {
      if (allPosts.length <= 0) {
        const postsList = await getAllPostsStore(currentUser);

        postsList.forEach((post, index) => {
          dispatch(insertPost(post));
          posts.push(post);
        })

      } else {
        allPosts.forEach((post, index) => {
          if (!posts.find((element) => element.id === post.id)) {
            posts.push(post);
          }
        })
      }
    }) ()
    handleLoadingCards(false);
    handleSetPosts(posts);
  }, []);

  const cardsLoading = Array.from({length: 3}, (_, index) => {
    return (
      <LoadingCard
        key={index}
      />
    )
  })

  const cardsLoaded = Array.from(postInfo, (post, index) => {
    return (
      <Card
        key={`card_${index}`}
        name={post.name}
        user={post.email}
        title={post.title}
        content={post.content}
        canEdit={currentUser.uid === post.authorId}
        canDelete={(currentUser.uid === post.authorId) || (currentUser.isAdmin)}
        published={post.published}
        postId={post.id}
      />
    )
  })

  return (
    <div className="mt-8 container" style={{ overflow: "hidden"}}>
      {loadingCards ?
        cardsLoading
        :
        cardsLoaded
      }
      <div className="position-fixed bottom-0 end-0 mb-6 me-6">
        <button type="button" onClick={handleShowModal} className={styles.post_button + " sticky-bottom text-white fw-bold btn btn-lg btn-primary center "} data-bs-target="#exampleModal">
          <span className="ms-1">New Post!&nbsp;&nbsp;&nbsp;</span><i className="bi bi-pencil-fill mt" style={{fontSize: "25px"}}></i>
        </button>
      </div>
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