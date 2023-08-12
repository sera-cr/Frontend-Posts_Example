import { Button, Form, Modal } from "react-bootstrap";
import styles from "../page.module.scss";
import { useState } from "react";
import { Post, deletePost, deleteUserPost, editPost, editUserPost, insertPost } from "@/store/postSlice";
import { deletePostStore, editPostStore } from "@/lib/post.functions";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/store/store";

export default function Card({
  postId,
  canEdit,
  canDelete,
  userPost
}: {
  postId: number,
  canEdit: boolean,
  canDelete: boolean
  userPost: boolean
}) {

  let originalPost: Post | undefined;

  if (!userPost) {
    originalPost = useAppSelector((state) =>
      state.allReducers.posts.allPosts.find((element) => element.id === postId));
  } else {
    originalPost = useAppSelector((state) => 
      state.allReducers.posts.userPosts.find((element) => element.id === postId));
  }

  const [showModal, setShowModal] = useState(false);
  const [titleState, setTitle] = useState(originalPost ? originalPost.title : "");
  const [contentState, setContent] = useState(originalPost ? originalPost.content : "");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSetTitle = (title: string) => setTitle(title);
  const handleSetContent = (content: string) => setContent(content);

  const dispatch = useDispatch<AppDispatch>();

  const onOpenEdit = () => {
    handleShowModal();
  }

  const handleSubmitModal = () => {
    setShowModal(false);
    onSubmit();
  }

  const onSubmit = async () => {
    const result = await editPostStore(postId, titleState, contentState, originalPost ? originalPost.published : true);

    const post = {
      id: originalPost?.id,
      title: titleState,
      content: contentState,
      createdAt: originalPost?.createdAt,
      updatedAt: result.updatedAt,
      authorId: originalPost?.authorId,
      published: result.published,
      name: originalPost?.name,
      email: originalPost?.email,
      canEdit: canEdit,
      canDelete: canDelete,
    } as Post;

    dispatch(editUserPost(post));
    if (!userPost) dispatch(editPost(post));
  }

  const onPublish = async () => {
    const result = await editPostStore(postId, titleState, contentState, true);

    const post = {
      id: originalPost?.id,
      title: titleState,
      content: contentState,
      createdAt: originalPost?.createdAt,
      updatedAt: result.updatedAt,
      authorId: originalPost?.authorId,
      published: result.published,
      name: originalPost?.name,
      email: originalPost?.email,
      canEdit: canEdit,
      canDelete: canDelete,
    } as Post;

    dispatch(editUserPost(post));
    dispatch(insertPost(post));
  }

  const onDelete = async () => {
    await deletePostStore(postId);
    await dispatch(deletePost(postId));
    await dispatch(deleteUserPost(postId));
  }

  if (originalPost) {
    return (
      <div className={styles.card + " card position-static mb-4"}>
        <div className="card-header">
          <h6 className="card-subtitle text-body-secondary"><b className="fs-6 text-dark">{originalPost?.name}</b> <small className="fs-8">{originalPost?.email}</small></h6>
        </div>
        <div className="card-body">
          <h5 className="card-title"><strong>{titleState}</strong></h5>
          <p className="card-text">{contentState}</p>
          <div>
            <div className="d-flex justify-content-between flex-row">
              {
                !originalPost?.published ?
                <Form>
                  <Button variant="outline-primary" onClick={onPublish}>Publish</Button>
                </Form>
                :
                <div />
              }
              <div>
                { canEdit && <Button type="button" onClick={onOpenEdit} className="btn btn-link rounded-circle"><i className="fs-5 bi-pencil-fill"></i></Button>}
                { canDelete && <Button type="button" onClick={onDelete} className="btn btn-link link-danger rounded-circle"><i className="fs-5 bi-trash3-fill"></i></Button>}
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={showModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
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
            <Form.Label>
              Content:
            </Form.Label>
            <Form.Control
              maxLength={250}
              size="lg"
              as="textarea"
              rows={3}
              onChange={event => handleSetContent(event.target.value)}
              value={contentState}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal} className="mx-2">
              Close
            </Button>
            <Button type="submit" variant="outline-primary" onClick={handleSubmitModal}>
              Change Post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}