import { useState } from 'react'
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  firestore,
  onAuthStateChanged,
  signOut,
} from '../../fb'
function RegisterHospital() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function register(e) {
    e.preventDefault()
    const { id, name, email, pwd } = e.target.elements

    let usr

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
      usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value)
      console.log(usr.user)

      await setDoc(doc(firestore, 'hospitals', usr.user.uid), {
        id: id.value,
        name: name.value,
        email: usr.user.email,
        role: 'hospital',
      })

      console.log('created user: ', usr.user.email)
    } catch (err) {
      alert('Error')
      console.log(err)
    }
  }

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
      // console.log("user logged out")
    }
  })

  return (
    <>
      <div className="container mt-4 content">
        <div className="row align-items-center">
          <div
            className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0"
            style={{ marginLeft: '5px;' }}
          >
            <div className="hero-text">
              <h1
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '5rem',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Welcome!..
              </h1>
              <p
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '2rem',
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Secure Access To Your Patients
                <br />
                Complete Health Journey...
              </p>
            </div>
            <img
              style={{ maxWidth: '60%', height: 'auto' }}
              className="hero-img"
              src="/images/medical1.svg"
              alt="Medical Illustration"
            />
          </div>
          <div className="col-lg-4 offset-lg-1">
            <div
              className="card card-custom mx-auto"
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <div className=" text-center p-4">
                {/* <!-- Profile Picture --> */}
                <div className="mb-4">
                  <img
                    src="/images/login.png"
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
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          backgroundColor: 'rgb(18, 18, 95)',
                          color: '#aaacf7',
                          fontFamily: "'Nunito', sans-serif",
                        }}
                      >
                        Register Hospital
                      </button>
                    </form>
                    <p style={{
                          marginTop: '7px',fontWeight: 'bold'}}>Already Have an account? </p>
                    <a href="/hospital/login">
                      <button
                        style={{
                          borderRadius: '20px',
                          marginTop: '1px',
                          padding: '10px',
                          color: '#aaacf7',
                          width: '30%',
                          backgroundColor: 'rgb(18, 18, 95)',
                          fontWeight: 'bold',
                          fontFamily: "'Nunito', sans-serif",
                        }}
                      >
                        login
                      </button>
                    </a>
                  </>
                )}
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      signOut(auth)
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
  )
}

export default RegisterHospital
