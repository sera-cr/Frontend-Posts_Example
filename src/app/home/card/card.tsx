import { Button, Form } from "react-bootstrap";
import styles from "../page.module.scss";

export default function Card({
  user,
  title,
  content,
  canEdit,
  canDelete,
  published,
  postId,
}: {
  user: string,
  title: string,
  content: string,
  canEdit: boolean,
  canDelete: boolean,
  published: boolean,
  postId: number
}) {
  return (
    <div className={styles.card + " card position-static mb-4"}>
      <div className="card-header">
        <h6 className="card-subtitle text-body-secondary">{user}</h6>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <div>
          <div className="d-flex justify-content-between flex-row">
            {
              !published ?
              <Form>
                <Button variant="outline-primary">Publish</Button>
              </Form>
              :
              <div />
            }
            <div>
              { canEdit && <button type="button" className="btn btn-link rounded-circle"><i className="fs-5 bi-pencil-fill"></i></button>}
              { canDelete && <button type="button" className="btn btn-link link-danger rounded-circle"><i className="fs-5 bi-trash3-fill"></i></button>}
            </div>
          </div>
        </div>
        {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
      </div>
    </div>
  )
}