function Home() {
	return (
		<div style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: '#95a8f3', overflowX: 'hidden', color: '#03071f' }}>
			<div className='container' style={{ maxWidth: '100%', margin: 'auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
				<nav
					style={{
						padding: '0.7rem 2rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						backgroundColor: 'rgba(2, 7, 17, 0.9)',
						boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
						backdropFilter: 'blur(8px)',
						transition: 'background-color 0.3s ease',
						position: 'fixed',
						width: '100%',
						left: '50%',
						transform: 'translateX(-50%)',
						zIndex: '1000'
					}}
					className='navbar navbar-expand-md'
				>
					<div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#95a8f3', transition: 'color 0.3s ease' }} className='navbar-brand'>
					<img src='images/LOGO_heartPartOnly.svg' alt='Medical Services' className='d-inline-block align-text-top' style={{ width: '40px', height: '40px' }} />
					</div>

					<button
						style={{ border: 'none', background: 'transparent', backgroundColor: '#95a8f3' }}
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNav'
						aria-controls='navbarNav'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul style={{ margin: '0', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '5rem' }} className='navbar-nav ms-auto'>
							<li className='nav-item mx-4'>
								<a className='nav-link xyz' style={{ color: '#95a8f3' }} href='#home'>
									Home
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link xyz' style={{ color: '#95a8f3' }} href='#services'>
									Services
								</a>
							</li>
							<li className='nav-item xyz mx-4'>
								<a className='nav-link xyz' style={{ color: '#95a8f3' }} href='#insights'>
									Insights
								</a>
							</li>
							<li className='nav-item mx-4'>
								<a className='nav-link xyz' style={{ color: '#95a8f3' }} href='#'>
									About Us
								</a>
							</li>

							<li className='nav-item mx-4 mb-5 mb-sm-0'>
								<a style={{ textDecoration: 'none', color: '#03071f' }} href='#register'>
									<button
										style={{
											fontSize: '20px',
											fontWeight: 'bold',
											color: '#03071f',
											backgroundColor: '#95a8f3',
											borderRadius: '20px',
											border: 'none',
											padding: '0.5rem 1rem'
										}}
										className='btn btn-primary ms-md-3'
									>
										Register Now
									</button>
								</a>
							</li>
						</ul>
					</div>
				</nav>

				<section id='home' className='pt-5 mt-5' style={{ marginLeft: 'auto' }}>
					<header className='container' style={{ minHeight: '0vh' }}>
						<div className='row align-items-center'>
							<div className='col-md-6 mb-md-0 text-center text-md-left'>
								<div className='content'>
									<h1
										className='display-4 mb-4 mt-5'
										style={{
											opacity: 0,
											transform: 'translateY(20px)',
											animation: 'fadeInUp 2s forwards 0.5s',
											fontWeight: 700,
											fontSize: '5rem'
										}}
									>
										MediCare
									</h1>
									<p
										className='lead mb-4'
										style={{
											opacity: 0,
											transform: 'translateY(20px)',
											animation: 'fadeInUp 1s forwards 0.8s',
											fontSize: '1.2rem'
										}}
									>
										Get access to fast, reliable, and professional medical services around the clock. Your health, our priority.
									</p>
									<button
										className='btn btn-lg'
										style={{
											padding: '0.75rem 1.5rem',
											borderRadius: '50px',
											transition: 'background-color 0.3s ease, transform 0.3s ease',
											animation: 'bounceIn 1.5s ease forwards',
											backgroundColor: '#081722',
											color: '#95a8f3'
										}}
									>
										Show Services
									</button>
								</div>
							</div>
							<div className='col-md-6 d-flex justify-content-center'>
								<div
									className='image pt-5'
									style={{
										opacity: 0,
										transform: 'scale(0.95)',
										animation: 'fadeInScale 1s forwards 1s'
									}}
								>
									<img src='images/header-bg.png' alt='Medical Services' className='img-fluid rounded-3' style={{ width: '80%', height: '100%' }} />
								</div>
							</div>
						</div>
					</header>
				</section>

				<section id='services' className='pt-5 pb-5' style={{ backgroundColor: '#081722', borderRadius: '20px' }}>
					<div className='container' style={{ minHeight: '40vh' }}>
						<h2 className='text-center mb-4' style={{ color: '#95a8f3', fontSize: '2.5rem', fontWeight: '700' }}>
							Our Services
						</h2>
						<div className='row text-center'>
							<div className='col-lg-4 col-md-6 mb-4'>
								<div
									className='service-card p-4'
									style={{
										backgroundColor: 'rgba(2, 7, 17, 0.9)',
										borderRadius: '12px',
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										transition: 'transform 0.3s ease'
									}}
								>
									<img src={'/images/prescription.png'} alt='Prescription' style={{ width: '150px', height: '150px', marginBottom: '1.5rem' }} />
									<h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#b0bec5' }}>Patient Management</h3>
									<p style={{ fontSize: '1rem', color: '#b0bec5', lineHeight: '1.5' }}>Comprehensive health checkups to ensure your well-being.</p>
								</div>
							</div>
							<div className='col-lg-4 col-md-6 mb-4'>
								<div
									className='service-card p-4'
									style={{
										backgroundColor: 'rgba(2, 7, 17, 0.9)',
										borderRadius: '12px',
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										transition: 'transform 0.3s ease'
									}}
								>
									<img src={'/images/inventory.png'} alt='Inventory Control' style={{ width: '150px', height: '150px', marginBottom: '1.5rem' }} />
									<h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#b0bec5' }}>Inventory Control</h3>
									<p style={{ fontSize: '1rem', color: '#b0bec5', lineHeight: '1.5' }}>
										Keep yourself and your loved ones protected with our vaccination services.
									</p>
								</div>
							</div>
							<div className='col-lg-4 col-md-6 mb-4'>
								<div
									className='service-card p-4'
									style={{
										backgroundColor: 'rgba(2, 7, 17, 0.9)',
										borderRadius: '12px',
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										transition: 'transform 0.3s ease'
									}}
								>
									<img src={'/images/bill.png'} alt='Billing Management' style={{ width: '150px', height: '150px', marginBottom: '1.5rem' }} />
									<h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#b0bec5' }}>Billing Management</h3>
									<p style={{ fontSize: '1rem', color: '#b0bec5', lineHeight: '1.5' }}>Emergency medical services for unforeseen incidents.</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id='insights' className='pt-5 pb-5'>
					<div className='container'>
						<h2 className='text-center mb-4' style={{ color: '#95a8f3', fontSize: '2.5rem', fontWeight: '700' }}>
							Insights
						</h2>
						{/* <div className='row text-center'>
							<div className='col-lg-4 col-md-6 mb-4'>
								<div
									className='insight-card p-4'
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.8)',
										borderRadius: '12px',
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										transition: 'transform 0.3s ease'
									}}
								>
									<img src={'/images/health-check.png'} alt='Blog 1' style={{ width: '150px', height: '150px', marginBottom: '1.5rem' }} />
									<h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#03071f' }}>Medical Checkups</h3>
									<p style={{ fontSize: '1rem', color: '#03071f', lineHeight: '1.5' }}>Discover the importance of regular health checkups.</p>
									<button
										style={{
											fontSize: '1rem',
											padding: '0.5rem 1rem',
											borderRadius: '50px',
											color: '#03071f',
											backgroundColor: '#95a8f3',
											border: 'none',
											marginTop: '1rem'
										}}
									>
										Read More
									</button>
								</div>
							</div>
							<div className='col-lg-4 col-md-6 mb-4'>
								<div
									className='insight-card p-4'
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.8)',
										borderRadius: '12px',
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										transition: 'transform 0.3s ease'
									}}
								>
									<img src={'/images/syringe.png'} alt='Blog 2' style={{ width: '150px', height: '150px', marginBottom: '1.5rem' }} />
									<h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#03071f' }}>Vaccination Benefits</h3>
									<p style={{ fontSize: '1rem', color: '#03071f', lineHeight: '1.5' }}>Explore why vaccinations are crucial to your health.</p>
									<button
										style={{
											fontSize: '1rem',
											padding: '0.5rem 1rem',
											borderRadius: '50px',
											color: '#03071f',
											backgroundColor: '#95a8f3',
											border: 'none',
											marginTop: '1rem'
										}}
									>
										Read More
									</button>
								</div>
							</div>
							<div className='col-lg-4 col-md-6 mb-4'>
								<div
									className='insight-card p-4'
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.8)',
										borderRadius: '12px',
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										transition: 'transform 0.3s ease'
									}}
								>
									<img src={'/images/emergency-services.png'} alt='Blog 3' style={{ width: '150px', height: '150px', marginBottom: '1.5rem' }} />
									<h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#03071f' }}>Emergency Services</h3>
									<p style={{ fontSize: '1rem', color: '#03071f', lineHeight: '1.5' }}>Get ready for any emergency with our tips.</p>
									<button
										style={{
											fontSize: '1rem',
											padding: '0.5rem 1rem',
											borderRadius: '50px',
											color: '#03071f',
											backgroundColor: '#95a8f3',
											border: 'none',
											marginTop: '1rem'
										}}
									>
										Read More
									</button>
								</div>
							</div>
						</div> */}
						<div className='row row-cols-1 row-cols-md-3 g-5'>
					<div className='col'>
						<div
							className='blog-card p-3'
							style={{ backgroundColor: 'rgba(2, 7, 17, 0.9)', borderRadius: '12px', textAlign: 'left', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
						>
							<div className='mt-3' style={{ backgroundColor: '#7589fc', width: '100%', borderRadius: '12px' }}>
								<img style={{ margin: '10px', width: '90%', height: '90%' }} src='/images/health-check.png' alt='Blog 1' />
							</div>
							<div className='blog-content'>
								<h3 className='mt-3' style={{ fontSize: '1.5rem', marginBottom: '0.2rem', color: '#b0bec5' }}>
									Reports
								</h3>
								<p style={{ fontSize: '1rem', color: '#b0bec5', lineHeight: '1.5', marginBottom: '1.5rem' }}>
									Securely store and access all your medical documents in one place.
								</p>
								<p href="/hospital/reports"><button
									className='btn btn-primary'
									style={{
										borderRadius: '20px',
										fontSize: '20px',
										width: '100px',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 700,
										backgroundColor: '#95a8f3',
										color: '#03071f'
									}}
								>
									View
								</button></p>
								
							</div>
						</div>
					</div>
					<div className='col'>
						<div
							className='blog-card p-3'
							style={{ backgroundColor: 'rgba(2, 7, 17, 0.9)', borderRadius: '12px', textAlign: 'left', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
						>
							<div className='mt-3' style={{ backgroundColor: '#7589fc', width: '100%', borderRadius: '12px' }}>
								<img style={{ margin: '10px', width: '90%', height: '90%' }} src='/images/syringe.png' alt='Blog 2' />
							</div>
							<div className='blog-content'>
								<h3 className='mt-3' style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#b0bec5' }}>
									Medicines
								</h3>
								<p style={{ fontSize: '1rem', color: '#b0bec5', lineHeight: '1.5', marginBottom: '1.5rem' }}>
									Keep track of all your medications in one place.
								</p>
								<a href="/hospital/medicine"><button
									className='btn btn-primary'
									style={{
										borderRadius: '20px',
										fontSize: '20px',
										width: '100px',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 700,
										backgroundColor: '#95a8f3',
										color: '#03071f'
									}}
								>
									View
								</button></a>
								
							</div>
						</div>
					</div>
					<div className='col'>
						<div
							className='blog-card p-3'
							style={{ backgroundColor: 'rgba(2, 7, 17, 0.9)', borderRadius: '12px', textAlign: 'left', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
						>
							<div className='mt-3' style={{ backgroundColor: '#7589fc', width: '100%', borderRadius: '12px' }}>
								<img style={{ margin: '10px', width: '90%', height: '90%' }} src='/images/schedule.png' alt='Blog 3' />
							</div>
							<div className='blog-content'>
								<h3 className='mt-3' style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#b0bec5' }}>
									Appointment
								</h3>
								<p style={{ fontSize: '1rem', color: '#b0bec5', lineHeight: '1.5', marginBottom: '1.5rem' }}>
									Easily book appointments with the industry levels doctors.
								</p>
								<a href="/user/appointment"><button
									className='btn btn-primary'
									style={{
										borderRadius: '20px',
										fontSize: '20px',
										width: '100px',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 700,
										backgroundColor: '#95a8f3',
										color: '#03071f'
									}}
								>
									View
								</button></a>
								
							</div>
						</div>
					</div>
				</div>
					</div>
				</section>
				<section id='register' className='py-5' style={{ backgroundColor: '#081722', borderRadius: '12px' }}>
					<div className='container' style={{ minHeight: '50vh' }}>
						<h2 className='text-center mb-4' style={{ color: '#95a8f3', fontSize: '2.5rem', fontWeight: 700 }}>
							Register Now
						</h2>
						<div className='row text-center'>
							<div className='col-md-6 mb-1 d-flex flex-column align-items-center'>
								<div
									className='register-card p-4'
									style={{
										backgroundColor: 'rgba(2, 7, 17, 0.9)',
										borderRadius: '12px',
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										transition: 'transform 0.3s ease, box-shadow 0.3s ease'
									}}
								>
									<h3 style={{ color: '#7589fc', fontWeight: 500, fontSize: '2rem' }}>For Users</h3>
									<img src='images/login.png' alt='User' style={{ width: '150px', height: '150px', marginTop: '20px', marginBottom: '20px' }} />
									<p style={{ color: '#7589fc' }}>"Access personalized medical services tailored just for you"</p>
									<button
										className='btn btn-primary'
										style={{ color: '#030812', fontWeight: 700 }}
										onClick={() => (window.location.href = 'user/login')}
									>
										User Register
									</button>
								</div>
							</div>
							<div className='col-md-6 mb-1 d-flex flex-column align-items-center'>
								<div
									className='register-card p-4'
									style={{
										backgroundColor: 'rgba(2, 7, 17, 0.9)',
										borderRadius: '12px',
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
										transition: 'transform 0.3s ease, box-shadow 0.3s ease'
									}}
								>
									<h3 style={{ color: '#7589fc', fontWeight: 500, fontSize: '2rem' }}>For Hospitals</h3>
									<img
										src='images/hospital.png'
										alt='Hospital'
										style={{ width: '150px', height: '150px', marginTop: '20px', marginBottom: '20px' }}
									/>
									<p style={{ color: '#7589fc' }}>"Partner with us to provide top-notch services to our users"</p>
									<button
										className='btn btn-primary'
										style={{ color: '#030812', fontWeight: 700 }}
										onClick={() => (window.location.href = 'hospital/login')}
									>
										Hospital Register
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<br />
				<br />

				<footer style={{ padding: 0, margin: 0, backgroundColor: 'rgba(2, 7, 17, 0.9)', maxWidth: '100%', height: '70px' }}>
					<p style={{ color: '#7589fc', textAlign: 'center', marginTop: '20px' }}>© 2023 All Rights Reserved. Quick Medical Services</p>
				</footer>
			</div>
		</div>
	)
}

export default Home
