'use client'

import "./pageBar.style.scss";

export default function PageBar({
  page,
} : {
  page: string
}) {
  return (
    <nav className="navbar bg-body-tertiary ps-0">
      <div className="container-fluid justify-content-start">
        <div className="navbar-brand fs-3 fw-semibold mt-3 mb-0">
          {page}
        </div>
      </div>
    </nav>
  )
}