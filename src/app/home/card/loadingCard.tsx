import styles from "../page.module.scss";

export default function LoadingCard() {
  return (
    <div className={styles.card + " card position-static mb-4"} aria-hidden="true">
      <div className="card-body">
        <h5 className="card-title position-sticky placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-8"></span>
        </p>
      </div>
    </div>
  )
}