import { PopupButton } from 'react-calendly'

const Appointments = () => {
	return (
		<div>
			<div className='container my-4'>
				<div className='row'>
					<div className='col-lg-3 col-md-6 mb-4'>
						<div className='card p-3' style={{ width: '100%', backgroundColor: '#081722' }}>
							<img
								src='/images/m1.jpg'
								className='card-img-top'
								alt='Dr. A Srivastav'
								style={{ width: '100%', height: '250px', objectFit: 'cover' }}
							/>
							<div className='card-body'>
								<p
									className='card-title'
									style={{
										fontSize: '1.875rem',
										fontWeight: 700,
										color: '#95a8f3',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '20px',
										fontFamily: "'Nunito', sans-serif"
									}}
								>
									Dr. A Singh
								</p>
								<p
									className='card-text'
									style={{
										fontSize: '1.125rem',
										fontWeight: 700,
										color: '#95a8f3',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '20px',
										fontFamily: "'Nunito', sans-serif"
									}}
								>
									MBBS
									<br />
									singh1980@gmail.com
								</p>
								<a
									href='#'
									className='btn-custom'
									style={{
										textDecoration: 'none',
										textAlign: 'center',
										width: '100%',
										display: 'block',
										backgroundColor: '#95a8f3',
										color: '#03071f',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										fontSize: '1.5625rem',
										padding: '0.2rem',
										border: 'none'
									}}
								>
									Profile
								</a>
								<PopupButton
									styles={{
										backgroundColor: '#95a8f3',
										color: '#03071f',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										fontSize: '1.5625rem',
										padding: '0.2rem',
										border: 'none',
										width: '100%',
										display: 'block',
										marginTop: '10px'
									}}
									url='https://calendly.com/abhrajitc23'
									rootElement={document.getElementById('root')}
									text='Book'
								/>
							</div>
						</div>
					</div>
					<div className='col-lg-3 col-md-6 mb-4'>
						<div className='card p-3' style={{ width: '100%', backgroundColor: '#081722' }}>
							<img src='/images/f2.jpg' className='card-img-top' alt='Dr. K Panwar' style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
							<div className='card-body'>
								<p
									className='card-title'
									style={{
										fontSize: '1.875rem',
										fontWeight: 700,
										color: '#95a8f3',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '20px',
										fontFamily: "'Nunito', sans-serif"
									}}
								>
									Dr. K Panwar
								</p>
								<p
									className='card-text'
									style={{
										fontSize: '1.125rem',
										fontWeight: 700,
										color: '#95a8f3',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '20px',
										fontFamily: "'Nunito', sans-serif"
									}}
								>
									MBBS
									<br />
									kani1980@gmail.com
								</p>
								<a
									href='#'
									className='btn-custom'
									style={{
										textDecoration: 'none',
										textAlign: 'center',
										width: '100%',
										display: 'block',
										backgroundColor: '#95a8f3',
										color: '#03071f',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										fontSize: '1.5625rem',
										padding: '0.2rem',
										border: 'none'
									}}
								>
									Profile
								</a>
								<PopupButton
									url='https://calendly.com/abhrajitc23'
									rootElement={document.getElementById('root')}
									text='Book'
									styles={{
										backgroundColor: '#95a8f3',
										color: '#03071f',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										fontSize: '1.5625rem',
										padding: '0.2rem',
										border: 'none',
										width: '100%',
										display: 'block',
										marginTop: '10px'
									}}
								/>
							</div>
						</div>
					</div>
					<div className='col-lg-3 col-md-6 mb-4'>
						<div className='card p-3' style={{ width: '100%', backgroundColor: '#081722' }}>
							<img
								src='/images/m1.jpg'
								className='card-img-top'
								alt='Dr. S Sadhukhan'
								style={{ width: '100%', height: '250px', objectFit: 'cover' }}
							/>
							<div className='card-body'>
								<p
									className='card-title'
									style={{
										fontSize: '1.875rem',
										fontWeight: 700,
										color: '#95a8f3',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '20px',
										fontFamily: "'Nunito', sans-serif"
									}}
								>
									Dr. S Sadhu
								</p>
								<p
									className='card-text'
									style={{
										fontSize: '1.125rem',
										fontWeight: 700,
										color: '#95a8f3',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '20px',
										fontFamily: "'Nunito', sans-serif"
									}}
								>
									MBBS
									<br />
									adhu1980@gmail.com
								</p>
								<a
									href='#'
									className='btn-custom'
									style={{
										textDecoration: 'none',
										textAlign: 'center',
										width: '100%',
										display: 'block',
										backgroundColor: '#95a8f3',
										color: '#03071f',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										fontSize: '1.5625rem',
										padding: '0.2rem',
										border: 'none'
									}}
								>
									Profile
								</a>
								<PopupButton
									url='https://calendly.com/abhrajitc23'
									rootElement={document.getElementById('root')}
									text='Book'
									styles={{
										backgroundColor: '#95a8f3',
										color: '#03071f',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										fontSize: '1.5625rem',
										padding: '0.2rem',
										border: 'none',
										width: '100%',
										display: 'block',
										marginTop: '10px'
									}}
								/>
							</div>
						</div>
					</div>
					<div className='col-lg-3 col-md-6 mb-4'>
						<div className='card p-3' style={{ width: '100%', backgroundColor: '#081722' }}>
							<img src='/images/f2.jpg' className='card-img-top' alt='Dr. S Sinha' style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
							<div className='card-body'>
								<p
									className='card-title'
									style={{
										fontSize: '1.875rem',
										fontWeight: 700,
										color: '#95a8f3',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '20px',
										fontFamily: "'Nunito', sans-serif"
									}}
								>
									Dr. S Sinha
								</p>
								<p
									className='card-text'
									style={{
										fontSize: '1.125rem',
										fontWeight: 700,
										color: '#95a8f3',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '20px',
										fontFamily: "'Nunito', sans-serif"
									}}
								>
									MBBS
									<br />
									sinha1980@gmail.com
								</p>
								<a
									href='#'
									className='btn-custom'
									style={{
										textDecoration: 'none',
										textAlign: 'center',
										width: '100%',
										display: 'block',
										backgroundColor: '#95a8f3',
										color: '#03071f',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										fontSize: '1.5625rem',
										padding: '0.2rem',
										border: 'none'
									}}
								>
									Profile
								</a>
								<PopupButton
									url='https://calendly.com/abhrajitc23'
									rootElement={document.getElementById('root')}
									text='Book'
									styles={{
										backgroundColor: '#95a8f3',
										color: '#03071f',
										fontFamily: "'Nunito', sans-serif",
										fontWeight: 800,
										fontSize: '1.5625rem',
										padding: '0.2rem',
										border: 'none',
										width: '100%',
										display: 'block',
										marginTop: '10px'
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer style={{ padding: 0, margin: 0, backgroundColor: 'rgba(2, 7, 17, 0.9)', maxWidth: '100%', height: '70px' }}>
				<p style={{ color: '#7589fc', textAlign: 'center', marginTop: '40px' }}>© 2023 All Rights Reserved. MediCare</p>
			</footer>
		</div>
	)
}

export default Appointments
