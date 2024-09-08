import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore } from '../../fb'

function LoginUser(userId = { id }) {
	const [reg, setReg] = useState(false)

	async function login(e) {
		e.preventDefault()
		const { email, pwd } = e.target.elements
		try {
			await signInWithEmailAndPassword(auth, email.value, pwd.value)
			window.location.href = '/user'
		} catch (err) {
			alert(err)
		}
	}

	async function register(e) {
		e.preventDefault()
		const { name, email, pwd } = e.target.elements
		try {
			const usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value)

			await setDoc(doc(firestore, 'users', usr.user.uid), {
				name: name.value,
				email: usr.user.email
			})

			window.location.href = '/user'
		} catch (err) {
			alert(err)
		}
	}

	return (
		<>
			{reg && (
				<div>
					<div className='container mt-4 content'>
						<div className='row align-items-center '>
							<div className='col-lg-6 text-center text-lg-start mb-4 mb-lg-0 ms-10'>
								<div className='hero-text '>
									<h1
										style={{
											color: 'black',
											fontWeight: 'bold',
											fontSize: '5rem',
											fontFamily: "'Nunito', sans-serif"
										}}
									>
										Hello!..
									</h1>
									<p
										style={{
											color: 'black',
											fontWeight: 'bold',
											fontSize: '2rem',
											fontFamily: "'Nunito', sans-serif"
										}}
									>
										Medical Management Made Simple...
									</p>
								</div>
								<img style={{ maxWidth: '60%', height: 'auto' }} className='hero-img ms-10' src='/images/medical2.svg' alt='Medical Illustration' />
							</div>
							<div className='col-lg-4 offset-lg-1'>
								<div className='card-custom mx-auto' style={{ width: '100%', maxWidth: '300px' }}>
									<div className=' text-center  p-4'>
										<form onSubmit={register}>
											<div className='mb-4'>
												<img
													style={{ height: '200px', width: '200px;' }}
													src='/images/login.png'
													alt='Profile Picture'
													className='rounded-circle profile-img'
												/>
											</div>
											<div className='mb-3'>
												<input type='text' className='form-control' name='name' placeholder='Name' />
											</div>
											<div className='mb-3'>
												<input type='text' className='form-control' name='email' placeholder='Email' />
											</div>
											<div className='mb-3'>
												<input type='password' className='form-control' name='pwd' placeholder='Password' />
											</div>
											<button
												type='submit'
												className='btn btn-custom w-100'
												style={{
													fontSize: '1.4rem',
													fontWeight: 800,
													backgroundColor: 'rgb(18, 18, 95)',
													color: '#aaacf7',
													fontFamily: "'Nunito', sans-serif"
												}}
											>
												Register
											</button>
										</form>
									</div>
								</div>

								<p
									style={{
										fontWeight: 'bold',
										fontSize: '20px',
										textAlign: 'center',
										marginTop: '10px'
									}}
								>
									<button
										style={{
											borderRadius: '20px',
											marginTop: '10px',
											padding: '10px',
											color: '#aaacf7',
											width: '30%',
											backgroundColor: 'rgb(18, 18, 95)',
											fontWeight: 'bold',
											fontFamily: "'Nunito', sans-serif"
										}}
										onClick={() => setReg(false)}
									>
										Login
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
			{!reg && (
				<div>
					<div className='container mt-4 content'>
						<div className='row align-items-center'>
							<div className='col-lg-6 text-center text-lg-start mb-4 mb-lg-0' style={{ marginLeft: '5px' }}>
								<div className='hero-text'>
									<h1
										style={{
											color: 'black',
											fontWeight: 'bold',
											fontSize: '5rem',
											fontFamily: "'Nunito', sans-serif"
										}}
									>
										Hello!..
									</h1>
									<p
										style={{
											color: 'black',
											fontWeight: 'bold',
											fontSize: '2rem',
											fontFamily: "'Nunito', sans-serif"
										}}
									>
										Medical Management Made Simple...
									</p>
								</div>
								<img
									style={{ maxWidth: '60%', height: 'auto' }}
									className='hero-img d-none d-lg-block'
									src='/images/medical2.svg'
									alt='Medical Illustration'
								/>
							</div>
							<div className='col-lg-4 offset-lg-1'>
								<div className='card-custom mx-auto' style={{ width: '100%', maxWidth: '300px' }}>
									<div className=' text-center'>
										<form onSubmit={login}>
											<div className='mb-4'>
												<img
													style={{ height: '200px', width: '200px;' }}
													src='/images/login.png'
													alt='Profile Picture'
													className='rounded-circle profile-img'
												/>
											</div>
											<div className='mb-3'>
												<input type='text' className='form-control' name='email' placeholder='Email' />
											</div>
											<div className='mb-3'>
												<input type='password' className='form-control' name='pwd' placeholder='Password' />
											</div>
											<button
												type='submit'
												className='btn btn-custom w-100'
												style={{
													fontSize: '1.4rem',
													fontWeight: 800,
													backgroundColor: 'rgb(18, 18, 95)',
													color: '#aaacf7',
													fontFamily: "'Nunito', sans-serif"
												}}
											>
												Login
											</button>
										</form>
									</div>
								</div>

								<p
									style={{
										fontWeight: 'bold',
										fontSize: '20px',
										textAlign: 'center',
										marginTop: '10px'
									}}
								>
									New User? <br />
									<button
										style={{
											borderRadius: '20px',
											marginTop: '10px',
											padding: '10px',
											color: '#aaacf7',
											width: '30%',
											backgroundColor: 'rgb(18, 18, 95)',
											fontWeight: 'bold',
											fontFamily: "'Nunito', sans-serif"
										}}
										onClick={() => setReg(true)}
									>
										Register
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default LoginUser
