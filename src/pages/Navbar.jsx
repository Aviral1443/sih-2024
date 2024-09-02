import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#0056b3", height: "60px" }}
      >
        <div className="container-fluid">
          <a className=" fw-semibold fs-10" href="#">
            <img
              src="./images/arrow_back.svg"
              alt="arrow"
              style={{ marginLeft: "10px", height: "40px", width: "40px" }}
            />
          </a>
          <a className=" fw-semibold fs-10" href="#">
            <img
              src="./images/login.png"
              alt="Logo"
              style={{ height: "40px", width: "40px" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="/user">
                  Home
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="#">
                  Reports
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="/Pres">
                  Medicine
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="#">
                  Scheduler
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="#">
                  Help
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link fw-bold mx-2" href="#">
                  <img
                    src="./images/login.png"
                    alt="user details"
                    style={{ width: "40px", height: "40px" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar