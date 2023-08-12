'use client'

import { useEffect, useState } from "react";
import Card from "./card/card";
import styles from "./page.module.scss";
import LoadingCard from "./card/loadingCard";
import { Button, Form, Modal } from "react-bootstrap";
import { createPostStore, getAllPostsStore } from "@/lib/post.functions";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { Post, insertPost, insertUserPost } from "@/store/postSlice";

export default function Home() {

  const [loadingCards, setLoadingCards] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postInfo, setPosts] = useState<Array<any>>([]);

  const [titleState, setTitle] = useState("");
  const [contentState, setContent] = useState("");
  const [publishedState, setPublished] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSetPosts = (posts: any[]) => setPosts(posts);
  const handleSetTitle = (title: string) => setTitle(title);
  const handleSetContent = (content: string) => setContent(content);
  const handleSetPublished = (published: boolean) => {
    setPublished(published)
  };

  const handleLoadingCards = (value: boolean) => setLoadingCards(value);

  const allPosts = useAppSelector((state) => state.allReducers.posts.allPosts);

  const currentUser = useAppSelector((state) => state.allReducers.auth.value);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitModal = () => {
    handleCloseModal();
    onSubmit()
  }

  const onSubmit = async() => {
    const post: Post = await createPostStore(titleState, contentState, publishedState);

    await dispatch(insertUserPost(post));
    if (post.published) {
      postInfo.push(post);
      await dispatch(insertPost(post))
    };
  }

  useEffect(() => {
    const posts: Array<Post> = new Array();

    (async () => {
      if (allPosts.length <= 0) {
        const postsList = await getAllPostsStore(currentUser);

        postsList.forEach((post, index) => {
          dispatch(insertPost(post));
          posts.push(post);
        })
        posts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
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

  useEffect(() => {
    allPosts.forEach((post, index) => {
      postInfo.push(post);
    })
  }, [postInfo])

  const cardsLoading = Array.from({length: 3}, (_, index) => {
    return (
      <LoadingCard
        key={index}
      />
    )
  })

  const cardsLoaded = Array.from(postInfo, (post, index) => {
    return (
      <div
        className="col-md-8 offset-md-2"
        key={`card_${index}`}>
        <Card
          canEdit={currentUser.uid === post.authorId}
          canDelete={(currentUser.uid === post.authorId) || (currentUser.isAdmin)}
          postId={post.id}
          userPost={false}
        />
      </div>
    )
  })

  return (
    <div className="mt-8 container" style={{ overflow: "hidden"}}>
      {loadingCards ?
        cardsLoading
        :
        cardsLoaded
      }
      <div className="position-fixed bottom-0 end-0 mb-8 me-4">
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
            Title:
          </Form.Label>
          <Form.Control
            maxLength={100}
            onChange={event => handleSetTitle(event.target.value)}
            value={titleState}
          />
          <Form.Text muted>
            The title of the post must be 100 characters long. Can contain letters, numbers, spaces and special characters.
          </Form.Text>
          <br />
          <Form.Label>
            Content:
          </Form.Label>
          <Form.Control
            maxLength={250}
            size="lg"
            as="textarea"
            rows={3}
            value={contentState}
            onChange={event => handleSetContent(event.target.value)}
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
              onChange={event => handleSetPublished(event.target.checked)}
            />
          </Form>
          <div>
            <Button variant="outline-secondary" onClick={handleCloseModal} className="mx-2">
              Close
            </Button>
            <Button variant="outline-primary" onClick={handleSubmitModal}>
              Post!
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}