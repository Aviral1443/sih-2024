import { auth, signOut } from '../../fb'

const Navbar = ({ userId }) => {
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light' style={{ backgroundColor: 'rgba(2, 7, 17, 0.9)' }}>
				<div className='container-fluid'>
					<a className='navbar-brand' href='/user/profile'>
						<img src='/images/login.png' alt='Logo' width='40' height='40' className='d-inline-block align-text-top' />
					</a>
					<button
						style={{ backgroundColor: '#95a8f3' }}
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<div className='d-flex flex-grow-1 justify-content-center'>
							<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
								<li className='nav-item mx-4'>
									<a
										className='nav-link'
										style={{ color: '#95a8f3', fontSize: '1.6rem', fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}
										aria-current='page'
										href='/user'
									>
										Home
									</a>
								</li>
								<li className='nav-item mx-4'>
									<a
										className='nav-link'
										style={{ color: '#95a8f3', fontSize: '1.6rem', fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}
										href='/user/reports'
									>
										Reports
									</a>
								</li>
								<li className='nav-item mx-4'>
									<a
										className='nav-link'
										style={{ color: '#95a8f3', fontSize: '1.6rem', fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}
										aria-current='page'
										href='/user/medicine'
									>
										Medicine
									</a>
								</li>
								<li className='nav-item mx-4'>
									<a
										className='nav-link'
										style={{ color: '#95a8f3', fontSize: '1.6rem', fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}
										href='/user/appointment'
									>
										Appointment
									</a>
								</li>
							</ul>
						</div>
						{userId ? (
							<div className='d-flex align-items-center'>
								<button
									className='btn btn-outline-success'
									style={{
										backgroundColor: '#95a8f3',
										width: '100px',
										fontSize: '1.4rem',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										color: 'rgba(2, 7, 17, 0.9)'
									}}
									type='submit'
									onClick={() => signOut(auth)}
								>
									Logout
								</button>
							</div>
						) : (
							<a
								className='btn btn-outline-success'
								style={{
									backgroundColor: '#95a8f3',
									width: '100px',
									fontSize: '1.4rem',
									fontFamily: "'Nunito', sans-serif",
									fontWeight: 800,
									color: 'rgba(2, 7, 17, 0.9)'
								}}
								href='/user/login'
							>
								Login
							</a>
						)}
					</div>
				</div>
			</nav>
		</>
	)
}

export default Navbar
