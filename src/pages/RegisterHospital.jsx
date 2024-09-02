import { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  firestore,
  onAuthStateChanged,
  signOut,
} from "../fb";
import "../css/LoginHospital.css";
function RegisterHospital() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function register(e) {
    e.preventDefault();
    const { id, name, email, pwd } = e.target.elements;

    let usr;

    // try {
    //     // Sign in user
    //     usr = await signInWithEmailAndPassword(auth, email.value, pwd.value)
    //     console.log('sign in: ', usr.user.email)
    // } catch (err) {
    //     // If new user, sign up and create new record in firestore
    //     usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value)
    //     console.log(usr.user)

    //     await setDoc(doc(firestore, 'users', usr.user.uid), {
    //         name: usr.user.email,
    //         email: usr.user.email,
    //         role: 'user'
    //     })

    //     console.log('create user: ', usr.user.email)
    // }

    try {
      // Register in user
      usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value);
      console.log(usr.user);

      await setDoc(doc(firestore, "hospitals", usr.user.uid), {
        id: id.value,
        name: name.value,
        email: usr.user.email,
        role: "hospital",
      });

      console.log("created user: ", usr.user.email);
    } catch (err) {
      alert("Error");
      console.log(err);
    }
  }

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      // console.log("user logged out")
    }
  });

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#0056b3;" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-semibold fs-10" href="#">
            Navbar
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
                <a className="nav-link fs-5 fw-bold mx-2" href="#">
                  User
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link fs-5 fw-bold mx-2" href="#">
                  Hospital
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link fs-5 fw-bold mx-2" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link fs-5 fw-bold mx-2" href="#">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4 content">
        <div className="row align-items-center">
          <div
            className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0"
            style={{ marginLeft: "5px;" }}
          >
            <div className="hero-text">
              <h1>Welcome!..</h1>
              <p style={{ color: "black", fontWeight: "bold" }}>
                Secure Access To Your Patients
                <br />
                Complete Health Journey...
              </p>
            </div>
            <img
              style={{ maxWidth: "60%", height: "auto" }}
              className="hero-img"
              src="./images/medical1.svg"
              alt="Medical Illustration"
            />
          </div>
          <div className="col-lg-4 offset-lg-1">
            <div
              className="card card-custom mx-auto"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <div className="card-body text-center">
                {/* <!-- Profile Picture --> */}
                <div className="mb-4">
                  <img
                    src="./images/login.png"
                    alt="Profile Picture"
                    className="rounded-circle profile-img"
                  />
                </div>
                {/* <!-- Username --> */}

                {!isLoggedIn && (
                  <>
                    <form onSubmit={register}>
                      <input
                        className="mb-3"
                        id="id"
                        placeholder="Hospital ID"
                        required
                      />
                      <br></br>
                      <input
                        className="mb-3"
                        id="name"
                        placeholder="Hospital Name"
                        required
                      />
                      <br></br>
                      <input
                        className="mb-3"
                        id="email"
                        placeholder="email"
                        required
                      />
                      <br></br>
                      <input
                        className="mb-3"
                        id="pwd"
                        placeholder="password"
                        required
                      />
                      <br></br>
                      <button
                        type="submit"
                        className="btn btn-custom w-100"
                        style={{ backgroundColor: "darkblue" }}
                      >
                        Register Hospital
                      </button>
                    </form>
                    <a href="/hospitalLogin">Already Have an account? </a>
                  </>
                )}
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      signOut(auth);
                    }}
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterHospital;
