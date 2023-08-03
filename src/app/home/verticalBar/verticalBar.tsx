'use client'

import Logo from "@/app/common/logo";
import Link from "next/link";
import "./verticalBar.style.scss";

export default function verticalBar() {

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light" id="vb">
      <div className="d-flex flex-column min-vh-100 px-3 pt-2 ">
        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-5 d-none d-sm-inline mt-4">
            <Logo color="black" fontSize="40px" />
          </span>
        </a>
        <hr className="border-dark opacity-25 mt-2 mb-2"/>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="nav-item">
          <Link href="/home" className='link-opacity-50-hover link-primary link-underline-opacity-100 nav-link align-middle px-0'>
            <i className="fs-4 bi-house-fill"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
          </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link align-middle px-0">
              <i className="fs-4 bi-person-fill"></i> <span className="ms-1 d-none d-sm-inline">Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link align-middle px-0">
              <i className="fs-4 bi-chat-dots-fill"></i> <span className="ms-1 d-none d-sm-inline">My Posts</span>
            </a>
          </li>
        </ul>
        <hr />
        <div className="pb-4">
          <a href="#" className="d-flex justify-content-between text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <div>
              <img src="https://github.com/sera-cr.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
              <span className="d-none d-sm-inline mx-1 text-black">Sera-cr</span>
            </div>
            <div>
              <span className="ms-1 d-none d-sm-inline text-dark fw-semibold">GitHub </span><i className="bi bi-github text-dark"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}